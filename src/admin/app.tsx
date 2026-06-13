import { getPluginPresets } from '@_sh/strapi-plugin-ckeditor';
import { Plugin } from 'ckeditor5';
import type { StrapiApp } from '@strapi/strapi/admin';

class PegaTextoLimpio extends Plugin {
  static get pluginName() {
    return 'PegaTextoLimpio';
  }

  init() {
    const editor = this.editor;

    editor.plugins.get('ClipboardPipeline').on(
      'inputTransformation',
      (_evt, data) => {
        const plainText = data.dataTransfer.getData('text/plain');
        if (!plainText) return;
        const html = plainText
          .split('\n')
          .filter((line) => line.trim() !== '')
          .join('<br />');
        data.content = editor.data.processor.toView(`<p>${html || '&nbsp;'}</p>`);
      }
    );
  }
}

export default {
  config: {
    locales: ['es'],
  },
  register() {
    const presets = getPluginPresets();

    presets.defaultHtml.editorConfig = {
      ...presets.defaultHtml.editorConfig,
      plugins: [
        ...presets.defaultHtml.editorConfig.plugins,
        PegaTextoLimpio,
      ],
      toolbar: presets.defaultHtml.editorConfig.toolbar.filter(
        (item: any) => item !== 'sourceEditing'
      ),
    };
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
