<template>
	<div>
		<div v-if="loading" class="flex justify-center items-center py-20">
			<div class="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
		</div>

		<template v-else-if="url">
			<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
				<div>
					<div class="flex items-center space-x-2">
						<NuxtLink
							to="/dashboard/urls"
							class="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
						>
							<span class="material-icons">arrow_back</span>
						</NuxtLink>
						<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Статистика ссылки</h1>
					</div>
					<div class="flex items-center mt-2">
						<span class="text-secondary-600 dark:text-secondary-400 font-medium">{{ url.shortCode }}</span>
						<button
							@click="copyToClipboard(getFullShortUrl(url.shortCode))"
							class="ml-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
							title="Копировать ссылку"
						>
							<span class="material-icons text-sm">{{ copied ? 'check' : 'content_copy' }}</span>
						</button>
					</div>
				</div>

				<div class="flex space-x-2 mt-4 sm:mt-0">
					<a
						:href="getFullShortUrl(url.shortCode)"
						target="_blank"
						class="btn btn-outline"
					>
						<span class="material-icons text-sm mr-2">open_in_new</span>
						Открыть
					</a>
					<button
						@click="generateQRCode"
						class="btn btn-outline"
					>
						<span class="material-icons text-sm mr-2">qr_code_2</span>
						QR код
					</button>
					<button
						@click="confirmDelete"
						class="btn btn-danger"
					>
						<span class="material-icons text-sm mr-2">delete</span>
						Удалить
					</button>
				</div>
			</div>

			<!-- Основная информация о URL -->
			<div class="card mb-6">
				<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Информация о ссылке</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<div>
						<p class="text-sm text-secondary-500 dark:text-secondary-400">Оригинальный URL</p>
						<p class="text-secondary-900 dark:text-white break-all">{{ url.originalUrl }}</p>
					</div>
					<div>
						<p class="text-sm text-secondary-500 dark:text-secondary-400">Короткий URL</p>
						<p class="text-secondary-900 dark:text-white">{{ getFullShortUrl(url.shortCode) }}</p>
					</div>
					<div>
						<p class="text-sm text-secondary-500 dark:text-secondary-400">Дата создания</p>
						<p class="text-secondary-900 dark:text-white">{{ formatDate(url.createdAt) }}</p>
					</div>
					<div>
						<p class="text-sm text-secondary-500 dark:text-secondary-400">Срок действия</p>
						<p class="text-secondary-900 dark:text-white">
							<template v-if="url.expiresAt">
								{{ formatDate(url.expiresAt) }}
								<span
									class="ml-2 px-2 py-0.5 text-xs rounded-full"
									:class="isExpired(url.expiresAt) 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'"
								>
                  {{ isExpired(url.expiresAt) ? 'Истекла' : 'Активна' }}
                </span>
							</template>
							<template v-else>
								Бессрочная
							</template>
						</p>
					</div>
				</div>

				<div class="border-t border-secondary-200 dark:border-secondary-700 pt-4">
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div class="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
								{{ url.clicks }}
							</div>
							<p class="text-secondary-500 dark:text-secondary-400">Всего кликов</p>
						</div>
						<div class="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
								{{ stats.uniqueVisitors || 0 }}
							</div>
							<p class="text-secondary-500 dark:text-secondary-400">Уникальных посетителей</p>
						</div>
						<div class="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4 text-center">
							<div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
								{{ stats.clicksToday || 0 }}
							</div>
							<p class="text-secondary-500 dark:text-secondary-400">Кликов сегодня</p>
						</div>
					</div>
				</div>
			</div>

			<!-- График активности -->
			<div class="card mb-6">
				<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Активность за последние 30
					дней</h2>

				<div v-if="stats.dailyClicks && stats.dailyClicks.length > 0" class="h-64">
					<ClientOnly>
						<ChartComponent :chart-data="chartData" :chart-options="chartOptions"/>
					</ClientOnly>
				</div>
				<div v-else class="flex flex-col items-center justify-center h-64 text-center">
					<span class="material-icons text-5xl text-secondary-300 dark:text-secondary-700">show_chart</span>
					<p class="mt-4 text-secondary-600 dark:text-secondary-400">Недостаточно данных для отображения
						графика</p>
				</div>
			</div>

			<!-- География и устройства -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div class="card">
					<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">География</h2>

					<div v-if="stats.countries && stats.countries.length > 0">
						<div v-for="(country, index) in stats.countries.slice(0, 5)" :key="index" class="mb-2">
							<div class="flex justify-between items-center mb-1">
								<div class="flex items-center">
									<span class="text-secondary-900 dark:text-white">{{ country.name }}</span>
								</div>
								<span class="text-secondary-600 dark:text-secondary-400">{{
										country.count
									}} ({{ calculatePercentage(country.count, url.clicks) }}%)</span>
							</div>
							<div class="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
								<div
									class="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
									:style="`width: ${calculatePercentage(country.count, url.clicks)}%`"
								></div>
							</div>
						</div>
					</div>
					<div v-else class="flex flex-col items-center justify-center h-40 text-center">
						<span class="material-icons text-4xl text-secondary-300 dark:text-secondary-700">public</span>
						<p class="mt-2 text-secondary-600 dark:text-secondary-400">Нет данных о географии</p>
					</div>
				</div>

				<div class="card">
					<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Устройства</h2>

					<div v-if="stats.devices && stats.devices.length > 0">
						<div v-for="(device, index) in stats.devices.slice(0, 5)" :key="index" class="mb-2">
							<div class="flex justify-between items-center mb-1">
								<div class="flex items-center">
                  <span class="material-icons text-secondary-500 dark:text-secondary-400 mr-2">
                    {{ getDeviceIcon(device.name) }}
                  </span>
									<span class="text-secondary-900 dark:text-white">{{ device.name }}</span>
								</div>
								<span class="text-secondary-600 dark:text-secondary-400">{{
										device.count
									}} ({{ calculatePercentage(device.count, url.clicks) }}%)</span>
							</div>
							<div class="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
								<div
									class="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
									:style="`width: ${calculatePercentage(device.count, url.clicks)}%`"
								></div>
							</div>
						</div>
					</div>
					<div v-else class="flex flex-col items-center justify-center h-40 text-center">
						<span class="material-icons text-4xl text-secondary-300 dark:text-secondary-700">devices</span>
						<p class="mt-2 text-secondary-600 dark:text-secondary-400">Нет данных об устройствах</p>
					</div>
				</div>
			</div>

			<!-- Рефереры и браузеры -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="card">
					<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Источники трафика</h2>

					<div v-if="stats.referrers && stats.referrers.length > 0">
						<div v-for="(referrer, index) in stats.referrers.slice(0, 5)" :key="index" class="mb-2">
							<div class="flex justify-between items-center mb-1">
								<div class="flex items-center truncate max-w-[70%]">
                  <span class="text-secondary-900 dark:text-white truncate">
                    {{ referrer.name || 'Прямой переход' }}
                  </span>
								</div>
								<span class="text-secondary-600 dark:text-secondary-400">{{
										referrer.count
									}} ({{ calculatePercentage(referrer.count, url.clicks) }}%)</span>
							</div>
							<div class="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
								<div
									class="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
									:style="`width: ${calculatePercentage(referrer.count, url.clicks)}%`"
								></div>
							</div>
						</div>
					</div>
					<div v-else class="flex flex-col items-center justify-center h-40 text-center">
						<span class="material-icons text-4xl text-secondary-300 dark:text-secondary-700">link</span>
						<p class="mt-2 text-secondary-600 dark:text-secondary-400">Нет данных о источниках трафика</p>
					</div>
				</div>

				<div class="card">
					<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Браузеры</h2>

					<div v-if="stats.browsers && stats.browsers.length > 0">
						<div v-for="(browser, index) in stats.browsers.slice(0, 5)" :key="index" class="mb-2">
							<div class="flex justify-between items-center mb-1">
								<div class="flex items-center">
                  <span class="material-icons text-secondary-500 dark:text-secondary-400 mr-2">
                    {{ getBrowserIcon(browser.name) }}
                  </span>
									<span class="text-secondary-900 dark:text-white">{{ browser.name }}</span>
								</div>
								<span class="text-secondary-600 dark:text-secondary-400">{{
										browser.count
									}} ({{ calculatePercentage(browser.count, url.clicks) }}%)</span>
							</div>
							<div class="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
								<div
									class="bg-primary-600 dark:bg-primary-500 h-2 rounded-full"
									:style="`width: ${calculatePercentage(browser.count, url.clicks)}%`"
								></div>
							</div>
						</div>
					</div>
					<div v-else class="flex flex-col items-center justify-center h-40 text-center">
						<span class="material-icons text-4xl text-secondary-300 dark:text-secondary-700">web</span>
						<p class="mt-2 text-secondary-600 dark:text-secondary-400">Нет данных о браузерах</p>
					</div>
				</div>
			</div>
		</template>

		<div v-else class="flex flex-col items-center justify-center py-20 text-center">
			<span class="material-icons text-6xl text-secondary-300 dark:text-secondary-700">link_off</span>
			<h2 class="mt-4 text-xl font-semibold text-secondary-900 dark:text-white">Ссылка не найдена</h2>
			<p class="mt-2 text-secondary-600 dark:text-secondary-400">
				Запрашиваемая ссылка не существует или была удалена
			</p>
			<NuxtLink to="/dashboard/urls" class="mt-6 btn btn-primary">
				Перейти к списку ссылок
			</NuxtLink>
		</div>

		<!-- Модальное окно QR кода -->
		<Teleport to="body">
			<div v-if="showQRModal"
				 class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div class="bg-white dark:bg-secondary-900 rounded-lg shadow-xl max-w-sm w-full">
					<div
						class="flex justify-between items-center border-b border-secondary-200 dark:border-secondary-700 p-4">
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
							<img :src="qrCode" alt="QR Code" class="mx-auto w-48 h-48" ref="qrCodeRef"/>
						</div>
						<div class="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
							{{ url ? getFullShortUrl(url.shortCode) : '' }}
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

		<!-- Модальное окно подтверждения удаления -->
		<Teleport to="body">
			<div v-if="showDeleteModal"
				 class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
				<div class="bg-white dark:bg-secondary-900 rounded-lg shadow-xl max-w-md w-full">
					<div class="p-4">
						<div
							class="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
							<span class="material-icons text-2xl text-red-600 dark:text-red-400">warning</span>
						</div>
						<h3 class="text-lg font-semibold text-secondary-900 dark:text-white text-center mb-2">
							Подтвердите удаление
						</h3>
						<p class="text-center text-secondary-600 dark:text-secondary-400">
							Вы действительно хотите удалить ссылку <span
							class="font-medium text-secondary-900 dark:text-white">{{ url?.shortCode }}</span>?
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
								<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
									 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUrlStore } from '~/stores/url';
