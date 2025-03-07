<template>
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<!-- Фоновое затемнение -->
		<div class="fixed inset-0 bg-slate-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

		<div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all max-w-lg w-full p-6"
				@click.stop
			>
				<!-- Заголовок модального окна -->
				<div class="flex justify-between items-center mb-5">
					<h3 class="text-lg font-medium text-slate-800 dark:text-white" id="modal-title">
						Create New Short Link
					</h3>
					<button
						@click="closeModal"
						type="button"
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
					>
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Форма создания ссылки -->
				<form @submit.prevent="createLink">
					<!-- Оригинальный URL -->
					<div class="mb-4">
						<label for="original-url" class="form-label">Original URL <span class="text-red-500">*</span></label>
						<input
							id="original-url"
							type="url"
							v-model="formData.originalUrl"
							required
							class="form-input"
							placeholder="https://example.com/your-long-url"
						/>
					</div>

					<!-- Название (опционально) -->
					<div class="mb-4">
						<label for="title" class="form-label">Link Title <span class="text-slate-400 text-sm font-normal">(Optional)</span></label>
						<input
							id="title"
							type="text"
							v-model="formData.title"
							class="form-input"
							placeholder="My awesome link"
						/>
					</div>

					<!-- Кастомный слаг (опционально) -->
					<div class="mb-4">
						<label for="custom-slug" class="form-label">Custom Back-half <span class="text-slate-400 text-sm font-normal">(Optional)</span></label>
						<div class="flex items-center">
              <span class="text-slate-500 dark:text-slate-400 px-3 py-2 border border-r-0 rounded-l-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                https://tiny.link/
              </span>
							<input
								id="custom-slug"
								type="text"
								v-model="formData.customSlug"
								class="form-input rounded-l-none"
								placeholder="my-link"
							/>
						</div>
						<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
							Use only letters, numbers, hyphens, and underscores
						</p>
					</div>

					<!-- Продвинутые настройки (доступны только для авторизованных) -->
					<div v-if="isAuthenticated" class="mb-4">
						<div class="flex items-center justify-between cursor-pointer" @click="showAdvanced = !showAdvanced">
							<p class="text-sm font-medium text-slate-700 dark:text-slate-300">Advanced Options</p>
							<button type="button" class="text-indigo-600 dark:text-indigo-400 focus:outline-none">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 transition-transform"
									:class="{'rotate-180': showAdvanced}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>

						<div v-if="showAdvanced" class="mt-4 space-y-4 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
							<!-- Пароль -->
							<div>
								<label class="flex items-center mb-2">
									<input type="checkbox" v-model="advancedOptions.usePassword" class="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Password Protection</span>
								</label>
								<input
									v-if="advancedOptions.usePassword"
									type="password"
									v-model="formData.password"
									class="form-input"
									placeholder="Enter password"
								/>
							</div>

							<!-- Дата истечения -->
							<div>
								<label class="flex items-center mb-2">
									<input type="checkbox" v-model="advancedOptions.useExpiration" class="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Set Expiration Date</span>
								</label>
								<input
									v-if="advancedOptions.useExpiration"
									type="datetime-local"
									v-model="formData.expiresAt"
									class="form-input"
								/>
							</div>

							<!-- UTM параметры -->
							<div>
								<label class="flex items-center mb-2">
									<input type="checkbox" v-model="advancedOptions.useUtm" class="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Add UTM Parameters</span>
								</label>
								<div v-if="advancedOptions.useUtm" class="space-y-2 mt-2">
									<input type="text" v-model="formData.utmSource" class="form-input" placeholder="UTM Source" />
									<input type="text" v-model="formData.utmMedium" class="form-input" placeholder="UTM Medium" />
									<input type="text" v-model="formData.utmCampaign" class="form-input" placeholder="UTM Campaign" />
								</div>
							</div>

							<!-- Теги -->
							<div>
								<label class="flex items-center mb-2">
									<input type="checkbox" v-model="advancedOptions.useTags" class="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Add Tags</span>
								</label>
								<input
									v-if="advancedOptions.useTags"
									type="text"
									v-model="tagsInput"
									class="form-input"
									placeholder="Enter tags separated by comma"
								/>
							</div>
						</div>
					</div>

					<!-- Индикатор остатка бесплатных ссылок для неавторизованных -->
					<div v-if="!isAuthenticated" class="mb-4">
						<div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
							<div
								class="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all"
								:style="{ width: `${(linksUsed / 30) * 100}%` }"
							></div>
						</div>
						<p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
							<span>{{ linksRemaining }} free links remaining</span>
							<NuxtLink to="/register" class="text-indigo-600 dark:text-indigo-400 hover:underline">Need more?</NuxtLink>
						</p>
					</div>

					<!-- Кнопки действий -->
					<div class="flex justify-end space-x-3 mt-6">
						<button
							type="button"
							@click="closeModal"
							class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none"
						>
							Cancel
						</button>
						<button
							type="submit"
							:disabled="isSubmitting || !formData.originalUrl"
							:class="{'opacity-70 cursor-not-allowed': isSubmitting || !formData.originalUrl}"
							class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg focus:outline-none flex items-center"
						>
							<svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							{{ isSubmitting ? 'Creating...' : 'Create Link' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { LinkData } from '~/types/link';

const emit = defineEmits(['close', 'create']);
const isAuthenticated = ref(true); // Это значение должно приходить из авторизационного стора
const linksUsed = ref(15); // Это значение должно приходить из хранилища

// Вычисляемое значение оставшихся ссылок
const linksRemaining = computed(() => Math.max(0, 30 - linksUsed.value));

// Состояние формы
const formData = reactive({
	originalUrl: '',
	title: '',
	customSlug: '',
	password: '',
	expiresAt: '',
	utmSource: '',
	utmMedium: '',
	utmCampaign: '',
});

// Состояние отправки формы
const isSubmitting = ref(false);

// Дополнительные настройки для авторизованных пользователей
const showAdvanced = ref(false);
const advancedOptions = reactive({
	usePassword: false,
	useExpiration: false,
	useUtm: false,
	useTags: false
});

// Поле для ввода тегов
const tagsInput = ref('');

// Закрытие модального окна
const closeModal = () => {
	emit('close');
};

// Создание новой ссылки
const createLink = async () => {
	if (!formData.originalUrl) return;

	isSubmitting.value = true;

	try {
		// Подготавливаем данные о ссылке
		const linkData: Partial<LinkData> = {
			originalUrl: formData.originalUrl,
			title: formData.title || undefined
		};

		// Добавляем кастомный слаг, если он указан
		if (formData.customSlug) {
			linkData.customSlug = formData.customSlug;
		}

		// Добавляем продвинутые настройки для авторизованных пользователей
		if (isAuthenticated.value) {
			if (advancedOptions.usePassword && formData.password) {
				linkData.password = formData.password;
			}

			if (advancedOptions.useExpiration && formData.expiresAt) {
				linkData.expiresAt = formData.expiresAt;
			}

			if (advancedOptions.useUtm) {
				linkData.utmSource = formData.utmSource || undefined;
				linkData.utmMedium = formData.utmMedium || undefined;
				linkData.utmCampaign = formData.utmCampaign || undefined;
			}

			if (advancedOptions.useTags && tagsInput.value) {
				linkData.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
			}
		}

		// Отправляем данные на сервер (имитация)
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Сообщаем родительскому компоненту о создании ссылки
		emit('create', linkData);

		// Закрываем модальное окно
		closeModal();
	} catch (error) {
		console.error('Error creating link:', error);
		// Здесь можно добавить обработку ошибок, например, показать уведомление
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<style scoped>
.form-label {
	@apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1;
}

.form-input {
	@apply block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm;
}
</style>