import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@src': resolve('src'),
      '@/components': resolve('src/components'),
      '@/hooks': resolve('src/hooks'),
      '@/context': resolve('src/providers'),
      '@/routes': resolve('src/routes'),
      '@/pages': resolve('src/pages'),
      '@/providers': resolve('src/providers'),
      '@/utils': resolve('src/utils'),
      '@/lib': resolve('src/lib'),
    }
  }
});
