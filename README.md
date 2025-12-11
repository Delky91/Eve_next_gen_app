# 🚀 EVE Online PI Helper – Proyecto Next.js

Este proyecto es una herramienta web para ayudar a jugadores y corporaciones de EVE Online a ver qué Planetary Interaction (PI) es recomendable hacer según un sistema, los planetas disponibles y los porcentajes ingresados por los usuarios.

El stack principal:

- **Next.js 16**
- **TypeScript**
- **pnpm (via Corepack)**
- **TailwindCSS + shadcn/ui**
- **API Routes de Next**
- **Base de datos**

---

## 📦 Instalación

Este proyecto usa **pnpm** manejado por **Corepack** (incluido en Node 18+).

### 1. Habilitar Corepack

```bash
    corepack enable
```
### Activar la versión correcta de pnpm

```bash
    corepack install
```

O directamente

```bash
    corepack use pnpm@10.25.0
```

### 3. Instalar dependencias

```bash
    pnpm install
```
### 4. Ejecutar en desarrollo

```bash
    pnpm dev
```

### 🔄 Migración desde npm a pnpm (si es necesario)
Si clonaste o creaste inicialmente el proyecto con npm:
```bash
    rm -rf node_modules
    rm package-lock.json
    pnpm install
```
---

## 🧱 Estructura Base del Proyecto

```

/app
  /api
    /systems
    /planets
    /recommend
  layout.tsx
  page.tsx
/components
/lib
/services
/types
/public
```
---

## 📘 Objetivo del Proyecto

Crear una app donde un usuario pueda:

- Buscar un sistema de EVE Online
- Ver los planetas que tiene ese sistema
- Ingresar manualmente los porcentajes de extracción PI
- Guardar esos valores (local o BD)
- Recibir una recomendación basada en:
  - planetas disponibles
  - porcentajes ingresados
  - precios del mercado
  - rutas industriales eficientes

---

## 🛠 Tecnologías clave

**Frontend**

- Next.js 16 + App Router
- React Server Components
- TailwindCSS
- shadcn/ui
- TanStack Query
- React Hook Form

**Backend**

- API Routes / Server Actions
- Lógica de recomendación PI
- Integración con datos del universo EVE (estáticos o ESI)
- OAuth con EVE SSO
- PostgreSQL

***Posiblemente, se cree un backend aparte en python para mejora en procesamiento de data***

---

## 📋 TODO LIST

### 1. Preparación del Proyecto

- [x] Crear proyecto Next.js.
- [x] Migrar a pnpm y habilitar Corepack.
- [x] Instalar TailwindCSS.
- [ ] Instalar shadcn/ui.
- [ ] Crear estructura de carpetas.

### 2. Funcionalidades Base (sin BD)

- [ ] Crear formulario para buscar un sistema
- [ ] Cargar planetas por sistema desde data estática
- [ ] Crear UI para ingresar porcentajes PI manualmente
- [ ] Guardar datos en localStorage
- [ ] Panel resumen de planetas + porcentajes

### 3. Lógica de Recomendación

- [ ] Crear función que combine:
  - planetas del sistema
  - porcentajes proporcionados
  - lista de productos PI
- [ ] Crear endpoint /api/recommend/[system]
- [ ] Mostrar recomendaciones en el UI

### 4. Backend Completo

- [ ] agregar BD
- [ ] crear modelos:
  - [ ] User
  - [ ] System
  - [ ] PlanetPercentage
- [ ] crear endpoints:
  - [ ] /api/systems
  - [ ] /api/planets/[system]
  - [ ] /api/recommend/[system]
- [ ] permitir CRUD en endpoints
- [ ] aplicar cachear en endpoints
- [ ] autenticación con EVE SSO (OAuth)

### 5. Posibles Mejoras

- [ ] Crear un backend en python para mejorar procesamiento de datos
- [ ] Integración con ESI para obtener los mercados (jita / Amarr)
- [ ] Ranking mejores PI por sistema o región.
- [ ] Dashboard corporativo
- [ ] Roles de usuario

---

### 🧪 Scripts disponibles

```
pnpm dev
pnpm build
pnpm start
pnpm lint
```
---

## 🤝 Contribución

- Crear PRs internos
- Documentar cambios
- Actualizar archivos del universo EVE en /data

---

## 📜 Licencia

Uso personal / corporativo no comercial.
prohibido su uso comercial.