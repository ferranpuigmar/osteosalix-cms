export default {
  find: async (ctx) => {
    try {
      const data = await strapi.documents('api::header.header').findFirst({
        populate: {
          logo: true,
          navigation: {
            populate: {
              items: {
                populate: ['submenuItem'],
              },
            },
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
      const doc = await strapi.documents('api::header.header').findFirst();

      let data;
      if (!doc) {
        data = await strapi.documents('api::header.header').create({
          data: ctx.request.body,
        });
      } else {
        data = await strapi.documents('api::header.header').update({
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
