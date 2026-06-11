export default {
  find: async (ctx) => {
    try {
      const data = await strapi.documents('api::navigation.navigation').findFirst({
        populate: {
          items: {
            populate: ['submenuItem'],
          },
        },
      });
      return { data };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  update: async (ctx) => {
    try {
      const doc = await strapi.documents('api::navigation.navigation').findFirst();

      let data;
      if (!doc) {
        data = await strapi.documents('api::navigation.navigation').create({
          data: ctx.request.body,
        });
      } else {
        data = await strapi.documents('api::navigation.navigation').update({
          documentId: doc.documentId,
          data: ctx.request.body,
        });
      }

      return { data };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
