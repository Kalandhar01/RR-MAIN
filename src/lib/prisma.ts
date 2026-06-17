import mongoose from "mongoose";
import path from "node:path";
import { readFileSync } from "node:fs";
import { config as loadDotenv, parse as parseDotenv } from "dotenv";

import PropertyModel from "@/models/Property";
import PropertyCategoryModel from "@/models/PropertyCategory";
import PropertyLocationModel from "@/models/PropertyLocation";
import PropertyMediaModel from "@/models/PropertyMedia";
import TestimonialModel from "@/models/Testimonial";
import PropertyLeadModel from "@/models/PropertyLead";
import NewsletterSubscriberModel from "@/models/NewsletterSubscriber";
import AdminModel from "@/models/Admin";
import NotificationModel from "@/models/Notification";

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "../apps/api/.env"),
  path.resolve(process.cwd(), "../api/.env"),
  path.resolve(process.cwd(), "../../apps/api/.env"),
  path.resolve(process.cwd(), "apps/api/.env"),
];

function mongoUriIsConfigured() {
  return Boolean(process.env.MONGODB_URI?.trim());
}

function loadMongoUriFromEnvFile(envPath: string) {
  loadDotenv({ path: envPath, override: false });
  if (mongoUriIsConfigured()) return true;

  try {
    const parsed = parseDotenv(readFileSync(envPath));
    const mongoUri = parsed.MONGODB_URI?.trim();
    if (!mongoUri) return false;

    process.env.MONGODB_URI = mongoUri;
    return true;
  } catch {
    return false;
  }
}

if (!mongoUriIsConfigured()) {
  for (const envPath of envCandidates) {
    if (loadMongoUriFromEnvFile(envPath)) break;
  }
}

const globalForMongoose = globalThis as unknown as {
  reMongoose?: typeof mongoose;
};

async function connectMongoose() {
  if (mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.warn("[prisma] MONGODB_URI not set — running without database");
    return;
  }
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error("[prisma] Failed to connect to MongoDB", error);
  }
}

void connectMongoose();

if (process.env.NODE_ENV !== "production") {
  globalForMongoose.reMongoose = mongoose;
}

type PrismaWhere = Record<string, unknown>;
type PrismaOrderBy = Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">>;
type PrismaSelect = Record<string, boolean | Record<string, unknown>>;

function convertId(where: PrismaWhere): PrismaWhere {
  const result: PrismaWhere = {};
  for (const [key, value] of Object.entries(where)) {
    if (key === "id") {
      result._id = value;
    } else if (key === "id" && typeof value === "object" && value !== null && !Array.isArray(value)) {
      const objVal = value as Record<string, unknown>;
      const converted: Record<string, unknown> = {};
      for (const [op, opVal] of Object.entries(objVal)) {
        if (op === "not") converted.$ne = opVal;
        else if (op === "in") converted.$in = opVal;
        else converted[`$${op}`] = opVal;
      }
      result._id = converted;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const objVal = value as Record<string, unknown>;
      const converted: Record<string, unknown> = {};
      for (const [op, opVal] of Object.entries(objVal)) {
        if (op === "not") converted.$ne = opVal;
        else if (op === "in") converted.$in = opVal;
        else if (op === "contains") {
          const opts: Record<string, unknown> = { $regex: opVal as string };
          if ((objVal as Record<string, unknown>).mode === "insensitive") {
            opts.$options = "i";
          }
          Object.assign(converted, opts);
        } else converted[`$${op}`] = opVal;
      }
      result[key] = converted;
    } else {
      result[key] = value;
    }
  }
  return result;
}

function convertOrderBy(orderBy: PrismaOrderBy | undefined): Record<string, 1 | -1> | undefined {
  if (!orderBy) return undefined;
  const arr = Array.isArray(orderBy) ? orderBy : [orderBy];
  const result: Record<string, 1 | -1> = {};
  for (const item of arr) {
    for (const [key, dir] of Object.entries(item)) {
      result[key] = dir === "asc" ? 1 : -1;
    }
  }
  return Object.keys(result).length ? result : undefined;
}

function convertSelect(select: PrismaSelect | undefined): string {
  if (!select) return "_id";
  const keys = Object.entries(select)
    .filter(([, v]) => v === true || (typeof v === "object" && v !== null))
    .map(([k]) => k === "id" ? "_id" : k);
  keys.push("_id");
  return [...new Set(keys)].join(" ");
}

