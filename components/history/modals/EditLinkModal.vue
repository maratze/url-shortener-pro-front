<template>
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<!-- Фоновое затемнение -->
		<div
			class="fixed inset-0 bg-slate-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm">
		</div>

		<div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all max-w-lg w-full p-6"
				@click.stop>
				<!-- Заголовок модального окна -->
				<div class="flex justify-between items-center mb-5">
					<h3 class="text-lg font-medium text-slate-800 dark:text-white" id="modal-title">
						{{ link ? 'Edit Link' : 'Create New Link' }}
					</h3>
					<button
						@click="closeModal"
						type="button"
						class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
						title="Close modal">
						<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Форма редактирования ссылки -->
				<form @submit.prevent="saveLink" class="space-y-5">
					<!-- Оригинальная ссылка -->
					<div>
						<label for="originalUrl"
							class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Original URL <span class="text-red-500">*</span>
						</label>
						<div class="relative">
							<input
								id="originalUrl"
								v-model="formData.originalUrl"
								type="text"
								placeholder="https://example.com/your-long-url"
								:class="[
									'form-input',
									validationErrors.originalUrl ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : ''
								]"
								required
								@input="validateOriginalUrl"
								@blur="validateOriginalUrl"
								ref="originalUrlInput" />
							<div v-if="isLoadingUrl" class="absolute right-3 top-2">
								<svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg"
									fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
							</div>
							<div v-else-if="isOriginalUrlValid" class="absolute right-3 top-2.5">
								<svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>
						<p v-if="validationErrors.originalUrl" class="mt-1 text-xs text-red-500">{{
							validationErrors.originalUrl }}</p>
						<p v-else class="text-xs text-slate-500 dark:text-slate-400 mt-1">The original URL you want to
							shorten</p>
					</div>

					<!-- Заголовок ссылки и автоматическое заполнение -->
					<div v-if="formData.originalUrl && isOriginalUrlValid">
						<div class="flex justify-between items-center mb-1">
							<label for="title" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Link Title
							</label>
							<button
								type="button"
								@click="fetchMetadata"
								class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
								:disabled="isLoadingMetadata"
								title="Auto-fill from URL">
								<div class="flex items-center">
									<svg v-if="isLoadingMetadata" class="animate-spin h-3 w-3 mr-1"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
										</path>
									</svg>
									<svg v-else class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
									</svg>
									Auto-fill
								</div>
							</button>
						</div>
						<input
							id="title"
							v-model="formData.title"
							type="text"
							placeholder="Title for your link"
							class="form-input" />
						<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
							A descriptive title helps identify your link
						</p>
					</div>

					<!-- Кастомный короткий путь -->
					<div>
						<div class="flex justify-between items-center mb-1">
							<label for="customSlug"
								class="block text-sm font-medium text-slate-700 dark:text-slate-300">
								Custom Path
							</label>
						</div>
						<div class="flex items-center space-x-1">
							<div
								class="flex-shrink-0 text-sm text-slate-500 dark:text-slate-400 px-2 py-2 bg-slate-100 dark:bg-slate-700 rounded-l-md border border-r-0 border-slate-300 dark:border-slate-600">
								{{ baseUrl }}/
							</div>
							<input
								id="customSlug"
								v-model="formData.customSlug"
								type="text"
								placeholder="custom-path"
								:class="[
									'rounded-l-none form-input',
									validationErrors.customSlug ? 'border-red-300 dark:border-red-500 focus:ring-red-500 focus:border-red-500' : ''
								]"
								@input="validateCustomSlug"
								@blur="validateCustomSlug" />
							<button
								v-if="formData.customSlug"
								type="button"
								@click="checkSlugAvailability"
								class="flex-shrink-0 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-400 text-sm rounded-r-md focus:outline-none"
								:disabled="isCheckingSlug || !isCustomSlugValid"
								title="Check availability">
								<span v-if="isCheckingSlug">
									<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
										</path>
									</svg>
								</span>
								<span v-else-if="isSlugAvailable === true">
									<svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M5 13l4 4L19 7" />
									</svg>
								</span>
								<span v-else-if="isSlugAvailable === false">
									<svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
								</span>
								<span v-else>Check</span>
							</button>
						</div>
						<div class="mt-1">
							<p v-if="validationErrors.customSlug" class="text-xs text-red-500">{{
								validationErrors.customSlug }}</p>
							<p v-else-if="isSlugAvailable === false" class="text-xs text-red-500">This custom path is
								already taken.</p>
							<p v-else-if="isSlugAvailable === true" class="text-xs text-green-500">Custom path is
								available!</p>
							<p v-else class="text-xs text-slate-500 dark:text-slate-400">
								Use only letters, numbers, hyphens and underscores. Leave empty for random path.
							</p>
						</div>
					</div>

					<!-- Теги -->
					<div>
						<label for="tags" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Tags
						</label>
						<div
							class="flex flex-wrap items-center gap-2 p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 min-h-[42px]">
							<div v-for="(tag, index) in formData.tags" :key="index"
								class="flex items-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded-full text-sm">
								<span>{{ tag }}</span>
								<button type="button" @click="removeTag(index)"
									class="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 focus:outline-none">
									<svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none"
										viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<input
								id="newTag"
								v-model="newTag"
								@keydown.enter.prevent="addTag"
								@keydown.tab.prevent="addTag"
								@keydown.space.prevent="addTag"
								@keydown.comma.prevent="addTag"
								type="text"
								placeholder="Add tags..."
								class="flex-grow bg-transparent focus:outline-none text-sm min-w-[100px]" />
						</div>
						<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
							Press Enter, Tab, Space or Comma to add a tag
						</p>
					</div>

					<!-- Расширенные настройки (UTM и т.д.) -->
					<div>
						<div class="flex items-center cursor-pointer" @click="toggleAdvancedSettings">
							<svg
								class="h-4 w-4 text-slate-500 mr-1 transition-transform"
								:class="showAdvanced ? 'rotate-90' : ''"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M9 5l7 7-7 7" />
							</svg>
							<span class="text-sm font-medium text-slate-700 dark:text-slate-300">Advanced
								Settings</span>
						</div>

						<div v-if="showAdvanced" class="mt-3 space-y-4 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg">
							<!-- Проект (для авторизованных пользователей) -->
							<div v-if="isAuthenticated">
								<label for="project"
									class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
									Project
								</label>
								<select
									id="project"
									v-model="formData.projectId"
									class="form-input">
									<option value="">None</option>
									<option v-for="project in availableProjects" :key="project.id" :value="project.id">
										{{ project.name }}
									</option>
								</select>
								<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
									Assign this link to a project for better organization
								</p>
							</div>

							<!-- UTM параметры -->
							<div>
								<h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">UTM Parameters
								</h4>

								<div class="space-y-3">
									<div>
										<label for="utmSource"
											class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
											UTM Source
										</label>
										<input
											id="utmSource"
											v-model="formData.utmSource"
											type="text"
											placeholder="e.g. google, newsletter"
											class="form-input text-sm py-1.5" />
									</div>

									<div>
										<label for="utmMedium"
											class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
											UTM Medium
										</label>
										<input
											id="utmMedium"
											v-model="formData.utmMedium"
											type="text"
											placeholder="e.g. cpc, email"
											class="form-input text-sm py-1.5" />
									</div>

									<div>
										<label for="utmCampaign"
											class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
											UTM Campaign
										</label>
										<input
											id="utmCampaign"
											v-model="formData.utmCampaign"
											type="text"
											placeholder="e.g. summer_sale"
											class="form-input text-sm py-1.5" />
									</div>
								</div>
							</div>

							<!-- Состояние ссылки (активна/неактивна) -->
							<div>
								<div class="flex items-center">
									<input
										id="isActive"
										v-model="formData.isActive"
										type="checkbox"
										class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
									<label for="isActive" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
										Active link
									</label>
								</div>
								<p class="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-6">
									When inactive, the link will show a "link unavailable" page
								</p>
							</div>
						</div>
					</div>

					<!-- Предпросмотр короткой ссылки -->
					<div v-if="formData.originalUrl && isOriginalUrlValid"
						class="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-lg">
						<h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Link Preview</h4>
						<div class="flex items-center">
							<div class="text-sm text-indigo-600 dark:text-indigo-400 truncate">
								{{ getShortUrlPreview() }}
							</div>
							<button
								type="button"
								@click="copyPreviewUrl"
								class="ml-2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 transition-colors"
								title="Copy to clipboard">
								<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
							</button>
						</div>
						<div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
							Points to: <span class="text-slate-600 dark:text-slate-300 truncate">{{
								truncateUrl(formData.originalUrl || '', 30) }}</span>
						</div>
					</div>

					<!-- Кнопки отмены и сохранения -->
					<div class="flex justify-end space-x-3 mt-6">
						<button
							type="button"
							@click="closeModal"
							class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none">
							Cancel
						</button>
						<button
							type="submit"
							:disabled="isSubmitting || !formData.originalUrl || !isOriginalUrlValid"
							:class="{ 'opacity-70 cursor-not-allowed': isSubmitting || !formData.originalUrl || !isOriginalUrlValid }"
							class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg focus:outline-none flex items-center">
							<svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
									stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
								</path>
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
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import type { LinkData } from '~/types/link';
import { useToastStore } from '~/stores/toast';

