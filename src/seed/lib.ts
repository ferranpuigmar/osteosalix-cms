import { Core } from '@strapi/strapi';
import fs from 'node:fs';
import path from 'node:path';

export type SeederResult = {
  documentId?: string;
  skipped: boolean;
};

export type Seeder = (strapi: Core.Strapi) => Promise<SeederResult>;

const MIME_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

function inferMimeType(filePath: string): string {
  return MIME_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

export async function uploadImage(
  strapi: Core.Strapi,
  filePath: string,
  options?: { originalFilename?: string; mimetype?: string },
): Promise<number> {
  const uploadService = strapi.plugin('upload').service('upload');
  const [file] = await uploadService.upload({
    data: {},
    files: {
      originalFilename: options?.originalFilename ?? path.basename(filePath),
      mimetype: options?.mimetype ?? inferMimeType(filePath),
      size: fs.statSync(filePath).size,
      filepath: filePath,
    },
  });
  return file.id;
}
