import { Router } from "express";
import {
  RactyshGroupModel,
  ArchitectureModel,
  ConstructionModel,
  OtcExchangeModel,
  RealEstateModel,
  ImportExportModel
} from "../models/BusinessCollections.js";
import { GeneralSubscriberModel, ContactInfoModel } from "../models/ContactInquiry.js";

const router = Router();

router.get("/all-businesses", async (_req, res, next) => {
  try {
    const [
      ractyshGroups,
      architectures,
      constructions,
      otcExchanges,
      realEstates,
      importExports,
      subscribers,
      contactInfos
    ] = await Promise.all([
      RactyshGroupModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      ArchitectureModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      ConstructionModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      OtcExchangeModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      RealEstateModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      ImportExportModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      GeneralSubscriberModel.find().sort({ createdAt: -1 }).limit(50).lean(),
      ContactInfoModel.find().sort({ createdAt: -1 }).limit(50).lean()
    ]);

    res.json({
      ractyshGroups,
      architectures,
      constructions,
      otcExchanges,
      realEstates,
      importExports,
      subscribers,
      contactInfos
    });
  } catch (error) {
    next(error);
  }
});

router.get("/stats", async (_req, res, next) => {
  try {
    const [
      ractyshGroupCount,
      architectureCount,
      constructionCount,
      otcExchangeCount,
      realEstateCount,
      importExportCount,
      subscriberCount,
      contactInfoCount
    ] = await Promise.all([
      RactyshGroupModel.countDocuments(),
      ArchitectureModel.countDocuments(),
      ConstructionModel.countDocuments(),
      OtcExchangeModel.countDocuments(),
      RealEstateModel.countDocuments(),
      ImportExportModel.countDocuments(),
      GeneralSubscriberModel.countDocuments(),
      ContactInfoModel.countDocuments()
    ]);

    res.json({
      counts: {
        ractyshGroups: ractyshGroupCount,
        architectures: architectureCount,
        constructions: constructionCount,
        otcExchanges: otcExchangeCount,
        realEstates: realEstateCount,
        importExports: importExportCount,
        subscribers: subscriberCount,
        contactInfos: contactInfoCount
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
