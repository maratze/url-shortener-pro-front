<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Password Change -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Password Change</h2>
                </div>

                <!-- Information for Google users -->
                <div v-if="isGoogleUser"
                    class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>You signed in with Google. Set a password to be able to log in with email and password.</span>
                </div>

                <form @submit.prevent="changePassword" class="space-y-4">
                    <!-- Two columns for more compact display of fields -->
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Current password (only for non-Google users) -->
                        <div v-if="!isGoogleUser" class="form-field">
                            <label for="currentPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Current Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="currentPassword" v-model="form.currentPassword"
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Enter current password" :required="!isGoogleUser" />
                                <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showCurrentPassword" xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.currentPassword }}
                            </p>
                        </div>

                        <!-- New password -->
                        <div class="form-field">
                            <label for="newPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                New Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="newPassword" v-model="form.newPassword"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Enter new password" required />
                                <button type="button" @click="showNewPassword = !showNewPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.newPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.newPassword }}
                            </p>
                        </div>

                        <!-- Confirm new password -->
                        <div class="form-field">
                            <label for="confirmPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Confirm Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="confirmPassword" v-model="form.confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Confirm password" required />
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.confirmPassword }}
                            </p>
                        </div>
                    </div>

                    <!-- Password strength indicator -->
                    <div v-if="form.newPassword" class="mt-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs font-medium" :class="passwordStrengthClass">
                                {{ passwordStrengthText }}
                            </span>
                            <span class="text-xs text-slate-500 dark:text-slate-400">
                                {{ passwordTipsText }}
                            </span>
                        </div>
                        <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-300" :class="strengthColorClass(0)"
                                :style="{ width: passwordStrength > 0 ? '25%' : '5%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(1)"
                                :style="{ width: passwordStrength > 1 ? '50%' : '0%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(2)"
                                :style="{ width: passwordStrength > 2 ? '75%' : '0%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(3)"
                                :style="{ width: passwordStrength > 3 ? '100%' : '0%' }"></div>
                        </div>
                    </div>

                    <!-- Error message -->
                    <div v-if="errors.general"
                        class="py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>{{ errors.general }}</span>
                    </div>

                    <!-- Change password button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="inline-flex justify-center items-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[120px] h-10"
                            :disabled="isLoading">
                            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <template v-if="isLoading">Saving...</template>
                            <template v-else-if="isGoogleUser">Set Password</template>
                            <template v-else>Change Password</template>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuthService';
import type { ChangePasswordRequest } from '~/types/auth';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();
const { changePassword: changePasswordService, user } = useAuthService();

// Form state
const form = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

// Password visibility states
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Loading state
const isLoading = ref(false);

// Validation errors
const errors = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
});

// Clear errors
const clearErrors = () => {
    errors.currentPassword = '';
    errors.newPassword = '';
    errors.confirmPassword = '';
    errors.general = '';
};

// Password tips
const passwordTipsText = computed(() => {
    if (!form.newPassword) return 'Enter password';
    if (passwordStrength.value < 2) return 'Add uppercase letters, numbers, or special characters';
    return '';
});

// Calculate password strength
const passwordStrength = computed(() => {
    const password = form.newPassword;
    if (!password) return 0;

    let score = 0;

    // Password length
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 0.5;

    // Combination of different characters
    if (/[A-Z]/.test(password)) score += 0.5;
    if (/[a-z]/.test(password)) score += 0.5;
    if (/[0-9]/.test(password)) score += 0.5;
    if (/[\W_]/.test(password)) score += 1;

    return Math.min(4, Math.floor(score));
});

// Password strength indicator text
const passwordStrengthText = computed(() => {
    switch (passwordStrength.value) {
        case 0:
            return 'Too weak';
        case 1:
            return 'Weak';
        case 2:
            return 'Good';
        case 3:
            return 'Strong';
        case 4:
            return 'Very strong';
        default:
            return '';
    }
});

// Color class for the password strength indicator
const passwordStrengthClass = computed(() => {
    switch (passwordStrength.value) {
        case 0:
            return 'text-red-600 dark:text-red-400';
        case 1:
            return 'text-orange-600 dark:text-orange-400';
        case 2:
            return 'text-yellow-600 dark:text-yellow-400';
        case 3:
            return 'text-green-600 dark:text-green-400';
        case 4:
            return 'text-emerald-600 dark:text-emerald-400';
        default:
            return '';
    }
});

// Color class for the progress indicator
const strengthColorClass = (level: number) => {
    if (passwordStrength.value <= level) return 'bg-slate-200 dark:bg-slate-700';

    switch (level) {
        case 0:
            return 'bg-red-500';
        case 1:
            return 'bg-orange-500';
        case 2:
            return 'bg-yellow-500';
        case 3:
            return 'bg-emerald-500';
        default:
            return 'bg-slate-200 dark:bg-slate-700';
    }
};

// Determine if the user is registered via Google
const isGoogleUser = computed(() => {
    // Add logging for debugging
    console.log('User auth provider:', user.value?.authProvider);
    // Check for authProvider and its value (convert to lowercase for comparison)
    return user.value?.authProvider?.toLowerCase() === 'google';
});

// Form validation
const validateForm = () => {
    clearErrors();
    let isValid = true;

    // If the user is registered via Google, we don't require the current password
    if (!isGoogleUser.value && !form.currentPassword) {
        errors.currentPassword = 'Enter current password';
        isValid = false;
    }

    if (!form.newPassword) {
        errors.newPassword = 'Enter new password';
        isValid = false;
    } else if (form.newPassword.length < 6) {
        errors.newPassword = 'Password must contain at least 6 characters';
        isValid = false;
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = 'Confirm new password';
        isValid = false;
    } else if (form.newPassword !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    return isValid;
};

// Form submission handler
const changePassword = async () => {
    if (!validateForm()) return;

    isLoading.value = true;
    clearErrors();

    try {
        // If the user is from Google, send the request with the isGoogleUser flag
        const passwordData = isGoogleUser.value
            ? { newPassword: form.newPassword, isGoogleUser: true }
            : { currentPassword: form.currentPassword, newPassword: form.newPassword };

        const result = await changePasswordService(passwordData as any);

        if (result.success) {
            // Convert the result to the correct type for access to the message property
            const successResult = result as { success: true; message: string };
            toastStore.success(successResult.message || 'Password changed successfully');

            // Clear the form
            form.currentPassword = '';
            form.newPassword = '';
            form.confirmPassword = '';
        } else {
            // Convert the result to the correct type for access to the error property
            const errorResult = result as { success: false; error: string };
            errors.general = errorResult.error || 'Failed to change password';
            toastStore.error(errors.general);
        }
    } catch (error: any) {
        const errorMessage = error.message || 'An error occurred while changing the password';
        errors.general = errorMessage;
        toastStore.error(errorMessage);
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #1e293b;
    font-size: 0.875rem;
}

.dark .form-input {
    background-color: #1e293b;
    border-color: #334155;
    color: #f8fafc;
}

.form-error {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}
</style>