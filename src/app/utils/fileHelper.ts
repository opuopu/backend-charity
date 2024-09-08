/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import config from '../config';

import httpStatus from 'http-status';
import AppError from '../error/AppError';
import { s3Client } from './s3';

//upload a single file
export const uploadToS3 = async (file: any, fileName: string) => {
  const data = new PutObjectCommand({
    Bucket: config.aws.bucket,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  try {
    const key = await s3Client.send(data);
    const uniqueNumber = parseInt(
      (
        Date.now().toString() + Math.floor(Math.random() * 10000).toString()
      ).slice(-8),
      10,
    );
    const uniqueFileName = `${fileName}${uniqueNumber}-${file.originalname}`;
    if (!key) {
      throw new AppError(httpStatus.BAD_REQUEST, 'File Upload failed!');
    }
    const url = `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${uniqueFileName}`;
    return { id: uniqueFileName, url };
  } catch (error) {
    throw new Error(error as any);
  }
};

// delete file from s3 bucket
export const deleteFromS3 = async (key: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: config.aws.bucket,
      Key: key,
    });
    await s3Client.send(command);
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 's3 file delete failed');
  }
};

// upload multiple files

export const uploadManyToS3 = async (
  files: {
    file: any;
    path: string;
    key?: string;
  }[],
): Promise<{ url: string; key: string }[]> => {
  try {
    const uploadPromises = files.map(async ({ file, path, key }) => {
      const newFileName = key
        ? key
        : `${Math.floor(100000 + Math.random() * 900000)}${Date.now()}`;

      const fileKey = `${path}/${newFileName}`;
      const command = new PutObjectCommand({
        Bucket: config.aws.bucket as string,
        Key: fileKey,
        Body: file?.buffer,
      });

      await s3Client.send(command);

      const url = `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${fileKey}`;
      return { url, key: newFileName };
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    throw new Error('File Upload failed');
  }
};

// delete many file
export const deleteManyFromS3 = async (keys: string[]) => {
  try {
    const deleteParams = {
      Bucket: config.aws.bucket,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: false,
      },
    };

    const command = new DeleteObjectsCommand(deleteParams);
    await s3Client.send(command);
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'S3 file delete failed');
  }
};