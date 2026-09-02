import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // base path for GitHub Pages: https://nandkumarcoder.github.io/nand-kumar-portfolio/
  base: process.env.NODE_ENV === 'production' ? '/nand-kumar-portfolio/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
