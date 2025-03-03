export default defineNuxtPlugin(() => {
    // Base SEO configuration for the app
    const baseHead = {
        title: 'URL Shortener Pro',
        titleTemplate: '%s - URL Shortener Pro',
        meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'Shorten your URLs quickly and securely with URL Shortener Pro. Simple, fast, and reliable URL shortening service.'
            },
            { property: 'og:site_name', content: 'URL Shortener Pro' },
            { hid: 'og:type', property: 'og:type', content: 'website' },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image'
            },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    };

    // Set default head config
    useHead(baseHead);
});