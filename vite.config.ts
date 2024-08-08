import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          'excalidraw': ['@excalidraw/excalidraw'],
          'headlessui': ['@headlessui/react'],
          'tiptap': ['@tiptap/react'],
          'lucide': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 2500
  }
})
