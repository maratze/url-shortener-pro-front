<template>
    <header
        class="fixed top-0 left-0 right-0 py-4 transition-all duration-300 z-[2000]"
        :class="{
            'backdrop-blur-md bg-white/80 dark:bg-slate-900/80 shadow-md': isScrolled,
            'bg-transparent': !isScrolled
        }">
        <div class="container mx-auto px-6 max-w-7xl">
            <div class="flex items-center justify-between">
                <Logo :navigationLink="'/dashboard'" />

                <nav class="hidden md:flex items-center justify-center space-x-6">
                    <NuxtLink to="/dashboard" class="nav-link" active-class="router-link-active">Dashboard</NuxtLink>
                    <NuxtLink to="/analytics" class="nav-link" active-class="router-link-active">Analytics</NuxtLink>
                    <NuxtLink to="/qr-codes" class="nav-link" active-class="router-link-active">QR Codes</NuxtLink>
                </nav>

                <div class="flex items-center space-x-3">
                    <UserMenu />
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import Logo from './header/Logo.vue';
import UserMenu from './UserMenu.vue';

const authStore = useAuthStore();
const isScrolled = ref(false);

const checkScroll = () => {
    isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    authStore.fetchCurrentUser();
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped>
.nav-link {
    @apply text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors;
}

.router-link-active {
    @apply text-purple-600 dark:text-purple-400 font-semibold;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s ease-out;
    max-height: 300px;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
}
</style>