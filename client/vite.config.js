
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api/v1': {
//         // target: 'http://localhost:4000',
//         target: "https://seva-setu.onrender.com",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
//       }
//     }
//   },
//   plugins: [react()],
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://seva-setu.onrender.com',  // Ensure this is correct
        changeOrigin: true,  // Needed for cross-origin requests
        // Remove rewrite if it isn't needed
      }
    }
  },
  plugins: [react()],
});
