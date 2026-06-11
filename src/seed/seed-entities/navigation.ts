import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::navigation.navigation' as const;

const DATA = {
  title: 'Main Navigation',
  items: [
    {
      __component: 'navigation.menu-group' as const,
      title: 'El centro',
      link: '/#el-centro',
    },
    {
      __component: 'navigation.menu-group' as const,
      title: 'Servicios',
      link: '',
      submenuItem: [
        { __component: 'navigation.menu-item' as const, title: 'Osteopatía', link: '/servicios/osteopatia' },
        { __component: 'navigation.menu-item' as const, title: 'Osteopatía Ginecológica', link: '/servicios/osteopatia-ginecologica' },
        { __component: 'navigation.menu-item' as const, title: 'Osteopatía Pediátrica', link: '/servicios/osteopatia-pediatrica' },
        { __component: 'navigation.menu-item' as const, title: 'Fisioterapia', link: '/servicios/fisioterapia' },
      ],
    },
    {
      __component: 'navigation.menu-group' as const,
      title: 'Dónde estamos',
      link: '/#donde-estamos',
    },
  ],
};

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findFirst();
  if (existing) return { documentId: existing.documentId, skipped: true };

  const doc = await strapi.documents(UID).create({ data: DATA });
  return { documentId: doc.documentId, skipped: false };
}
