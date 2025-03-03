<template>
	<div>
		<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
			<div>
				<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Мои ссылки</h1>
				<p class="text-secondary-600 dark:text-secondary-400 mt-1">
					Управляйте своими сокращенными URL и просматривайте их статистику
				</p>
			</div>

			<button
				@click="showCreateModal = true"
				class="btn btn-primary mt-4 sm:mt-0 flex items-center"
			>
				<span class="material-icons text-sm mr-2">add</span>
				Новая ссылка
			</button>
		</div>

		<!-- Инструменты фильтрации и поиска -->
		<div class="card mb-6 p-4">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label for="searchQuery" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Поиск
					</label>
					<div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary-500 dark:text-secondary-400">
              <span class="material-icons text-base">search</span>
            </span>
						<input
							id="searchQuery"
							v-model="filters.searchQuery"
							type="text"
							placeholder="Поиск по оригинальному URL или коду"
							class="input pl-10"
						/>
					</div>
				</div>

				<div>
					<label for="status" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Статус
					</label>
					<select
						id="status"
						v-model="filters.status"
						class="input"
					>
						<option value="all">Все ссылки</option>
						<option value="active">Только активные</option>
						<option value="expired">Истекшие</option>
					</select>
				</div>

				<div>
					<label for="sortBy" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
						Сортировка
					</label>
					<div class="grid grid-cols-2 gap-2">
						<select
							id="sortBy"
							v-model="filters.sortBy"
							class="input"
						>
							<option value="createdAt">Дата создания</option>
							<option value="clicks">Количество кликов</option>
							<option value="shortCode">Короткий код</option>
						</select>
						<select
							v-model="filters.sortOrder"
							class="input"
						>
							<option value="desc">По убыванию</option>
							<option value="asc">По возрастанию</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<!-- Список URL -->
		<div class="card">
			<div v-if="loading" class="flex justify-center items-center py-12">
				<div class="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"></div>
			</div>
			<div v-else-if="filteredUrls.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
				<span class="material-icons text-5xl text-secondary-300 dark:text-secondary-700">link_off</span>
				<p class="mt-4 text-lg text-secondary-600 dark:text-secondary-400">
					{{ filters.searchQuery ? 'По вашему запросу ничего не найдено' : 'У вас пока нет ссылок' }}
				</p>
				<button
					@click="showCreateModal = true"
					class="mt-4 btn btn-primary"
				>
					Создать новую ссылку
				</button>
			</div>
			<div v-else>
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
						<thead>
						<tr>
							<th class="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Короткая ссылка
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Оригинальный URL
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Клики
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Статус
							</th>
							<th class="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Создана
							</th>
							<th class="px-4 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
								Действия
							</th>
						</tr>
						</thead>
						<tbody class="divide-y divide-secondary-200 dark:divide-secondary-700">
						<tr v-for="url in filteredUrls" :key="url.id" class="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
							<td class="px-4 py-3 whitespace-nowrap">
								<div class="flex items-center">
									<div class="flex flex-col">
										<div class="flex items-center">
											<span class="text-primary-600 dark:text-primary-400 font-medium">{{ url.shortCode }}</span>
											<button
												@click="copyToClipboard(getFullShortUrl(url.shortCode))"
												class="ml-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
												title="Копировать ссылку"
											>
												<span class="material-icons text-sm">{{ copiedUrlId === url.id ? 'check' : 'content_copy' }}</span>
											</button>
										</div>
										<a
											:href="getFullShortUrl(url.shortCode)"
											target="_blank"
											class="text-xs text-secondary-500 hover:text-primary-600 dark:text-secondary-400 hover:underline mt-1"
										>
											Открыть ссылку
										</a>
									</div>
								</div>
							</td>
							<td class="px-4 py-3">
								<div class="text-sm text-secondary-800 dark:text-secondary-200 truncate max-w-xs">
									{{ url.originalUrl }}
								</div>
							</td>
							<td class="px-4 py-3 whitespace-nowrap">
								<div class="text-sm text-secondary-800 dark:text-secondary-200">
									{{ url.clicks }}
								</div>
							</td>
							<td class="px-4 py-3 whitespace-nowrap">
                  <span
					  class="px-2 py-1 text-xs rounded-full"
					  :class="isExpired(url.expiresAt) 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'"
				  >
                    {{ isExpired(url.expiresAt) ? 'Истекла' : 'Активна' }}
                  </span>
							</td>
							<td class="px-4 py-3 whitespace-nowrap">
								<div class="text-sm text-secondary-600 dark:text-secondary-400">
									{{ formatDate(url.createdAt) }}
								</div>
								<div v-if="url.expiresAt" class="text-xs text-secondary-500 dark:text-secondary-500 mt-1">
									Истекает: {{ formatDate(url.expiresAt) }}
								</div>
							</td>
							<td class="px-4 py-3 whitespace-nowrap text-right text-sm">
								<div class="flex space-x-1 justify-end">
									<NuxtLink
										:to="`/dashboard/urls/${url.id}`"
										class="p-1.5 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800"
										title="Подробная статистика"
									>
										<span class="material-icons text-base">analytics</span>
									</NuxtLink>
									<button
										@click="openQRModal(url)"
										class="p-1.5 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800"
										title="QR код"
									>
										<span class="material-icons text-base">qr_code_2</span>
									</button>
									<button
										@click="confirmDelete(url)"
										class="p-1.5 text-secondary-600 hover:text-red-600 dark:text-secondary-400 dark:hover:text-red-400 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-800"
										title="Удалить ссылку"
									>
										<span class="material-icons text-base">delete</span>
									</button>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>

				<!-- Пагинация -->
				<div v-if="totalPages > 1" class="flex justify-center py-4">
					<div class="flex space-x-1">
						<button
							@click="changePage(currentPage - 1)"
							:disabled="currentPage === 1"
							class="px-3 py-1 rounded-md"
							:class="currentPage === 1 
                ? 'text-secondary-400 dark:text-secondary-600 cursor-not-allowed' 
                : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'"
						>
							<span class="material-icons text-base">chevron_left</span>
						</button>

						<template v-for="page in paginationRange" :key="page">
							<button
								v-if="page !== '...'"
								@click="changePage(page)"
								class="px-3 py-1 rounded-md"
								:class="page === currentPage 
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400' 
                  : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'"
							>
								{{ page }}
							</button>
							<span
								v-else
								class="px-3 py-1 text-secondary-400 dark:text-secondary-600"
							>
                ...
              </span>
						</template>

						<button
							@click="changePage(currentPage + 1)"
							:disabled="currentPage === totalPages"
							class="px-3 py-1 rounded-md"
							:class="currentPage === totalPages 
                ? 'text-secondary-400 dark:text-secondary-600 cursor-not-allowed' 
                : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'"
						>
							<span class="material-icons text-base">chevron_right</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Модальное окно для создания новой ссылки -->
		<Teleport to="body">
			<div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div class="bg-white dark:bg-secondary-900 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
					<div class="flex justify-between items-center border-b border-secondary-200 dark:border-secondary-700 p-4">
						<h3 class="text-lg font-semibold text-secondary-900 dark:text-white">Создать новую ссылку</h3>
						<button
							@click="showCreateModal = false"
							class="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
						>
							<span class="material-icons">close</span>
						</button>
					</div>

					<div class="p-4">
						<form @submit.prevent="createUrl" class="space-y-4">
							<div>
								<label for="modalOriginalUrl" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
									Оригинальный URL
								</label>
								<input
									id="modalOriginalUrl"
									v-model="newUrlForm.originalUrl"
									type="url"
									required
									placeholder="https://example.com/long-url"
									class="input"
								/>
							</div>

							<div>
								<label for="modalCustomAlias" class="flex items-center text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
									Пользовательский алиас
									<span v-if="!isPremium" class="ml-1 text-xs bg-secondary-100 text-secondary-600 dark:bg-secondary-800 dark:text-secondary-400 py-0.5 px-1.5 rounded">
                    Премиум
                  </span>
								</label>
								<div class="flex">
									<div class="bg-secondary-100 dark:bg-secondary-800 rounded-l-lg px-3 py-2 text-secondary-500 dark:text-secondary-400 border border-secondary-300 dark:border-secondary-700">
										{{ baseUrl }}/
									</div>
									<input
										id="modalCustomAlias"
										v-model="newUrlForm.customAlias"
										type="text"
										placeholder="my-custom-link"
										class="input rounded-l-none"
										:disabled="!isPremium"
									/>
								</div>
								<p v-if="!isPremium" class="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
									<NuxtLink to="/pricing" class="text-primary-600 dark:text-primary-400 hover:underline">
										Перейдите на премиум
									</NuxtLink>
									для использования пользовательских алиасов
								</p>
							</div>

							<div>
								<label for="modalExpiresAt" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
									Срок действия (необязательно)
								</label>
								<input
									id="modalExpiresAt"
									v-model="newUrlForm.expiresAt"
									type="date"
									class="input"
									:min="minDate"
								/>
							</div>

							<div v-if="createError" class="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
								{{ createError }}
							</div>

							<div class="flex justify-end space-x-3 pt-2">
								<button
									type="button"
									@click="showCreateModal = false"
									class="btn btn-secondary"
								>
									Отмена
								</button>
								<button
									type="submit"
									class="btn btn-primary"
									:disabled="creatingUrl || !newUrlForm.originalUrl"
								>
									<template v-if="creatingUrl">
										<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Создание...
									</template>
									<template v-else>
										<span class="material-icons text-sm mr-1">add_link</span>
										Создать
									</template>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Teleport>

		<!-- Модальное окно для QR кода -->
		<Teleport to="body">
			<div v-if="selectedUrl && showQRModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div class="bg-white dark:bg-secondary-900 rounded-lg shadow-xl max-w-sm w-full">
					<div class="flex justify-between items-center border-b border-secondary-200 dark:border-secondary-700 p-4">
						<h3 class="text-lg font-semibold text-secondary-900 dark:text-white">QR код для ссылки</h3>
						<button
							@click="showQRModal = false"
							class="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
						>
							<span class="material-icons">close</span>
						</button>
					</div>

					<div class="p-4 text-center">
						<div v-if="qrCode" class="mb-4">
							<img :src="qrCode" alt="QR Code" class="mx-auto w-48 h-48" ref="qrCodeRef" />
						</div>
						<div class="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
							{{ getFullShortUrl(selectedUrl.shortCode) }}
						</div>
						<button
							@click="downloadQRCode"
							class="btn btn-primary w-full"
						>
							<span class="material-icons text-sm mr-2">download</span>
							Скачать QR код
						</button>
					</div>
				</div>
			</div>
		</Teleport>

		<!-- Модальное окно для подтверждения удаления -->
		<Teleport to="body">
			<div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div class="bg-white dark:bg-secondary-900 rounded-lg shadow-xl max-w-md w-full">
					<div class="p-4">
						<div class="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
							<span class="material-icons text-2xl text-red-600 dark:text-red-400">warning</span>
						</div>
						<h3 class="text-lg font-semibold text-secondary-900 dark:text-white text-center mb-2">
							Подтвердите удаление
						</h3>
						<p class="text-center text-secondary-600 dark:text-secondary-400">
							Вы действительно хотите удалить ссылку <span class="font-medium text-secondary-900 dark:text-white">{{ selectedUrl?.shortCode }}</span>?
							Это действие нельзя отменить.
						</p>
					</div>

					<div class="bg-secondary-50 dark:bg-secondary-800 px-4 py-3 flex justify-end space-x-3">
						<button
							@click="showDeleteModal = false"
							class="btn btn-secondary"
						>
							Отмена
						</button>
						<button
							@click="deleteUrl"
							class="btn bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
							:disabled="deleting"
						>
							<template v-if="deleting">
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Удаление...
							</template>
							<template v-else>
								<span class="material-icons text-sm mr-1">delete</span>
								Удалить
							</template>
						</button>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useUrlStore } from '~/stores/url';
