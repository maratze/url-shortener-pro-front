<template>
	<div>
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Настройки профиля</h1>
			<p class="text-secondary-600 dark:text-secondary-400 mt-1">
				Управляйте настройками вашего аккаунта
			</p>
		</div>

		<!-- Вкладки настроек -->
		<div class="mb-6 border-b border-secondary-200 dark:border-secondary-700">
			<div class="flex space-x-4">
				<button
					@click="activeTab = 'profile'"
					class="py-3 px-1 border-b-2 transition-colors duration-200"
					:class="activeTab === 'profile' 
            ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400' 
            : 'border-transparent text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'"
				>
					Основные настройки
				</button>
				<button
					@click="activeTab = 'security'"
					class="py-3 px-1 border-b-2 transition-colors duration-200"
					:class="activeTab === 'security' 
            ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400' 
            : 'border-transparent text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'"
				>
					Безопасность
				</button>
				<button
					@click="activeTab = 'plans'"
					class="py-3 px-1 border-b-2 transition-colors duration-200"
					:class="activeTab === 'plans' 
            ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400' 
            : 'border-transparent text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'"
				>
					Тарифный план
				</button>
			</div>
		</div>

		<!-- Содержимое вкладки "Основные настройки" -->
		<div v-if="activeTab === 'profile'" class="card">
			<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Личная информация</h2>

			<form @submit.prevent="updateProfile" class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Имя
					</label>
					<input
						id="name"
						v-model="profileForm.name"
						type="text"
						placeholder="Ваше имя"
						class="input"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Email
					</label>
					<input
						id="email"
						v-model="profileForm.email"
						type="email"
						required
						placeholder="your@email.com"
						class="input"
						disabled
					/>
					<p class="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
						Email нельзя изменить
					</p>
				</div>

				<div>
					<label for="company" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Компания (необязательно)
					</label>
					<input
						id="company"
						v-model="profileForm.company"
						type="text"
						placeholder="Название вашей компании"
						class="input"
					/>
				</div>

				<div>
					<h3 class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Настройки уведомлений
					</h3>
					<div class="space-y-2">
						<div class="flex items-center">
							<input
								id="emailNotifications"
								v-model="profileForm.emailNotifications"
								type="checkbox"
								class="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800"
							/>
							<label for="emailNotifications" class="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
								Получать уведомления по email
							</label>
						</div>
						<div class="flex items-center">
							<input
								id="weeklyReport"
								v-model="profileForm.weeklyReport"
								type="checkbox"
								class="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800"
							/>
							<label for="weeklyReport" class="ml-2 block text-sm text-secondary-700 dark:text-secondary-300">
								Еженедельный отчет о статистике
							</label>
						</div>
					</div>
				</div>

				<div v-if="profileMessage" :class="profileError ? 'p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm' : 'p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm'">
					{{ profileMessage }}
				</div>

				<div class="pt-2">
					<button
						type="submit"
						class="btn btn-primary"
						:disabled="updatingProfile"
					>
						<template v-if="updatingProfile">
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Сохранение...
						</template>
						<template v-else>
							Сохранить изменения
						</template>
					</button>
				</div>
			</form>
		</div>

		<!-- Содержимое вкладки "Безопасность" -->
		<div v-else-if="activeTab === 'security'" class="card">
			<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Изменение пароля</h2>

			<form @submit.prevent="updatePassword" class="space-y-4">
				<div>
					<label for="currentPassword" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Текущий пароль
					</label>
					<input
						id="currentPassword"
						v-model="passwordForm.currentPassword"
						type="password"
						required
						placeholder="••••••••"
						class="input"
					/>
				</div>

				<div>
					<label for="newPassword" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Новый пароль
					</label>
					<input
						id="newPassword"
						v-model="passwordForm.newPassword"
						type="password"
						required
						placeholder="••••••••"
						minlength="8"
						class="input"
					/>
					<p class="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
						Минимум 8 символов
					</p>
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Подтверждение нового пароля
					</label>
					<input
						id="confirmPassword"
						v-model="passwordForm.confirmPassword"
						type="password"
						required
						placeholder="••••••••"
						class="input"
					/>
				</div>

				<div v-if="passwordMessage" :class="passwordError ? 'p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm' : 'p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm'">
					{{ passwordMessage }}
				</div>

				<div class="pt-2">
					<button
						type="submit"
						class="btn btn-primary"
						:disabled="updatingPassword || passwordForm.newPassword !== passwordForm.confirmPassword || passwordForm.newPassword.length < 8"
					>
						<template v-if="updatingPassword">
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Изменение пароля...
						</template>
						<template v-else>
							Изменить пароль
						</template>
					</button>
				</div>
			</form>
		</div>

		<!-- Содержимое вкладки "Тарифный план" -->
		<div v-else-if="activeTab === 'plans'" class="card">
			<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Ваш тарифный план</h2>

			<div class="mb-6">
				<div class="flex items-center">
					<div :class="isPremium ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-400'" class="px-3 py-1 rounded-full text-sm font-medium">
						{{ isPremium ? 'Премиум' : 'Бесплатный' }}
					</div>
					<span v-if="isPremium" class="text-sm text-secondary-600 dark:text-secondary-400 ml-2">
            (до {{ formatDate(subscriptionEndsAt) }})
          </span>
				</div>

				<div v-if="isPremium" class="mt-4">
					<h3 class="font-medium text-secondary-900 dark:text-white mb-2">Включенные возможности:</h3>
					<ul class="space-y-2">
						<li class="flex items-start">
							<span class="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
							<span class="text-secondary-700 dark:text-secondary-300">Пользовательские алиасы для URL</span>
						</li>
						<li class="flex items-start">
							<span class="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
							<span class="text-secondary-700 dark:text-secondary-300">Расширенная аналитика</span>
						</li>
						<li class="flex items-start">
							<span class="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
							<span class="text-secondary-700 dark:text-secondary-300">Брендированные QR-коды</span>
						</li>
						<li class="flex items-start">
							<span class="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
							<span class="text-secondary-700 dark:text-secondary-300">Неограниченное количество URL</span>
						</li>
						<li class="flex items-start">
							<span class="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
							<span class="text-secondary-700 dark:text-secondary-300">Приоритетная техническая поддержка</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="border-t border-secondary-200 dark:border-secondary-700 pt-4">
				<h3 class="font-medium text-secondary-900 dark:text-white mb-4">
					{{ isPremium ? 'Управление подпиской' : 'Перейти на премиум' }}
				</h3>

				<div v-if="!isPremium" class="space-y-4">
					<div class="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
						<h4 class="text-secondary-900 dark:text-white font-medium mb-2">Премиум план</h4>
						<p class="text-secondary-700 dark:text-secondary-300 mb-4">
							Получите доступ ко всем преимуществам URL Shortener Pro за $9.99 в месяц.
						</p>
						<button
							@click="upgradeToPremium"
							class="btn btn-primary w-full"
							:disabled="updatingPlan"
						>
							<template v-if="updatingPlan">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Обработка...
							</template>
							<template v-else>
								Перейти на премиум
							</template>
						</button>
					</div>
				</div>

				<div v-else class="space-y-4">
					<p class="text-secondary-600 dark:text-secondary-400">
						Ваша подписка будет автоматически продлена {{ formatDate(subscriptionEndsAt) }}.
					</p>
					<div class="flex space-x-2">
						<button
							@click="cancelSubscription"
							class="btn btn-danger"
							:disabled="updatingPlan"
						>
							<template v-if="updatingPlan">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Обработка...
							</template>
							<template v-else>
								Отменить подписку
							</template>
						</button>
						<button
							@click="managePaymentMethod"
							class="btn btn-outline"
							:disabled="updatingPlan"
						>
							Управление платежными данными
						</button>
					</div>
				</div>

				<div v-if="planMessage" :class="planError ? 'p-3 mt-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm' : 'p-3 mt-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm'">
					{{ planMessage }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isPremium = computed(() => user.value?.isPremium || false);

// Активная вкладка
const activeTab = ref('profile');

// Данные для формы профиля
const profileForm = reactive({
	name: '',
	email: '',
	company: '',
	emailNotifications: false,
	weeklyReport: false
});

// Данные для формы смены пароля
const passwordForm = reactive({
	currentPassword: '',
	newPassword: '',
	confirmPassword: ''
});

// Состояния формы профиля
const updatingProfile = ref(false);
const profileMessage = ref<string | null>(null);
const profileError = ref(false);

// Состояния формы пароля
const updatingPassword = ref(false);
const passwordMessage = ref<string | null>(null);
const passwordError = ref(false);

// Состояния тарифного плана
const updatingPlan = ref(false);
const planMessage = ref<string | null>(null);
const planError = ref(false);
const subscriptionEndsAt = ref<string | null>(null);

// Загрузка данных пользователя при монтировании компонента
onMounted(async () => {
	if (user.value) {
		profileForm.name = user.value.name || '';
		profileForm.email = user.value.email || '';
		profileForm.company = user.value.company || '';
		profileForm.emailNotifications = user.value.emailNotifications || false;
		profileForm.weeklyReport = user.value.weeklyReport || false;

		subscriptionEndsAt.value = user.value.subscriptionEndsAt || null;
	}
});

// Обновление профиля
const updateProfile = async () => {
	try {
		updatingProfile.value = true;
		profileMessage.value = null;
		profileError.value = false;

		await authStore.updateProfile({
			name: profileForm.name,
			company: profileForm.company,
			emailNotifications: profileForm.emailNotifications,
			weeklyReport: profileForm.weeklyReport
		});

		profileMessage.value = 'Профиль успешно обновлен';
	} catch (err: any) {
		profileError.value = true;
		profileMessage.value = err.message || 'Произошла ошибка при обновлении профиля';
	} finally {
		updatingProfile.value = false;

		// Автоматически скрываем сообщение через 5 секунд
		setTimeout(() => {
			profileMessage.value = null;
		}, 5000);
	}
};

// Обновление пароля
const updatePassword = async () => {
	if (passwordForm.newPassword !== passwordForm.confirmPassword) {
		passwordError.value = true;
		passwordMessage.value = 'Пароли не совпадают';
		return;
	}

	if (passwordForm.newPassword.length < 8) {
		passwordError.value = true;
		passwordMessage.value = 'Пароль должен содержать минимум 8 символов';
		return;
	}

	try {
		updatingPassword.value = true;
		passwordMessage.value = null;
		passwordError.value = false;

		await authStore.updatePassword({
			currentPassword: passwordForm.currentPassword,
			newPassword: passwordForm.newPassword
		});

		// Очистка формы после успешного обновления
		passwordForm.currentPassword = '';
		passwordForm.newPassword = '';
		passwordForm.confirmPassword = '';

		passwordMessage.value = 'Пароль успешно изменен';
	} catch (err: any) {
		passwordError.value = true;
		passwordMessage.value = err.message || 'Произошла ошибка при изменении пароля';
	} finally {
		updatingPassword.value = false;

		// Автоматически скрываем сообщение через 5 секунд
		setTimeout(() => {
			passwordMessage.value = null;
		}, 5000);
	}
};

// Переход на премиум-план
const upgradeToPremium = async () => {
	try {
		updatingPlan.value = true;
		planMessage.value = null;
		planError.value = false;

		// Здесь будет вызов API для перехода на премиум
		const { $api } = useNuxtApp();
		await $api('/subscriptions/upgrade', {
			method: 'POST'
		});

		// Обновление данных пользователя после успешного перехода
		await authStore.fetchUser();

		planMessage.value = 'Вы успешно перешли на премиум план!';
	} catch (err: any) {
		planError.value = true;
		planMessage.value = err.message || 'Произошла ошибка при переходе на премиум план';
	} finally {
		updatingPlan.value = false;

		// Автоматически скрываем сообщение через 5 секунд
		setTimeout(() => {
			planMessage.value = null;
		}, 5000);
	}
};

// Отмена подписки
const cancelSubscription = async () => {
	try {
		updatingPlan.value = true;
		planMessage.value = null;
		planError.value = false;

		// Здесь будет вызов API для отмены подписки
		const { $api } = useNuxtApp();
		await $api('/subscriptions/cancel', {
			method: 'POST'
		});

		// Обновление данных пользователя после успешной отмены
		await authStore.fetchUser();

		planMessage.value = 'Ваша подписка будет активна до конца текущего платежного периода.';
	} catch (err: any) {
		planError.value = true;
		planMessage.value = err.message || 'Произошла ошибка при отмене подписки';
	} finally {
		updatingPlan.value = false;

		// Автоматически скрываем сообщение через 5 секунд
		setTimeout(() => {
			planMessage.value = null;
		}, 5000);
	}
};

// Управление платежными данными
const managePaymentMethod = () => {
	// Здесь будет перенаправление на страницу управления платежными данными
	window.open('/payment-settings', '_blank');
};

// Форматирование даты
const formatDate = (dateString: string | null) => {
	if (!dateString) return '';

	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
};
</script>