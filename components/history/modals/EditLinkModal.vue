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
						Edit Link
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

				<!-- Форма редактирования ссылки -->
				<form @submit.prevent="saveLink">
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

					<!-- Короткий URL (только для отображения) -->
					<div class="mb-4">
						<label for="short-url" class="form-label">Short URL</label>
						<div class="flex items-center">
							<input
								id="short-url"
								type="text"
								v-model="formData.shortUrl"
								class="form-input flex-grow"
								readonly
							/>
							<button
								@click="copyShortUrl"
								type="button"
								class="ml-2 p-2 rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 focus:outline-none"
								title="Copy to clipboard"
							>
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
							</button>
						</div>
					</div>

					<!-- Статус ссылки -->
					<div class="mb-4">
						<label for="status" class="form-label">Status</label>
						<div class="flex items-center">
              <span class="relative inline-flex items-center">
                <input
					type="checkbox"
					id="status"
					v-model="formData.isActive"
					class="sr-only"
				/>
                <div
					class="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors peer-checked:bg-indigo-600"
					:class="{'bg-indigo-600 dark:bg-indigo-600': formData.isActive}"
				></div>
                <span
					class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"
					:class="{'translate-x-5': formData.isActive}"
				></span>
              </span>
							<span class="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                {{ formData.isActive ? 'Active' : 'Inactive' }}
              </span>
						</div>
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
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">UTM Parameters</span>
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
									<span class="ml-2 text-sm text-slate-700 dark:text-slate-300">Tags</span>
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
							{{ isSubmitting ? 'Saving...' : 'Save Changes' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import type { LinkData } from '~/types/link';
import { useToastStore } from '~/stores/toast';

const props = defineProps<{
	link: LinkData | null;
}>();

const emit = defineEmits(['close', 'save']);
const toastStore = useToastStore();
const isAuthenticated = ref(true); // Это значение должно приходить из авторизационного стора

// Состояние формы
const formData = reactive<LinkData>({
	id: '',
	originalUrl: '',
	shortUrl: '',
	title: '',
	clicks: 0,
	isActive: true,
	createdAt: '',
	customSlug: '',
	password: '',
	expiresAt: '',
	utmSource: '',
	utmMedium: '',
	utmCampaign: '',
	tags: [],
	clickTrend: 0
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

// Инициализация формы данными из пропса
onMounted(() => {
	if (props.link) {
		formData.id = props.link.id;
		formData.originalUrl = props.link.originalUrl;
		formData.shortUrl = props.link.shortUrl;
		formData.title = props.link.title || '';
		formData.clicks = props.link.clicks;
		formData.isActive = props.link.isActive;
		formData.createdAt = props.link.createdAt;

		// Optional properties with default values
		formData.customSlug = props.link.customSlug || '';
		formData.password = props.link.password || '';
		formData.expiresAt = props.link.expiresAt || '';
		formData.utmSource = props.link.utmSource || '';
		formData.utmMedium = props.link.utmMedium || '';
		formData.utmCampaign = props.link.utmCampaign || '';
		formData.tags = props.link.tags ? [...props.link.tags] : [];	
	}

	// Инициализация дополнительных опций
	advancedOptions.usePassword = !!formData.password;
	advancedOptions.useExpiration = !!formData.expiresAt;
	advancedOptions.useUtm = !!(formData.utmSource || formData.utmMedium || formData.utmCampaign);
	advancedOptions.useTags = !!(formData.tags && formData.tags.length > 0);

	// Инициализация поля тегов
	if (formData.tags && formData.tags.length > 0) {
		tagsInput.value = formData.tags.join(', ');
	}
});

// Закрытие модального окна
const closeModal = () => {
	emit('close');
};

// Копирование короткой ссылки
const copyShortUrl = () => {
	navigator.clipboard.writeText(formData.shortUrl)
		.then(() => {
			toastStore.success('Link copied to clipboard');
		})
		.catch(() => {
			toastStore.error('Failed to copy link');
		});
};

// Сохранение изменений
const saveLink = async () => {
	if (!formData.originalUrl) return;

	isSubmitting.value = true;

	try {
		// Обновляем данные перед отправкой
		if (isAuthenticated.value) {
			// Обработка пароля
			if (!advancedOptions.usePassword) {
				formData.password = '';
			}

			// Обработка даты истечения
			if (!advancedOptions.useExpiration) {
				formData.expiresAt = '';
			}

			// Обработка UTM параметров
			if (!advancedOptions.useUtm) {
				formData.utmSource = '';
				formData.utmMedium = '';
				formData.utmCampaign = '';
			}

			// Обработка тегов
			if (advancedOptions.useTags && tagsInput.value) {
				formData.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
			} else {
				formData.tags = [];
			}
		}

		// Имитация отправки на сервер
		await new Promise(resolve => setTimeout(resolve, 800));

		// Отправляем обновленные данные в родительский компонент
		emit('save', { ...formData });

		// Закрываем модальное окно
		closeModal();
	} catch (error) {
		console.error('Error saving link:', error);
		toastStore.error('Failed to save changes');
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