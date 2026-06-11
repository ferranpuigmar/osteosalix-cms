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

## Estructura
```
src/
  api/
    navigation/       ← single type: navegación del header
  components/
    navigation/       ← menu-item, menu-group
  extensions/         ← customizaciones de plugins
  admin/              ← config del panel admin
```
