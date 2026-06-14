import { Core } from '@strapi/strapi';
import { seed as seedMethod } from './seed-entities/method';
import { seed as seedNavigation } from './seed-entities/navigation';
import { seed as seedHeader } from './seed-entities/header';
import { seed as seedServices } from './seed-entities/services';
import { seed as seedHome } from './seed-entities/home';
import { seed as seedToken } from './token';

export async function seed(strapi: Core.Strapi): Promise<void> {
  const method = await seedMethod(strapi);
  console.log(`[seed] method — ${method.skipped ? 'already exists, skipped' : 'created'}`);

  const nav = await seedNavigation(strapi);
  console.log(`[seed] navigation — ${nav.skipped ? 'already exists, skipped' : 'created'}`);

  const header = await seedHeader(strapi, { navigationDocumentId: nav.documentId! });
  console.log(`[seed] header — ${header.skipped ? 'already exists, skipped' : 'created'}`);

  const services = await seedServices(strapi, { methodDocumentId: method.documentId });
  console.log(`[seed] services — ${services.skipped ? 'already exist, skipped' : `${services.documentIds?.length} created`}`);

  const home = await seedHome(strapi, { serviceDocumentIds: services.documentIds });
  console.log(`[seed] home — ${home.skipped ? 'already exists, skipped' : 'created'}`);

  const token = await seedToken(strapi);
  console.log(`[seed] token — ${token.skipped ? 'already exists, skipped' : 'created'}`);
}
