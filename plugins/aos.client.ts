import AOS from 'aos';
import 'aos/dist/aos.css';

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        nuxtApp.hook('app:mounted', () => {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                delay: 100,
                disable: window.innerWidth < 640, // Disable on small screens
            });
        });

        // Refresh AOS when the page has been fully loaded
        // This helps with elements that might render after the initial page load
        window.addEventListener('load', () => {
            AOS.refresh();
        });

        // Reinitialize AOS on route change
        nuxtApp.hook('page:transition:finish', () => {
            AOS.refresh();
        });
    }
});