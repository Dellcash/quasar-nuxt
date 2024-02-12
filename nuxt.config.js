export default defineNuxtConfig({
  // ssr: false,
  runtimeConfig: {
    public: {
      baseURL: 'https://bazi-back.netall.live/'
    }
  },
  plugins: ['@/plugins/fetch-client.js'],
  css: ['@/assets/css/app.scss', '@/assets/css/colors.scss'],
  modules: [
    'nuxt-quasar-ui'
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
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
})
