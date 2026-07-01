import { Router } from "express";
import { z } from "zod";
import { getBusinessModel, isValidBusinessType, normalizeBusinessType } from "../lib/businessResolver.js";

const router = Router();

function handleError(error: unknown, res: any): boolean {
  if (error instanceof Error && /not found/i.test(error.message)) {
    res.status(404).json({ message: error.message });
    return true;
  }
  if (error instanceof z.ZodError) {
    res.status(400).json({ message: "Validation failed.", issues: error.issues });
    return true;
  }
  return false;
}

router.get("/:type", async (req, res, next) => {
  try {
    const type = normalizeBusinessType(req.params.type);
    if (!isValidBusinessType(type)) {
      res.status(400).json({ message: `Invalid business type: ${type}. Valid types: ractysh-group, architecture, construction, otc-exchange, real-estate, import-export` });
      return;
    }

    const Model = getBusinessModel(type);
    if (!Model) {
      res.status(500).json({ message: "Business model not found." });
      return;
    }

    const page = Math.max(1, Math.floor(Number(req.query.page) || 1));
    const limit = Math.min(50, Math.max(1, Math.floor(Number(req.query.limit) || 20)));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Model.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Model.countDocuments()
    ]);

    res.json({
      businessType: type,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (error) {
    if (!handleError(error, res)) next(error);
  }
});

router.get("/:type/:id", async (req, res, next) => {
  try {
    const type = normalizeBusinessType(req.params.type);
    if (!isValidBusinessType(type)) {
      res.status(400).json({ message: `Invalid business type: ${type}.` });
      return;
    }

    const Model = getBusinessModel(type);
    if (!Model) {
      res.status(500).json({ message: "Business model not found." });
      return;
    }

    const doc = await Model.findById(req.params.id).lean();
    if (!doc) {
      res.status(404).json({ message: `${type} record not found.` });
      return;
    }

    res.json({ businessType: type, data: doc });
  } catch (error) {
    if (!handleError(error, res)) next(error);
  }
});

router.post("/:type", async (req, res, next) => {
  try {
    const type = normalizeBusinessType(req.params.type);
    if (!isValidBusinessType(type)) {
      res.status(400).json({ message: `Invalid business type: ${type}.` });
      return;
    }

    const Model = getBusinessModel(type);
    if (!Model) {
      res.status(500).json({ message: "Business model not found." });
      return;
    }

    const doc = await Model.create(req.body);
    res.status(201).json({ businessType: type, data: doc.toObject() });
  } catch (error) {
    if (!handleError(error, res)) next(error);
  }
});

router.put("/:type/:id", async (req, res, next) => {
  try {
    const type = normalizeBusinessType(req.params.type);
    if (!isValidBusinessType(type)) {
      res.status(400).json({ message: `Invalid business type: ${type}.` });
      return;
    }

    const Model = getBusinessModel(type);
    if (!Model) {
      res.status(500).json({ message: "Business model not found." });
      return;
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).lean();
    if (!doc) {
      res.status(404).json({ message: `${type} record not found.` });
      return;
    }

    res.json({ businessType: type, data: doc });
  } catch (error) {
    if (!handleError(error, res)) next(error);
  }
});

router.delete("/:type/:id", async (req, res, next) => {
  try {
    const type = normalizeBusinessType(req.params.type);
    if (!isValidBusinessType(type)) {
      res.status(400).json({ message: `Invalid business type: ${type}.` });
      return;
    }

    const Model = getBusinessModel(type);
    if (!Model) {
      res.status(500).json({ message: "Business model not found." });
      return;
    }

    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404).json({ message: `${type} record not found.` });
      return;
    }

    res.json({ message: `${type} record deleted successfully.` });
  } catch (error) {
    if (!handleError(error, res)) next(error);
  }
});

export default router;
