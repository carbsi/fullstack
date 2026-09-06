import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {

    // e2e-ajossa backend pyorii eri portissa (3004) kuin normaalisti (3003)
    proxy: {
      '/api': mode === 'e2e'
        ? 'http://127.0.0.1:3004'
        : 'http://127.0.0.1:3003',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/testSetup.js',
  },
}))
