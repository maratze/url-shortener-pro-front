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
                <button @click="close" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="p-6">
                <div class="flex flex-col items-center">
                    <!-- Иконка -->
                    <div
                        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                        <svg class="h-6 w-6 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <!-- Описание -->
                    <p class="text-center text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {{ message }}
                    </p>

                    <!-- Verification code input -->
                    <div class="w-full mt-2">
                        <label for="verificationCode"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Verification code
                        </label>
                        <div class="mt-1">
                            <input
                                id="verificationCode"
                                v-model="verificationCode"
                                type="text"
                                maxlength="6"
                                placeholder="Enter 6-digit code"
                                class="block w-full px-3 py-[9px] border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white" />
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Open the authenticator app and enter the 6-digit code generated for this account
                            </p>
                        </div>
                        <div v-if="verificationError" class="mt-2 text-sm text-red-600">
                            {{ verificationError }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
                <button
                    @click="close"
                    class="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                    Cancel
                </button>

                <button
                    @click="verify"
                    :disabled="!verificationCode || verificationCode.length < 6 || isVerifying"
                    class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="isVerifying" class="flex items-center">
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
                    <span v-else>Confirm</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Подтверждение действия'
    },
    message: {
        type: String,
        default: 'Введите код подтверждения из приложения-аутентификатора для продолжения'
    },
    closeOnBackdrop: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'verify']);

const verificationCode = ref('');
const verificationError = ref('');
const isVerifying = ref(false);

const close = () => {
    // Reset state when closing
    verificationCode.value = '';
    verificationError.value = '';
    isVerifying.value = false;
    emit('update:modelValue', false);
};

const verify = async () => {
    // Check input
    if (!verificationCode.value || verificationCode.value.length < 6) {
        verificationError.value = 'Enter a valid 6-digit code';
        return;
    }

    isVerifying.value = true;
    verificationError.value = '';

    try {
        // Call parent method to verify code
        emit('verify', verificationCode.value);
    } catch (error) {
        console.error('Verification error:', error);
        verificationError.value = 'Failed to verify code. Please try again.';
        isVerifying.value = false;
    }
};
</script>