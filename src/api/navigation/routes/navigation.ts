export default {
  routes: [
    {
      method: 'GET',
      path: '/navigation',
      handler: 'navigation.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/navigation',
      handler: 'navigation.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
