import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  name: string;
  imageUrl?: string | null;
  passwordHash?: string | null;
  googleId?: string | null;
  active: boolean;
  lastLoginAt?: Date | null;
  roleIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: null },
    passwordHash: { type: String, default: null },
    googleId: { type: String, default: null },
    active: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date, default: null, index: true },
    roleIds: [{ type: Schema.Types.ObjectId, ref: "Role" }]
  },
  { timestamps: true }
);

export interface IRole extends Document {
  name: string;
  description?: string | null;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    permissions: { type: [String], default: [] }
  },
  { timestamps: true }
);

export interface IAuditLog extends Document {
  adminId?: mongoose.Types.ObjectId | null;
  action: string;
  entity: string;
  entityId?: string | null;
  summary: string;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: String, default: null },
    summary: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ adminId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ entity: 1, entityId: 1 });

export interface ISettings extends Document {
  key: string;
  label: string;
  scope: string;
  division: string;
  value: Record<string, unknown>;
  updatedById?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    scope: { type: String, default: "global" },
    division: { type: String, default: "ractysh-group" },
    value: { type: Schema.Types.Mixed, default: {} },
    updatedById: { type: Schema.Types.ObjectId, ref: "Admin", default: null }
  },
  { timestamps: true }
);

settingsSchema.index({ scope: 1 });
settingsSchema.index({ division: 1 });

export interface INotification extends Document {
  adminId?: mongoose.Types.ObjectId | null;
  dedupeKey: string;
  title: string;
  message: string;
  project: string;
  division: string;
  priority: string;
  status: string;
  entity?: string | null;
  entityId?: string | null;
  actionUrl?: string | null;
  metadata?: Record<string, unknown> | null;
  readAt?: Date | null;
  archivedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    dedupeKey: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    project: { type: String, default: "group" },
    division: { type: String, default: "ractysh-group" },
    priority: { type: String, default: "medium" },
    status: { type: String, default: "unread", index: true },
    entity: { type: String, default: null },
    entityId: { type: String, default: null },
    actionUrl: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed },
    readAt: { type: Date, default: null },
    archivedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

notificationSchema.index({ adminId: 1, status: 1, createdAt: -1 });
notificationSchema.index({ project: 1, status: 1, createdAt: -1 });
notificationSchema.index({ division: 1, status: 1, createdAt: -1 });
notificationSchema.index({ priority: 1, createdAt: -1 });

export const AdminModel = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
export const RoleModel = mongoose.models.Role || mongoose.model<IRole>("Role", roleSchema);
export const AuditLogModel = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
export const SettingsModel = mongoose.models.Settings || mongoose.model<ISettings>("Settings", settingsSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model<INotification>("Notification", notificationSchema);
