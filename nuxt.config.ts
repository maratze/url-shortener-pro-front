// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
  ],

  app: {
      head: {
          title: 'URL Shortener Pro',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'description', content: 'Профессиональный сервис сокращения URL с аналитикой и расширенной функциональностью' }
          ],
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
              { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
              { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
          ]
      }
  },

  runtimeConfig: {
      public: {
          apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://localhost:7095/api'
      }
  },

  compatibilityDate: '2025-03-03'
})