<template>
	<div class="min-h-screen py-12 md:py-24 bg-gray-50 dark:bg-secondary-950">
		<div class="container mx-auto px-4">
			<div class="max-w-md mx-auto">
				<div class="card">
					<div class="text-center mb-8">
						<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Вход в аккаунт</h1>
						<p class="text-secondary-600 dark:text-secondary-400 mt-2">
							Введите ваши данные для входа в систему
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
							<div class="flex justify-between items-center mb-1">
								<label for="password" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
									Пароль
								</label>
								<NuxtLink to="/forgot-password" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
									Забыли пароль?
								</NuxtLink>
							</div>
							<div class="relative">
								<input
									id="password"
									v-model="form.password"
									:type="showPassword ? 'text' : 'password'"
									required
									class="input pr-10"
									:disabled="loading"
									placeholder="••••••••"
								/>
								<button
									type="button"
									class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
									@click="togglePasswordVisibility"
								>
									<span class="material-icons text-base">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
								</button>
							</div>
						</div>

						<div class="flex items-center">
							<input
								id="remember-me"
								v-model="form.rememberMe"
								type="checkbox"
								class="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800"
							/>
							<label for="remember-me" class="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
								Запомнить меня
							</label>
						</div>

						<div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
							{{ error }}
						</div>

						<button
							type="submit"
							class="btn btn-primary w-full"
							:disabled="loading"
						>
							<template v-if="loading">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Вход...
							</template>
							<template v-else>
								Войти
							</template>
						</button>
					</form>

					<div class="mt-6 text-center">
						<p class="text-sm text-secondary-600 dark:text-secondary-400">
							Нет аккаунта?
							<NuxtLink to="/register" class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
								Зарегистрироваться
							</NuxtLink>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRoute, useRouter } from 'vue-router';

definePageMeta({
	middleware: 'guest',
	layout: 'default'
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
	email: '',
	password: '',
	rememberMe: false
});

const loading = ref(false);
const error = ref<string | null>(null);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
	showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
	try {
		loading.value = true;
		error.value = null;

		await authStore.login(form.email, form.password);

		// Перенаправление на запрашиваемую страницу или на дашборд
		const redirectPath = route.query.redirect?.toString() || '/dashboard';
		router.push(redirectPath);

	} catch (err: any) {
		error.value = err.message || 'Произошла ошибка при входе в систему';
	} finally {
		loading.value = false;
	}
};
</script>