function mapDoc(doc: Record<string, unknown> | null): any {
  if (!doc) return null;
  if (Array.isArray(doc)) return doc.map((d: any) => mapDoc(d));
  if (typeof doc !== "object") return doc;

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (key === "_id") {
      result.id = String(value);
    } else if (key === "__v") {
      continue;
    } else if (value && typeof value === "object" && "$oid" in (value as Record<string, unknown>)) {
      result[key] = String((value as Record<string, unknown>).$oid);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function mapDocs(docs: any[]): any[] {
  return docs.map((d) => mapDoc(d));
}

function stripSelect(doc: Record<string, unknown>, select: PrismaSelect | undefined): Record<string, unknown> {
  if (!select) return doc;
  const included = Object.entries(select).filter(([, v]) => v === true || typeof v === "object").map(([k]) => k);
  if (included.length === 0) return doc;

  const result: Record<string, unknown> = {};
  for (const key of included) {
    if (key in doc) result[key] = doc[key];
  }
  if (doc.id) result.id = doc.id;
  return result;
}

function extractRelationSelects(select: PrismaSelect | undefined): {
  category?: PrismaSelect;
  location?: PrismaSelect;
  media?: { orderBy?: PrismaOrderBy; take?: number; select?: PrismaSelect };
} {
  if (!select) return {};
  const category = select.category as { select?: PrismaSelect } | undefined;
  const location = select.location as { select?: PrismaSelect } | undefined;
  const mediaRaw = select.media as { orderBy?: PrismaOrderBy; take?: number; select?: PrismaSelect } | undefined;
  return {
    category: category?.select,
    location: location?.select,
    media: mediaRaw ? { orderBy: mediaRaw.orderBy, take: mediaRaw.take, select: mediaRaw.select } : undefined,
  };
}

function extractCountSelect(select: PrismaSelect | undefined): { properties?: boolean } | undefined {
  const countObj = select?._count as { select?: { properties?: boolean } } | undefined;
  return countObj?.select;
}

async function populateCategory(
  doc: Record<string, unknown>,
  categorySelect: PrismaSelect | undefined
): Promise<void> {
  if (!doc.categoryId) {
    doc.category = null;
    return;
  }
  const cat = await PropertyCategoryModel.findById(doc.categoryId)
    .select(convertSelect(categorySelect))
      .lean()
      .catch(() => null);
  doc.category = cat ? mapDoc(cat as unknown as Record<string, unknown>) : null;
}

async function populateLocation(
  doc: Record<string, unknown>,
  locationSelect: PrismaSelect | undefined
): Promise<void> {
  if (!doc.locationId) {
    doc.location = null;
    return;
  }
  const loc = await PropertyLocationModel.findById(doc.locationId)
    .select(convertSelect(locationSelect))
    .lean()
    .catch(() => null);
  doc.location = loc ? mapDoc(loc as unknown as Record<string, unknown>) : null;
}

async function handlePropertyIncludes(
  properties: Record<string, unknown>[],
  select: PrismaSelect | undefined
): Promise<any[]> {
  const rel = extractRelationSelects(select);

  await Promise.all(
    properties.map(async (prop) => {
      await Promise.all([
        populateCategory(prop, rel.category),
        populateLocation(prop, rel.location),
      ]);
    })
  );

  if (rel.media) {
    const propertyIds = properties.map((p) => p._id || p.id).filter(Boolean);
    if (propertyIds.length > 0) {
      let mediaQuery = PropertyMediaModel.find({ propertyId: { $in: propertyIds } });
      if (rel.media.orderBy) mediaQuery = mediaQuery.sort(convertOrderBy(rel.media.orderBy));
      if (rel.media.take) mediaQuery = mediaQuery.limit(rel.media.take);
      if (rel.media.select) mediaQuery = mediaQuery.select(convertSelect(rel.media.select));

      const mediaDocs = await mediaQuery.lean().catch(() => []);
      const mappedMedia = mapDocs(mediaDocs as unknown as Record<string, unknown>[]);
      const mediaByPropertyId: Record<string, Record<string, unknown>[]> = {};
      for (const m of mappedMedia) {
        const pid = String(m.propertyId || "");
        if (!mediaByPropertyId[pid]) mediaByPropertyId[pid] = [];
        mediaByPropertyId[pid].push(m);
      }
      for (const prop of properties) {
        const pid = String(prop._id || prop.id || "");
        prop.media = mediaByPropertyId[pid] || [];
      }
    } else {
      for (const prop of properties) {
        prop.media = [];
      }
    }
  }

  return properties;
}

const prisma = {
  property: {
    async findMany({
      where,
      orderBy,
      take,
      select,
    }: {
      where?: PrismaWhere;
      orderBy?: PrismaOrderBy;
      take?: number;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown>[]> {
      const w = where ? convertId(where) : {};
      let query = PropertyModel.find(w);
      const sort = convertOrderBy(orderBy);
      if (sort) query = query.sort(sort);
      if (take) query = query.limit(take);
      let docs = await query.lean().catch(() => []) as unknown as Record<string, unknown>[];
      docs = mapDocs(docs);
      docs = await handlePropertyIncludes(docs, select);
      if (select) docs = docs.map((d) => stripSelect(d, select));
      return docs;
    },

    async findFirst({
      where,
      select,
    }: {
      where?: PrismaWhere;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown> | null> {
      const w = where ? convertId(where) : {};
      let doc = await PropertyModel.findOne(w).lean().catch(() => null) as unknown as Record<string, unknown> | null;
      if (!doc) return null;
      doc = mapDoc(doc);
      const docs = await handlePropertyIncludes([doc as Record<string, unknown>], select);
      const result = (docs[0] || null) as Record<string, unknown> | null;
      if (select && result) return stripSelect(result, select);
      return result || null;
    },

    async findUnique({
      where,
      select,
    }: {
      where: { id?: string; slug?: string };
      select?: PrismaSelect;
    }): Promise<Record<string, unknown> | null> {
      const id = where.id;
      if (id) {
        let doc = await PropertyModel.findById(id).lean().catch(() => null) as unknown as Record<string, unknown> | null;
        if (!doc) return null;
        doc = mapDoc(doc);
        const docs = await handlePropertyIncludes([doc as Record<string, unknown>], select);
        const result = docs[0];
        if (select && result) return stripSelect(result, select);
        return result || null;
      }
      if (where.slug) {
        return prisma.property.findFirst({ where: { slug: where.slug }, select });
      }
      return null;
    },

    async count({ where }: { where?: PrismaWhere } = {}): Promise<number> {
      const w = where ? convertId(where) : {};
      return PropertyModel.countDocuments(w).catch(() => 0);
    },

    async create({ data }: { data: Record<string, unknown> }): Promise<Record<string, unknown>> {
      const doc = await PropertyModel.create(data);
      return mapDoc(doc.toObject());
    },
  },

  testimonial: {
    async findMany({
      where,
      orderBy,
      take,
      select,
    }: {
      where?: PrismaWhere;
      orderBy?: PrismaOrderBy;
      take?: number;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown>[]> {
      const w = where ? convertId(where) : {};
      let query = TestimonialModel.find(w);
      const sort = convertOrderBy(orderBy);
      if (sort) query = query.sort(sort);
      if (take) query = query.limit(take);
      if (select) query = query.select(convertSelect(select));
      const docs = await query.lean().catch(() => []) as unknown as Record<string, unknown>[];
      return mapDocs(docs);
    },

    async count({ where }: { where?: PrismaWhere } = {}): Promise<number> {
      const w = where ? convertId(where) : {};
      return TestimonialModel.countDocuments(w).catch(() => 0);
    },

    async createMany({
      data,
      skipDuplicates,
    }: {
      data: Record<string, unknown>[];
      skipDuplicates?: boolean;
    }): Promise<void> {
      try {
        if (skipDuplicates) {
          for (const item of data) {
            await TestimonialModel.create(item).catch(() => {});
          }
        } else {
          await TestimonialModel.insertMany(data, { ordered: false }).catch(() => {});
        }
      } catch {
        // silent - matches original error handling
      }
    },
  },

  propertyCategory: {
    async upsert({
      where,
      update,
      create,
    }: {
      where: { slug: string };
      update: Record<string, unknown>;
      create: Record<string, unknown>;
    }): Promise<Record<string, unknown>> {
      const existing = await PropertyCategoryModel.findOne({ slug: where.slug }).lean();
      if (existing) {
        await PropertyCategoryModel.updateOne({ slug: where.slug }, update);
        return mapDoc({ ...existing, ...update } as unknown as Record<string, unknown>);
      }
      const doc = await PropertyCategoryModel.create(create);
      return mapDoc(doc.toObject());
    },
  },

  propertyMedia: {
    async count({ where }: { where: { propertyId: string } }): Promise<number> {
      return PropertyMediaModel.countDocuments({ propertyId: where.propertyId }).catch(() => 0);
    },

    async createMany({ data }: { data: Record<string, unknown>[] }): Promise<void> {
      try {
        await PropertyMediaModel.insertMany(data, { ordered: false }).catch(() => {});
      } catch {
        // silent
      }
    },
  },

  propertyLead: {
    async count(): Promise<number> {
      return PropertyLeadModel.countDocuments().catch(() => 0);
    },

    async create({
      data,
      select,
    }: {
      data: Record<string, unknown>;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown>> {
      const doc = await PropertyLeadModel.create(data);
      const plain = mapDoc(doc.toObject());
      if (select) {
        const keySet = new Set(Object.keys(convertSelect(select) || {}));
        const result: Record<string, unknown> = { id: plain.id };
        for (const key of keySet) {
          if (key in plain) result[key] = plain[key];
        }
        return result;
      }
      return plain;
    },
  },

  propertyLocation: {
    async upsert({
      where,
      update,
      create,
    }: {
      where: { slug: string };
      update: Record<string, unknown>;
      create: Record<string, unknown>;
    }): Promise<Record<string, unknown>> {
      const existing = await PropertyLocationModel.findOne({ slug: where.slug }).lean();
      if (existing) {
        await PropertyLocationModel.updateOne({ slug: where.slug }, update);
        return mapDoc({ ...existing, ...update } as unknown as Record<string, unknown>);
      }
      const doc = await PropertyLocationModel.create(create);
      return mapDoc(doc.toObject());
    },

    async findMany({
      where,
      orderBy,
      take,
      select,
    }: {
      where?: PrismaWhere;
      orderBy?: PrismaOrderBy;
      take?: number;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown>[]> {
      const w = where ? convertId(where) : {};
      let query = PropertyLocationModel.find(w);
      const sort = convertOrderBy(orderBy);
      if (sort) query = query.sort(sort);
      if (take) query = query.limit(take);

      const countSelect = extractCountSelect(select);
      const locationSelect = select
        ? Object.fromEntries(
            Object.entries(select).filter(([k]) => k !== "_count")
          ) as PrismaSelect
        : undefined;

      if (locationSelect && Object.keys(locationSelect).length > 0) {
        query = query.select(convertSelect(locationSelect));
      }

      const docs = await query.lean().catch(() => []) as unknown as Record<string, unknown>[];
      const mapped = mapDocs(docs);

      if (countSelect?.properties) {
        await Promise.all(
          mapped.map(async (loc) => {
            const count = await PropertyModel.countDocuments({
              locationId: loc._id || loc.id,
            }).catch(() => 0);
            loc._count = { properties: count };
          })
        );
      }

      return mapped;
    },
  },

  newsletterSubscriber: {
    async findUnique({
      where,
    }: {
      where: { email?: string; id?: string };
    }): Promise<Record<string, unknown> | null> {
      const query: PrismaWhere = {};
      if (where.email) query.email = where.email;
      if (where.id) query._id = where.id;
      const doc = await NewsletterSubscriberModel.findOne(query).lean().catch(() => null) as unknown as Record<string, unknown> | null;
      return doc ? mapDoc(doc) : null;
    },

    async create({
      data,
    }: {
      data: Record<string, unknown>;
    }): Promise<Record<string, unknown>> {
      const doc = await NewsletterSubscriberModel.create(data);
      return mapDoc(doc.toObject());
    },
  },

  admin: {
    async findMany({
      where,
      select,
    }: {
      where?: PrismaWhere;
      select?: PrismaSelect;
    }): Promise<Record<string, unknown>[]> {
      const w = where ? convertId(where) : {};
      let query = AdminModel.find(w);
      if (select) query = query.select(convertSelect(select));
      const docs = await query.lean().catch(() => []) as unknown as Record<string, unknown>[];
      return mapDocs(docs);
    },
  },

  notification: {
    async createMany({
      data,
      skipDuplicates,
    }: {
      data: Record<string, unknown>[];
      skipDuplicates?: boolean;
    }): Promise<void> {
      try {
        if (skipDuplicates) {
          for (const item of data) {
            await NotificationModel.create(item).catch(() => {});
          }
        } else {
          await NotificationModel.insertMany(data, { ordered: false }).catch(() => {});
        }
      } catch {
        // silent
      }
    },
  },
};

export { prisma };
