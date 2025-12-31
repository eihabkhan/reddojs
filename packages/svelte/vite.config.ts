import { resolve } from 'node:path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), dts({
    rollupTypes: true,
    tsconfigPath: './tsconfig.app.json',
  }) as any],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReddoSvelte',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['svelte', '@reddojs/core'],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
  },
})
