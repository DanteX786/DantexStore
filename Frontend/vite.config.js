import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons.svg', 'robots.txt', '/img/pwa.png'],
      workbox: {
        navigateFallback: '/index.html',
        // Corregido: Quitamos .jsx porque en producción el navegador lee .js
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,ico}']
      },
      manifest: {
        name: 'DanteXStore App',
        short_name: 'DanteX',
        description: 'La mejor tienda de juegos de la ciudad',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a', // Ajustado al color de tu main.jsx
        theme_color: '#00bcd4',      // Ajustado a tu color primario
        icons: [
          {
            src: '/img/logo_dante.jpeg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/img/logo_dante_black.jpeg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ],
        screenshots: [
          {
            src: '/img/logo_dante.jpeg',
            sizes: '640x480',
            type: 'image/jpeg', 
            form_factor: 'narrow'
          },
          {
            src: '/img/pwa.png',
            sizes: '225x225',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      }
    })
  ]
})