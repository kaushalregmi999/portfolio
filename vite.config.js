import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }

          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/motion-dom')
          ) {
            return 'motion-vendor'
          }

          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query-vendor'
          }
        },
      },
    },
  },
})