interface Project {
	id: string;
	name: string;
}

const props = defineProps<{
	link: LinkData | null;
}>();

const emit = defineEmits(['close', 'save']);
const toastStore = useToastStore();
const isAuthenticated = ref(true); // Это значение должно приходить из авторизационного стора

// URL для формирования короткой ссылки
const baseUrl = ref('https://shrtn.me');

// Состояние формы
const formData = reactive({
	id: '',
	title: '',
	originalUrl: '',
	customSlug: '',
	isActive: true,
	tags: [] as string[],
	utmSource: '',
	utmMedium: '',
	utmCampaign: '',
	projectId: ''
});

// Состояние UI
const isSubmitting = ref(false);
const isLoadingUrl = ref(false);
const isLoadingMetadata = ref(false);
const isCheckingSlug = ref(false);
const isSlugAvailable = ref<boolean | null>(null);
const showAdvanced = ref(false);
const validationErrors = reactive({
	originalUrl: '',
	customSlug: ''
});
const newTag = ref('');
const isOriginalUrlValid = ref(false);
const isCustomSlugValid = ref(true);

// Доступные проекты (моковые данные для демонстрации)
const availableProjects = reactive<Project[]>([
	{ id: 'project-1', name: 'Marketing Campaign 2023' },
	{ id: 'project-2', name: 'Social Media' },
	{ id: 'project-3', name: 'Blog Posts' }
]);

