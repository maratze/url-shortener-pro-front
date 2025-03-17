<template>
	<div class="premium-glass-card relative overflow-hidden">
		<div
			class="relative p-8 md:p-10 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl">
			<!-- Заголовок формы -->
			<div class="mb-8">
				<h2 class="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
					Log in
				</h2>
				<p class="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-sm">
					Welcome back
				</p>
			</div>

			<form @submit.prevent="handleSubmit" class="space-y-6">
				<!-- Email поле -->
				<div class="form-field">
					<label class="form-label" for="email">Email</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
							</svg>
						</div>
						<input
							id="email"
							v-model="form.email"
							type="email"
							class="form-input pl-10"
							placeholder="your@email.com"
							required />
					</div>
					<p v-if="errors.email" class="form-error">{{ errors.email }}</p>
				</div>

				<!-- Пароль -->
				<div class="form-field">
					<label class="form-label" for="password">Password</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						</div>
						<input
							id="password"
							v-model="form.password"
							:type="showPassword ? 'text' : 'password'"
							class="form-input pl-10 pr-10"
							placeholder="Your password"
							required />
						<button
							type="button"
							@click="showPassword = !showPassword"
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
							<svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
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
					<p v-if="errors.password" class="form-error">{{ errors.password }}</p>
				</div>

				<!-- Опции входа -->
				<div class="flex items-center justify-between mt-6s">
					<div class="flex items-center">
						<input
							id="remember-me"
							v-model="form.rememberMe"
							type="checkbox"
							class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:checked:bg-indigo-600" />
						<label for="remember-me" class="ml-2 block text-sm text-slate-600 dark:text-slate-400">
							Remember me
						</label>
					</div>
					<div>
						<NuxtLink to="/forgot-password"
							class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200">
							Forgot password?
						</NuxtLink>
					</div>
				</div>

				<!-- Ошибка -->
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

				<!-- Кнопка входа -->
				<button
					type="submit"
					class="submit-button"
					:class="{ 'opacity-80 cursor-not-allowed': loading }"
					:disabled="loading">
					<span v-if="!loading">Log In</span>
					<span v-else class="flex items-center justify-center">
						<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
							fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
							</path>
						</svg>
						Logging in...
					</span>
				</button>

				<!-- Разделитель -->
				<div class="relative flex items-center justify-center my-6">
					<div class="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
					<span
						class="px-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-transparent relative z-10">or
						continue with</span>
					<div class="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
				</div>

				<!-- Социальные кнопки -->
				<div class="social-buttons">
					<button type="button" @click="handleGoogleLogin" class="social-btn google-btn">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 48 48">
							<path fill="#EA4335"
								d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
							<path fill="#4285F4"
								d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
							<path fill="#FBBC05"
								d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
							<path fill="#34A853"
								d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
						</svg>
						Continue with Google
					</button>
				</div>

				<p class="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
					Don't have an account?
					<NuxtLink to="/register"
						class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-200">
						Create one
					</NuxtLink>
				</p>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';
import type { LoginRequest, OAuthRequest } from "~/types/auth";
import { useAuthService } from '~/composables/useAuthService';

const authStore = useAuthStore();
const toastStore = useToastStore();
const { login } = useAuthService();

const loading = ref(false);
const showPassword = ref(false);

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

// Проверяем, был ли пользователь перенаправлен после успешной регистрации
const route = useRoute();
onMounted(() => {
	if (route.query.registered === 'true') {
		toastStore.success('Registration successful! Please log in with your new account.');

		// Fill email field if it's passed in the URL
		if (route.query.email) {
			form.email = route.query.email as string;
		}
	}
});

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
	clearErrors();

	try {
		await authStore.login({
			email: form.email,
			password: form.password,
			remember: form.rememberMe
		} as LoginRequest);

		if (authStore.error) {
			errors.general = authStore.error;
			toastStore.error(authStore.error);
		} else if (authStore.isAuthenticated) {
			// Use setTimeout to show notification after page transition
			toastStore.success('Successfully logged in! Welcome back.');

			// Небольшая задержка перед редиректом для отображения уведомления
			setTimeout(() => {
				navigateTo('/dashboard');
			}, 300);
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Failed to log in. Please try again.';
		errors.general = errorMessage;
		toastStore.error(errorMessage);
	} finally {
		loading.value = false;
	}
};

// Функция для аутентификации через Google
const handleGoogleLogin = async () => {
	loading.value = true;

	try {
		// Временное решение - сообщение о недоступности функции
		toastStore.info('Google authentication is currently not available in this version.');

		// В будущем можно реализовать через собственный API:
		// const response = await authStore.loginWithOAuth({
		//     provider: 'google',
		//     redirectUrl: window.location.origin + '/auth/callback/google'
		// } as OAuthRequest);

		loading.value = false;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Не удалось войти через Google. Пожалуйста, попробуйте снова.';
		errors.general = errorMessage;
		toastStore.error(errorMessage);
		loading.value = false;
	}
};
</script>

<style scoped>
.premium-glass-card {
	border-radius: 16px;
	background: var(--card-border-dark);
	border: 1px solid rgb(0, 0, 0, .05);
}

.dark .premium-glass-card {
	border-color: rgb(0, 0, 0, .5);
	background: var(--glass-bg-dark);
}

.form-field {
	@apply mb-5;
}

.form-label {
	@apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5;
}

.form-input {
	@apply block w-full px-4 py-3 pl-10 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500;
}

.form-error {
	@apply mt-1.5 text-sm text-red-600 dark:text-red-400;
}

.submit-button {
	@apply w-full py-3 px-4 flex items-center justify-center text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden;
}

.submit-button::before {
	content: '';
	@apply absolute inset-0 opacity-0 bg-gradient-to-r from-indigo-700 to-purple-700 transition-opacity duration-300;
}

.submit-button:hover::before {
	@apply opacity-100;
}

.submit-button span {
	@apply relative z-10;
}

.social-buttons {
	@apply grid;
}

.social-btn {
	@apply flex items-center justify-center py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

.social-btn svg {
	@apply mr-2;
}

.google-btn:hover {
	@apply border-gray-400 dark:border-gray-600;
}

/* Анимация сияния */
.shine-effect {
	@apply absolute w-1/2 h-full top-0 left-[-100%] transform skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent;
	animation: shine 6s infinite;
}

@keyframes shine {
	0% {
		left: -100%;
		opacity: 0;
	}

	50% {
		opacity: 0.5;
	}

	100% {
		left: 100%;
		opacity: 0;
	}
}

/* Добавьте дополнительные эффекты при наведении */
.form-input:hover {
	@apply border-slate-400 dark:border-slate-500;
}

/* Создаем приятный фокус для всех интерактивных элементов */
button:focus,
.form-input:focus,
input[type="checkbox"]:focus {
	@apply outline-none ring-2 ring-indigo-500 ring-opacity-50;
}
</style>