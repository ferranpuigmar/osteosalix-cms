import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::method.method' as const;

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findFirst();
  if (existing) return { skipped: true };

  const result = await strapi.documents(UID).create({
    data: {
      methodSteps: [
        { num: '01', title: 'Escuchamos', description: 'Primera consulta detallada donde analizamos tu historial, hábitos y síntomas para entender el origen.' },
        { num: '02', title: 'Evaluamos', description: 'Exploración manual completa para identificar las restricciones de movilidad y las zonas de tensión.' },
        { num: '03', title: 'Tratamos', description: 'Técnicas manuales específicas y personalizadas para restaurar el equilibrio natural de tu cuerpo.' },
        { num: '04', title: 'Acompañamos', description: 'Seguimiento con pautas y ejercicios para mantener los resultados y prevenir recaídas.' },
      ],
    },
  });

  await strapi.documents(UID).publish({ documentId: result.documentId });

  return { skipped: false, documentId: result.documentId };
}
