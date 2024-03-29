import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  router: {
    middleware: ['auth.global']
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://bazi-back.netall.live/api/'
    }
  },
  vite: {
    plugins: [eslintPlugin()]
  },
  plugins: ['@/plugins/fetch-client.js', '@/plugins/services.js', '@/plugins/dayjs.js'],
  css: ['@/assets/css/app.scss', '@/assets/css/colors.scss'],
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/eslint-module'
  ],
  postcss: {
    plugins: {
      'postcss-rtlcss': {}
    }
  },
  quasar: {
    lang: 'fa-IR',
    iconSet: 'svg-material-icons-round',
    sassVariables: '@/assets/css/quasar.variables.scss',
    plugins: [
      'Dialog',
      'Loading',
      'Notify'
    ],
    extras: {
      font: 'roboto-font'
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true
        }
      }
    }
  }
})
