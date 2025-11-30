# Inventario API

Este es el backend para la aplicación de Inventario, construido con Node.js, Express y MySQL.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MySQL](https://www.mysql.com/) (Server y Workbench recomendados)

## Instalación

1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone <url-del-repositorio>
    cd Api
    ```

2.  **Instalar dependencias**:
    Ejecuta el siguiente comando en la carpeta `Api` para instalar las librerías necesarias:
    ```bash
    npm install
    ```

## Configuración de la Base de Datos

1.  Abre tu cliente de MySQL (ej. MySQL Workbench).
2.  Abre el archivo `database.sql` ubicado en la raíz de este proyecto.
3.  Ejecuta todo el script para crear la base de datos `inventario_db`, las tablas y cargar los datos de prueba.

## Configuración del Entorno

1.  Crea un archivo llamado `.env` en la raíz de la carpeta `Api`. Puedes usar el archivo de ejemplo `.env.example` como base:
    ```bash
    cp .env.example .env
    ```
2.  Edita el archivo `.env` y agrega tus credenciales reales (ajusta `DB_PASSWORD` a tu contraseña de MySQL):

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=inventario_db
    PORT=3000
    ```

## Ejecutar el Servidor

Para iniciar el servidor en modo de desarrollo (con recarga automática):

```bash
npm run dev
```

Para iniciar el servidor en modo producción:

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`.

## Endpoints Principales

- **Productos**: `GET /api/productos`
- **Categorías**: `GET /api/categorias`
- **Proveedores**: `GET /api/proveedores`

## Frontend

Si tienes el frontend (aplicación Angular), asegúrate de que esté configurado para apuntar a `http://localhost:3000`. Normalmente, para iniciar el frontend:

1.  Navega a la carpeta del frontend.
2.  Ejecuta `npm install`.
3.  Ejecuta `ng serve` o `npm start`.
4.  Abre `http://localhost:4200` en tu navegador.
