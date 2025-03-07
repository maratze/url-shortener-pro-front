<template>
	<div class="container mx-auto px-4 py-12">
		<div class="max-w-7xl mx-auto">
			<!-- Заголовок и информационный блок -->
			<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
				<div>
					<h1 class="text-3xl font-bold text-slate-800 dark:text-white">URL History</h1>
					<p class="mt-2 text-slate-600 dark:text-slate-400">
						Track and manage all your shortened links in one place
					</p>
				</div>
				<button
					v-if="authStore.isAuthenticated"
					@click="openCreateLinkModal"
					class="create-button"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
					</svg>
					Create New Link
				</button>
			</div>

			<!-- Уведомление для неавторизованных пользователей -->
			<div v-if="!authStore.isAuthenticated" class="mb-8">
				<div class="glass-card p-6 border-l-4 border-indigo-500">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-lg font-medium text-slate-800 dark:text-white">Limited History Mode</h3>
							<div class="mt-2 text-sm text-slate-600 dark:text-slate-400">
								<p>Your URL history is stored locally in this browser. You have used {{ usedCount }} of 30 free shortenings.</p>
								<div class="mt-3 flex space-x-4">
									<NuxtLink to="/register" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Create Account
									</NuxtLink>
									<NuxtLink to="/login" class="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Log In
									</NuxtLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Сводная статистика -->
			<HistorySummary :summary-data="summaryData" />

			<!-- Фильтры и поиск -->
			<HistoryFilters
				@search="handleSearch"
				@filter="handleFilter"
				@view-change="handleViewChange"
				:view-mode="viewMode"
			/>

			<!-- Таблица/карточки ссылок - со скелетоном при загрузке -->
			<div v-if="loading" class="mt-6">
				<HistorySkeleton :view-mode="viewMode" :item-count="5" />
			</div>
			<div v-else-if="filteredLinks.length === 0" class="mt-6 text-center py-12">
				<div class="glass-card p-8 flex flex-col items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
					</svg>
					<h3 class="mt-4 text-lg font-medium text-slate-800 dark:text-white">No links found</h3>
					<p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
						{{
							links.length === 0
								? "You haven't created any shortened links yet"
								: "No links match your current search filters"
						}}
					</p>
					<button
						v-if="links.length === 0"
						@click="openCreateLinkModal"
						class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
					>
						Create Your First Link
					</button>
					<button
						v-else
						@click="resetFilters"
						class="mt-4 inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
					>
						Reset Filters
					</button>
				</div>
			</div>
			<div v-else class="mt-6">
				<HistoryTable
					v-if="viewMode === 'table'"
					:links="paginatedLinks"
					@edit="openEditModal"
					@delete="openDeleteModal"
					@view-stats="openStatsModal"
					@copy="copyShortUrl"
				/>
				<HistoryCards
					v-else
					:links="paginatedLinks"
					@edit="openEditModal"
					@delete="openDeleteModal"
					@view-stats="openStatsModal"
					@copy="copyShortUrl"
				/>

				<!-- Пагинация -->
				<div class="mt-6 flex justify-between items-center">
					<p class="text-sm text-slate-600 dark:text-slate-400">
						Showing {{ paginationStart }}-{{ paginationEnd }} of {{ filteredLinks.length }} links
					</p>
					<PaginationControls
						:total-pages="totalPages"
						:current-page="currentPage"
						@page-change="handlePageChange"
					/>
				</div>
			</div>
		</div>

		<!-- Модальные окна -->
		<CreateLinkModal
			v-if="showCreateLinkModal"
			@close="showCreateLinkModal = false"
			@create="createNewLink"
		/>
		<EditLinkModal
			v-if="showEditLinkModal"
			:link="selectedLink"
			@close="showEditLinkModal = false"
			@save="updateLink"
		/>
		<DeleteLinkModal
			v-if="showDeleteLinkModal"
			:link="selectedLink"
			@close="showDeleteLinkModal = false"
			@confirm="deleteLink"
		/>
		<StatsModal
			v-if="showStatsModal"
			:link="selectedLink"
			@close="showStatsModal = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';
import { useDeviceFingerprint } from '~/composables/useDeviceFingerprint';
import type { LinkData, SummaryData } from '~/types/link';

