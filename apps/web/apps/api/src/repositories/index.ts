import mongoose, { Model, Document, FilterQuery, UpdateQuery, SortOrder, QueryOptions } from "mongoose";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, SortOrder>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function parsePage(page?: number): number {
  return Math.max(1, Math.floor(Number(page) || 1));
}

function parseLimit(limit?: number): number {
  return Math.min(100, Math.max(1, Math.floor(Number(limit) || 20)));
}

export class BaseRepository<T extends Document> {
  constructor(protected model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findById(id).lean() as unknown as T | null;
    } catch {
      return null;
    }
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    try {
      return await this.model.findOne(filter).lean() as unknown as T | null;
    } catch {
      return null;
    }
  }

  async findMany(
    filter: FilterQuery<T> = {},
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<T>> {
    const page = parsePage(options.page);
    const limit = parseLimit(options.limit);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(options.sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.model.countDocuments(filter)
    ]);

    return {
      data: data as unknown as T[],
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit))
    };
  }

  async findAll(filter: FilterQuery<T> = {}, sort: Record<string, SortOrder> = { createdAt: -1 }): Promise<T[]> {
    return this.model.find(filter).sort(sort).lean() as unknown as T[];
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc.toObject() as T;
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      const doc = await this.model.findByIdAndUpdate(id, data, { new: true }).lean();
      return doc as T | null;
    } catch {
      return null;
    }
  }

  async updateOne(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null> {
    try {
      const doc = await this.model.findOneAndUpdate(filter, data, { new: true }).lean();
      return doc as T | null;
    } catch {
      return null;
    }
  }

  async updateMany(filter: FilterQuery<T>, data: UpdateQuery<T>): Promise<number> {
    const result = await this.model.updateMany(filter, data);
    return result.modifiedCount;
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result !== null;
    } catch {
      return false;
    }
  }

  async deleteOne(filter: FilterQuery<T>): Promise<boolean> {
    try {
      const result = await this.model.deleteOne(filter);
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const result = await this.model.deleteMany(filter);
    return result.deletedCount;
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const doc = await this.model.findOne(filter).select("_id").lean();
    return doc !== null;
  }

  async upsert(filter: FilterQuery<T>, data: Partial<T>): Promise<T> {
    const doc = await this.model.findOneAndUpdate(filter, data as UpdateQuery<T>, {
      new: true,
      upsert: true
    }).lean();
    return doc as T;
  }

  async distinct(field: string, filter: FilterQuery<T> = {}): Promise<string[]> {
    return this.model.distinct(field, filter) as Promise<string[]>;
  }

  async aggregate(pipeline: Record<string, unknown>[]): Promise<unknown[]> {
    const result = await this.model.aggregate(pipeline as any);
    return result as unknown as unknown[];
  }

  async increment(id: string, field: string, amount = 1): Promise<T | null> {
    const doc = (await this.model.findByIdAndUpdate(
      id,
      { $inc: { [field]: amount } } as any,
      { new: true }
    ).lean()) as unknown as T | null;
    return doc;
  }
}
