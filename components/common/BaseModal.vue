<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Затемнение фона -->
        <div
            class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
            @click="$emit('close')"></div>

        <!-- Модальное окно -->
        <div
            class="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-screen-md w-full m-4 max-h-[90vh] flex flex-col"
            :class="[
                modalSize === 'small' ? 'max-w-md' : '',
                modalSize === 'medium' ? 'max-w-screen-md' : '',
                modalSize === 'large' ? 'max-w-screen-lg' : '',
                modalSize === 'full' ? 'max-w-screen-xl' : ''
            ]">
            <!-- Заголовок -->
            <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 px-6 py-4">
                <h3 class="text-lg font-medium text-slate-900 dark:text-white">
                    {{ title }}
                </h3>
                <button
                    @click="$emit('close')"
                    class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 focus:outline-none">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Основное содержимое -->
            <div class="overflow-y-auto">
                <slot></slot>
            </div>

            <!-- Футер, если есть -->
            <div v-if="$slots.footer" class="border-t border-slate-200 dark:border-slate-700 px-6 py-4">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    modalSize: {
        type: String,
        default: 'medium',
        validator: (value: string) => ['small', 'medium', 'large', 'full'].includes(value)
    }
});

defineEmits(['close']);
</script>