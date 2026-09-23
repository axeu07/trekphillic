export const imageAccept = "image/jpeg,image/png,image/webp";
export const maxImageSizeBytes = 5 * 1024 * 1024;

export interface ImageUploadProvider {
  uploadImage(file: File, options: UploadImageOptions): Promise<UploadedImage>;
  uploadImages(files: File[], options: UploadImageOptions): Promise<UploadedImage[]>;
}

export interface UploadedImage {
  secureUrl: string;
  publicId: string;
}

export interface UploadImageOptions {
  slug: string;
  kind: "cover" | "gallery";
  signal?: AbortSignal;
}

export interface LocalImagePreview {
  id: string;
  url: string;
  name: string;
  size: number;
  file: File;
  status?: "uploading" | "failed";
  error?: string;
}

const supportedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const supportedImageExtensions = /\.(jpe?g|png|webp)$/i;

export function validateImageFile(file: File) {
  if (!supportedImageTypes.has(file.type) && !supportedImageExtensions.test(file.name)) return "Image must be JPG, PNG, or WEBP.";
  if (file.size > maxImageSizeBytes) return "Image is too large. Maximum size is 5 MB.";
  return undefined;
}

export function createLocalImagePreview(file: File): LocalImagePreview {
  return { id: `${file.name}-${file.lastModified}-${file.size}`, url: URL.createObjectURL(file), name: file.name, size: file.size, file };
}

export function revokeLocalImagePreview(preview: LocalImagePreview) {
  URL.revokeObjectURL(preview.url);
}

interface UploadResponse {
  secureUrl?: string;
  publicId?: string;
  error?: string;
}

export async function uploadImage(file: File, options: UploadImageOptions) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("slug", options.slug);
  formData.append("kind", options.kind);
  const response = await fetch("/api/media/upload", { body: formData, method: "POST", signal: options.signal });
  let payload: UploadResponse = {};
  try { payload = await response.json(); } catch { payload = {}; }
  if (!response.ok || !payload.secureUrl || !payload.publicId) throw new Error(payload.error ?? "The image could not be uploaded.");
  return { publicId: payload.publicId, secureUrl: payload.secureUrl };
}

export async function uploadImages(files: File[], options: UploadImageOptions) {
  return Promise.all(files.map((file) => uploadImage(file, options)));
}