<template>
	<div class="min-h-screen py-12 md:py-24 bg-gray-50 dark:bg-secondary-950">
		<div class="container mx-auto px-4">
			<div class="max-w-md mx-auto">
				<div class="card">
					<div class="text-center mb-8">
						<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Создать аккаунт</h1>
						<p class="text-secondary-600 dark:text-secondary-400 mt-2">
							Регистрация занимает менее минуты
						</p>
					</div>

					<form @submit.prevent="handleSubmit" class="space-y-4">
						<div>
							<label for="email" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
								Email
							</label>
							<input
								id="email"
								v-model="form.email"
								type="email"
								required
								class="input"
								:disabled="loading"
								placeholder="your@email.com"
							/>
						</div>

						<div>
							<label for="password" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
								Пароль
							</label>
							<div class="relative">
								<input
									id="password"
									v-model="form.password"
									:type="showPassword ? 'text' : 'password'"
									required
									class="input pr-10"
									:disabled="loading"
									placeholder="••••••••"
									minlength="8"
								/>
								<button
									type="button"
									class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
									@click="togglePasswordVisibility"
								>
									<span class="material-icons text-base">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
								</button>
							</div>
							<p class="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
								Минимум 8 символов
							</p>
						</div>

						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
								Подтверждение пароля
							</label>
							<div class="relative">
								<input
									id="confirmPassword"
									v-model="form.confirmPassword"
									:type="showPassword ? 'text' : 'password'"
									required
									class="input pr-10"
									:disabled="loading"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<div class="flex items-center">
							<input
								id="terms"
								v-model="form.agreeToTerms"
								type="checkbox"
								required
								class="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800"
							/>
							<label for="terms" class="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
								Я согласен с
								<NuxtLink to="/terms" class="text-primary-600 dark:text-primary-400 hover:underline">
									условиями использования
								</NuxtLink>
								и
								<NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline">
									политикой конфиденциальности
								</NuxtLink>
							</label>
						</div>

						<div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
							{{ error }}
						</div>

						<button
							type="submit"
							class="btn btn-primary w-full"
							:disabled="loading || !form.agreeToTerms || form.password !== form.confirmPassword"
						>
							<template v-if="loading">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Регистрация...
							</template>
							<template v-else>
								Зарегистрироваться
							</template>
						</button>
					</form>

					<div class="mt-6 text-center">
						<p class="text-sm text-secondary-600 dark:text-secondary-400">
							Уже есть аккаунт?
							<NuxtLink to="/login" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
								Войти
							</NuxtLink>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
	middleware: 'guest',
	layout: 'default'
});

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
	email: '',
	password: '',
	confirmPassword: '',
	agreeToTerms: false
});

const loading = ref(false);
const error = ref<string | null>(null);
const showPassword = ref(false);

const isPasswordValid = computed(() => form.password.length >= 8);
const isConfirmPasswordValid = computed(() => form.password === form.confirmPassword);

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
	if (!isPasswordValid.value) {
		error.value = 'Пароль должен содержать минимум 8 символов';
		return;
	}

	if (!isConfirmPasswordValid.value) {
		error.value = 'Пароли не совпадают';
		return;
	}

	try {
		loading.value = true;
		error.value = null;

		await authStore.register(form.email, form.password);
		router.push('/dashboard');

	} catch (err: any) {
		error.value = err.message || 'Произошла ошибка при регистрации';
	} finally {
		loading.value = false;
	}
};
</script>