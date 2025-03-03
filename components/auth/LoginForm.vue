<template>
	<div class="glass-card max-w-md mx-auto">
		<h2 class="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
			Log In to Your Account
		</h2>

		<form @submit.prevent="handleSubmit" class="space-y-6">
			<InputField
				v-model="form.email"
				label="Email"
				type="email"
				placeholder="your@email.com"
				required
				:error="errors.email"
			/>

			<InputField
				v-model="form.password"
				label="Password"
				type="password"
				placeholder="Your password"
				required
				:error="errors.password"
			/>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						v-model="form.rememberMe"
						type="checkbox"
						class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-slate-700 dark:text-slate-300">
						Remember me
					</label>
				</div>

				<div>
					<NuxtLink to="/forgot-password" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
						Forgot your password?
					</NuxtLink>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<Button
					type="submit"
					variant="primary"
					class="w-full"
					:loading="loading"
				>
					Log In
				</Button>

				<p class="text-center text-sm text-slate-600 dark:text-slate-400">
					Don't have an account?
					<NuxtLink to="/register" class="text-primary-600 dark:text-primary-400 hover:underline">
						Create one
					</NuxtLink>
				</p>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';

const authStore = useAuthStore();
const toastStore = useToastStore();

const loading = ref(false);
const form = reactive({
	email: '',
	password: '',
	rememberMe: false
});

const errors = reactive({
	email: '',
	password: '',
	general: ''
});

const clearErrors = () => {
	errors.email = '';
	errors.password = '';
	errors.general = '';
};

const validateForm = () => {
	clearErrors();
	let isValid = true;

	if (!form.email) {
		errors.email = 'Email is required';
		isValid = false;
	} else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
		errors.email = 'Please enter a valid email address';
		isValid = false;
	}

	if (!form.password) {
		errors.password = 'Password is required';
		isValid = false;
	}

	return isValid;
};

const handleSubmit = async () => {
	if (!validateForm()) return;

	loading.value = true;

	try {
		await authStore.login({
			email: form.email,
			password: form.password
		});

		if (authStore.error) {
			errors.general = authStore.error;
			toastStore.error(authStore.error);
		} else if (authStore.isAuthenticated) {
			toastStore.success('Successfully logged in!');
			// For future implementation: Redirect to dashboard or previous page
		}
	} catch (error: any) {
		errors.general = error.message || 'Failed to log in. Please try again.';
		toastStore.error(errors.general);
	} finally {
		loading.value = false;
	}
};
</script>