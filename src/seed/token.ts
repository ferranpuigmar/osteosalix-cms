import type { Core } from '@strapi/strapi';
import type { SeederResult } from './lib';

const FIXED_TOKEN = '1234567890abcdef';

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const tokenService = strapi.service('admin::api-token-content-api');
  if (!tokenService) {
    console.log('[seed] token — api-token service not available, skipping');
    return { skipped: true };
  }

  const existing = await tokenService.getByName('Osteosalix Astro');
  if (existing) return { skipped: true };

  const accessKey = tokenService.hash(FIXED_TOKEN);

  await strapi.db.query('admin::api-token').create({
    data: {
      name: 'Osteosalix Astro',
      description: 'Token for osteosalix-astro GraphQL access',
      kind: 'content-api',
      type: 'full-access',
      accessKey,
      lifespan: null,
      expiresAt: null,
    },
  });

  console.log(`[seed] token — created with deterministic value`);
  return { skipped: false };
}
