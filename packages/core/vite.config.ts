import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Reddo',
      formats: ['es', 'cjs'],
      fileName: format => format === 'es' ? 'index.js' : 'index.cjs',
    },
  },
})
