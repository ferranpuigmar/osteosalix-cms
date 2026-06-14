import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::center.center' as const;

interface CenterData {
  name: string;
  subtitle: string;
  slug: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

const CENTERS: CenterData[] = [
  {
    name: 'Centro Sant Cugat',
    subtitle: 'Tu centro de osteopatía y fisioterapia de referencia en Sant Cugat del Vallès',
    slug: 'centro-sant-cugat',
    lat: 41.464138,
    lng: 2.087106,
    address: 'Avinguda de Gràcia, 74<br />08172 Sant Cugat',
    phone: '674 036 435',
    hours: 'Lun - Vie: 9:00 - 20:00',
    services: [],
  },
  {
    name: 'Centro Terrassa',
    subtitle: 'Tu centro de osteopatía y fisioterapia de referencia en Terrassa',
    slug: 'centro-terrassa',
    lat: 41.561,
    lng: 2.0105,
    address: 'Carrer del Teatre, 52<br />08221 Terrassa',
    phone: '674 036 435',
    hours: 'Lun - Vie: 9:00 - 20:00',
    services: [],
  },
];

export async function seed(strapi: Core.Strapi, { serviceDocumentIds }: { serviceDocumentIds?: string[] } = {}): Promise<SeederResult & { documentIds?: string[] }> {
  const existing = await strapi.documents(UID).findMany();
  if (existing.length > 0) return { skipped: true, documentIds: existing.map((c: any) => c.documentId) };

  const documentIds: string[] = [];

  const santCugatServices = serviceDocumentIds ?? [];
  const terrassaServices = serviceDocumentIds ? [serviceDocumentIds[0], serviceDocumentIds[1]] : [];

  const centersWithServices = [
    { ...CENTERS[0], services: santCugatServices },
    { ...CENTERS[1], services: terrassaServices },
  ];

  for (const centerData of centersWithServices) {
    const result = await strapi.documents(UID).create({
      data: {
        ...centerData,
      },
    });
    await strapi.documents(UID).publish({ documentId: result.documentId });
    documentIds.push(result.documentId);
  }

  return { skipped: false, documentIds };
}
