# 🎨 Galek Prompt Gallery

Una galería de imágenes con prompts de IA donde los usuarios deben seguirte en Instagram para desbloquear los prompts.

## ✨ Características

- 🖼️ **Galería de imágenes** con diseño responsive
- 🔒 **Sistema de verificación** - Los usuarios deben seguirte en Instagram para ver los prompts
- ⏱️ **Delay de 10 segundos** - Los usuarios esperan 10 segundos después de confirmar
- 📤 **Subida de imágenes local** - Arrastra y suelta imágenes sin servidores externos
- 🎯 **Panel de administración** - Gestiona tus imágenes y prompts fácilmente
- 🎨 **Diseño moderno** - Colores azul y blanco con gradientes
- 📱 **Responsive** - Funciona perfecto en móvil, tablet y desktop
- 💾 **Base de datos** - SQLite con Prisma ORM

## 🚀 Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui
- **Base de datos**: Prisma ORM con SQLite
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

## 📋 Requisitos Previos

- Node.js 18+ (recomendado: 20+)
- Bun (recomendado) o npm/yarn/pnpm

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/galek-prompt-gallery.git
cd galek-prompt-gallery
```

### 2. Instalar dependencias

```bash
bun install
# o
npm install
# o
yarn install
```

### 3. Configurar base de datos

```bash
bun run db:push
# o
npx prisma db push
```

### 4. Configurar variables de entorno

El proyecto usa valores predeterminados, pero puedes configurar:

```env
# .env.local
DATABASE_URL="file:./db/custom.db"
```

### 5. Iniciar servidor de desarrollo

```bash
bun run dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
galek-prompt-gallery/
├── prisma/
│   └── schema.prisma           # Esquema de base de datos
├── public/
│   ├── uploads/                 # Imágenes subidas por usuarios
│   ├── logo-g.png              # Logo principal
│   └── sample-images/          # Imágenes de ejemplo
├── scripts/
│   ├── generate-logo.ts        # Script para generar logo
│   ├── generate-sample-image.ts # Script para generar imagen de ejemplo
│   └── seed-database.ts      # Script para poblar la BD
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── images/
│   │   │   │   └── route.ts  # GET: Obtener imágenes
│   │   │   ├── admin/
│   │   │   │   └── images/
│   │   │   │       └── route.ts  # POST: Crear, DELETE: Eliminar
│   │   │   └── upload/
│   │   │       └── route.ts  # POST: Subir imágenes
│   │   ├── admin/
│   │   │   └── page.tsx       # Panel de administración
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página principal (galería)
│   │   └── globals.css        # Estilos globales
│   ├── components/
│   │   ├── ImageCard.tsx      # Tarjeta de imagen
│   │   ├── ImageUpload.tsx    # Componente de drag & drop
│   │   └── ui/               # Componentes shadcn/ui
│   └── lib/
│       └── db.ts              # Cliente de base de datos
├── .gitignore
├── README.md
└── package.json
```

## 🎯 Uso

### Añadir Imágenes

1. Ve a `/admin`
2. Haz clic en "Nueva Imagen"
3. Arrastra una imagen o haz clic para seleccionar
4. Rellena el título y el prompt
5. Haz clic en "Guardar Imagen"

### Gestión de Imágenes

- **Ver**: Ve a la página principal `/`
- **Añadir**: Desde el panel `/admin`
- **Eliminar**: Pasa el ratón sobre una imagen en `/admin` y haz clic en el botón de basura

### Configuración de Instagram

Para cambiar tu usuario de Instagram, edita:

`src/components/ImageCard.tsx`

```typescript
const instagramUsername = 'galek.ia'
```

Cámbialo por tu usuario real.

## 🔧 Scripts Disponibles

```bash
# Desarrollo
bun run dev              # Iniciar servidor de desarrollo

# Base de datos
bun run db:push          # Sincronizar esquema con BD
bun run db:studio        # Abrir Prisma Studio (opcional)

# Linting
bun run lint            # Verificar código con ESLint

# Build
bun run build           # Compilar para producción
bun run start           # Iniciar servidor de producción
```

## 🎨 Personalización

### Cambiar Colores

Los colores actuales son azul y blanco. Puedes cambiarlos en:

- **Colores principales**: Clases Tailwind `blue-500`, `sky-500`
- **Archivos**:
  - `src/app/page.tsx` - Header y título
  - `src/app/admin/page.tsx` - Panel de administración
  - `src/components/ImageCard.tsx` - Modal de verificación

### Cambiar Logo

El logo actual está en `public/logo-g.png`. Puedes:

1. Reemplazar el archivo `public/logo-g.png`
2. O editar `src/app/layout.tsx` para usar otra ruta

### Cambiar Nombre del Sitio

Edita `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Galek Prompt Gallery - Descubre Prompts de IA",
  // ...
}
```

## 📤 Subida a Producción

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio de GitHub
4. Configura las variables de entorno (si es necesario)
5. ¡Listo! Vercel desplegará automáticamente

### Otras Plataformas

- **Netlify**: Conecta tu repositorio de GitHub
- **Railway**: Soporta bases de datos SQLite
- **Render**: Compatible con Next.js
- **Heroku**: Necesita configurar la base de datos

## ⚠️ Notas Importantes

### Base de Datos en Producción

- **Vercel**: SQLite no funciona, usa PostgreSQL
- **Railway**: Usa PostgreSQL
- **Render**: Usa PostgreSQL

Para cambiar a PostgreSQL:

1. Cambia `DATABASE_URL` en `.env`
2. Actualiza `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Ejecuta `bun run db:push`

### Imágenes Subidas

Las imágenes se guardan en `public/uploads/`. En producción:

- **Vercel**: Las imágenes se borran al redeployar. Usa un servicio de almacenamiento externo (Cloudinary, AWS S3).
- **Railway/Render**: Las imágenes persisten.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Galek**
- Instagram: [@galek.ia](https://instagram.com/galek.ia)

## 🙏 Agradecimientos

- Next.js team por el excelente framework
- shadcn por los componentes UI
- Prisma por el ORM tan fácil de usar

---

¿Te gusta el proyecto? ⭐ Dale una estrella en GitHub!
