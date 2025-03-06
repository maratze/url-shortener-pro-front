<template>
	<div class="glass-card max-w-md mx-auto">
		<h2 class="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
			Create Your Account
		</h2>

		<form @submit.prevent="handleSubmit" class="space-y-6">
			<InputField
				v-model="form.name"
				label="Full Name"
				placeholder="John Doe"
				required
				:error="errors.name"
			/>

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
				placeholder="Create a strong password"
				required
				:error="errors.password"
			/>

			<InputField
				v-model="form.confirmPassword"
				label="Confirm Password"
				type="password"
				placeholder="Re-enter your password"
				required
				:error="errors.confirmPassword"
			/>

			<div class="flex items-center">
				<input
					id="terms"
					v-model="form.agreeToTerms"
					type="checkbox"
					class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
					required
				/>
				<label for="terms" class="ml-2 block text-sm text-slate-700 dark:text-slate-300">
					I agree to the
					<NuxtLink to="/terms" class="text-primary-600 dark:text-primary-400 hover:underline">
						Terms of Service
					</NuxtLink>
					and
					<NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline">
						Privacy Policy
					</NuxtLink>
				</label>
			</div>

			<div v-if="errors.general" class="py-2 px-3 bg-red-100 text-red-700 rounded-md text-sm">
				{{ errors.general }}
			</div>

			<div class="flex flex-col gap-4">
				<Button
					type="submit"
					variant="primary"
					class="w-full"
					:loading="loading"
				>
					Create Account
				</Button>

				<p class="text-center text-sm text-slate-600 dark:text-slate-400">
					Already have an account?
					<NuxtLink to="/login" class="text-primary-600 dark:text-primary-400 hover:underline">
						Log in
					</NuxtLink>
				</p>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';
import InputField from '~/components/common/InputField.vue';

const authStore = useAuthStore();
const toastStore = useToastStore();

const loading = ref(false);
const form = reactive({
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	agreeToTerms: false
});

const errors = reactive({
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	general: ''
});

const clearErrors = () => {
	errors.name = '';
	errors.email = '';
	errors.password = '';
	errors.confirmPassword = '';
	errors.general = '';
};

const validateForm = () => {
	clearErrors();
	let isValid = true;

	if (!form.name) {
		errors.name = 'Name is required';
		isValid = false;
	}

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
	} else if (form.password.length < 8) {
		errors.password = 'Password must be at least 8 characters';
		isValid = false;
	}

	if (form.password !== form.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match';
		isValid = false;
	}

	if (!form.agreeToTerms) {
		errors.general = 'You must agree to the Terms of Service and Privacy Policy';
		isValid = false;
	}

	return isValid;
};

const handleSubmit = async () => {
	if (!validateForm()) return;

	loading.value = true;

	try {
		await authStore.register({
			name: form.name,
			email: form.email,
			password: form.password,
			confirmPassword: form.confirmPassword
		});

		if (authStore.error) {
			errors.general = authStore.error;
			toastStore.error(authStore.error);
		} else {
			toastStore.success('Account created successfully! Please check your email to verify your account.');
			// For future implementation: Redirect to login page with a success message
		}
	} catch (error: any) {
		errors.general = error.message || 'Failed to register. Please try again.';
		toastStore.error(errors.general);
	} finally {
		loading.value = false;
	}
};
</script>