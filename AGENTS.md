# Strapi 5 CMS

This project is a **Strapi 5** CMS (v5.48.0).

## Stack
- **Runtime:** Node 20+
- **Database:** MySQL 8.0 (dockerizado)
- **GraphQL:** `@strapi/plugin-graphql` — endpoint `/graphql`
- **Auth:** `@strapi/plugin-users-permissions`

## Comandos
```bash
make dev    # levanta MySQL + arranca Strapi
make build  # build del admin panel
```

## Convenciones
- Usar **Document Service API** (`strapi.documents()`) para operaciones de datos — Entity Service API está deprecado.
- Los content-types se definen en `src/api/<name>/content-types/<name>/schema.json`.
- Los componentes reutilizables van en `src/components/<category>/`.
- Las rutas se definen en `src/api/<name>/routes/<name>.ts`.
- Controladores en `src/api/<name>/controllers/<name>.ts`.

## Seed
- `src/seed/index.ts` — bootstrap hook, seeds DB en orden: method → navigation → header → services → home → token
- `src/seed/seed-entities/method.ts` — crea el single type Method con 4 pasos (Escuchamos, Evaluamos, Tratamos, Acompañamos)
- `src/seed/seed-entities/services.ts` — crea 4 servicios con tratamientos y relation manyToOne a method
- `src/seed/seed-entities/home.ts` — crea home con hero, center, y relation a servicios
- Para resetear: `docker exec -i osteosalix-mysql mysql -uroot -proot -e "DROP DATABASE IF EXISTS osteosalix; CREATE DATABASE osteosalix;"` + restart Strapi

## Seeds importantes
- **Servicios**: se crean con `strapi.documents(UID).create()`, luego se PUBLICAN con `strapi.documents(UID).publish({documentId})`. Sin publish, GraphQL no los devuelve.
- **Method**: single type con los 4 pasos del método. Cada Service tiene una relación manyToOne → method.
- **Home**: relation a servicios se pasa como `string[]` (documentIds).
- **Token API**: se crea con valor determinista `1234567890abcdef` para que Astro pueda consultar GraphQL sin configuración extra.

## Estructura
```
src/
  api/
    home/             ← single type: página principal
    header/           ← single type: cabecera + logo
    service/          ← collection type: servicios (treatments, method via relation manyToOne)
    method/           ← single type: método de trabajo con 4 pasos (compartido entre servicios)
    navigation/       ← single type: navegación del header
  components/
    navigation/       ← menu-item, menu-group
    service/          ← treatment, method-step
  seed/               ← bootstrap seed (imágenes, contenido, token)
  extensions/         ← customizaciones de plugins
  admin/              ← config del panel admin
```
