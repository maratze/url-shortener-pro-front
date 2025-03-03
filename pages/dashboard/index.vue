<template>
	<div>
		<div class="mb-6">
			<h1 class="text-2xl font-bold text-secondary-900 dark:text-white">Обзор</h1>
			<p class="text-secondary-600 dark:text-secondary-400 mt-1">
				Добро пожаловать, {{ user?.email || 'пользователь' }}! Ваша статистика использования ниже.
			</p>
		</div>

		<!-- Статистические карточки -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
			<div class="card border-l-4 border-primary-500">
				<div class="flex items-center">
					<div class="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3 mr-4">
						<span class="material-icons text-primary-600 dark:text-primary-400">link</span>
					</div>
					<div>
						<p class="text-sm text-secondary-600 dark:text-secondary-400">Всего ссылок</p>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white">{{
								stats.totalUrls || 0
							}}</h3>
					</div>
				</div>
			</div>

			<div class="card border-l-4 border-green-500">
				<div class="flex items-center">
					<div class="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
						<span class="material-icons text-green-600 dark:text-green-400">trending_up</span>
					</div>
					<div>
						<p class="text-sm text-secondary-600 dark:text-secondary-400">Всего кликов</p>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white">{{
								stats.totalClicks || 0
							}}</h3>
					</div>
				</div>
			</div>

			<div class="card border-l-4 border-amber-500">
				<div class="flex items-center">
					<div class="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mr-4">
						<span class="material-icons text-amber-600 dark:text-amber-400">schedule</span>
					</div>
					<div>
						<p class="text-sm text-secondary-600 dark:text-secondary-400">Активные ссылки</p>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white">{{
								stats.activeUrls || 0
							}}</h3>
					</div>
				</div>
			</div>

			<div class="card border-l-4 border-purple-500">
				<div class="flex items-center">
					<div class="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 mr-4">
						<span class="material-icons text-purple-600 dark:text-purple-400">calendar_today</span>
					</div>
					<div>
						<p class="text-sm text-secondary-600 dark:text-secondary-400">Ссылок за 7 дней</p>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white">{{
								stats.urlsLast7Days || 0
							}}</h3>
					</div>
				</div>
			</div>
		</div>

		<!-- Форма быстрого создания ссылки -->
		<div class="card mb-6">
			<h2 class="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Создать новую ссылку</h2>
			<div class="flex flex-col md:flex-row gap-2">
				<div class="flex-grow relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-secondary-500 dark:text-secondary-400">
            <span class="material-icons text-base">link</span>
          </span>
					<input
						v-model="newUrlForm.originalUrl"
						type="url"
						placeholder="https://example.com/long-url"
						class="input pl-10"
						required
					/>
				</div>
				<button
					@click="createUrl"
					class="btn btn-primary flex items-center justify-center"
					:disabled="!newUrlForm.originalUrl || creatingUrl"
				>
					<span v-if="creatingUrl" class="material-icons animate-spin mr-1">refresh</span>
					<span v-else class="material-icons mr-1">add_link</span>
					{{ creatingUrl ? 'Создание...' : 'Создать' }}
				</button>
			</div>
			<div v-if="recentUrl" class="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-sm text-green-700 dark:text-green-400 font-medium">Ссылка успешно создана!</p>
						<div class="flex items-center mt-1">
							<span class="text-secondary-800 dark:text-secondary-200 break-all">{{
									getFullShortUrl(recentUrl.shortCode)
								}}</span>
							<button
								@click="copyToClipboard(getFullShortUrl(recentUrl.shortCode))"
								class="ml-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400"
							>
								<span class="material-icons text-sm">{{ copied ? 'check' : 'content_copy' }}</span>
							</button>
						</div>
					</div>
					<NuxtLink
						:to="`/dashboard/urls/${recentUrl.id}`"
						class="text-primary-600 dark:text-primary-400 text-sm hover:underline"
					>
						Подробнее
					</NuxtLink>
				</div>
			</div>
		</div>

		<!-- График активности -->
		<div class="card mb-6">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-lg font-semibold text-secondary-900 dark:text-white">Активность за неделю</h2>
				<div class="flex space-x-2">
					<button
						@click="chartType = 'clicks'"
						class="px-2 py-1 text-sm rounded-md"
						:class="chartType === 'clicks' 
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400' 
              : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'"
					>
						Клики
					</button>
					<button
						@click="chartType = 'urls'"
						class="px-2 py-1 text-sm rounded-md"
						:class="chartType === 'urls' 
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400' 
              : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'"
					>
						Ссылки
					</button>
				</div>
			</div>

			<div v-if="loading" class="flex justify-center items-center h-64">
				<div class="animate-spin h-10 w-10 border-4 border-primary-600 border-t-transparent rounded-full"></div>
			</div>
			<div v-else-if="chartData.labels.length" class="h-64">
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

		<!-- Последние ссылки -->
		<div class="card">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-lg font-semibold text-secondary-900 dark:text-white">Последние ссылки</h2>
				<NuxtLink
					to="/dashboard/urls"
					class="text-sm text-primary-600 dark:text-primary-400 flex items-center hover:underline"
				>
					Все ссылки
					<span class="material-icons text-sm ml-1">arrow_forward</span>
				</NuxtLink>
			</div>

			<div v-if="loading" class="flex justify-center items-center py-12">
				<div class="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
			</div>
			<div v-else-if="recentUrls.length === 0"
				 class="flex flex-col items-center justify-center py-12 text-center">
				<span class="material-icons text-5xl text-secondary-300 dark:text-secondary-700">link_off</span>
				<p class="mt-4 text-secondary-600 dark:text-secondary-400">У вас пока нет ссылок</p>
				<button
					@click="scrollToCreateForm"
					class="mt-4 btn btn-primary"
				>
					Создать первую ссылку
				</button>
			</div>
			<div v-else class="overflow-x-auto">
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
							Дата создания
						</th>
						<th class="px-4 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
							Действия
						</th>
					</tr>
					</thead>
					<tbody class="divide-y divide-secondary-200 dark:divide-secondary-700">
					<tr v-for="url in recentUrls" :key="url.id"
						class="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
						<td class="px-4 py-3 whitespace-nowrap">
							<div class="flex items-center">
								<span class="text-primary-600 dark:text-primary-400 font-medium">{{
										url.shortCode
									}}</span>
								<button
									@click="copyToClipboard(getFullShortUrl(url.shortCode))"
									class="ml-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
								>
									<span class="material-icons text-sm">content_copy</span>
								</button>
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
							<div class="text-sm text-secondary-600 dark:text-secondary-400">
								{{ formatDate(url.createdAt) }}
							</div>
						</td>
						<td class="px-4 py-3 whitespace-nowrap text-right text-sm">
							<NuxtLink
								:to="`/dashboard/urls/${url.id}`"
								class="text-primary-600 dark:text-primary-400 hover:underline"
							>
								Подробнее
							</NuxtLink>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useUrlStore } from '~/stores/url';
