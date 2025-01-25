import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteStaticCopy({
    targets: [
      { src: 'src/index.html', dest: '' },
      { src: 'node_modules/scichart/_wasm/scichart2d.data', dest: '' },
      { src: 'node_modules/scichart/_wasm/scichart2d.wasm', dest: '' },
      // Optional, if using 3D charts
      { src: 'node_modules/scichart/_wasm/scichart3d.data', dest: '' },
      { src: 'node_modules/scichart/_wasm/scichart3d.wasm', dest: '' },
    ],
  })]

})
