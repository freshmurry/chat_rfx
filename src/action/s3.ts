"use server";
import { auth } from "@clerk/nextjs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const generatePreSignedURL = async (
  fileName: string, 
  fileType: string
  ) => {
    //Authorize users to protect your action
    const { userID } = auth ();
    if (!userID) {
      throw new Error("Unauthorized");
    }

    //Initialize S3Client instance
    const client = new S3Client ({
      region: process.env.NEXT_PUBLIC_S3_BUCKET_REGION!,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID!,
      },
    });

    if (!fileName || !fileType) {
      throw new Error("There was a problem with the file!")
    }

    const fileKey = 'users/${userID}/${Date.now()}-${fileName}';

    //PutObjectCommand: used to generate a pre-signed URL for Uploading
    const putCommand = new PutObjectCommand ({
      Key: fileKey,
      ContentType: fileType,
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    });

    // Generate pre-signed URL for PUT request
    const putUrl = await getSignedUrl(client, putCommand, {expiresIn: 60 });
    return { putUrl, fileKey};

    return "pre-signed-url";
};