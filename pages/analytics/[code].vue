<template>
	<div class="container mx-auto max-w-5xl px-4 py-8">
		<div class="glass-card-highlight mb-8 p-6">
			<div v-if="loading" class="flex items-center justify-center py-12">
				<div class="animate-spin h-10 w-10 text-white">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			</div>

			<div v-else-if="error" class="text-center py-12">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-white/80 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
				<h2 class="text-xl font-bold text-white mb-2">{{ error }}</h2>
				<NuxtLink to="/" class="text-white/80 hover:text-white underline">Return to homepage</NuxtLink>
			</div>

			<div v-else>
				<div class="flex items-center justify-between mb-8">
					<div>
						<h1 class="text-2xl md:text-3xl font-bold text-white mb-2">Analytics for {{ urlData.shortUrl }}</h1>
						<div class="flex items-center">
							<NuxtLink :to="urlData.originalUrl" target="_blank" class="text-white/80 hover:text-white underline truncate max-w-lg">
								{{ urlData.originalUrl }}
							</NuxtLink>
							<button @click="copyToClipboard(urlData.originalUrl)" class="ml-2 text-white/60 hover:text-white">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
									<path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
								</svg>
							</button>
						</div>
					</div>
					<div class="flex items-center space-x-3">
						<button @click="showQrCode = true" class="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clip-rule="evenodd" />
								<path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
							</svg>
						</button>

						<button @click="copyToClipboard(urlData.shortUrl)" class="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
								<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
								<path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
							</svg>
						</button>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<div class="glass-stat-card">
						<div class="text-4xl font-bold text-white mb-1">{{ analyticsData.clickCount }}</div>
						<div class="text-sm text-white/80">Total Clicks</div>
					</div>

					<div class="glass-stat-card">
						<div class="text-4xl font-bold text-white mb-1">{{ analyticsData.countries.length }}</div>
						<div class="text-sm text-white/80">Countries</div>
					</div>

					<div class="glass-stat-card">
						<div class="text-4xl font-bold text-white mb-1">{{ analyticsData.devices.length }}</div>
						<div class="text-sm text-white/80">Device Types</div>
					</div>

					<div class="glass-stat-card">
						<div class="text-4xl font-bold text-white mb-1">{{ analyticsData.browsers.length }}</div>
						<div class="text-sm text-white/80">Browsers</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
			<div class="glass-panel">
				<h2 class="text-xl font-medium text-slate-900 dark:text-white mb-4">Countries</h2>
				<div class="space-y-3">
					<div v-for="country in analyticsData.countries.slice(0, 5)" :key="country.code" class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="w-8 h-6 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden mr-3"></div>
							<span class="text-slate-900 dark:text-white">{{ country.name }}</span>
						</div>
						<div class="text-slate-600 dark:text-slate-400">{{ country.count }} clicks</div>
					</div>
				</div>
			</div>

			<div class="glass-panel">
				<h2 class="text-xl font-medium text-slate-900 dark:text-white mb-4">Referrers</h2>
				<div class="space-y-3">
					<div v-for="(referrer, index) in analyticsData.referrers.slice(0, 5)" :key="index" class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mr-3 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400">
								{{ referrer.name.charAt(0).toUpperCase() }}
							</div>
							<span class="text-slate-900 dark:text-white">{{ referrer.name || 'Direct' }}</span>
						</div>
						<div class="text-slate-600 dark:text-slate-400">{{ referrer.count }} clicks</div>
					</div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="glass-panel">
				<h2 class="text-xl font-medium text-slate-900 dark:text-white mb-4">Devices</h2>
				<div class="space-y-3">
					<div v-for="(device, index) in analyticsData.devices.slice(0, 5)" :key="index" class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="w-8 h-8 text-slate-700 dark:text-slate-300 mr-3">
								<svg v-if="device.name === 'Mobile'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
								<svg v-else-if="device.name === 'Desktop'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
								<svg v-else-if="device.name === 'Tablet'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
								<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<span class="text-slate-900 dark:text-white">{{ device.name }}</span>
						</div>
						<div class="text-slate-600 dark:text-slate-400">{{ device.count }} clicks</div>
					</div>
				</div>
			</div>

			<div class="glass-panel">
				<h2 class="text-xl font-medium text-slate-900 dark:text-white mb-4">Browsers</h2>
				<div class="space-y-3">
					<div v-for="(browser, index) in analyticsData.browsers.slice(0, 5)" :key="index" class="flex items-center justify-between">
						<div class="flex items-center">
							<div class="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mr-3 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400">
								{{ browser.name.charAt(0).toUpperCase() }}
							</div>
							<span class="text-slate-900 dark:text-white">{{ browser.name }}</span>
						</div>
						<div class="text-slate-600 dark:text-slate-400">{{ browser.count }} clicks</div>
					</div>
				</div>
			</div>
		</div>

		<!-- QR Code Modal -->
		<QrCodeModal
			v-model="showQrCode"
			:url="urlData?.shortUrl || ''"
			title="QR Code for your shortened URL"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToastStore } from '~/stores/toast';