import QRCode from 'qrcode';

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
});

const authStore = useAuthStore();
const urlStore = useUrlStore();

const user = computed(() => authStore.user);
const isPremium = computed(() => user.value?.isPremium || false);

// Состояние для фильтров и пагинации
const loading = ref(true);
const urls = ref<any[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = ref(10);
const filters = reactive({
	searchQuery: '',
	status: 'all',
	sortBy: 'createdAt',
	sortOrder: 'desc'
});

// Состояние для создания, удаления URL и модальных окон
const showCreateModal = ref(false);
const showQRModal = ref(false);
const showDeleteModal = ref(false);
const selectedUrl = ref<any>(null);
const newUrlForm = reactive({
	originalUrl: '',
	customAlias: '',
	expiresAt: ''
});
const creatingUrl = ref(false);
const deleting = ref(false);
const createError = ref<string | null>(null);
const qrCode = ref<string | null>(null);
const copiedUrlId = ref<number | null>(null);

// Вычисляемые свойства
const baseUrl = computed(() => {
	if (process.client) {
		return window.location.origin;
	}
	return '';
});

const minDate = computed(() => {
	const today = new Date();
	return today.toISOString().split('T')[0];
});

// Фильтрованные URL
const filteredUrls = computed(() => {
	if (!urls.value) return [];

	return urls.value.filter(url => {
		// Фильтр по поисковому запросу
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			if (!url.originalUrl.toLowerCase().includes(query) &&
				!url.shortCode.toLowerCase().includes(query)) {
				return false;
			}
		}

		// Фильтр по статусу
		if (filters.status !== 'all') {
			const isExpiredUrl = isExpired(url.expiresAt);
			if (filters.status === 'active' && isExpiredUrl) {
				return false;
			}
			if (filters.status === 'expired' && !isExpiredUrl) {
				return false;
			}
		}

		return true;
	});
});

