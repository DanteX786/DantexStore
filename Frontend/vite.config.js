import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Asegúrate de que NO tenga nada adentro como 'reactCompilerPreset'
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'DantexStore',
        short_name: 'Dantex',
        theme_color: '#00b7ff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    strictPort: true,
  }
})