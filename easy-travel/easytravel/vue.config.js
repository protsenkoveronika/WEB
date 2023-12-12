/*still working*/
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    client: {
      overlay: false
    },
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true
      },
    }
  },
  transpileDependencies: true
})