import ChartComponent from '~/components/dashboard/ChartComponent.vue';
import QRCode from 'qrcode';

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
});

const route = useRoute();
const router = useRouter();
const urlStore = useUrlStore();

const id = computed(() => Number(route.params.id));
const url = ref<any>(null);
const stats = reactive({
	uniqueVisitors: 0,
	clicksToday: 0,
	dailyClicks: [],
	countries: [],
	devices: [],
	browsers: [],
	referrers: []
});

const loading = ref(true);
const error = ref<string | null>(null);
const copied = ref(false);
const qrCode = ref<string | null>(null);
const showQRModal = ref(false);
const showDeleteModal = ref(false);
const deleting = ref(false);

// Конфигурация для графика
const chartData = computed(() => {
	if (!stats.dailyClicks || !stats.dailyClicks.length) {
		return {
			labels: [],
			datasets: [{
				data: [],
				backgroundColor: 'rgba(14, 165, 233, 0.2)',
				borderColor: '#0ea5e9',
				borderWidth: 2,
				fill: true
			}]
		};
	}

	return {
		labels: stats.dailyClicks.map(item => item.date),
		datasets: [{
			data: stats.dailyClicks.map(item => item.count),
			backgroundColor: 'rgba(14, 165, 233, 0.2)',
			borderColor: '#0ea5e9',
			borderWidth: 2,
			fill: true
		}]
	};
});

