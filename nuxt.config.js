const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./app/config/env.${environment}.js`);
export default {
  mode: 'spa',
  srcDir: 'app',
  server: {
    port: 9010,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/utils',
    '@/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['bootstrap-vue/nuxt', {
      icons: true,
    }],
    '@nuxtjs/axios',
    // '@/plugins/api.js',
  ],
  /*
  ** Build configuration
  */
  env: envSet,
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  router: {
    middleware: ['authenticated', 'transferIndex']
  }
}
