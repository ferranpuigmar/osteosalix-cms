import { Core } from '@strapi/strapi';

const controller = {
  index(ctx: any) {
    ctx.body = 'ok';
  },
};

export default strapi => {
  return controller;
};
