import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works from any GitHub Pages path
// (username.github.io/garage/, a custom domain, or a project subpath).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