// Ссылка на поле ввода для оригинальной ссылки
const originalUrlInput = ref<HTMLInputElement | null>(null);

// Инициализация формы
onMounted(() => {
	// Если есть ссылка для редактирования, заполняем форму её данными
	if (props.link) {
		formData.id = props.link.id;
		formData.title = props.link.title || '';
		formData.originalUrl = props.link.originalUrl;
		formData.customSlug = props.link.customSlug || '';
		formData.isActive = props.link.isActive !== undefined ? props.link.isActive : true;
		formData.tags = props.link.tags ? [...props.link.tags] : [];
		formData.utmSource = props.link.utmSource || '';
		formData.utmMedium = props.link.utmMedium || '';
		formData.utmCampaign = props.link.utmCampaign || '';
		formData.projectId = props.link.projectId || '';

		// Валидируем URL
		validateOriginalUrl();
	}

	// Фокус на поле ввода
	nextTick(() => {
		if (originalUrlInput.value) {
			originalUrlInput.value.focus();
		}
	});
});

// Валидация оригинальной ссылки
const validateOriginalUrl = () => {
	isOriginalUrlValid.value = false;
	if (!formData.originalUrl) {
		validationErrors.originalUrl = 'Original URL is required';
		return;
	}

	try {
		// Проверяем является ли строка корректным URL
		new URL(formData.originalUrl);
		validationErrors.originalUrl = '';
		isOriginalUrlValid.value = true;
	} catch (e) {
		validationErrors.originalUrl = 'Please enter a valid URL';
	}
};

// Валидация кастомного короткого пути
const validateCustomSlug = () => {
	isCustomSlugValid.value = true;

	if (!formData.customSlug) {
		validationErrors.customSlug = '';
		return;
	}

	// Используем регулярное выражение для проверки формата
	const slugRegex = /^[a-zA-Z0-9_-]+$/;
	if (!slugRegex.test(formData.customSlug)) {
		validationErrors.customSlug = 'Use only letters, numbers, hyphens and underscores';
		isCustomSlugValid.value = false;
		return;
	}

	validationErrors.customSlug = '';
};

