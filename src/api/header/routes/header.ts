export default {
  routes: [
    {
      method: 'GET',
      path: '/header',
      handler: 'header.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/header',
      handler: 'header.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
