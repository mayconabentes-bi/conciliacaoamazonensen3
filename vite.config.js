import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // During development we serve from "/" so the local URL can be simply
  // http://localhost:5173. The repository is deployed to GitHub Pages under
  // "/conciliacaoamazonensen3/", so we only set the full subpath for
  // production builds.
  base: process.env.NODE_ENV === 'production' ? '/conciliacaoamazonensen3/' : '/',

  // Allow Vite to listen on all network interfaces when running in a remote
  // codespace or preview environment. The forwarded port URL will then proxy
  // correctly and avoid GitHub's 401 because the server wasn't reachable.
  server: {
    host: true,
    // optional: keep same port if it's already forwarded
    // strictPort: false,
  },
})
