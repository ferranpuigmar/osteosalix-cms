export default {
  find: async (ctx) => {
    try {
      const data = await strapi.documents('api::home.home').findFirst({
        populate: {
          heroSection: {
            populate: ['bgImage', 'heroImage'],
          },
          center: {
            populate: ['button', 'image', 'image2', 'values'],
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
      const doc = await strapi.documents('api::home.home').findFirst();

      let data;
      if (!doc) {
        data = await strapi.documents('api::home.home').create({
          data: ctx.request.body,
        });
      } else {
        data = await strapi.documents('api::home.home').update({
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
