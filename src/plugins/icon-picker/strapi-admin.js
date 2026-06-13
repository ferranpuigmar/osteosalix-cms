const PLUGIN_ID = 'icon-picker';

export default {
  register(app) {
    app.customFields.register({
      name: 'icon-picker',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: { id: `${PLUGIN_ID}.label`, defaultMessage: 'Icon Picker' },
      intlDescription: { id: `${PLUGIN_ID}.description`, defaultMessage: 'Selecciona un icono de Lucide' },
      components: {
        Input: () => import('./admin/src/components/IconPicker.jsx'),
      },
    });
  },
};
