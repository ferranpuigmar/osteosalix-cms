import type { Schema, Struct } from '@strapi/strapi';

export interface ContactFormField extends Struct.ComponentSchema {
  collectionName: 'components_contact_form_fields';
  info: {
    displayName: 'Form Field';
    icon: 'input';
  };
  attributes: {
    field: Schema.Attribute.Enumeration<['name', 'email', 'phone', 'message']> &
      Schema.Attribute.Required;
    formatError: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String & Schema.Attribute.Required;
    requiredError: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['text', 'email', 'phone', 'textarea']>;
  };
}

export interface HomeButton extends Struct.ComponentSchema {
  collectionName: 'components_home_buttons';
  info: {
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeCenter extends Struct.ComponentSchema {
  collectionName: 'components_home_centers';
  info: {
    displayName: 'Center';
    icon: 'house';
  };
  attributes: {
    button: Schema.Attribute.Component<'home.button', false> &
      Schema.Attribute.Required;
    content: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    image2: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    values: Schema.Attribute.Component<'home.value', true>;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'layout';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.Required;
    bgImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomePhilosophyItem extends Struct.ComponentSchema {
  collectionName: 'components_home_philosophy_items';
  info: {
    displayName: 'Philosophy Item';
    icon: 'check';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::icon-picker.icon-picker'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeValue extends Struct.ComponentSchema {
  collectionName: 'components_home_values';
  info: {
    displayName: 'Value';
    icon: 'star';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::icon-picker.icon-picker'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMenuGroup extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_groups';
  info: {
    description: '';
    displayName: 'MenuGroup';
    icon: 'folder';
  };
  attributes: {
    link: Schema.Attribute.String;
    submenuItem: Schema.Attribute.Component<'navigation.menu-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    description: '';
    displayName: 'MenuItem';
    icon: 'bulletList';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceMethodStep extends Struct.ComponentSchema {
  collectionName: 'components_service_method_steps';
  info: {
    displayName: 'Method Step';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    num: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceTreatment extends Struct.ComponentSchema {
  collectionName: 'components_service_treatments';
  info: {
    displayName: 'Treatment';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<'plugin::icon-picker.icon-picker'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contact.form-field': ContactFormField;
      'home.button': HomeButton;
      'home.center': HomeCenter;
      'home.hero-section': HomeHeroSection;
      'home.philosophy-item': HomePhilosophyItem;
      'home.value': HomeValue;
      'navigation.menu-group': NavigationMenuGroup;
      'navigation.menu-item': NavigationMenuItem;
      'service.method-step': ServiceMethodStep;
      'service.treatment': ServiceTreatment;
    }
  }
}
