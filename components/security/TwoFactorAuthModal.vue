<template>
    <div v-if="modelValue" class="fixed inset-0 z-[2000] flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeOnBackdrop ? close : null"></div>

        <!-- Modal Content -->
        <div
            class="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 class="text-lg font-medium text-slate-900 dark:text-white">{{ title }}</h3>
                <button v-if="!loading" @click="close"
                    class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6">
                <div class="flex flex-col items-center space-y-6">
                    <!-- Иконка -->
                    <div
                        class="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                        <svg class="h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <!-- Описание -->
                    <div class="text-center">
                        <p class="text-slate-700 dark:text-slate-300">
                            For this account, two-factor authentication is enabled.
                        </p>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Please enter the verification code from the authenticator app.
                        </p>
                    </div>

                    <!-- Verification code input -->
                    <div class="w-full">
                        <div class="relative">
                            <input
                                v-model="verificationCode"
                                type="text"
                                maxlength="6"
                                placeholder="Enter 6-digit code"
                                class="block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-center text-xl tracking-wide"
                                :disabled="loading"
                                @keyup.enter="verify" />
                        </div>
                        <div v-if="error" class="mt-3 text-sm text-red-600 dark:text-red-400 text-center">
                            {{ error }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
                <button
                    v-if="!loading"
                    @click="close"
                    class="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                    Cancel
                </button>

                <button
                    @click="verify"
                    :disabled="!isCodeValid || loading"
                    class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="loading" class="flex items-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Checking...
                    </span>
                    <span v-else>Login</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: '2FA authentication'
    },
    error: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    closeOnBackdrop: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'verify']);

const verificationCode = ref('');

// Валидация кода (должен быть 6 цифр)
const isCodeValid = computed(() => {
    return verificationCode.value.length === 6 && /^\d+$/.test(verificationCode.value);
});

// Очистка кода при закрытии модального окна
watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        verificationCode.value = '';
    }
});

// Закрытие модального окна
const close = () => {
    emit('update:modelValue', false);
};

// Проверка кода
const verify = () => {
    if (!isCodeValid.value || props.loading) return;
    emit('verify', verificationCode.value);
};
</script>