// Импорт компонентов
import HistorySummary from '~/components/history/HistorySummary.vue';
import HistoryFilters from '~/components/history/HistoryFilters.vue';
import HistoryTable from '~/components/history/HistoryTable.vue';
import HistoryCards from '~/components/history/HistoryCards.vue';
import HistorySkeleton from '~/components/history/HistorySkeleton.vue';
import PaginationControls from '~/components/common/PaginationControls.vue';
import CreateLinkModal from '~/components/history/modals/CreateLinkModal.vue';
import EditLinkModal from '~/components/history/modals/EditLinkModal.vue';
import DeleteLinkModal from '~/components/history/modals/DeleteLinkModal.vue';
import StatsModal from '~/components/history/modals/StatsModal.vue';

// Store and composables
const authStore = useAuthStore();
const toastStore = useToastStore();
const { fingerprint, generateFingerprint } = useDeviceFingerprint();

// Meta tags
useHead({
	title: 'URL History - TinyLink',
	meta: [
		{ name: 'description', content: 'View and manage your shortened URLs history with analytics and tracking' }
	]
});

// State variables
const loading = ref(true);
const links = ref<LinkData[]>([]);
const viewMode = ref<'table' | 'cards'>('table');
const usedCount = ref(0);

// Search and filter state
const searchQuery = ref('');
const filters = ref({
	dateRange: 'all',
	status: 'all',
	sortBy: 'date-desc'
});

// Pagination state
const currentPage = ref(1);
const perPage = ref(10);

// Modal state
const showCreateLinkModal = ref(false);
const showEditLinkModal = ref(false);
const showDeleteLinkModal = ref(false);
const showStatsModal = ref(false);
const selectedLink = ref<LinkData | null>(null);

// Summary data
const summaryData = ref<SummaryData>({
	totalLinks: 0,
	totalClicks: 0,
	averageCTR: 0,
	activeLinks: 0,
	weeklyClicksData: []
});

// Computed properties
const filteredLinks = computed(() => {
	let result = [...links.value];

	// Apply search
	if (searchQuery.value) {
		const query = searchQuery.value.toLowerCase();
		result = result.filter(link =>
			link.originalUrl.toLowerCase().includes(query) ||
			link.shortUrl.toLowerCase().includes(query) ||
			(link.title && link.title.toLowerCase().includes(query))
		);
	}

	// Apply status filter
	if (filters.value.status !== 'all') {
		const isActive = filters.value.status === 'active';
		result = result.filter(link => link.isActive === isActive);
	}

	// Apply date range filter
	if (filters.value.dateRange !== 'all') {
		const now = new Date();
		let cutoffDate = new Date();

		switch (filters.value.dateRange) {
			case 'today':
				cutoffDate.setHours(0, 0, 0, 0);
				break;
			case 'week':
				cutoffDate.setDate(now.getDate() - 7);
				break;
			case 'month':
				cutoffDate.setMonth(now.getMonth() - 1);
				break;
			case 'year':
				cutoffDate.setFullYear(now.getFullYear() - 1);
				break;
		}

		result = result.filter(link => new Date(link.createdAt) >= cutoffDate);
	}

	// Apply sorting
	switch (filters.value.sortBy) {
		case 'date-desc':
			result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			break;
		case 'date-asc':
			result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
			break;
		case 'clicks-desc':
			result.sort((a, b) => b.clicks - a.clicks);
			break;
		case 'clicks-asc':
			result.sort((a, b) => a.clicks - b.clicks);
			break;
		case 'title-asc':
			result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
			break;
		case 'title-desc':
			result.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
			break;
	}

	return result;
});

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredLinks.value.length / perPage.value));

const paginatedLinks = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return filteredLinks.value.slice(start, end);
});

const paginationStart = computed(() => {
	if (filteredLinks.value.length === 0) return 0;
	return (currentPage.value - 1) * perPage.value + 1;
});

const paginationEnd = computed(() => {
	return Math.min(currentPage.value * perPage.value, filteredLinks.value.length);
});

// Methods
const fetchLinks = async () => {
	loading.value = true;
	try {
		let linksData;

		if (authStore.isAuthenticated) {
			// Fetch from server API for logged in users
			const response = await fetch('/api/links', {
				headers: {
					'Authorization': `Bearer ${authStore.token}`
				}
			});
			linksData = await response.json();
		} else {
			// Fetch from localStorage for guests + check fingerprint on server
			linksData = getLinksFromLocalStorage();
			await validateGuestLinks(linksData);
		}

		links.value = linksData;
		updateSummaryData();

		// Update used count for non-auth users
		if (!authStore.isAuthenticated) {
			usedCount.value = linksData.length;
		}
	} catch (error) {
		console.error('Error fetching links:', error);
		toastStore.error('Failed to load your URL history');
		links.value = [];
	} finally {
		loading.value = false;
	}
};

