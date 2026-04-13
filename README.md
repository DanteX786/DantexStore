🎮 DANTEXSTORE - E-commerce Full Stack
DANTEXSTORE es una plataforma de comercio electrónico enfocada en videojuegos, desarrollada con una arquitectura moderna que separa el Frontend (React) del Backend (Node.js). El proyecto incluye funcionalidades de carrito de compras, gestión de favoritos y un buscador dinámico basado en presupuesto conectado a una API REST.

🛠️ Tecnologías Utilizadas
Frontend
React.js (Vite)

Material UI (MUI) - Para el diseño y componentes de interfaz.

Iconos: Material Icons.

Estado: Hooks (useState, useEffect).

Backend
Node.js

Express - Framework para la creación de la API.

CORS - Para la comunicación segura entre dominios.

Vercel - Configuración lista para despliegue.

📂 Estructura del Proyecto
El proyecto sigue una estructura modular para facilitar el mantenimiento:

Plaintext
DANTEXSTORE/
├── Backend/                 # Servidor API Node.js
│   ├── NodeyReact           # Servidor Proyecto Node.js Albert    
│   ├── index.js             # Punto de entrada del servidor
│   ├── package.json         # Dependencias del servidor
│   └── vercel.json          # Configuración de despliegue
├── Frontend/                # Aplicación Cliente React
│   ├── src/
│   │   ├── features/        # Lógica dividida por funcionalidades
│   │   │   ├── api/         # Componentes de consumo de API
│   │   │   ├── auth/        # Gestión de cuenta y favoritos
│   │   │   ├── layout/      # Componentes globales (Header, Footer)
│   │   │   └── views/       # Vistas principales (Tienda, Carrito)
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx         # Renderizado de React
│   └── vite.config.js       # Configuración de Vite
└── README.md
✨ Funcionalidades Principales
Tienda Dinámica: Visualización de productos con imágenes y precios formateados.

Sistema de Favoritos: Persistencia en estado para marcar productos deseados.

Carrito de Compras: Gestión de cantidades y productos seleccionados.

Buscador por Presupuesto: Consulta en tiempo real a la API de Node.js para filtrar juegos según el dinero disponible del usuario.

Diseño Responsivo: Interfaz adaptada para diferentes tamaños de pantalla mediante Material UI.

🚀 Instalación y Configuración
Sigue estos pasos para ejecutar el proyecto localmente:

1. Clonar el repositorio
Bash
git clone <url-repositorio>
cd DANTEXSTORE
2. Configurar el Backend
Bash
cd Backend
npm install
node index.js
El servidor iniciará en http://localhost:4000.

3. Configurar el Frontend
Abre una nueva terminal:

Bash
cd Frontend
npm install --legacy-peer-deps
npm run dev
La aplicación estará disponible en http://localhost:5173 (o el puerto que asigne Vite).

👤 Autor
Juan Camilo - Estudiante de Sistemas - SENA (Medellín).

Notas Técnicas
Asegúrate de tener instalado Node.js (versión recomendada v18 o superior).

El Frontend requiere el comando --legacy-peer-deps durante la instalación para evitar conflictos de versiones entre dependencias de Material UI.