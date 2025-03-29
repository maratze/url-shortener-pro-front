<template>
    <div v-if="modelValue" class="fixed inset-0 z-[2000] flex items-center justify-center">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-60"></div>

        <!-- Modal content -->
        <div class="relative max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl z-10 p-6">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                    2FA authentication
                </h3>
                <button
                    @click="close"
                    class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="mb-6">
                <p class="text-slate-700 dark:text-slate-300 mb-4">
                    Enter the verification code from your authenticator app to continue.
                </p>

                <!-- Verification code input -->
                <div class="form-field">
                    <label for="verification-code"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Verification code
                    </label>
                    <input
                        id="verification-code"
                        v-model="verificationCode"
                        type="text"
                        maxlength="6"
                        placeholder="123456"
                        class="w-full px-4 py-[9px] border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white"
                        @keyup.enter="verify" />
                    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">
                        {{ error }}
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end space-x-3">
                <button
                    @click="close"
                    class="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600">
                    Cancel
                </button>
                <button
                    @click="verify"
                    :disabled="!canVerify || loading"
                    class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    <span v-if="!loading">Check</span>
                    <span v-else class="flex items-center">
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
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'verify']);

const verificationCode = ref('');

// Computed property to check if the verification code is valid (6 digits)
const canVerify = computed(() => {
    const code = verificationCode.value.trim();
    return code.length === 6 && /^\d+$/.test(code);
});

// Function to close the modal
const close = () => {
    emit('update:modelValue', false);
    navigateTo('/login');
};

// Function to verify the code
const verify = () => {
    if (canVerify.value && !props.loading) {
        emit('verify', verificationCode.value.trim());
    }
};

// Reset the verification code when the modal is shown/hidden
watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        verificationCode.value = '';
    }
});
</script>