<template>
    <div class="flex items-center space-x-3">
        <NuxtLink to="/register" class="register-btn hidden sm:flex">Register</NuxtLink>
        <NuxtLink to="/login" class="login-btn">Login</NuxtLink>
    </div>
</template>

<style scoped>
.login-btn {
    @apply px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center font-medium;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.register-btn {
    @apply px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white dark:text-white rounded-lg transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center font-medium;
}
</style>