import type { ShortUrl, AnalyticsData } from '~/types/url';

const route = useRoute();
const urlCode = route.params.code as string;
const loading = ref(true);
const error = ref<string | null>(null);
const showQrCode = ref(false);
const toastStore = useToastStore();

// Mock data that would come from an API in a real app
const urlData = ref<ShortUrl>({
	id: '1234',
	originalUrl: 'https://example.com/very-long-path-with-query-params?utm_source=email&utm_medium=banner',
	shortUrl: `https://short.link/${urlCode}`,
	createdAt: '2025-03-01T12:00:00.000Z',
	clickCount: 145
});

const analyticsData = ref<AnalyticsData>({
	clickCount: 145,
	referrers: [
		{ name: 'Direct', count: 45 },
		{ name: 'Twitter', count: 38 },
		{ name: 'Facebook', count: 27 },
		{ name: 'LinkedIn', count: 21 },
		{ name: 'Instagram', count: 14 }
	],
	countries: [
		{ code: 'us', name: 'United States', count: 52 },
		{ code: 'gb', name: 'United Kingdom', count: 27 },
		{ code: 'ca', name: 'Canada', count: 18 },
		{ code: 'de', name: 'Germany', count: 14 },
		{ code: 'fr', name: 'France', count: 10 }
	],
	devices: [
		{ name: 'Mobile', count: 85 },
		{ name: 'Desktop', count: 55 },
		{ name: 'Tablet', count: 5 }
	],
	browsers: [
		{ name: 'Chrome', count: 78 },
		{ name: 'Safari', count: 32 },
		{ name: 'Firefox', count: 23 },
		{ name: 'Edge', count: 10 },
		{ name: 'Opera', count: 2 }
	],
	clicksOverTime: [
		{ date: '2025-02-24', count: 12 },
		{ date: '2025-02-25', count: 25 },
		{ date: '2025-02-26', count: 18 },
		{ date: '2025-02-27', count: 22 },
		{ date: '2025-02-28', count: 30 },
		{ date: '2025-03-01', count: 21 },
		{ date: '2025-03-02', count: 17 }
	]
});

onMounted(async () => {
	// Simulate API call
	await new Promise(resolve => setTimeout(resolve, 1500));

	// In a real app, this would be where we check if the URL exists
	// For demo purposes, we're just using mock data
	if (urlCode === 'invalid') {
		error.value = 'URL not found';
	}

	loading.value = false;
});

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		toastStore.success('Copied to clipboard');
	} catch (err) {
		console.error('Failed to copy: ', err);
		toastStore.error('Failed to copy');
	}
};

// SEO
useHead({
	title: `Analytics for ${urlCode} - URL Shortener Pro`,
	meta: [
		{ name: 'description', content: 'View analytics for your shortened URL' }
	]
});
</script>

<style scoped>
.glass-stat-card {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 16px;
	padding: 16px;
	transition: all 0.3s ease;
}

.glass-stat-card:hover {
	background: rgba(255, 255, 255, 0.25);
	transform: translateY(-2px);
}
</style>