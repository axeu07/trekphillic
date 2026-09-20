import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export class CloudinaryConfigurationError extends Error {}

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) throw new CloudinaryConfigurationError("Cloudinary is not configured.");

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
}

export async function uploadImageToCloudinary(file: File, folder: string) {
  configureCloudinary();
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
      if (error || !result) { reject(new Error("Cloudinary did not return an uploaded image.")); return; }
      resolve(result);
    });
    stream.end(buffer);
  });
}