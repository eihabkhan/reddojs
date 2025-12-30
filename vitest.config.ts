import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'core',
          root: './packages/core',
        },
        resolve: {
          alias: {
            '@core': resolve(__dirname, './packages/core/src'),
          },
        },
      },
    ],
  },
})
