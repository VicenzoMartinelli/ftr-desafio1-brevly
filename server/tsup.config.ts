import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  clean: true,
  format: 'esm',
  target: 'esnext',
  outDir: 'dist',
  publicDir: false,
  loader: {
    '.sql': 'copy',
  },
  onSuccess: async () => {
    console.log('Copying SQL files...')
  },
})
