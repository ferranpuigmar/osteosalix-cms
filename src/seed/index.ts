import { Core } from '@strapi/strapi';
import { seed as seedNavigation } from './seed-entities/navigation';
import { seed as seedHeader } from './seed-entities/header';
import { seed as seedToken } from './token';

export async function seed(strapi: Core.Strapi): Promise<void> {
  const nav = await seedNavigation(strapi);
  console.log(`[seed] navigation — ${nav.skipped ? 'already exists, skipped' : 'created'}`);

  const header = await seedHeader(strapi, { navigationDocumentId: nav.documentId! });
  console.log(`[seed] header — ${header.skipped ? 'already exists, skipped' : 'created'}`);

  const token = await seedToken(strapi);
  console.log(`[seed] token — ${token.skipped ? 'already exists, skipped' : 'created'}`);
}
