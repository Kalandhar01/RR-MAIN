import { Router } from "express";
import { z } from "zod";
import { ContactInfoModel } from "../models/ContactInquiry.js";

const router = Router();

const createSchema = z.object({
  businessType: z.string().min(1),
  businessId: z.string().optional().nullable(),
  contactName: z.string().min(1),
  companyName: z.string().optional().nullable(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().default("India"),
  notes: z.string().optional().nullable()
});

const updateSchema = z.object({
  contactName: z.string().min(1).optional(),
  companyName: z.string().optional().nullable(),
  email: z.string().email().optional(),
  phone: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional(),
  notes: z.string().optional().nullable()
});

router.post("/", async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Validation failed.", issues: parsed.error.issues });
      return;
    }

    const contact = await ContactInfoModel.create(parsed.data);
    res.status(201).json({ data: contact.toObject() });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(1, Math.floor(Number(req.query.page) || 1));
    const limit = Math.min(100, Math.max(1, Math.floor(Number(req.query.limit) || 20)));
    const skip = (page - 1) * limit;
    const filter: Record<string, unknown> = {};

    if (req.query.businessType) filter.businessType = req.query.businessType;
    if (req.query.search) {
      const escaped = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { contactName: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
        { companyName: { $regex: escaped, $options: "i" } }
      ];
    }

    const [data, total] = await Promise.all([
      ContactInfoModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactInfoModel.countDocuments(filter)
    ]);

    res.json({
      data,
      pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await ContactInfoModel.findById(req.params.id).lean();
    if (!contact) {
      res.status(404).json({ message: "Contact information not found." });
      return;
    }
    res.json({ data: contact });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Validation failed.", issues: parsed.error.issues });
      return;
    }

    const contact = await ContactInfoModel.findByIdAndUpdate(
      req.params.id,
      { $set: parsed.data },
      { new: true }
    ).lean();

    if (!contact) {
      res.status(404).json({ message: "Contact information not found." });
      return;
    }

    res.json({ data: contact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await ContactInfoModel.findByIdAndDelete(req.params.id).lean();
    if (!contact) {
      res.status(404).json({ message: "Contact information not found." });
      return;
    }
    res.json({ message: "Contact information deleted successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;
