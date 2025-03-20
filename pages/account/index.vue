<template>
    <div class="w-full space-y-6">
        <!-- Profile Settings -->
        <section
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Profile Settings</h2>
            </div>

            <form @submit.prevent="saveProfile" class="space-y-5">
                <!-- User email (non-editable) -->
                <div>
                    <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email
                    </label>
                    <div
                        class="flex items-center h-11 px-4 bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-md text-slate-500 dark:text-slate-400 cursor-not-allowed">
                        <span>{{ user?.email }}</span>
                        <span
                            v-if="user?.authProvider === 'google'"
                            class="ml-auto rounded-full text-xs font-medium px-2.5 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            Google Account
                        </span>
                    </div>
                </div>

                <!-- First name and Last name -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="firstName"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            v-model="form.firstName"
                            placeholder="Enter your first name"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                        <p v-if="errors.firstName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{
                            errors.firstName }}</p>
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            v-model="form.lastName"
                            placeholder="Enter your last name"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                        <p v-if="errors.lastName" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.lastName
                            }}</p>
                    </div>
                </div>

                <!-- Error messages -->
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

                <!-- Save button -->
                <div class="pt-2">
                    <button
                        type="submit"
                        class="inline-flex justify-center items-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[120px] h-10"
                        :disabled="isLoading">
                        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <template v-if="isLoading">Saving...</template>
                        <template v-else>Save Changes</template>
                    </button>
                </div>
            </form>
        </section>

        <!-- Advanced Settings -->
        <section
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Advanced Settings</h2>
            </div>

            <div class="space-y-6">
                <!-- Delete Account -->
                <div class="pb-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Delete Account</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Once you delete your account, there is no going back. All your data will be permanently deleted.
                    </p>
                    <button @click="confirmDeleteAccount" type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete Account
                    </button>
                </div>
            </div>
        </section>

        <!-- Confirmation Modal -->
        <div v-if="showConfirmationModal"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 shadow-xl">
                <div class="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white mt-2">Delete Account</h3>
                    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Are you sure you want to delete your account? This action cannot be undone and will result in
                        the loss
                        of all your data.
                    </p>
                </div>
                <div class="flex justify-end space-x-3">
                    <button @click="showConfirmationModal = false" type="button"
                        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cancel
                    </button>
                    <button @click="deleteAccount" type="button"
                        class="inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        :disabled="isDeleting">
                        <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <template v-if="isDeleting">Deleting...</template>
                        <template v-else>Yes, Delete Account</template>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuthService';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const router = useRouter();
const toastStore = useToastStore();
const { user, updateProfile, deleteAccount: deleteAccountService } = useAuthService();

// Form state
const form = reactive({
    firstName: '',
    lastName: '',
});

// Loading states
const isLoading = ref(false);
const isDeleting = ref(false);
const showConfirmationModal = ref(false);

// Error handling
const errors = reactive({
    firstName: '',
    lastName: '',
    general: '',
});

// Clear errors
const clearErrors = () => {
    errors.firstName = '';
    errors.lastName = '';
    errors.general = '';
};

// Set initial form values from user data
onMounted(() => {
    if (user.value) {
        form.firstName = user.value.firstName || '';
        form.lastName = user.value.lastName || '';
    }
});

// Validate form
const validateForm = () => {
    clearErrors();
    let isValid = true;

    // Check first name length if provided
    if (form.firstName && form.firstName.length > 50) {
        errors.firstName = 'First name must be less than 50 characters';
        isValid = false;
    }

    // Check last name length if provided
    if (form.lastName && form.lastName.length > 50) {
        errors.lastName = 'Last name must be less than 50 characters';
        isValid = false;
    }

    return isValid;
};

// Save profile
const saveProfile = async () => {
    if (!validateForm()) return;

    isLoading.value = true;
    clearErrors();

    try {
        const result = await updateProfile({
            firstName: form.firstName,
            lastName: form.lastName,
        });

        if (result.success) {
            toastStore.success('Profile updated successfully');
        } else {
            errors.general = result.error || 'Failed to update profile';
            toastStore.error(errors.general);
        }
    } catch (error: any) {
        errors.general = error.message || 'An error occurred while updating profile';
        toastStore.error(errors.general);
    } finally {
        isLoading.value = false;
    }
};

// Confirm delete account
const confirmDeleteAccount = () => {
    showConfirmationModal.value = true;
};

// Delete account
const deleteAccount = async () => {
    isDeleting.value = true;

    try {
        const result = await deleteAccountService();

        if (result.success) {
            showConfirmationModal.value = false;
            toastStore.success('Your account has been successfully deleted');

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            toastStore.error(result.error || 'Failed to delete account');
        }
    } catch (error: any) {
        toastStore.error(error.message || 'An error occurred while deleting your account');
    } finally {
        isDeleting.value = false;
    }
};
</script>

<style scoped>
/* Стили для input с состоянием disabled */
input:disabled {
    opacity: 0.8;
}

/* Стили для кнопки, чтобы она не меняла размер */
button[type="submit"] {
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

button[type="submit"] svg {
    flex-shrink: 0;
}
</style>