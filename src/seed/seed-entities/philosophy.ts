import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::philosophy.philosophy' as const;

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findMany();
  if (existing.length > 0) return { skipped: true, documentId: existing[0].documentId };

  const result = await strapi.documents(UID).create({
    data: {
      title: 'Nuestra filosofía',
      description: 'Creemos en un abordaje donde el cuerpo es un todo. Escuchamos, observamos y tratamos la causa, no solo el síntoma. Cada persona es única y merece un plan personalizado que respete su ritmo y su historia.',
      philosophyItems: [
        { icon: 'lucide:circle-check', text: 'Visión holística' },
        { icon: 'lucide:circle-check', text: 'Trato personalizado' },
        { icon: 'lucide:circle-check', text: 'Escucha activa' },
      ],
    },
  });

  await strapi.documents(UID).publish({ documentId: result.documentId });

  return { skipped: false, documentId: result.documentId };
}
