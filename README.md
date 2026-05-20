# I Wish To Game

Marketplace web de videojuegos desarrollado con React, TypeScript, Vite y Firebase para el proyecto final de Estructuras de Datos II.

## Integrantes

- Sarai: Firebase Authentication, perfiles de usuario en Firestore, rutas privadas y estructura de tabla hash para usuarios.
- Jhojan: carrito, ordenes/transacciones y cola de compras.
- Steven: catalogo, filtros, propuesta grafica, arbol de categorias y grafo de recomendaciones.

## Enlaces

- Repositorio GitHub: pendiente
- Propuesta grafica Figma/Adobe: pendiente
- Despliegue Netlify: pendiente

## Tecnologias

- React + TypeScript
- Vite
- React Router
- Firebase Authentication
- Cloud Firestore

## Configuracion de Firebase

1. Crear un proyecto en Firebase.
2. Activar Authentication con proveedor de correo y contrasena.
3. Activar Cloud Firestore.
4. Copiar `.env.example` como `.env`.
5. Completar las variables `VITE_FIREBASE_*` con la configuracion web del proyecto Firebase.

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Estructuras de datos

- Tabla hash: cache local de perfiles por correo para busqueda rapida de usuarios autenticados.
- Pila: historial de juegos visitados.
- Lista circular doble: carrusel de productos destacados.
- Arbol: categorias y subcategorias del catalogo.
- Grafo: recomendaciones entre juegos relacionados.

## Alcance actual de la rama de Sarai

- Configuracion base de Firebase.
- Registro real de usuarios con Firebase Authentication.
- Inicio y cierre de sesion con Firebase Authentication.
- Guardado de perfiles de usuario en Firestore.
- Proteccion de rutas privadas con estado de carga.
- Documentacion de variables de entorno para el equipo.
