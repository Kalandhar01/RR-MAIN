import mongoose, { Schema, Document } from "mongoose";

export interface IContactInquiry extends Document {
  division: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  subject?: string | null;
  message: string;
  sourcePage?: string | null;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const contactInquirySchema = new Schema<IContactInquiry>(
  {
    division: { type: String, default: "ractysh-group" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    company: { type: String, default: null },
    service: { type: String, default: null },
    subject: { type: String, default: null },
    message: { type: String, required: true },
    sourcePage: { type: String, default: null },
    status: { type: String, default: "new", index: true },
    notes: { type: String, default: null }
  },
  { timestamps: true }
);

contactInquirySchema.index({ email: 1 });
contactInquirySchema.index({ division: 1, status: 1, createdAt: -1 });
contactInquirySchema.index({ status: 1, createdAt: -1 });
contactInquirySchema.index({ createdAt: -1 });

export const ContactInquiryModel = mongoose.models.ContactInquiry || mongoose.model<IContactInquiry>("ContactInquiry", contactInquirySchema);

export interface IContactInfo extends Document {
  businessType: string;
  businessId?: mongoose.Types.ObjectId | null;
  contactName: string;
  companyName?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactInfoSchema = new Schema<IContactInfo>(
  {
    businessType: { type: String, required: true, index: true },
    businessId: { type: Schema.Types.ObjectId, refPath: "businessType", default: null },
    contactName: { type: String, required: true },
    companyName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: "India" },
    notes: { type: String }
  },
  { timestamps: true }
);

contactInfoSchema.index({ email: 1 });
contactInfoSchema.index({ businessType: 1, createdAt: -1 });
contactInfoSchema.index({ contactName: "text", email: "text", companyName: "text" });

export const ContactInfoModel = mongoose.models.ContactInfo || mongoose.model<IContactInfo>("ContactInfo", contactInfoSchema);

export interface IGeneralSubscriber extends Document {
  businessType: string;
  businessId?: mongoose.Types.ObjectId | null;
  fullName?: string;
  email: string;
  phone?: string;
  company?: string;
  status: string;
  subscribedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const generalSubscriberSchema = new Schema<IGeneralSubscriber>(
  {
    businessType: { type: String, required: true, index: true },
    businessId: { type: Schema.Types.ObjectId, refPath: "businessType", default: null },
    fullName: { type: String },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    company: { type: String },
    status: { type: String, default: "active", index: true },
    subscribedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

generalSubscriberSchema.index({ email: 1, businessType: 1 }, { unique: true });
generalSubscriberSchema.index({ businessType: 1, status: 1 });

export const GeneralSubscriberModel = mongoose.models.GeneralSubscriber || mongoose.model<IGeneralSubscriber>("GeneralSubscriber", generalSubscriberSchema);
