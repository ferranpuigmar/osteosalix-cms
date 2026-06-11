import { Core } from '@strapi/strapi';

export default {
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.NODE_ENV !== 'development') return;

    try {
      const { seed } = await import('./seed');
      await seed(strapi);
    } catch (err) {
      console.error('[seed] Error during seed:', err);
    }
  },
};
