import type { Core } from '@strapi/strapi';
import type { ClientKind } from '@strapi/types/dist/core/config/database';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  return {
    connection: {
      client: env('DATABASE_CLIENT', 'mysql') as ClientKind,
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'osteosalix'),
        user: env('DATABASE_USERNAME', 'osteosalix'),
        password: env('DATABASE_PASSWORD', 'osteosalix'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY'),
          cert: env('DATABASE_SSL_CERT'),
          ca: env('DATABASE_SSL_CA'),
          capath: env('DATABASE_SSL_CAPATH'),
          cipher: env('DATABASE_SSL_CIPHER'),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

export default config;