// Update summary statistics
const updateSummaryData = () => {
	const totalLinks = links.value.length;
	const totalClicks = links.value.reduce((sum, link) => sum + link.clicks, 0);
	const activeLinks = links.value.filter(link => link.isActive).length;
	const averageCTR = totalLinks > 0 ? (totalClicks / totalLinks).toFixed(2) : 0;

	// Generate weekly clicks data
	const weeklyData = generateWeeklyClicksData();

	summaryData.value = {
		totalLinks,
		totalClicks,
		averageCTR: Number(averageCTR),
		activeLinks,
		weeklyClicksData: weeklyData
	};
};

// Generate mock weekly clicks data for the chart
const generateWeeklyClicksData = () => {
	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const today = new Date().getDay(); // 0-6
	const last7days = [];

	for (let i = 6; i >= 0; i--) {
		const dayIndex = (today - i + 7) % 7;

		// Filter links created on this day of the week
		const dayLinks = links.value.filter(link => {
			const linkDate = new Date(link.createdAt);
			return linkDate.getDay() === dayIndex;
		});

		const clicks = dayLinks.reduce((sum, link) => sum + link.clicks, 0);

		last7days.push({
			day: daysOfWeek[dayIndex],
			clicks
		});
	}

	return last7days;
};

// Handle search input
const handleSearch = (query: string) => {
	searchQuery.value = query;
	currentPage.value = 1; // Reset to first page
};

// Handle filter changes
const handleFilter = (newFilters: any) => {
	filters.value = { ...newFilters };
	currentPage.value = 1; // Reset to first page
};

// Handle view mode changes
const handleViewChange = (mode: 'table' | 'cards') => {
	viewMode.value = mode;
	localStorage.setItem('tinylink-view-preference', mode);
};

// Handle pagination
const handlePageChange = (page: number) => {
	currentPage.value = page;
	// Scroll to top of the links section
	window.scrollTo({
		top: document.getElementById('links-section')?.offsetTop || 0,
		behavior: 'smooth'
	});
};

// Reset all filters
const resetFilters = () => {
	searchQuery.value = '';
	filters.value = {
		dateRange: 'all',
		status: 'all',
		sortBy: 'date-desc'
	};
	currentPage.value = 1;
};

// Modal handling methods
const openCreateLinkModal = () => {
	showCreateLinkModal.value = true;
};

const openEditModal = (link: LinkData) => {
	selectedLink.value = link;
	showEditLinkModal.value = true;
};

const openDeleteModal = (link: LinkData) => {
	selectedLink.value = link;
	showDeleteLinkModal.value = true;
};

const openStatsModal = (link: LinkData) => {
	selectedLink.value = link;
	showStatsModal.value = true;
};

