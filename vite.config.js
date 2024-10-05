import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Exportamos la configuración
export default defineConfig(({ mode }) => {
  // Cargamos las variables de entorno
  const API_URL = mode === 'development'
    ? 'http://localhost:3000' // URL del backend para desarrollo
    : 'mi-backend-production-84d7.up.railway.app';// URL del backend para producción

  return {
    plugins: [react()],
    server: {
      // Configuración solo para el entorno de desarrollo
      proxy: {
        '/Materiales': {
          target: API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // Opciones para producción (opcional)
    build: {
      outDir: 'dist', // Carpeta de salida para la build
      sourcemap: mode === 'development' ? true : false, // Mapa de fuentes en desarrollo
    },
  }
});

