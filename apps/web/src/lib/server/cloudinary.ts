import { createHash } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  error?: { message: string };
};

type CloudinaryDestroyResponse = {
  result?: string;
  error?: { message: string };
};

export type UploadResult = {
  url: string;
  publicId: string;
  provider: "cloudinary" | "local";
};

export type UploadOptions = {
  folder: string;
  fileName?: string;
};

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

function toBlob(file: Buffer | Blob): Blob {
  if (file instanceof Blob) return file;
  return new Blob([new Uint8Array(file)]);
}

function derivePublicId(fileName: string | undefined, folder: string): string {
  const base = fileName
    ? fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "-")
    : `upload-${Date.now()}`;
  return `${folder}/${base}`;
}

function signature(params: Record<string, string>, secret: string): string {
  const serialized = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(`${serialized}${secret}`).digest("hex");
}

async function uploadViaApi(
  file: Buffer | Blob,
  folder: string,
  fileName?: string
): Promise<UploadResult> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const publicId = derivePublicId(fileName, folder);

  const params: Record<string, string> = {
    folder,
    public_id: publicId,
    resource_type: "auto",
    quality: "auto:best",
    fetch_format: "auto",
    timestamp,
  };

  const sig = signature(params, apiSecret!);

  const formData = new FormData();
  formData.append("file", toBlob(file), fileName || "upload");
  formData.append("folder", folder);
  formData.append("public_id", publicId);
  formData.append("resource_type", "auto");
  formData.append("quality", "auto:best");
  formData.append("fetch_format", "auto");
  formData.append("timestamp", timestamp);
  formData.append("api_key", apiKey!);
  formData.append("signature", sig);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: "POST", body: formData, signal: controller.signal }
    );
    const data: CloudinaryUploadResponse = await res.json();

    if (!res.ok || data.error) {
      throw new Error(data.error?.message || `Cloudinary upload failed: ${res.status}`);
    }

    if (!data.secure_url) {
      throw new Error("Cloudinary did not return a secure URL");
    }

    return {
      url: data.secure_url,
      publicId: data.public_id || publicId,
      provider: "cloudinary",
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function uploadLocally(
  file: Buffer | Blob,
  folder: string,
  fileName?: string
): Promise<UploadResult> {
  const ext = fileName ? path.extname(fileName).toLowerCase() || ".bin" : ".bin";
  const baseName = fileName
    ? path.basename(fileName, ext).replace(/[^a-zA-Z0-9-]/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "file"
    : `upload-${Date.now()}`;
  const safeName = `${Date.now()}-${baseName}${ext}`;

  const relativeDir = folder.replace(/^\/+|\/+$/g, "");
  const uploadDir = path.join(process.cwd(), "public", "uploads", relativeDir);
  const uploadPath = path.join(uploadDir, safeName);

  await mkdir(uploadDir, { recursive: true });

  const buffer = file instanceof Blob ? Buffer.from(await file.arrayBuffer()) : file;
  await writeFile(uploadPath, buffer);

  return {
    url: `/uploads/${relativeDir}/${safeName}`,
    publicId: `${relativeDir}/${safeName}`,
    provider: "local",
  };
}

export async function uploadToCloudinary(
  file: Buffer | Blob,
  options: UploadOptions
): Promise<UploadResult> {
  if (!isCloudinaryConfigured) {
    return uploadLocally(file, options.folder, options.fileName);
  }

  try {
    return await uploadViaApi(file, options.folder, options.fileName);
  } catch (err) {
    console.warn("[cloudinary] API upload failed, falling back to local:", (err as Error).message);
    return uploadLocally(file, options.folder, options.fileName);
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured || !apiKey || !apiSecret || !cloudName) {
    const localPath = path.join(process.cwd(), "public", publicId);
    try {
      await unlink(localPath);
      return true;
    } catch {
      return false;
    }
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const params: Record<string, string> = {
    public_id: publicId,
    timestamp,
  };
  const sig = signature(params, apiSecret);

  const body = new URLSearchParams();
  body.set("public_id", publicId);
  body.set("timestamp", timestamp);
  body.set("api_key", apiKey);
  body.set("signature", sig);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body }
  );

  const data: CloudinaryDestroyResponse = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `Cloudinary delete failed: ${res.status}`);
  }

  return data.result === "ok";
}
