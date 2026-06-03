# API de Entrenamiento Fitness

![Estado](https://img.shields.io/badge/estado-activo-brightgreen)
![Stack](https://img.shields.io/badge/stack-Node.js%20%2B%20Express-blue)
![Versión](https://img.shields.io/badge/versión-1.0.0-informational)
![Sin dependencias externas](https://img.shields.io/badge/base%20de%20datos-JSON%20local-orange)

## ¿Qué hace este proyecto?

API REST para la gestión completa de rutinas de entrenamiento físico. Permite crear, consultar, actualizar y eliminar entrenamientos estructurados con sus ejercicios y datos logísticos.

## Para el evaluador técnico

> Este proyecto demuestra:
> - **Arquitectura en capas**: separación estricta entre Controlador → Servicio → Repositorio.
> - **Patrón Repositorio**: la capa de persistencia está completamente abstraída. Cambiar de JSON a MongoDB o PostgreSQL no requeriría modificar ni el servicio ni el controlador.
> - **Buenas prácticas en APIs REST**: versionado de rutas (`/api/v1/`), uso correcto de verbos HTTP y códigos de estado (200, 201, 204, 400, 404, 409, 500).
> - **Seguridad aplicada**: cabeceras HTTP securizadas con `helmet`, soporte CORS configurado, variables de entorno con `dotenv`.
> - **Cero dependencias externas**: la API funciona sin base de datos externa, Docker ni servicios cloud. Un `npm install && npm start` es todo lo necesario.

---

## Stack tecnológico

| Capa       | Tecnología     | Versión  |
|------------|----------------|----------|
| Runtime    | Node.js        | ≥ 18.x   |
| Framework  | Express        | ^4.18.2  |
| Seguridad  | Helmet + CORS  | ^7.x / ^2.x |
| Entorno    | dotenv         | ^16.x    |
| Persistencia | JSON local (Patrón Repositorio) | —  |

---

## Instalación y ejecución rápida

> ⏱ Tiempo estimado: **menos de 1 minuto**. Sin Docker, sin bases de datos externas.

```bash
# 1. Clona el repositorio
git clone https://github.com/MaykNLD/API-Entrenamiento-Fitness.git
cd api-entrenamiento-fitness

# 2. Instala las dependencias
npm install

# 3. Configura el entorno (opcional — el puerto por defecto es 3000)
cp .env.example .env

# 4. Arranca el servidor
npm start
```

Disponible en: **http://localhost:3000**

### ⚠️ Troubleshooting (Solución de problemas frecuentes)

Si al ejecutar `npm start` te encuentras con un error de tipo `EADDRINUSE` o similar indicando que el puerto 3000 está ocupado, tienes estas opciones nativas para solucionarlo sin modificar código:

**Opción 1: Usando el archivo `.env`**
1. Modifica la variable de entorno `PORT` en el `.env` (ejemplo `PORT=8080`).
2. Reinicia el servidor.

**Opción 2: Usar variables en la misma terminal**
Linux/macOS:
```bash
PORT=8080 npm start
```
Windows (PowerShell):
```powershell
$env:PORT=8080; npm start
```

---

## Endpoints disponibles

| Método | Ruta                                    | Descripción                        |
|--------|-----------------------------------------|------------------------------------|
| GET    | `/api/v1/entrenamientos`                | Obtiene todos los entrenamientos   |
| GET    | `/api/v1/entrenamientos/:id`            | Obtiene un entrenamiento por ID    |
| POST   | `/api/v1/entrenamientos`                | Crea un nuevo entrenamiento        |
| PATCH  | `/api/v1/entrenamientos/:id`            | Actualiza un entrenamiento         |
| DELETE | `/api/v1/entrenamientos/:id`            | Elimina un entrenamiento           |

### Ejemplo de petición POST

```json
POST /api/v1/entrenamientos
Content-Type: application/json

{
  "name": "Piernas - Día de fuerza",
  "items": [
    { "ejercicio": "Sentadilla", "series": 4, "repeticiones": 8 },
    { "ejercicio": "Prensa", "series": 3, "repeticiones": 12 }
  ],
  "logisticsInfo": {
    "duracion": "50 minutos",
    "nivel": "Intermedio",
    "equipo": "Rack de sentadillas"
  }
}
```

---

## Estructura del proyecto

```
src/
├── index.js                        # Punto de entrada — Express + middlewares
├── v1/
│   └── routes/
│       └── entrenamientoRutas.js  # Definición de rutas versionadas
├── controllers/
│   └── entrenamientoControlador.js # Capa HTTP: entrada/salida y validación
├── services/
│   └── entrenamientoServicio.js   # Lógica de negocio y transformación
└── database/
    ├── repository.js              # Patrón Repositorio — acceso a datos
    ├── modeloEntrenamiento.js     # Operaciones CRUD sobre la colección
    └── db.json                    # Base de datos local con datos de ejemplo
```

---

## Decisión de diseño: ¿Por qué JSON local en lugar de MongoDB?

La elección del **Patrón Repositorio sobre un archivo JSON local** es deliberada:
- Permite evaluar el código sin instalar ninguna infraestructura adicional.
- La arquitectura está diseñada para que la migración a MongoDB, PostgreSQL o cualquier otra base de datos **no afecte a ninguna capa superior** al Repositorio.
- Elimina la necesidad de exponer credenciales en el repositorio público, evitando vulnerabilidades de seguridad comunes en proyectos de portafolio.
