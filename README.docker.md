
# Ejecutar la aplicación con Docker

## Requisitos previos
- Docker
- Docker Compose

## Pasos para ejecutar la aplicación

1. Crea un archivo `.env` basado en `.env.example`:
   ```
   cp .env.example .env
   ```

2. Edita el archivo `.env` y agrega tus credenciales de Supabase:
   ```
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

3. Ejecuta la aplicación con Docker Compose:
   ```
   docker-compose up -d
   ```

4. Accede a la aplicación en tu navegador:
   ```
   http://localhost:8080
   ```

## Detener la aplicación
Para detener la aplicación, ejecuta:
```
docker-compose down
```
