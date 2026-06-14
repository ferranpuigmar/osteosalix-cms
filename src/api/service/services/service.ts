import { Core } from '@strapi/strapi';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcome() {
    return 'Welcome to Strapi 🚀';
  },
});

export default service;
