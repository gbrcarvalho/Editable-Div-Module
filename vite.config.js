import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'build/index.js'),
      name: 'index',
      fileName: 'bundle',
      formats: ['iife']
    },
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
})