// Action methods
const createNewLink = async (linkData: Partial<LinkData>) => {
	try {
		// Check free links limit for non-auth users
		if (!authStore.isAuthenticated && links.value.length >= 30) {
			toastStore.error('You have reached the limit of 30 free links. Please create an account to continue.');
			return;
		}

		const newLink: LinkData = {
			id: generateUniqueId(),
			originalUrl: linkData.originalUrl || '',
			shortUrl: linkData.shortUrl || generateShortUrl(),
			title: linkData.title || '',
			clicks: 0,
			isActive: true,
			createdAt: new Date().toISOString(),
			...(linkData.customSlug ? { customSlug: linkData.customSlug } : {})
		};

		if (authStore.isAuthenticated) {
			// Send to server API
			await fetch('/api/links', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${authStore.token}`
				},
				body: JSON.stringify(newLink)
			});
		} else {
			// Store in localStorage and update fingerprint record
			const storedLinks = getLinksFromLocalStorage();
			storedLinks.push(newLink);
			localStorage.setItem('tinylink-links', JSON.stringify(storedLinks));

			// Update fingerprint
			await updateFingerprintRecord(newLink);
		}

		// Update UI
		links.value.push(newLink);
		updateSummaryData();

		// Update used count for non-auth users
		if (!authStore.isAuthenticated) {
			usedCount.value++;
		}

		showCreateLinkModal.value = false;
		toastStore.success('Link created successfully');
	} catch (error) {
		console.error('Error creating link:', error);
		toastStore.error('Failed to create link');
	}
};

const updateLink = async (updatedLink: LinkData) => {
	try {
		const index = links.value.findIndex(link => link.id === updatedLink.id);

		if (index !== -1) {
			if (authStore.isAuthenticated) {
				// Update on server
				await fetch(`/api/links/${updatedLink.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${authStore.token}`
					},
					body: JSON.stringify(updatedLink)
				});
			} else {
				// Update in localStorage
				const storedLinks = getLinksFromLocalStorage();
				const storedIndex = storedLinks.findIndex(link => link.id === updatedLink.id);

				if (storedIndex !== -1) {
					storedLinks[storedIndex] = updatedLink;
					localStorage.setItem('tinylink-links', JSON.stringify(storedLinks));
				}
			}

			// Update UI
			links.value[index] = updatedLink;
			updateSummaryData();

			showEditLinkModal.value = false;
			toastStore.success('Link updated successfully');
		}
	} catch (error) {
		console.error('Error updating link:', error);
		toastStore.error('Failed to update link');
	}
};

const deleteLink = async (linkId: string) => {
	try {
		if (authStore.isAuthenticated) {
			// Delete from server
			await fetch(`/api/links/${linkId}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${authStore.token}`
				}
			});
		} else {
			// Delete from localStorage
			const storedLinks = getLinksFromLocalStorage().filter(link => link.id !== linkId);
			localStorage.setItem('tinylink-links', JSON.stringify(storedLinks));
		}

		// Update UI
		links.value = links.value.filter(link => link.id !== linkId);
		updateSummaryData();

		// Update used count for non-auth users
		if (!authStore.isAuthenticated) {
			usedCount.value = links.value.length;
		}

		showDeleteLinkModal.value = false;
		toastStore.success('Link deleted successfully');
	} catch (error) {
		console.error('Error deleting link:', error);
		toastStore.error('Failed to delete link');
	}
};

const copyShortUrl = (url: string) => {
	navigator.clipboard.writeText(url).then(() => {
		toastStore.success('Link copied to clipboard');
	}).catch(() => {
		toastStore.error('Failed to copy link');
	});
};

// Helper methods for local storage
const getLinksFromLocalStorage = (): LinkData[] => {
	try {
		const storedLinks = localStorage.getItem('tinylink-links');
		return storedLinks ? JSON.parse(storedLinks) : [];
	} catch (error) {
		console.error('Error reading from localStorage:', error);
		return [];
	}
};

// Helper methods for fingerprinting and link validation
const validateGuestLinks = async (linksData: LinkData[]) => {
	try {
		// Get device fingerprint
		const deviceFingerprint = await generateFingerprint();

		// Send to server to validate against limits
		const response = await fetch('/api/links/validate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fingerprint: deviceFingerprint,
				links: linksData
			})
		});

		const validationResult = await response.json();

		if (!validationResult.valid) {
			// Handle validation failure - server detected abuse
			toastStore.info(validationResult.message || 'You may have exceeded your free link quota');

			// Server might return allowedLinks that are still valid
			if (validationResult.allowedLinks) {
				linksData = validationResult.allowedLinks;
				localStorage.setItem('tinylink-links', JSON.stringify(linksData));
			}
		}

		return linksData;
	} catch (error) {
		console.error('Error validating links:', error);
		return linksData;
	}
};

const updateFingerprintRecord = async (newLink: LinkData) => {
	try {
		// Get device fingerprint
		const deviceFingerprint = await generateFingerprint();

		// Send to server to update fingerprint record
		await fetch('/api/links/fingerprint-record', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fingerprint: deviceFingerprint,
				linkId: newLink.id
			})
		});
	} catch (error) {
		console.error('Error updating fingerprint record:', error);
	}
};

// Utility functions
const generateUniqueId = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

const generateShortUrl = () => {
	// This would be replaced with actual API call
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < 6; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return `https://tiny.link/${result}`;
};

// Setup
onMounted(async () => {
	// Load saved view preference
	const savedViewMode = localStorage.getItem('tinylink-view-preference');
	if (savedViewMode === 'table' || savedViewMode === 'cards') {
		viewMode.value = savedViewMode;
	}

	// Fetch links data
	await fetchLinks();
});

// Watch for auth state changes
watch(() => authStore.isAuthenticated, async (isAuthenticated) => {
	// Reload links when auth state changes
	await fetchLinks();
});
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.create-button {
	@apply flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200;
}

/* Add responsive styles for mobile */
@media (max-width: 640px) {
	.create-button {
		@apply w-full justify-center;
	}
}
</style>