<template>
    <div class="relative">
        <button
            id="user-menu-button"
            @click="isOpen = !isOpen"
            @keydown.escape="isOpen = false"
            class="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white rounded-md"
            aria-expanded="false"
            aria-haspopup="true">
            <span class="sr-only">Open user menu</span>
            <div class="hidden md:flex md:items-center md:space-x-2">
                <div class="text-right">
                    <div class="text-sm text-white">{{ userFullName }}</div>
                    <div class="text-xs text-slate-300">
                        {{ isPremium ? 'Premium' : 'Free' }}
                    </div>
                </div>
            </div>
            <div
                class="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                {{ userInitials }}
            </div>
        </button>

        <div v-if="isOpen" @click.away="isOpen = false"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <NuxtLink to="/dashboard"
                    class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem" tabindex="-1" @click="isOpen = false">
                    Dashboard
                </NuxtLink>
                <NuxtLink to="/account"
                    class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem" tabindex="-1" @click="isOpen = false">
                    Account Settings
                </NuxtLink>
                <button @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    role="menuitem" tabindex="-1">
                    Sign Out
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthService } from '~/composables/useAuthService';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const { user, isPremium, logout: authLogout } = useAuthService();
const router = useRouter();

const userFullName = computed(() => {
    if (user.value?.firstName && user.value?.lastName) {
        return `${user.value.firstName} ${user.value.lastName}`;
    } else if (user.value?.firstName) {
        return user.value.firstName;
    } else if (user.value?.lastName) {
        return user.value.lastName;
    } else {
        return user.value?.email?.split('@')[0] || 'User';
    }
});

const userInitials = computed(() => {
    const firstName = user.value?.firstName || '';
    const lastName = user.value?.lastName || '';

    if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    } else if (firstName) {
        return firstName.charAt(0);
    } else if (lastName) {
        return lastName.charAt(0);
    } else if (user.value?.email) {
        return user.value.email.charAt(0).toUpperCase();
    } else {
        return 'U';
    }
});

// Close the menu when pressing escape
const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        isOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscape);
});

const logout = async () => {
    await authLogout();
    isOpen.value = false;
    router.push('/');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>