const chartOptions = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		y: {
			beginAtZero: true,
			grid: {
				color: 'rgba(156, 163, 175, 0.1)'
			},
			ticks: {
				precision: 0,
				color: 'rgba(156, 163, 175, 0.8)'
			}
		},
		x: {
			grid: {
				display: false
			},
			ticks: {
				color: 'rgba(156, 163, 175, 0.8)'
			}
		}
	},
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			backgroundColor: 'rgba(15, 23, 42, 0.8)',
			bodyFont: {
				size: 13
			},
			padding: 10,
			cornerRadius: 6,
			displayColors: false
		}
	},
	elements: {
		line: {
			tension: 0.4
		}
	}
};

// Загрузка данных при монтировании компонента
onMounted(async () => {
	await fetchUrlData();
});

// Получение данных URL и статистики
const fetchUrlData = async () => {
	try {
		loading.value = true;

		// Получение информации о URL
		url.value = await urlStore.getUrlByShortCode(id.value);

		// Получение статистики URL
		const statisticsData = await urlStore.getUrlStatistics(id.value);

		// Обновление состояния статистики
		Object.assign(stats, statisticsData);

	} catch (err: any) {
		error.value = err.message || 'Не удалось загрузить данные URL';
		console.error('Ошибка при загрузке данных URL:', err);
	} finally {
		loading.value = false;
	}
};

