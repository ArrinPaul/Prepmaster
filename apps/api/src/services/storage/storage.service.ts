import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private config: ConfigService) {
    this.bucketName = config.get('S3_BUCKET', 'preppath-audio');

    this.s3Client = new S3Client({
      endpoint: config.get('S3_ENDPOINT', 'http://localhost:9000'),
      region: config.get('S3_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: config.get('S3_ACCESS_KEY_ID', 'minioadmin'),
        secretAccessKey: config.get('S3_SECRET_ACCESS_KEY', 'minioadmin123456'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<{
    url: string;
    key: string;
    size: number;
  }> {
    const fileHash = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);
    const key = `${folder}/${Date.now()}-${fileHash}${ext}`;

    this.logger.log(`Uploading file to S3: ${key}`);

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          Metadata: {
            originalName: file.originalname,
            uploadedAt: new Date().toISOString(),
          },
        }),
      );

      const url = `${this.config.get('S3_ENDPOINT')}/${this.bucketName}/${key}`;

      this.logger.log(`File uploaded successfully: ${key}`);

      return {
        url,
        key,
        size: file.size,
      };
    } catch (error) {
      this.logger.error('File upload failed:', error);
      throw new Error('Failed to upload file');
    }
  }

  async uploadBuffer(
    buffer: Buffer,
    filename: string,
    mimetype: string,
    folder: string = 'generated',
  ): Promise<{
    url: string;
    key: string;
    size: number;
  }> {
    const fileHash = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(filename);
    const key = `${folder}/${Date.now()}-${fileHash}${ext}`;

    this.logger.log(`Uploading buffer to S3: ${key}`);

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: buffer,
          ContentType: mimetype,
        }),
      );

      const url = `${this.config.get('S3_ENDPOINT')}/${this.bucketName}/${key}`;

      return {
        url,
        key,
        size: buffer.length,
      };
    } catch (error) {
      this.logger.error('Buffer upload failed:', error);
      throw new Error('Failed to upload buffer');
    }
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async deleteFile(key: string): Promise<void> {
    this.logger.log(`Deleting file from S3: ${key}`);

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );

      this.logger.log(`File deleted successfully: ${key}`);
    } catch (error) {
      this.logger.error('File deletion failed:', error);
      throw new Error('Failed to delete file');
    }
  }
}
