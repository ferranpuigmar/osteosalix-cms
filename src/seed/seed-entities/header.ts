import { Core } from '@strapi/strapi';
import path from 'node:path';
import type { SeederResult } from '../lib';
import { uploadImage } from '../lib';

const UID = 'api::header.header' as const;

const LOGO_PATH = path.join(process.cwd(), 'src', 'seed', 'images', 'logo-icon.svg');

export async function seed(
  strapi: Core.Strapi,
  deps: { navigationDocumentId: string },
): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findFirst();
  if (existing) return { skipped: true };

  const logoId = await uploadImage(strapi, LOGO_PATH, {
    originalFilename: 'logo-icon.svg',
    mimetype: 'image/svg+xml',
  });

  await strapi.documents(UID).create({
    data: {
      logo: logoId,
      logoTextStart: 'osteo',
      logoTextEnd: 'salix',
      whatsappNumber: '615 026 425',
      navigation: { documentId: deps.navigationDocumentId },
    },
  });

  return { skipped: false };
}
