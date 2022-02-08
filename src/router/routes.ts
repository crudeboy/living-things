const routes = {
  home: {
    path: '/'
  },
  examples: {
    path: '/examples',
    label: 'Examples',
    create: {
      path: '/examples/create',
      label: 'Create examples'
    },
    edit: {
      path: '/examples/:id',
      label: 'Edit example'
    }
  }
};

export default routes;
