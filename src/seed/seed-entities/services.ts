import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::service.service' as const;

interface ServiceData {
  title: string;
  description: string;
  slug: string;
  order?: number;
  descriptionHtml?: string;
  treatments?: { icon: string; title: string; description: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
  method?: string;
}

const SERVICES: ServiceData[] = [
  {
    title: 'Osteopatía',
    description: 'Tratamiento integral que restablece el equilibrio del cuerpo.',
    slug: 'osteopatia',
    order: 1,
    descriptionHtml: 'Tratamiento manual integral que <strong>restablece</strong> el equilibrio natural del cuerpo, buscando el origen del problema y no solo los síntomas.',
    treatments: [
      { icon: 'activity', title: 'Dolor de espalda', description: 'Cervicalgias, lumbalgias, hernias discales y contracturas crónicas.' },
      { icon: 'heart-pulse', title: 'Migrañas', description: 'Cefaleas tensionales, migrañas crónicas y dolor orofacial.' },
      { icon: 'flower-2', title: 'Salud femenina', description: 'Dolor menstrual, preparación al parto y recuperación postparto.' },
      { icon: 'bone', title: 'Lesiones deportivas', description: 'Esguinces, tendinitis, fascitis plantar y recuperación post-lesión.' },
      { icon: 'shield-check', title: 'Estrés y ansiedad', description: 'Tensión muscular, insomnio, bruxismo y somatizaciones.' },
      { icon: 'baby', title: 'Pediatría', description: 'Cólicos, tortícolis congénita, plagiocefalia y alteraciones del sueño.' },
    ],
    ctaTitle: '¿Te identificas con alguna de estas dolencias?',
    ctaDescription: 'Cuéntanos tu caso y te orientaremos sin compromiso.',
  },
  {
    title: 'Fisioterapia',
    description: 'Rehabilitación y terapia física para recuperar tu movilidad.',
    slug: 'fisioterapia',
    order: 2,
    descriptionHtml: 'Tratamiento manual integral que restablece el equilibrio natural del cuerpo, buscando el origen del problema y no solo los síntomas.',
    treatments: [
      { icon: 'activity', title: 'Dolor de espalda', description: 'Cervicalgias, lumbalgias, hernias discales y contracturas crónicas.' },
      { icon: 'heart-pulse', title: 'Migrañas', description: 'Cefaleas tensionales, migrañas crónicas y dolor orofacial.' },
      { icon: 'flower-2', title: 'Salud femenina', description: 'Dolor menstrual, preparación al parto y recuperación postparto.' },
      { icon: 'bone', title: 'Lesiones deportivas', description: 'Esguinces, tendinitis, fascitis plantar y recuperación post-lesión.' },
      { icon: 'shield-check', title: 'Estrés y ansiedad', description: 'Tensión muscular, insomnio, bruxismo y somatizaciones.' },
      { icon: 'baby', title: 'Pediatría', description: 'Cólicos, tortícolis congénita, plagiocefalia y alteraciones del sueño.' },
    ],
    ctaTitle: '¿Te identificas con alguna de estas dolencias?',
    ctaDescription: 'Cuéntanos tu caso y te orientaremos sin compromiso.',
  },
  {
    title: 'Osteopatía pediátrica',
    description: 'Cuidado especializado para bebés y niños con técnicas suaves.',
    slug: 'osteopatia-pediatrica',
    order: 3,
    descriptionHtml: 'Tratamiento manual integral que restablece el equilibrio natural del cuerpo, buscando el origen del problema y no solo los síntomas.',
    treatments: [
      { icon: 'activity', title: 'Dolor de espalda', description: 'Cervicalgias, lumbalgias, hernias discales y contracturas crónicas.' },
      { icon: 'heart-pulse', title: 'Migrañas', description: 'Cefaleas tensionales, migrañas crónicas y dolor orofacial.' },
      { icon: 'flower-2', title: 'Salud femenina', description: 'Dolor menstrual, preparación al parto y recuperación postparto.' },
      { icon: 'bone', title: 'Lesiones deportivas', description: 'Esguinces, tendinitis, fascitis plantar y recuperación post-lesión.' },
      { icon: 'shield-check', title: 'Estrés y ansiedad', description: 'Tensión muscular, insomnio, bruxismo y somatizaciones.' },
      { icon: 'baby', title: 'Pediatría', description: 'Cólicos, tortícolis congénita, plagiocefalia y alteraciones del sueño.' },
    ],
    ctaTitle: '¿Te identificas con alguna de estas dolencias?',
    ctaDescription: 'Cuéntanos tu caso y te orientaremos sin compromiso.',
  },
  {
    title: 'Osteopatía ginecológica',
    description: 'Especialidad enfocada en la salud femenina y bienestar pélvico.',
    slug: 'osteopatia-ginecologica',
    order: 4,
    descriptionHtml: 'Tratamiento manual integral que restablece el equilibrio natural del cuerpo, buscando el origen del problema y no solo los síntomas.',
    treatments: [
      { icon: 'activity', title: 'Dolor de espalda', description: 'Cervicalgias, lumbalgias, hernias discales y contracturas crónicas.' },
      { icon: 'heart-pulse', title: 'Migrañas', description: 'Cefaleas tensionales, migrañas crónicas y dolor orofacial.' },
      { icon: 'flower-2', title: 'Salud femenina', description: 'Dolor menstrual, preparación al parto y recuperación postparto.' },
      { icon: 'bone', title: 'Lesiones deportivas', description: 'Esguinces, tendinitis, fascitis plantar y recuperación post-lesión.' },
      { icon: 'shield-check', title: 'Estrés y ansiedad', description: 'Tensión muscular, insomnio, bruxismo y somatizaciones.' },
      { icon: 'baby', title: 'Pediatría', description: 'Cólicos, tortícolis congénita, plagiocefalia y alteraciones del sueño.' },
    ],
    ctaTitle: '¿Te identificas con alguna de estas dolencias?',
    ctaDescription: 'Cuéntanos tu caso y te orientaremos sin compromiso.',
  },
];

export async function seed(strapi: Core.Strapi, { methodDocumentId }: { methodDocumentId?: string } = {}): Promise<SeederResult & { documentIds?: string[] }> {
  const existing = await strapi.documents(UID).findMany();
  if (existing.length > 0) return { skipped: true, documentIds: existing.map((s: any) => s.documentId) };

  const documentIds: string[] = [];

  for (const serviceData of SERVICES) {
    const result = await strapi.documents(UID).create({
      data: {
        title: serviceData.title,
        description: serviceData.description,
        slug: serviceData.slug,
        order: serviceData.order,
        descriptionHtml: serviceData.descriptionHtml,
        treatments: serviceData.treatments,
        ctaTitle: serviceData.ctaTitle,
        ctaDescription: serviceData.ctaDescription,
        method: methodDocumentId,
      },
    });
    await strapi.documents(UID).publish({ documentId: result.documentId });
    documentIds.push(result.documentId);
  }

  return { skipped: false, documentIds };
}