// Диапазон для пагинации
const paginationRange = computed(() => {
	const range = [];
	const maxVisiblePages = 5;

	if (totalPages.value <= maxVisiblePages) {
		for (let i = 1; i <= totalPages.value; i++) {
			range.push(i);
		}
	} else {
		range.push(1);

		if (currentPage.value > 3) {
			range.push('...');
		}

		let start = Math.max(2, currentPage.value - 1);
		let end = Math.min(totalPages.value - 1, currentPage.value + 1);

		for (let i = start; i <= end; i++) {
			range.push(i);
		}

		if (currentPage.value < totalPages.value - 2) {
			range.push('...');
		}

		range.push(totalPages.value);
	}

	return range;
});

// Загрузка URL при монтировании компонента
onMounted(async () => {
	await fetchUrls();
});

// Наблюдатели за изменениями фильтров
watch([() => filters.searchQuery, () => filters.status, () => filters.sortBy, () => filters.sortOrder], async () => {
	currentPage.value = 1;
	await fetchUrls();
});

// Функции
const fetchUrls = async () => {
	loading.value = true;

	try {
		const result = await urlStore.fetchUrls(
			currentPage.value,
			pageSize.value,
			filters.sortBy,
			filters.sortOrder
		);

		urls.value = result.items;
		totalPages.value = result.totalPages;
	} catch (err) {
		console.error('Ошибка при загрузке списка URL:', err);
	} finally {
		loading.value = false;
	}
};

