import { Core } from '@strapi/strapi';

export default {
  routes: [
    {
      method: 'GET',
      path: '/services',
      handler: 'service.index',
      config: {
        auth: false,
      },
    },
  ],
};
