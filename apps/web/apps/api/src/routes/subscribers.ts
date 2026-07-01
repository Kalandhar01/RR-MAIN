import { Router } from "express";
import { z } from "zod";
import { GeneralSubscriberModel } from "../models/ContactInquiry.js";

const router = Router();

const createSchema = z.object({
  businessType: z.string().min(1),
  businessId: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  email: z.string().email().toLowerCase(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  status: z.string().default("active")
});

const updateSchema = z.object({
  fullName: z.string().optional().nullable(),
  email: z.string().email().toLowerCase().optional(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  status: z.string().optional()
});

router.post("/", async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Validation failed.", issues: parsed.error.issues });
      return;
    }

    const existing = await GeneralSubscriberModel.findOne({ email: parsed.data.email, businessType: parsed.data.businessType });
    if (existing) {
      res.status(409).json({ message: "Subscriber already exists for this business type." });
      return;
    }

    const subscriber = await GeneralSubscriberModel.create({
      ...parsed.data,
      subscribedAt: new Date()
    });

    res.status(201).json({ data: subscriber.toObject() });
  } catch (error) {
    if (error instanceof Error && /duplicate|E11000/i.test(error.message)) {
      res.status(409).json({ message: "Subscriber already exists." });
      return;
    }
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
        { fullName: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
        { company: { $regex: escaped, $options: "i" } }
      ];
    }
    if (req.query.status) filter.status = req.query.status;

    const [data, total] = await Promise.all([
      GeneralSubscriberModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      GeneralSubscriberModel.countDocuments(filter)
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
    const subscriber = await GeneralSubscriberModel.findById(req.params.id).lean();
    if (!subscriber) {
      res.status(404).json({ message: "Subscriber not found." });
      return;
    }
    res.json({ data: subscriber });
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

    const subscriber = await GeneralSubscriberModel.findByIdAndUpdate(
      req.params.id,
      { $set: parsed.data },
      { new: true }
    ).lean();

    if (!subscriber) {
      res.status(404).json({ message: "Subscriber not found." });
      return;
    }

    res.json({ data: subscriber });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const subscriber = await GeneralSubscriberModel.findByIdAndDelete(req.params.id).lean();
    if (!subscriber) {
      res.status(404).json({ message: "Subscriber not found." });
      return;
    }
    res.json({ message: "Subscriber deleted successfully." });
  } catch (error) {
    next(error);
  }
});

export default router;
