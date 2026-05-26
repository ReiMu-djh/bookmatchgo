import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { mkdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROUTES = ['quiz', 'result', 'token', 'story']

function setupSpaFallback() {
  const distDir = join(process.cwd(), 'dist')
  const srcHtml = join(distDir, 'index.html')
  if (!existsSync(srcHtml)) return

  const bookmatchDir = join(distDir, 'bookmatch')
  if (!existsSync(bookmatchDir)) mkdirSync(bookmatchDir, { recursive: true })

  copyFileSync(srcHtml, join(bookmatchDir, 'index.html'))

  for (const route of ROUTES) {
    const targetDir = join(bookmatchDir, route)
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })
    copyFileSync(srcHtml, join(targetDir, 'index.html'))
  }
}

export default defineConfig({
  base: '/bookmatch/',
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'spa-fallback',
      closeBundle() {
        setupSpaFallback()
      },
    },
  ],
})
