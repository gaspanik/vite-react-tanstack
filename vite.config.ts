import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  // path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // base path for deploying to a subdirectory
  // base: './',
  //
  // server configuration for using portless (github.com/vercel-labs/portless)
  // server: {
  //   host: '0.0.0.0',
  //   port: Number(process.env.PORT) || 5173,
  // },
})
