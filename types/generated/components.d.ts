import type { Schema, Struct } from '@strapi/strapi';

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
      'navigation.menu-group': NavigationMenuGroup;
      'navigation.menu-item': NavigationMenuItem;
    }
  }
}
