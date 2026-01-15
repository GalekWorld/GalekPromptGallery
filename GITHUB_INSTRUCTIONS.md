# 🚀 Cómo subir tu proyecto a GitHub

## Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en el botón **"+"** (arriba a la derecha)
3. Selecciona **"New repository"**
4. Completa los campos:
   - **Repository name**: `galek-prompt-gallery`
   - **Description**: `Galería de imágenes con prompts de IA`
   - ✅ Marca **"Public"** (o Private si prefieres)
   - ❌ **NO marques** "Initialize this repository with a README"
   - ❌ **NO marques** "Add .gitignore"
5. Haz clic en **"Create repository"**

## Paso 2: Preparar tu proyecto local

Ya he inicializado el repositorio git por ti. Ahora ejecuta estos comandos en tu terminal:

```bash
# 1. Agregar todos los archivos al staging
git add .

# 2. Hacer el primer commit
git commit -m "Initial commit: Galek Prompt Gallery with image upload"

# 3. Cambiar el nombre de la rama de master a main
git branch -M main

# 4. Agregar el repositorio remoto de GitHub
git remote add origin https://github.com/TU_USUARIO/galek-prompt-gallery.git

# 5. Subir a GitHub
git push -u origin main
```

## ⚠️ IMPORTANTE:

Reemplaza `TU_USUARIO` en el paso 4 por tu nombre de usuario real de GitHub.

Por ejemplo, si tu usuario es `juanperez`, el comando sería:

```bash
git remote add origin https://github.com/juanperez/galek-prompt-gallery.git
```

## Paso 3: Subir tus archivos

El comando `git push -u origin main` te pedirá tus credenciales de GitHub:

- Si tienes **autenticación por contraseña**: Ingresa tu usuario y contraseña (o token de acceso personal)
- Si tienes **2FA activado**: Usa un **Personal Access Token** en lugar de tu contraseña

## 🎉 ¡Listo!

Ahora tu código está en GitHub. Puedes compartir el enlace con cualquiera:

`https://github.com/TU_USUARIO/galek-prompt-gallery`

---

## 📱 Para futuros cambios (Workflow)

Después de hacer cambios en tu código, sigue estos pasos:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar los archivos cambiados
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push
```

---

## 🔄 Si ya tienes un repositorio en GitHub

Si ya creaste el repositorio y quieres conectarlo:

```bash
# Eliminar el remote existente (si hay alguno)
git remote remove origin

# Agregar tu repositorio de GitHub
git remote add origin https://github.com/TU_USUARIO/galek-prompt-gallery.git

# Subir
git push -u origin main
```

---

## 🛡️ Usar SSH en lugar de HTTPS (Opcional)

Si prefieres usar SSH (más seguro):

1. Genera una clave SSH en GitHub
2. Conecta tu clave SSH a tu cuenta
3. En lugar de usar HTTPS, usa:

```bash
git remote add origin git@github.com:TU_USUARIO/galek-prompt-gallery.git
```

---

## 📋 Checklist antes de subir

- [ ] He creado el repositorio en GitHub
- [ ] He reemplazado `TU_USUARIO` con mi usuario real
- [ ] He ejecutado `git add .`
- [ ] He ejecutado `git commit -m "..."`
- [ ] He ejecutado `git push -u origin main`

---

## 💡 Tips útiles

### Ver commits realizados
```bash
git log --oneline
```

### Ver diferencias entre commits
```bash
git diff
```

### Deshacer el último commit (sin perder cambios)
```bash
git reset --soft HEAD~1
```

### Crear y cambiar a una nueva rama
```bash
git checkout -b nombre-rama
```

---

## ❓ ¿Problemas comunes?

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/galek-prompt-gallery.git
```

### Error: Authentication failed
Crea un Personal Access Token en GitHub y úsalo como contraseña.

### Error: "Updates were rejected"
```bash
git pull origin main
git push origin main
```

---

🎊 ¡Felicidades! Tu Galek Prompt Gallery ya está en GitHub y listo para compartir.
