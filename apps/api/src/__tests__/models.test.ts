import mongoose from "mongoose";
import { BlogModel } from "../models/Blog.js";
import { NewsletterModel, SubscriberModel } from "../models/Newsletter.js";
import { ContactInquiryModel, ContactInfoModel, GeneralSubscriberModel } from "../models/ContactInquiry.js";
import { ConsultationModel } from "../models/Consultation.js";
import {
  RactyshGroupModel,
  ArchitectureModel,
  ConstructionModel,
  OtcExchangeModel,
  RealEstateModel,
  ImportExportModel
} from "../models/BusinessCollections.js";

describe("MongoDB Connection", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ractysh_test";
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  }, 25000);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

  describe("Business Collections", () => {
    it("should create and read a RactyshGroup record", async () => {
      const doc = await RactyshGroupModel.create({
        name: "Ractysh Group",
        slug: "ractysh-group",
        description: "Main group",
        status: "active"
      });
      expect(doc._id).toBeDefined();
      expect(doc.name).toBe("Ractysh Group");

      const found = await RactyshGroupModel.findOne({ slug: "ractysh-group" }).lean();
      expect(found).toBeDefined();
      expect(found!.name).toBe("Ractysh Group");
    });

    it("should create and read an Architecture record", async () => {
      const doc = await ArchitectureModel.create({
        name: "Test Architecture",
        slug: "test-architecture",
        projectType: "residential",
        status: "draft"
      });
      expect(doc._id).toBeDefined();

      const found = await ArchitectureModel.findById(doc._id).lean();
      expect(found).toBeDefined();
      expect(found!.name).toBe("Test Architecture");
    });

    it("should create and read a Construction record", async () => {
      const doc = await ConstructionModel.create({
        name: "Test Construction",
        slug: "test-construction",
        status: "concept"
      });
      expect(doc._id).toBeDefined();

      const found = await ConstructionModel.findOne({ slug: "test-construction" }).lean();
      expect(found).toBeDefined();
    });

    it("should create and read an OtcExchange record", async () => {
      const doc = await OtcExchangeModel.create({
        name: "OTC Exchange",
        slug: "otc-exchange",
        status: "active"
      });
      expect(doc._id).toBeDefined();

      const updated = await OtcExchangeModel.findByIdAndUpdate(
        doc._id,
        { $set: { description: "Updated desc" } },
        { new: true }
      ).lean();
      expect(updated!.description).toBe("Updated desc");
    });

    it("should create and read a RealEstate record", async () => {
      const doc = await RealEstateModel.create({
        name: "Luxury Villa",
        slug: "luxury-villa",
        propertyType: "villa",
        status: "available"
      });
      expect(doc._id).toBeDefined();

      await RealEstateModel.findByIdAndDelete(doc._id);
      const deleted = await RealEstateModel.findById(doc._id).lean();
      expect(deleted).toBeNull();
    });

    it("should create and read an ImportExport record", async () => {
      const doc = await ImportExportModel.create({
        name: "Import Export Co",
        slug: "import-export-co",
        countries: ["India", "UAE"],
        status: "active"
      });
      expect(doc._id).toBeDefined();
      expect(doc.countries).toContain("India");
    });

    it("should find records with pagination", async () => {
      await Promise.all([
        RactyshGroupModel.create({ name: "A", slug: "a", status: "active" }),
        RactyshGroupModel.create({ name: "B", slug: "b", status: "active" }),
        RactyshGroupModel.create({ name: "C", slug: "c", status: "active" })
      ]);

      const total = await RactyshGroupModel.countDocuments();
      expect(total).toBe(3);

      const page = await RactyshGroupModel.find().sort({ createdAt: -1 }).limit(2).lean();
      expect(page.length).toBe(2);
    });
  });

  describe("Subscriber Management", () => {
    it("should create a subscriber with unique email constraint", async () => {
      const sub = await GeneralSubscriberModel.create({
        businessType: "ractysh-group",
        email: "test@example.com",
        fullName: "Test User",
        status: "active"
      });
      expect(sub._id).toBeDefined();

      await expect(
        GeneralSubscriberModel.create({
          businessType: "ractysh-group",
          email: "test@example.com"
        })
      ).rejects.toThrow();
    });

    it("should search subscribers", async () => {
      await GeneralSubscriberModel.create({
        businessType: "construction",
        email: "john@example.com",
        fullName: "John Doe",
        status: "active"
      });
      await GeneralSubscriberModel.create({
        businessType: "architecture",
        email: "jane@example.com",
        fullName: "Jane Smith",
        status: "active"
      });

      const found = await GeneralSubscriberModel.find({
        businessType: "construction"
      }).lean();
      expect(found.length).toBe(1);
    });
  });

  describe("Contact Information", () => {
    it("should create and link contact info to business", async () => {
      const biz = await RactyshGroupModel.create({
        name: "Test Biz",
        slug: "test-biz",
        status: "active"
      });

      const contact = await ContactInfoModel.create({
        businessType: "ractysh-group",
        businessId: biz._id,
        contactName: "John Contact",
        email: "john@contact.com"
      });
      expect(contact._id).toBeDefined();
      expect(String(contact.businessId)).toBe(String(biz._id));
    });

    it("should update contact info", async () => {
      const contact = await ContactInfoModel.create({
        businessType: "ractysh-group",
        contactName: "Old Name",
        email: "old@example.com"
      });

      const updated = await ContactInfoModel.findByIdAndUpdate(
        contact._id,
        { $set: { contactName: "New Name" } },
        { new: true }
      ).lean();
      expect(updated!.contactName).toBe("New Name");
    });
  });

  describe("Blog CRUD", () => {
    it("should create a blog", async () => {
      const blog = await BlogModel.create({
        title: "Test Blog",
        slug: "test-blog",
        excerpt: "Test excerpt",
        content: "Test content",
        coverImage: "https://example.com/image.jpg",
        author: "Test Author",
        category: "Tech",
        readTime: "5 min read",
        status: "draft"
      });
      expect(blog._id).toBeDefined();
    });

    it("should find published blogs", async () => {
      await BlogModel.create({
        title: "Published Post",
        slug: "published-post",
        excerpt: "Excerpt",
        content: "Content",
        coverImage: "https://example.com/img.jpg",
        author: "Author",
        category: "News",
        readTime: "3 min read",
        status: "published",
        publishedAt: new Date()
      });

      const published = await BlogModel.find({ status: "published" }).lean();
      expect(published.length).toBe(1);
    });
  });

  describe("Newsletter CRUD", () => {
    it("should create a newsletter", async () => {
      const nl = await NewsletterModel.create({
        title: "Test Newsletter",
        slug: "test-newsletter",
        excerpt: "Newsletter excerpt",
        content: "Full content",
        coverImage: "https://example.com/nl.jpg",
        category: "Executive Brief",
        author: "Editor",
        readTime: "4 min read",
        status: "draft"
      });
      expect(nl._id).toBeDefined();
    });
  });

  describe("Contact Inquiry", () => {
    it("should create an inquiry", async () => {
      const inquiry = await ContactInquiryModel.create({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "I want to know more."
      });
      expect(inquiry._id).toBeDefined();
      expect(inquiry.status).toBe("new");
    });
  });

  describe("Consultation", () => {
    it("should create a consultation", async () => {
      const consultation = await ConsultationModel.create({
        trackingToken: "tok_" + Date.now(),
        fullName: "Client Name",
        companyName: "Client Company",
        emailAddress: "client@example.com",
        phoneNumber: "+1234567890",
        serviceType: "architecture",
        budgetRange: "$50k-$100k",
        projectTimeline: "3-6 months",
        projectDescription: "We need architectural design services.",
        preferredConsultationType: "video"
      });
      expect(consultation._id).toBeDefined();
      expect(consultation.status).toBe("new");
    });
  });

  describe("Index Validation", () => {
    it("should have unique index on blog slug", async () => {
      await BlogModel.create({
        title: "Blog 1", slug: "unique-slug", excerpt: "A", content: "B",
        coverImage: "https://example.com/img.jpg", author: "A", category: "C",
        readTime: "1 min", status: "draft"
      });

      await expect(BlogModel.create({
        title: "Blog 2", slug: "unique-slug", excerpt: "C", content: "D",
        coverImage: "https://example.com/img2.jpg", author: "B", category: "D",
        readTime: "2 min", status: "draft"
      })).rejects.toThrow();
    });
  });
});
