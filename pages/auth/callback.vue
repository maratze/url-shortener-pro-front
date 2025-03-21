<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-4">
        <div v-if="loading" class="text-center">
            <div
                class="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4 mx-auto">
            </div>
            <p class="text-lg text-slate-700 dark:text-slate-300">Completing login...</p>
        </div>
        <div v-else-if="error" class="text-center max-w-md">
            <div class="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-red-700 dark:text-red-400 mb-6">
                <p>{{ error }}</p>
            </div>
            <NuxtLink to="/login" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                Back to login page
            </NuxtLink>
        </div>
    </div>

    <!-- 2FA Modal -->
    <TwoFactorAuthModal
        v-model="showTwoFactorAuthModal"
        :error="twoFactorAuthError"
        :loading="verifyingTwoFactorAuth"
        @verify="verifyTwoFactorAuth" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const toastStore = useToastStore();

const loading = ref(true);
const error = ref('');
const authCompleted = ref(false); // Flag to prevent duplicate processing

// 2FA state
const showTwoFactorAuthModal = ref(false);
const twoFactorAuthError = ref('');
const verifyingTwoFactorAuth = ref(false);
const oauthEmail = ref('');
const returnUrl = ref('/dashboard');

definePageMeta({
    layout: 'empty'
});

// Function to verify 2FA code
const verifyTwoFactorAuth = async (code: string) => {
    if (!oauthEmail.value) {
        twoFactorAuthError.value = 'Authentication error: email not found';
        return;
    }

    verifyingTwoFactorAuth.value = true;
    twoFactorAuthError.value = '';

    try {
        const result = await authStore.verifyTwoFactorCode(code);

        if (result.success) {
            showTwoFactorAuthModal.value = false;
            toastStore.success('Login completed successfully!');

            // Redirect user to the target page
            setTimeout(() => {
                router.push(returnUrl.value);
            }, 300);
        } else {
            twoFactorAuthError.value = result.error || 'Invalid verification code';
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error checking code. Please try again.';
        twoFactorAuthError.value = errorMessage;
    } finally {
        verifyingTwoFactorAuth.value = false;
    }
};

onMounted(async () => {
    if (authCompleted.value) return; // Prevent duplicate execution

    try {
        // Get parameters from URL
        const token = route.query.token as string;
        const email = route.query.email as string;
        returnUrl.value = (route.query.returnUrl as string) || '/dashboard';
        const requiresTwoFactor = route.query.requiresTwoFactor === 'true';

        if (!email) {
            throw new Error('User email not found');
        }

        oauthEmail.value = email;
        console.log('Received data:', {
            token: token ? 'Present' : 'Missing',
            email,
            requiresTwoFactor
        });

        // Check if 2FA is required
        if (requiresTwoFactor) {
            loading.value = false;
            showTwoFactorAuthModal.value = true;
            authStore.setTwoFactorPending(email);
            return;
        }

        if (!token) {
            throw new Error('Authentication token not found');
        }

        // Save token
        authStore.setToken(token);

        // Set authentication completion flag
        authCompleted.value = true;

        // Create base user data with the received email
        // to prevent error when accessing email
        authStore.setUserData({
            id: 0,  // Will be updated after fetchCurrentUser
            email: email,
            token: token,
            isPremium: false,
            isEmailVerified: false,
            registrationDate: new Date().toISOString()
        });

        // Now request full user data from the server
        await authStore.fetchCurrentUser();

        if (!authStore.isAuthenticated) {
            throw new Error('Failed to complete authentication');
        }

        // Show success login message only once
        toastStore.success('Login completed successfully!');

        // Redirect user to the target page
        setTimeout(() => {
            router.push(returnUrl.value);
        }, 300);
    } catch (err) {
        console.error('Authentication error via OAuth:', err);
        error.value = err instanceof Error ? err.message : 'An error occurred during Google login';
        toastStore.error(error.value);
        loading.value = false;
    }
});
</script>