export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  typescript: {
      strict: true,
      typeCheck: true
  },

  css: [
      '~/assets/css/main.css',
  ],

  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@nuxtjs/color-mode',
  ],

  colorMode: {
      classSuffix: '',
      preference: 'system', // default theme
      dataValue: 'theme', // data-theme attribute
      fallback: 'light'
  },

  app: {
      head: {
          title: 'URL Shortener Pro',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              {
                  hid: 'description',
                  name: 'description',
                  content: 'Shorten your URLs quickly and securely with URL Shortener Pro. Simple, fast, and reliable URL shortening service.'
              }
          ],
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
          ]
      }
  },

  runtimeConfig: {
      public: {
          apiBase: process.env.API_BASE_URL || 'https://localhost:7095'
      }
  },

  compatibilityDate: '2025-03-04'
})