
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api/v1': {
  //       // target: 'http://projectsevasetu.up.railway.app',
  //       target: "https://seva-setu.onrender.com",
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
  //       ws:true,
  //     }
  //   }
  // },
  
  plugins: [react()],
});
