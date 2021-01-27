import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [reactRefresh()],
  //optimizeDeps: {
  //  include: 'react-syntax-highlighter/dist/esm/languages/hljs/json'
  //}
}
