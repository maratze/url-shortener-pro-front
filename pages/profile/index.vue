<template>
    <div class="w-full">
        <div class="space-y-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h1>

            <!-- Authentication Status -->
            <AuthStatusCard />

            <!-- Profile Information -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Profile Information</h2>
                </div>

                <form @submit.prevent="updateProfile" class="max-w-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="space-y-1">
                            <label for="firstName" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                v-model="form.firstName"
                                type="text"
                                class="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm"
                                placeholder="Your first name" />
                        </div>
                        <div class="space-y-1">
                            <label for="lastName" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                v-model="form.lastName"
                                type="text"
                                class="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm"
                                placeholder="Your last name" />
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            :value="user?.email"
                            type="email"
                            disabled
                            class="block w-full rounded-md border-slate-300 shadow-sm bg-slate-50 dark:bg-slate-600 dark:border-slate-600 dark:text-slate-400 text-sm" />
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Email address cannot be changed for security reasons
                        </p>
                    </div>

                    <div class="mt-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            :disabled="isSubmitting">
                            <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>

            <!-- Account Settings -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Account Settings</h2>
                </div>

                <div class="space-y-6">
                    <div>
                        <h3 class="text-base font-medium text-slate-900 dark:text-white mb-2">Account Security</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Manage your password and enable two-factor authentication
                        </p>
                        <NuxtLink to="/account/security"
                            class="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                            Security Settings →
                        </NuxtLink>
                    </div>

                    <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h3 class="text-base font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Once you delete your account, all of your data will be permanently removed.
                        </p>
                        <button
                            @click="showDeleteConfirmation = true"
                            class="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            Delete Account
                        </button>
                    </div>
                </div>
            </section>
        </div>

        <!-- Delete Account Confirmation Modal -->
        <Teleport to="body">
            <div v-if="showDeleteConfirmation"
                class="fixed inset-0 bg-slate-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6" @click.stop>
                    <h3 class="text-lg font-medium text-red-600 dark:text-red-400">Delete Account</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Are you sure you want to delete your account? All of your data will be permanently removed. This
                        action cannot be undone.
                    </p>
                    <div class="mt-4 flex justify-end space-x-3">
                        <button
                            @click="showDeleteConfirmation = false"
                            class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                            Cancel
                        </button>
                        <button
                            @click="deleteAccount"
                            class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            :disabled="isDeleting">
                            <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthService } from '~/composables/useAuthService';
import AuthStatusCard from '~/components/security/AuthStatusCard.vue';

definePageMeta({
    middleware: ['auth']
});

const { user, updateProfile: updateUserProfile } = useAuthService();

// Form state
const form = ref({
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || ''
});

const isSubmitting = ref(false);
const showDeleteConfirmation = ref(false);
const isDeleting = ref(false);

// Update profile information
const updateProfile = async () => {
    if (isSubmitting.value) return;

    isSubmitting.value = true;
    try {
        await updateUserProfile({
            firstName: form.value.firstName.trim() || undefined,
            lastName: form.value.lastName.trim() || undefined
        });

        alert('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
    } finally {
        isSubmitting.value = false;
    }
};

// Delete account
const deleteAccount = async () => {
    if (isDeleting.value) return;

    isDeleting.value = true;
    try {
        // Add deletion logic here
        await useAuthService().deleteAccount();
        alert('Your account has been deleted');
        // Redirect will happen automatically through auth middleware
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
        showDeleteConfirmation.value = false;
    } finally {
        isDeleting.value = false;
    }
};
</script>