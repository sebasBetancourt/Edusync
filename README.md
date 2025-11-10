# 🎓 Panel Académico — Frontend (Nuxt 3 + Tailwind + shadcn-vue)

Interfaz moderna y responsiva para la gestión académica de una institución educativa.  
Construida con **Nuxt 3**, **Vue 3**, **TailwindCSS** y **shadcn-vue**, esta aplicación se conecta a una API externa (Django o cualquier backend REST) para mostrar y administrar información académica como cursos, usuarios, rendimiento y configuraciones del estudiante o docente.

---

## 🚀 Tecnologías Utilizadas

### 🧩 Core
- **Nuxt 3** — Framework moderno de Vue con SSR y Composition API.
- **Vue 3 + TypeScript** — Componentes reactivos con tipado estricto.
- **TailwindCSS** — Diseño responsivo y consistente mediante utilidades CSS.
- **shadcn-vue** — Componentes elegantes, accesibles y totalmente personalizables.
- **Lucide Icons** — Iconografía moderna SVG.
- **Number Flow / Framer Motion** — Animaciones fluidas para estadísticas.
- **Pinia (opcional)** — Manejo centralizado del estado.

---

## 🏗️ Estructura del Proyecto

```bash
frontend/
├── app/                       # Configuración global de Nuxt
├── assets/                    # Imágenes, fuentes, estilos globales
├── components/
│   ├── ui/                    # Componentes de interfaz (shadcn-vue personalizados)
│   │   ├── Ajustes.vue
│   │   ├── Comentarios.vue
│   │   ├── Cuenta.vue
│   │   ├── Notificaciones.vue
│   │   ├── Privacidad.vue
│   │   ├── Soporte.vue
│   │   └── ...
│   ├── auth/                  # Componentes para autenticación
│   ├── Theme.vue              # Selector de tema (modo claro/oscuro)
│   └── TotalVisitors.vue      # Ejemplo de componente estadístico animado
│
├── composables/               # Hooks y lógica reutilizable (por ejemplo useAuth, useTheme)
├── layouts/                   # Layouts base (main, auth, admin)
├── pages/
│   ├── login.vue              # Página de autenticación
│   ├── panel.vue              # Panel general con sidebar dinámico
│   ├── admin/                 # Rutas del rol administrador
│   │   └── dashboard.vue
│   ├── student/               # Rutas del rol estudiante
│   │   ├── index.vue          # Vista principal del estudiante
│   │   └── cursos.vue         # Vista de cursos del estudiante
│   └── teacher/               # Rutas del rol docente
│
├── plugins/                   # Plugins de Nuxt (ej: axios, color-mode)
│   ├── color-mode.ts
│   ├── number-flow.d.ts
│   └── shadcn-vue.ts
│
├── public/                    # Recursos públicos
├── types/                     # Definiciones TypeScript
├── .env.example               # Variables de entorno ejemplo
├── dockerfile                 # Imagen Docker del frontend
├── docker-compose.yml         # Configuración para entorno local
├── package.json
└── nuxt.config.ts             # Configuración principal de Nuxt
```

## ⚙️ Instalación y Ejecución Local
Clonar el repositorio

```bash
Copiar código
git clone https://github.com/tuusuario/panel-academico-frontend.git
cd panel-academico-frontend
```
Instalar dependencias
Copiar código
```bash
npm install
```
Configurar variables de entorno
Crea un archivo .env en la raíz:
```
bash
Copiar código
NUXT_PUBLIC_API_BASE="https://tu-backend-api.com/api"
NUXT_PUBLIC_APP_NAME="Panel Académico"
```
Ejecutar el servidor de desarrollo
```
bash
Copiar código
npm run dev
```
Accede en: http://localhost:3000

### 🐳 Ejecución con Docker
- Este proyecto incluye soporte completo para Docker.
Asegúrate de tener Docker y Docker Compose instalados.

### 🧱 Construir y ejecutar
```
bash
Copiar código
docker compose up --build
📦 Estructura del docker-compose.yml
yaml
Copiar código
version: "3.9"
services:
  nuxt-frontend:
    container_name: panel-academico
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    volumes:
      - .:/app
    command: npm run dev
🐋 Dockerfile (ejemplo)
dockerfile
Copiar código
# Imagen base
FROM node:20-alpine
```

#### Crear directorio de trabajo
WORKDIR /app

#### Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

#### Copiar el resto del código
COPY . .

#### Compilar el proyecto
RUN npm run build

#### Exponer el puerto
EXPOSE 3000

## Comando de inicio
- CMD ["npm", "run", "preview"]

## 🌙 Características del Sistema

### 👤 Gestión de Usuario
- Autenticación con token JWT (usando API externa)

- Sección de Cuenta, Privacidad y Notificaciones

- Edición del perfil directamente desde el diálogo de configuración

### 📚 Vista del Estudiante
- Panel con información general del curso, promedio y desempeño

- Sección “Comentarios” para enviar feedback sobre la plataforma

- Apartado “Soporte” para contactar con el equipo docente o técnico

### 🧑‍🏫 Vista del Docente
-  Panel con cursos asignados

- Seguimiento del progreso de estudiantes

### 🏫 Vista del Administrador
- Estadísticas generales (número de usuarios, cursos activos, promedios)

- Panel de control completo para gestión institucional

### 🎨 Estilo y Animaciones
- Totalmente responsivo con TailwindCSS

- Animaciones suaves mediante Framer Motion y NumberFlow

- Transiciones en modales, barras de progreso y estadísticas

- Fondo difuminado en diálogos y paneles flotantes (backdrop-blur)

##  🧩 Scripts Disponibles
Comando	Descripción
```
npm run dev	Inicia el servidor de desarrollo
npm run build	Compila para producción
npm run preview	Previsualiza la build
npm run lint	Verifica errores de formato/código
```
### 📁 Variables de Entorno (Ejemplo)
```
bash
Copiar código
NUXT_PUBLIC_API_BASE=https://api-colegio-production.com/api
NUXT_PUBLIC_APP_NAME="Panel Académico"
NUXT_PUBLIC_DEFAULT_ROLE="student"
```
## 🚀 Despliegue
- Opción 1 — Docker Compose
```bash
Copiar código
docker compose up -d --build
```
### Opción 2 — Vercel
El frontend puede desplegarse fácilmente en Vercel:
Conectar el repositorio.

Añadir variables de entorno.

Build Command: npm run build

Output Directory: .output/public

## 🧾 Licencia
Este proyecto está bajo la licencia MIT — libre uso con atribución.

## 👨‍💻 Autor
- Sebastián Betancourt
- Desarrollador Full Stack — Vue | Nuxt | Django | Tailwind | SQL
- 💼 Aplicaciones modernas, limpias y centradas en la experiencia del usuario.