export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: true },

    typescript: {
        strict: true,
        typeCheck: true
    },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/global.css'
    ],

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@sidebase/nuxt-auth'
    ],

    auth: {
        provider: {
            type: 'authjs',
        },
        globalAppMiddleware: false
    },

    colorMode: {
        classSuffix: '',
        preference: 'system', // default theme
        dataValue: 'theme', // data-theme attribute
        fallback: 'light'
    },

    app: {
        head: {
            title: 'TinyLink - Shorten Your URLs',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Shorten your URLs quickly and securely with TinyLink. Simple, fast, and reliable URL shortening service.'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },

    compatibilityDate: '2025-03-04',

    runtimeConfig: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authSecret: process.env.AUTH_SECRET || 'your-development-secret-key',

        public: {
            apiBase: process.env.API_BASE_URL || 'https://localhost:7095',
            baseUrl: process.env.BASE_URL || 'http://localhost:3000'
        }
    },

    nitro: {
        devProxy: {
            '/api': {
                target: process.env.API_BASE_URL || 'https://localhost:7095',
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    }
})