const changePage = async (page: number) => {
	if (page < 1 || page > totalPages.value) return;

	currentPage.value = page;
	await fetchUrls();

	// Прокрутка вверх после смены страницы
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

const createUrl = async () => {
	if (!newUrlForm.originalUrl) return;

	try {
		creatingUrl.value = true;
		createError.value = null;

		const response = await urlStore.createShortUrl({
			originalUrl: newUrlForm.originalUrl,
			customAlias: newUrlForm.customAlias || undefined,
			expiresAt: newUrlForm.expiresAt ? new Date(newUrlForm.expiresAt).toISOString() : undefined
		});

		// Обновление списка URL
		await fetchUrls();

		// Сброс формы и закрытие модального окна
		newUrlForm.originalUrl = '';
		newUrlForm.customAlias = '';
		newUrlForm.expiresAt = '';
		showCreateModal.value = false;

	} catch (err: any) {
		createError.value = err.message || 'Произошла ошибка при создании URL';
	} finally {
		creatingUrl.value = false;
	}
};

const openQRModal = async (url: any) => {
	selectedUrl.value = url;
	showQRModal.value = true;

	try {
		qrCode.value = await QRCode.toDataURL(getFullShortUrl(url.shortCode));
	} catch (err) {
		console.error('Ошибка при создании QR-кода:', err);
	}
};

const downloadQRCode = () => {
	if (!qrCode.value || !selectedUrl.value) return;

	const link = document.createElement('a');
	link.download = `qrcode-${selectedUrl.value.shortCode}.png`;
	link.href = qrCode.value;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const confirmDelete = (url: any) => {
	selectedUrl.value = url;
	showDeleteModal.value = true;
};

const deleteUrl = async () => {
	if (!selectedUrl.value) return;

	try {
		deleting.value = true;

		await urlStore.deleteUrl(selectedUrl.value.id);

		// Обновление списка URL
		await fetchUrls();

		// Закрытие модального окна
		showDeleteModal.value = false;
		selectedUrl.value = null;

	} catch (err) {
		console.error('Ошибка при удалении URL:', err);
	} finally {
		deleting.value = false;
	}
};

const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);

	if (selectedUrl.value) {
		copiedUrlId.value = selectedUrl.value.id;
	}

	setTimeout(() => {
		copiedUrlId.value = null;
	}, 2000);
};

const getFullShortUrl = (shortCode: string) => {
	if (process.client) {
		return `${window.location.origin}/s/${shortCode}`;
	}
	return shortCode;
};

const formatDate = (dateString: string) => {
	if (!dateString) return '';

	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
};

const isExpired = (expiresAt: string) => {
	if (!expiresAt) return false;

	const now = new Date();
	const expirationDate = new Date(expiresAt);

	return expirationDate < now;
};
</script>