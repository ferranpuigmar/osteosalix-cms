import { Core } from '@strapi/strapi';
import path from 'node:path';
import type { SeederResult } from '../lib';
import { uploadImage } from '../lib';

const UID = 'api::home.home' as const;

const BG_PATH = path.join(process.cwd(), 'src', 'seed', 'images', 'hero-bg.jpg');
const HERO_PATH = path.join(process.cwd(), 'src', 'seed', 'images', 'hero-image.jpg');
const CENTER_IMG_PATH = path.join(process.cwd(), 'src', 'seed', 'images', 'center-image.jpg');
const CENTER_IMG2_PATH = path.join(process.cwd(), 'src', 'seed', 'images', 'center-image2.jpg');

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findFirst();
  if (existing) return { skipped: true };

  const bgImageId = await uploadImage(strapi, BG_PATH, {
    originalFilename: 'hero-bg.jpg',
  });

  const heroImageId = await uploadImage(strapi, HERO_PATH, {
    originalFilename: 'hero-image.jpg',
  });

  const centerImageId = await uploadImage(strapi, CENTER_IMG_PATH, {
    originalFilename: 'center-image.jpg',
  });

  const centerImage2Id = await uploadImage(strapi, CENTER_IMG2_PATH, {
    originalFilename: 'center-image2.jpg',
  });

  await strapi.documents(UID).create({
    data: {
      heroSection: [{
        badge: 'Osteopatía y fisioterapia en Sant Cugat y Terrassa',
        title: 'Cuidamos de ti de forma integral',
        description: 'Un espacio dedicado a tu salud donde combinamos técnicas manuales y un enfoque holístico para devolverte el equilibrio que necesitas.',
        bgImage: bgImageId,
        heroImage: heroImageId,
      }],
      center: [{
        label: 'Sobre nosotros',
        title: '<h2><strong>Un enfoque diferente<br />para tu bienestar</strong></h2>',
        content: '<p>Desde 2018, en Osteosalix combinamos experiencia y formación continua para ofrecerte el mejor tratamiento. Creemos en la capacidad natural del cuerpo para sanarse cuando se le dan las condiciones adecuadas.</p>',
        values: [
          { title: 'Trato cercano', icon: 'heart' },
          { title: 'Profesionales', icon: 'shield-check' },
        ],
        button: {
          title: 'Contactar',
          link: '#contactar',
        },
        image: centerImageId,
        image2: centerImage2Id,
      }],
    },
  });

  return { skipped: false };
}
