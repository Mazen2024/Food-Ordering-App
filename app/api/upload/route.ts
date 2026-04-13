import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

/// Define Type For FormData File
type FormDataFile = Blob & {
  name?: string;
};

//// API EndPoint To Upload Image To Cloudinary
export async function POST(request: Request) {
  try {
    /// Fetch Form Data From Request
    const formData = await request.formData();

    /// Fetch File Image
    const file = formData.get("image") as FormDataFile | null;

    /// Fetch Cloudinary PathName
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json({ error: "No File Provided" }, { status: 400 });
    }

    //// Convert To Buffer Or base 64

    const fileBuffer = await file.arrayBuffer();

    //// Convert Buffer To Base64
    const fileBase64 = Buffer.from(fileBuffer).toString("base64");

    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${fileBase64}`,
      {
        folder: pathName,
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      },
    );
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.log("Error Uploaing File To Cloudinary", error);
    return NextResponse.json(
      { error: "failed To Upload Image" },
      { status: 500 },
    );
  }
}
