import { NextResponse } from "next/server";
import { CloudinaryConfigurationError, uploadImageToCloudinary } from "@/lib/media/cloudinary";
import { validateImageFile } from "@/lib/media/upload";

export const runtime = "nodejs";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const mediaKinds = new Set(["cover", "gallery"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const fileEntry = formData.get("file");
    const slugEntry = formData.get("slug");
    const kindEntry = formData.get("kind");

    if (!(fileEntry instanceof File)) return NextResponse.json({ error: "An image file is required." }, { status: 400 });
    if (typeof slugEntry !== "string" || !slugPattern.test(slugEntry)) return NextResponse.json({ error: "A valid trek slug is required." }, { status: 400 });
    if (typeof kindEntry !== "string" || !mediaKinds.has(kindEntry)) return NextResponse.json({ error: "A valid media kind is required." }, { status: 400 });

    const validationError = validateImageFile(fileEntry);
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const result = await uploadImageToCloudinary(fileEntry, `trekphillic/treks/${slugEntry}/${kindEntry}`);
    return NextResponse.json({ publicId: result.public_id, secureUrl: result.secure_url });
  } catch (error) {
    if (error instanceof CloudinaryConfigurationError) return NextResponse.json({ error: "Cloudinary uploads are not configured yet." }, { status: 503 });
    return NextResponse.json({ error: "The image could not be uploaded. Please try again." }, { status: 502 });
  }
}