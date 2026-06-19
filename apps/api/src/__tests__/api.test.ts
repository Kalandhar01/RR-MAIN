import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import businessRoutes from "../routes/business.js";
import subscriberRoutes from "../routes/subscribers.js";
import contactInfoRoutes from "../routes/contactInfo.js";
import adminDashboardRoutes from "../routes/adminDashboard.js";
import "../models/index.js";

const app = express();
app.use(express.json());
app.use("/api/business", businessRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/admin", adminDashboardRoutes);

describe("API Endpoints", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/ractysh_test";
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  }, 25000);

  afterAll(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    await mongoose.disconnect();
  }, 25000);

  describe("Business API", () => {
    it("POST /api/business/ractysh-group - create a business record", async () => {
      const res = await request(app)
        .post("/api/business/ractysh-group")
        .send({ name: "Test Group", slug: "test-group", status: "active" });
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe("Test Group");
    });

    it("GET /api/business/ractysh-group - list business records", async () => {
      const res = await request(app).get("/api/business/ractysh-group");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("GET /api/business/ractysh-group/:id - get single record", async () => {
      const create = await request(app)
        .post("/api/business/ractysh-group")
        .send({ name: "Single Group", slug: "single-group", status: "active" });

      const res = await request(app).get(`/api/business/ractysh-group/${create.body.data._id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Single Group");
    });

    it("PUT /api/business/ractysh-group/:id - update a record", async () => {
      const create = await request(app)
        .post("/api/business/ractysh-group")
        .send({ name: "Old Name", slug: "update-test", status: "active" });

      const res = await request(app)
        .put(`/api/business/ractysh-group/${create.body.data._id}`)
        .send({ name: "New Name" });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("New Name");
    });

    it("DELETE /api/business/ractysh-group/:id - delete a record", async () => {
      const create = await request(app)
        .post("/api/business/ractysh-group")
        .send({ name: "Delete Me", slug: "delete-me", status: "active" });

      const res = await request(app).delete(`/api/business/ractysh-group/${create.body.data._id}`);
      expect(res.status).toBe(200);
    });

    it("GET /api/business/invalid-type - returns 400", async () => {
      const res = await request(app).get("/api/business/invalid-type");
      expect(res.status).toBe(400);
    });
  });

  describe("Subscriber API", () => {
    it("POST /api/subscribers - create subscriber", async () => {
      const res = await request(app)
        .post("/api/subscribers")
        .send({ businessType: "ractysh-group", email: "sub@test.com", fullName: "Test Sub" });
      expect(res.status).toBe(201);
    });

    it("POST /api/subscribers - duplicate email returns 409", async () => {
      await request(app)
        .post("/api/subscribers")
        .send({ businessType: "ractysh-group", email: "dup@test.com" });

      const res = await request(app)
        .post("/api/subscribers")
        .send({ businessType: "ractysh-group", email: "dup@test.com" });
      expect(res.status).toBe(409);
    });

    it("GET /api/subscribers - list subscribers", async () => {
      const res = await request(app).get("/api/subscribers");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("GET /api/subscribers - filter by businessType", async () => {
      const res = await request(app).get("/api/subscribers?businessType=architecture");
      expect(res.status).toBe(200);
    });
  });

  describe("Contact Info API", () => {
    it("POST /api/contact-info - create contact", async () => {
      const res = await request(app)
        .post("/api/contact-info")
        .send({ businessType: "ractysh-group", contactName: "John", email: "john@test.com" });
      expect(res.status).toBe(201);
    });

    it("GET /api/contact-info - list contacts", async () => {
      const res = await request(app).get("/api/contact-info");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("GET /api/contact-info/:id - get single contact", async () => {
      const create = await request(app)
        .post("/api/contact-info")
        .send({ businessType: "ractysh-group", contactName: "Jane", email: "jane@test.com" });

      const res = await request(app).get(`/api/contact-info/${create.body.data._id}`);
      expect(res.status).toBe(200);
    });
  });

  describe("Admin Dashboard API", () => {
    it("GET /api/admin/all-businesses - returns all collections", async () => {
      const res = await request(app).get("/api/admin/all-businesses");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("ractyshGroups");
      expect(res.body).toHaveProperty("architectures");
      expect(res.body).toHaveProperty("subscribers");
      expect(res.body).toHaveProperty("contactInfos");
    });

    it("GET /api/admin/stats - returns counts", async () => {
      const res = await request(app).get("/api/admin/stats");
      expect(res.status).toBe(200);
      expect(res.body.counts).toHaveProperty("ractyshGroups");
      expect(res.body.counts).toHaveProperty("subscribers");
    });
  });
});
