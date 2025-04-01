
FROM node:20-alpine as build

WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Crear archivo .env para las variables de Supabase
RUN touch .env

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