// Функция копирования в буфер обмена
const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
	copied.value = true;
	setTimeout(() => {
		copied.value = false;
	}, 2000);
};

// Функция генерации QR кода
const generateQRCode = async () => {
	if (!url.value) return;

	try {
		qrCode.value = await QRCode.toDataURL(getFullShortUrl(url.value.shortCode));
		showQRModal.value = true;
	} catch (err) {
		console.error('Ошибка при создании QR-кода:', err);
	}
};

// Функция для загрузки QR кода
const downloadQRCode = () => {
	if (!qrCode.value || !url.value) return;

	const link = document.createElement('a');
	link.download = `qrcode-${url.value.shortCode}.png`;
	link.href = qrCode.value;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

// Функция подтверждения удаления
const confirmDelete = () => {
	showDeleteModal.value = true;
};

// Функция удаления URL
const deleteUrl = async () => {
	if (!url.value) return;

	try {
		deleting.value = true;
		await urlStore.deleteUrl(url.value.id);

		// Перенаправление на страницу со списком URL
		router.push('/dashboard/urls');
	} catch (err: any) {
		error.value = err.message || 'Не удалось удалить URL';
		console.error('Ошибка при удалении URL:', err);
	} finally {
		deleting.value = false;
		showDeleteModal.value = false;
	}
};

// Вспомогательные функции
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
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
};

const isExpired = (expiresAt: string) => {
	if (!expiresAt) return false;

	const now = new Date();
	const expirationDate = new Date(expiresAt);

	return expirationDate < now;
};

const calculatePercentage = (value: number, total: number) => {
	if (!total || !value) return 0;
	return Math.round((value / total) * 100);
};

const getDeviceIcon = (device: string) => {
	const deviceLower = device.toLowerCase();
	if (deviceLower.includes('mobile') || deviceLower.includes('phone')) {
		return 'smartphone';
	} else if (deviceLower.includes('tablet')) {
		return 'tablet';
	} else if (deviceLower.includes('desktop') || deviceLower.includes('pc')) {
		return 'computer';
	} else {
		return 'devices';
	}
};

const getBrowserIcon = (browser: string) => {
	const browserLower = browser.toLowerCase();
	if (browserLower.includes('chrome')) {
		return 'chrome';
	} else if (browserLower.includes('firefox')) {
		return 'web';
	} else if (browserLower.includes('safari')) {
		return 'web';
	} else if (browserLower.includes('edge')) {
		return 'web';
	} else {
		return 'web';
	}
};
</script>