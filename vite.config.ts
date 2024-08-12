import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = mode === 'production' ? loadEnv(mode, process.cwd(), 'FRONT_') : {};

  return {
    plugins: [react()],
    base: env.FRONT_BASE_URL || '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  }
})
