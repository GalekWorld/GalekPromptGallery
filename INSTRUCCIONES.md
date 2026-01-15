# Prompt Gallery - Instrucciones de Uso

## 🎯 ¿Qué es?

Una galería de imágenes donde los usuarios pueden ver los prompts detrás de cada imagen, pero con una condición: deben seguirte en Instagram primero para desbloquear los prompts.

## 🚀 Funcionalidades Principales

### 1. **Página Principal (`/`)**
- Galería de imágenes en grid responsive
- Cada tarjeta muestra:
  - Imagen en cuadrado
  - Título y descripción
  - Botón "Obtener Prompt"

### 2. **Sistema de Verificación de Instagram**
- Al hacer clic en "Obtener Prompt", aparece un modal que:
  - Muestra tu usuario de Instagram (que debes configurar)
  - Botón para ir a tu perfil de Instagram
  - Botón "Hecho, ya te sigo" para verificar
  - Una vez verificado, muestra el prompt completo
  - El estado de verificación se guarda en localStorage
  - Los usuarios pueden copiar el prompt al portapapeles

### 3. **Panel de Administración (`/admin`)**
- Formulario para añadir nuevas imágenes con:
  - Título
  - URL de la imagen
  - Prompt completo
  - Descripción (opcional)
- Lista de imágenes existentes con opción de eliminar
- Estadísticas básicas

## ⚙️ Configuración Importante

### Cambiar tu Usuario de Instagram

**Archivo:** `/src/components/ImageCard.tsx`

Busca esta línea (alrededor de la línea 23):

```typescript
const instagramUsername = 'tu_usuario_instagram'
```

Cámbiala por tu usuario real:

```typescript
const instagramUsername = 'tu_usuario_real'
```

## 📦 Cómo Añadir Imágenes

### Opción 1: Desde el Panel de Admin (Recomendado)

1. Ve a `/admin`
2. Haz clic en "Nueva Imagen"
3. Completa el formulario:
   - **Título**: Nombre descriptivo de la imagen
   - **URL de la Imagen**: URL pública donde está alojada la imagen
   - **Prompt**: El prompt completo usado para generar la imagen
   - **Descripción** (opcional): Breve descripción
4. Haz clic en "Guardar Imagen"

### Opción 2: Via API

```bash
curl -X POST http://localhost:3000/api/admin/images \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Imagen",
    "imageUrl": "https://ejemplo.com/imagen.jpg",
    "prompt": "Prompt completo aquí...",
    "description": "Descripción opcional"
  }'
```

## 🗄️ Base de Datos

La base de datos es SQLite con Prisma ORM:

**Esquema:**
- `ImagePrompt`: Almacena todas las imágenes con sus prompts
  - `id`: Identificador único
  - `title`: Título de la imagen
  - `imageUrl`: URL de la imagen
  - `prompt`: El prompt (oculto hasta verificar)
  - `description`: Descripción opcional
  - `createdAt` / `updatedAt`: Fechas

**Ubicación del archivo DB:** `/db/custom.db`

## 🎨 Cómo Funciona el Flujo del Usuario

1. **Usuario visita la página principal**
   - Ve la galería de imágenes
   - Solo ve las imágenes, no los prompts

2. **Usuario hace clic en "Obtener Prompt"**
   - Aparece un modal con tu usuario de Instagram
   - Botón para ir a tu perfil de Instagram

3. **Usuario va a Instagram y te sigue**
   - Abre tu perfil en Instagram
   - Te da Follow

4. **Usuario regresa y hace clic en "Hecho, ya te sigo"**
   - El sistema verifica que el usuario confirmó (manual)
   - Muestra el prompt completo
   - Guarda el estado en localStorage (no tiene que hacerlo de nuevo)
   - Puede copiar el prompt al portapapeles

## 📝 Notas Importantes

- **Sistema de Honor**: La verificación es manual - el sistema confía que el usuario realmente te sigue
- **localStorage**: El estado de verificación se guarda en el navegador del usuario
- **Imágenes**: Usa URLs públicas (imgur, cloudinary, S3, etc.) o ponlas en `/public`
- **Prompt**: Puedes copiar el prompt completo de Midjourney, DALL-E, Stable Diffusion, etc.

## 🎯 Características Técnicas

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + shadcn/ui
- **Base de datos**: Prisma ORM con SQLite
- **Iconos**: Lucide React
- **Notificaciones**: Sonner para toasts

## 🌐 Rutas Disponibles

- `/` - Página principal (galería)
- `/admin` - Panel de administración
- `/api/images` - API para obtener imágenes (GET)
- `/api/admin/images` - API para gestionar imágenes (POST, DELETE)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              # Página principal (galería)
│   ├── admin/
│   │   └── page.tsx          # Panel de administración
│   ├── api/
│   │   ├── images/
│   │   │   └── route.ts      # GET: Obtener imágenes
│   │   └── admin/
│   │       └── images/
│   │           └── route.ts  # POST: Crear, DELETE: Eliminar
├── components/
│   ├── ImageCard.tsx         # Componente de tarjeta de imagen
│   └── ui/                   # Componentes shadcn/ui
└── lib/
    └── db.ts                 # Cliente de base de datos

prisma/
└── schema.prisma             # Esquema de base de datos

scripts/
├── generate-sample-image.ts  # Script para generar imagen de ejemplo
└── seed-database.ts          # Script para poblar la BD
```

## ✨ Personalización

### Colores del Tema

La aplicación usa colores púrpura y rosa (gradiente). Puedes cambiarlos en:

- `/src/app/page.tsx` - clases Tailwind `from-purple-500 to-pink-500`
- `/src/app/admin/page.tsx` - clases Tailwind similares

### Título y Metadatos

En `/src/app/layout.tsx` puedes cambiar:
- Título de la página
- Descripción
- Keywords SEO
- Open Graph tags

## 🎉 ¡Listo para usar!

1. **Cambia tu usuario de Instagram** en `/src/components/ImageCard.tsx`
2. **Añade tus imágenes** desde `/admin`
3. **¡Comparte tu galería!** 🚀

Los usuarios tendrán que seguirte en Instagram para ver los prompts. ¡Es una excelente estrategia para crecer en la plataforma!
