import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
    region: 'ap-south-1', credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

const bucketName = `weave-chatapp`;

export const getObjectUrl = async (key) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
};

export const getUploadUrl = async (filename, contentType) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `profileImages/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client, command);
    return { url, contentType };
};

export const deleteObject = async (filename) => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: `profileImages/${filename}`,
    });
    await s3Client.send(command);
    return true;
};