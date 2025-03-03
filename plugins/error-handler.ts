export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error) => {
        console.error('Vue Error:', error);
        // Here you could also integrate with an error tracking service like Sentry
    });

    nuxtApp.hook('app:error', (error) => {
        console.error('App Error:', error);
    });
});