import { defineNuxtPlugin } from '#app';
import { useToastStore } from '~/stores/toast';

export default defineNuxtPlugin((nuxtApp) => {
    // Make toast available in templates via $toast
    nuxtApp.provide('toast', useToastStore());
});