import ChartComponent from '~/components/dashboard/ChartComponent.vue';

definePageMeta({
	middleware: ['auth'],
	layout: 'dashboard'
});

const authStore = useAuthStore();
const urlStore = useUrlStore();

const user = computed(() => authStore.user);
const loading = ref(true);
const stats = reactive({
	totalUrls: 0,
	totalClicks: 0,
	activeUrls: 0,
	urlsLast7Days: 0
});
const recentUrls = ref<any[]>([]);
const newUrlForm = reactive({
	originalUrl: ''
});
const creatingUrl = ref(false);
const recentUrl = ref<any>(null);
const copied = ref(false);
const chartType = ref<'clicks' | 'urls'>('clicks');
const chartData = reactive({
	labels: [],
	datasets: [
		{
			data: [],
			backgroundColor: '#0ea5e9',
			borderColor: '#0284c7',
			borderWidth: 2,
			fill: true
		}
	]
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
	try {
		await Promise.all([
			fetchDashboardStats(),
			fetchRecentUrls(),
			fetchChartData()
		]);
	} finally {
		loading.value = false;
	}
});

// Функция для получения статистики дашборда
const fetchDashboardStats = async () => {
	try {
		const { $api } = useNuxtApp();
		const data = await $api('/dashboard/stats');
		stats.totalUrls = data.totalUrls;
		stats.totalClicks = data.totalClicks;
		stats.activeUrls = data.activeUrls;
		stats.urlsLast7Days = data.urlsLast7Days;
	} catch (err) {
		console.error('Ошибка при загрузке статистики:', err);
	}
};

// Функция для получения последних ссылок
const fetchRecentUrls = async () => {
	try {
		const { $api } = useNuxtApp();
		const data = await $api('/urls?page=1&pageSize=5&sortBy=createdAt&sortOrder=desc');
		recentUrls.value = data.items || [];
	} catch (err) {
		console.error('Ошибка при загрузке последних ссылок:', err);
	}
};

// Функция для получения данных графика
const fetchChartData = async () => {
	try {
		const { $api } = useNuxtApp();
		const data = await $api('/dashboard/activity');

		// Обновление данных графика в зависимости от выбранного типа
		updateChartData(data);

		// Обновление графика при изменении типа
		watch(chartType, () => {
			updateChartData(data);
		});
	} catch (err) {
		console.error('Ошибка при загрузке данных активности:', err);
	}
};

// Функция для обновления данных графика
const updateChartData = (data) => {
	if (!data || !data.dates || !data.clicks || !data.urls) return;

	chartData.labels = data.dates;

	if (chartType.value === 'clicks') {
		chartData.datasets[0].data = data.clicks;
		chartData.datasets[0].backgroundColor = 'rgba(14, 165, 233, 0.2)';
		chartData.datasets[0].borderColor = '#0ea5e9';
	} else {
		chartData.datasets[0].data = data.urls;
		chartData.datasets[0].backgroundColor = 'rgba(168, 85, 247, 0.2)';
		chartData.datasets[0].borderColor = '#a855f7';
	}
};

// Функция для создания новой ссылки
const createUrl = async () => {
	if (!newUrlForm.originalUrl) return;

	try {
		creatingUrl.value = true;
		const response = await urlStore.createShortUrl({
			originalUrl: newUrlForm.originalUrl
		});

		recentUrl.value = response;
		newUrlForm.originalUrl = '';

		// Обновление списка последних ссылок
		await fetchRecentUrls();
		// Обновление статистики дашборда
		await fetchDashboardStats();
	} catch (err) {
		console.error('Ошибка при создании ссылки:', err);
	} finally {
		creatingUrl.value = false;
	}
};

// Функция для копирования в буфер обмена
const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text);
	copied.value = true;
	setTimeout(() => {
		copied.value = false;
	}, 2000);
};

// Функция для получения полного URL на основе короткого кода
const getFullShortUrl = (shortCode) => {
	if (process.client) {
		return `${window.location.origin}/s/${shortCode}`;
	}
	return shortCode;
};

// Функция форматирования даты
const formatDate = (dateString) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
};

// Функция для прокрутки к форме создания ссылки
const scrollToCreateForm = () => {
	const formElement = document.querySelector('.card');
	if (formElement) {
		formElement.scrollIntoView({ behavior: 'smooth' });
	}
};
</script>