// Проверка доступности кастомного пути
const checkSlugAvailability = async () => {
	if (!formData.customSlug || !isCustomSlugValid.value) return;

	isCheckingSlug.value = true;
	isSlugAvailable.value = null;

	// Имитация запроса к API
	await new Promise(resolve => setTimeout(resolve, 1200));

	// Считаем, что путь доступен с вероятностью 80%
	isSlugAvailable.value = Math.random() > 0.2;
	isCheckingSlug.value = false;
};

// Добавление тега
const addTag = () => {
	if (!newTag.value.trim()) return;

	// Проверяем не дублируется ли тег
	if (!formData.tags.includes(newTag.value.trim())) {
		formData.tags.push(newTag.value.trim());
	}

	newTag.value = '';
};

// Удаление тега
const removeTag = (index: number) => {
	formData.tags.splice(index, 1);
};

// Переключение отображения расширенных настроек
const toggleAdvancedSettings = () => {
	showAdvanced.value = !showAdvanced.value;
};

// Получение предварительного вида короткой ссылки
const getShortUrlPreview = () => {
	return `${baseUrl.value}/${formData.customSlug || 'random-path'}`;
};

// Копирование предварительного вида ссылки
const copyPreviewUrl = () => {
	const urlToCopy = getShortUrlPreview();
	navigator.clipboard.writeText(urlToCopy)
		.then(() => {
			toastStore.success('Link copied to clipboard');
		})
		.catch(() => {
			toastStore.error('Failed to copy link');
		});
};

// Обрезка URL для отображения
const truncateUrl = (url: string | undefined, maxLength = 50): string => {
	if (!url) return '';
	if (url.length <= maxLength) return url;
	return url.substring(0, maxLength) + '...';
};

// Автоматическое заполнение заголовка из метаданных страницы
const fetchMetadata = async () => {
	if (!formData.originalUrl || !isOriginalUrlValid.value) return;

	isLoadingMetadata.value = true;

	try {
		// Имитация запроса к API для получения метаданных
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Здесь будет код для получения метаданных URL
		// В реальном приложении это должен быть запрос к серверу,
		// так как браузер не позволяет напрямую получать данные с других доменов

		// Моковые данные для демонстрации
		const domain = new URL(formData.originalUrl).hostname;
		formData.title = `Page from ${domain}`;

		toastStore.success('Title auto-filled from URL');
	} catch (error) {
		console.error('Error fetching metadata:', error);
		toastStore.error('Failed to fetch page metadata');
	} finally {
		isLoadingMetadata.value = false;
	}
};

// Закрытие модального окна
const closeModal = () => {
	emit('close');
};

// Сохранение ссылки
const saveLink = async () => {
	// Убеждаемся, что URL валиден
	validateOriginalUrl();
	if (!isOriginalUrlValid.value) return;

	// Валидируем кастомный путь, если он задан
	validateCustomSlug();
	if (formData.customSlug && !isCustomSlugValid.value) return;

	isSubmitting.value = true;

	try {
		// Имитация запроса к API
		await new Promise(resolve => setTimeout(resolve, 1200));

		// Подготавливаем данные ссылки
		const linkData: LinkData = {
			id: formData.id || `link-${Date.now()}`,
			title: formData.title,
			originalUrl: formData.originalUrl,
			shortUrl: getShortUrlPreview(),
			customSlug: formData.customSlug,
			isActive: formData.isActive,
			tags: formData.tags,
			utmSource: formData.utmSource,
			utmMedium: formData.utmMedium,
			utmCampaign: formData.utmCampaign,
			projectId: formData.projectId,
			clicks: props.link?.clicks || 0,
			clickTrend: props.link?.clickTrend || 0,
			createdAt: props.link?.createdAt || new Date().toISOString()
		};

		// Отправляем данные обратно в родительский компонент
		emit('save', linkData);

		// Показываем уведомление об успешном сохранении
		toastStore.success(props.link ? 'Link updated successfully' : 'Link created successfully');

		// Закрываем модальное окно
		closeModal();
	} catch (error) {
		console.error('Error saving link:', error);
		toastStore.error('Failed to save link');
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<style scoped>
.form-input {
	@apply block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-white bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm;
}
</style>