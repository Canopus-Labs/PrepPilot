import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import process from 'node:process';

// Dynamically configure proxy only for local dev when hitting backend directly
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backend = env.VITE_BACKEND_URL || 'http://localhost:8000';

  // If backend is localhost we keep a dev proxy (helps with cookies / same-site)
  const useProxy = /localhost|127\.0\.0\.1/.test(backend);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    build: {
      rollupOptions: {
        output: {
          // Split heavy, route-specific vendors into their own chunks so they
          // aren't pulled into the initial paint.
          manualChunks: {
            'vendor-monaco': ['@monaco-editor/react'],
            'vendor-syntax': ['react-syntax-highlighter'],
            'vendor-pdf': ['html2pdf.js'],
            'vendor-motion': ['framer-motion'],
            'vendor-markdown': ['react-markdown', 'remark-gfm'],
          },
        },
      },
    },
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
