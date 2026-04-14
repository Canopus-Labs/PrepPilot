import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Dynamically configure proxy only for local dev when hitting backend directly
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backend = env.VITE_BACKEND_URL || 'http://localhost:8000';

  // If backend is localhost we keep a dev proxy (helps with cookies / same-site)
  const useProxy = /localhost|127\.0\.0\.1/.test(backend);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: useProxy
        ? {
            '/api': backend,
          }
        : undefined,
    },
    define: {
      __APP_BACKEND__: JSON.stringify(backend),
    },
  };
});
