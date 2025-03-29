<template>
    <div class="flex items-center space-x-4 min-h-[42px]">
        <NuxtLink :to="navigationLink" class="flex items-center space-x-2">
            <div
                class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                TL
            </div>
            <span class="text-xl font-bold text-slate-900 dark:text-white hidden sm:inline-block">TinyLink</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
defineProps({
	navigationLink: {
		type: String,
		default: '/'
	}
})
</script>