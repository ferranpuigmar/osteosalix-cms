import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.button': HomeButton;
      'home.center': HomeCenter;
      'home.hero-section': HomeHeroSection;
      'home.value': HomeValue;
      'navigation.menu-group': NavigationMenuGroup;
      'navigation.menu-item': NavigationMenuItem;
    }
  }
}
