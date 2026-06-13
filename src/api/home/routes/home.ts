export default {
  routes: [
    {
      method: 'GET',
      path: '/home',
      handler: 'home.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/home',
      handler: 'home.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
