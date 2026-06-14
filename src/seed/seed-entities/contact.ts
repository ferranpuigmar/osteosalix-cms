import { Core } from '@strapi/strapi';
import type { SeederResult } from '../lib';

const UID = 'api::contact.contact' as const;

export async function seed(strapi: Core.Strapi): Promise<SeederResult> {
  const existing = await strapi.documents(UID).findFirst();
  if (existing) return { skipped: true };

  const result = await strapi.documents(UID).create({
    data: {
      subtitle: 'Contacto',
      heading: '¿Hablamos?',
      description: 'Cuéntanos tu caso y te asesoraremos sobre el mejor tratamiento para ti. Estamos aquí para ayudarte a recuperar tu bienestar.',
      phone: '615026425',
      phoneLabel: 'Teléfono',
      email: 'osteosalix@gmail.com',
      emailLabel: 'Email',
      fields: [
        { field: 'name', type: 'text', label: 'Nombre', placeholder: 'Tu nombre', requiredError: 'Este campo es requerido', formatError: '' },
        { field: 'email', type: 'email', label: 'Email', placeholder: 'tu@email.com', requiredError: 'Este campo es requerido', formatError: 'El email no es correcto' },
        { field: 'phone', type: 'phone', label: 'Teléfono', placeholder: 'Tu teléfono', requiredError: 'Este campo es requerido', formatError: 'El teléfono de contacto no es válido' },
        { field: 'message', type: 'textarea', label: 'Mensaje', placeholder: 'Cuéntanos cómo podemos ayudarte...', requiredError: '', formatError: '' },
      ],
      checkboxText: 'He leído, comprendo y acepto el {aviso_legal} y {politicas_privacidad}',
      checkboxError: 'Este campo es requerido',
      submitLabel: 'Enviar mensaje',
      submitLoadingLabel: 'Enviando...',
      successMessage: 'El mensaje se ha enviado correctamente, en breve nos pondremos en contacto contigo',
      errorMessage: 'Ha ocurrido un error, por favor, vuelve a intentarlo',
      formEndpoint: '',
    },
  });

  await strapi.documents(UID).publish({ documentId: result.documentId });

  return { skipped: false };
}
