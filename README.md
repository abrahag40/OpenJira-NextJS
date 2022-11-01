# Next.js OpenJira App
Para correr localmente, se necesita la base de datos

docker-compose up -d

* El -d, significa _detached_

* MongoDB URL local:

mongodb://localhost:27017/entriesdb

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env.__

## Llenar la base de datos con información de prueba

Llamará: 
```
  http://localhost:3000/api/seed
```