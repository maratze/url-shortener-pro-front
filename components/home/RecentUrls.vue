<template>
	<div v-if="history.length > 0" class="mt-12">
		<h3 class="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Your Recent URLs</h3>

		<div class="glass-card overflow-hidden">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
					<thead>
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Original URL</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Short URL</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
					</tr>
					</thead>
					<tbody class="divide-y divide-slate-200 dark:divide-slate-700">
					<tr v-for="(item, index) in history" :key="index">
						<td class="px-6 py-4 whitespace-nowrap text-sm">
							<div class="truncate max-w-xs">
								{{ item.originalUrl }}
							</div>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm">
							<a :href="item.shortUrl" target="_blank" class="text-primary-600 dark:text-primary-400 hover:underline">
								{{ formatUrl(item.shortUrl) }}
							</a>
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-sm">
							<div class="flex space-x-2">
								<button
									@click="copyToClipboard(item.shortUrl)"
									class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
									title="Copy to clipboard"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
									</svg>
								</button>
								<a
									:href="item.qrCodeUrl"
									download="qrcode.png"
									class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
									title="Download QR code"
								>
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
									</svg>
								</a>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUrlStore } from '~/stores/url';

const urlStore = useUrlStore();
const history = computed(() => urlStore.history);

onMounted(() => {
	urlStore.loadFromLocalStorage();
});

const formatUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return `${urlObj.host}${urlObj.pathname}`;
	} catch (e) {
		return url;
	}
};

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		// Could add a toast notification here
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
};
</script>