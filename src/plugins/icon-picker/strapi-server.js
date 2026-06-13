module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: 'icon-picker',
      plugin: 'icon-picker',
      type: 'string',
    });
  },
};
