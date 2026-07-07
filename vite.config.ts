import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/Techfest-IITB-Chronos/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
