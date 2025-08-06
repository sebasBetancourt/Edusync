# Sistema de Gestión Académica
## Descripción
Sistema para gestionar estudiantes, cursos, pagos y usuarios en una institución educativa. Utiliza Node.js puro, `MongoDB` con `$jsonSchema`, `JWT` para autenticación, y una interfaz `HTML/CSS/JavaScript`.
## Requisitos

- Node.js v16+
- MongoDB Atlas o local
- Navegador moderno

## Instalación

1. Clona el repositorio: `git clone <url>`

2. Instala dependencias: `npm install`
3. Configura `.env` con `MONGODB_URI `y `JWT_SECRET`
4. Configura la base de datos: `node server/config/db_config.js`
5. Pobla datos de prueba: `node server/data/test_dataset.js`
6. Configura roles: `node server/security/roles.js`
7. Inicia el servidor: `node server/server.js`
8. Abre `client/index.html` en un navegador

## Estructura

- `client/:` Frontend (HTML, CSS, JS)
- `server/:` Backend
  - `config/db_config.js:` Esquemas e índices
  - `data/test_dataset.js:` Datos de prueba
  - `queries/aggregations.js:` Consultas analíticas
  - `security/roles.js:` Roles y permisos
  - `security/transactions.js:` Transacciones MongoDB



## Funcionalidades

- Autenticación con JWT (admin, professor, student)
- CRUD para estudiantes, cursos y pagos
- Reportes con Chart.js
- Transacciones para pagos
- Validaciones con $jsonSchema

## Consultas Analíticas
Ejecuta node server/queries/aggregations.js para ver:

- Estudiantes por curso
- Ingresos por curso
- Cursos más populares
- Historial de pagos por estudiante
- Pagos recientes
- Estudiantes recientes
- Cursos por profesor
- Promedio de pagos por estudiante

## Aprendiendo JWT

- **Generación:** En routes/auth.js, se crea un token con jwt.sign.
- **Verificación:** En middleware/auth.js, se valida el token con jwt.verify.
- **Uso:** El frontend envía el token en el encabezado Authorization. Los roles en el token controlan el acceso.
