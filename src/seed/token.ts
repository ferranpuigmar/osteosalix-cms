import type { Core } from '@strapi/strapi';
import type { SeederResult } from './lib';

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const tokenService = strapi.service('admin::api-token');
  if (!tokenService) {
    console.log('[seed] token — api-token service not available, skipping');
    return { skipped: true };
  }

  const existing = await tokenService.getByName('Osteosalix Astro');
  if (existing) return { skipped: true };

  const token = await tokenService.create({
    name: 'Osteosalix Astro',
    description: 'Token for osteosalix-astro GraphQL access',
    type: 'full-access',
    lifespan: null,
  });

  console.log(`[seed] token — created (value: ${token.accessKey})`);
  return { skipped: false };
}

