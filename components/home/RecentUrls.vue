<template>
	<div class="container mx-auto max-w-7xl">
		<div v-if="recentUrls.length > 0">
			<div class="mb-16 text-center">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-4 text-slate-800 dark:text-white">
					Your Recent
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" data-v-inspector="pages/index.vue:63:7">Links</span>
				</h2>
				<div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
			</div>

			<div class="w-full">
				<div class="w-full">
					<TransitionGroup name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div
							v-for="url in recentUrls"
							:key="url.id"
							class="recent-url-card h-full"
						>
							<div class="flex flex-col h-full">
								<!-- Shine effect -->
								<div class="shine-effect"></div>

								<div class="flex items-center justify-between mb-3">
									<span
										class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
										{{ formatUrl(url.originalUrl) }}
									</span>
									<span class="text-xs text-slate-400 dark:text-slate-500">
										{{ formatDate(url.createdAt) }}
									</span>
								</div>

								<div
									class="flex items-center justify-between bg-transparent rounded-lg mb-3"
								>
									<a
										:href="url.shortUrl"
										target="_blank"
										class="text-blue-600 dark:text-blue-400 font-medium hover:underline truncate max-w-[200px]"
									>
										{{ url.shortUrl }}
									</a>
									<button
										@click="copyToClipboard(url.shortUrl)"
										class="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors flex-shrink-0 ml-2"
									>
                    <span v-if="copied === url.id" class="text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
							  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							  clip-rule="evenodd"/>
                      </svg>
                    </span>
										<span v-else class="text-slate-500 dark:text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/>
                        <path
							d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"/>
                      </svg>
                    </span>
									</button>
								</div>

								<!-- Использование mt-auto для прижатия кнопок к низу карточки -->
								<div class="flex justify-between items-center mt-auto">
									<NuxtLink
										:to="`/analytics/${extractShortCode(url.shortUrl)}`"
										class="text-xs flex items-center text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
											 fill="currentColor">
											<path
												d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
										</svg>
										View Analytics
									</NuxtLink>
									<button
										@click="qrCode(url.shortUrl)"
										class="text-xs flex items-center text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
											 fill="currentColor">
											<path fill-rule="evenodd"
												  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
												  clip-rule="evenodd"/>
											<path
												d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"/>
										</svg>
										QR Code
									</button>
								</div>
							</div>
						</div>
					</TransitionGroup>
				</div>
			</div>

			<div class="text-center mt-16">
				<NuxtLink to="/history" class="glass-btn inline-flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
						 fill="currentColor">
						<path fill-rule="evenodd"
							  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							  clip-rule="evenodd"/>
					</svg>
					View All History
				</NuxtLink>
			</div>
		</div>
		<div v-else class="text-center py-12">
			<div class="text-slate-400 dark:text-slate-500 mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24"
					 stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						  d="M13 10V3L4 14h7v7l9-11h-7z"/>
				</svg>
			</div>
			<h3 class="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">No shortened URLs yet</h3>
			<p class="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
				Create your first shortened URL using the form above and it will appear here
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUrlStore } from '~/stores/url';
import { format } from 'date-fns';

const urlStore = useUrlStore();
const recentUrls = computed(() => urlStore.urls.slice(0, 6)); // Show only recent 6
const copied = ref<string | null>(null);
const loading = ref(true);

onMounted(() => {
	loading.value = false;
});

const formatUrl = (url: string) => {
	try {
		const { hostname, pathname } = new URL(url);
		return hostname + (pathname !== '/' ? pathname.substring(0, 15) + (pathname.length > 15 ? '...' : '') : '');
	} catch (e) {
		return url;
	}
};

const formatDate = (dateString: string) => {
	try {
		return format(new Date(dateString), 'MMM d, yyyy');
	} catch (e) {
		return dateString;
	}
};

const extractShortCode = (shortUrl: string) => {
	try {
		return shortUrl.split('/').pop() || '';
	} catch (e) {
		return '';
	}
};

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		const targetUrl = urlStore.urls.find(url => url.shortUrl === text);
		copied.value = targetUrl?.id || null;
		setTimeout(() => {
			if (copied.value) {
				copied.value = null;
			}
		}, 2000);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
};

const qrCode = (url: string) => {
	// Implement QR code generation popup
	const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

	// Create a modal with the QR code
	const modal = document.createElement('div');
	modal.style.position = 'fixed';
	modal.style.top = '0';
	modal.style.left = '0';
	modal.style.width = '100%';
	modal.style.height = '100%';
	modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	modal.style.display = 'flex';
	modal.style.alignItems = 'center';
	modal.style.justifyContent = 'center';
	modal.style.zIndex = '9999';

	const modalContent = document.createElement('div');
	modalContent.style.padding = '20px';
	modalContent.style.borderRadius = '12px';
	modalContent.style.maxWidth = '90%';
	modalContent.className = 'bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl';

	const qrImage = document.createElement('img');
	qrImage.src = qrCodeUrl;
	qrImage.alt = 'QR Code';
	qrImage.style.maxWidth = '100%';

	const closeButton = document.createElement('button');
	closeButton.textContent = 'Close';
	closeButton.className = 'mt-4 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-800 dark:text-white';
	closeButton.addEventListener('click', () => {
		document.body.removeChild(modal);
	});

	modalContent.appendChild(qrImage);
	modalContent.appendChild(closeButton);
	modal.appendChild(modalContent);

	// Close on background click
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	});

	document.body.appendChild(modal);
};
</script>

<style scoped>
.recent-url-card {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 16px;
	padding: 16px;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	min-height: 150px; /* Добавлено минимальную высоту */
}

.dark .recent-url-card {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.recent-url-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
	border-color: rgba(124, 58, 237, 0.3);
}

.dark .recent-url-card:hover {
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
	border-color: rgba(124, 58, 237, 0.6);
}

.glass-btn {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 9999px;
	padding: 10px 24px;
	font-weight: 500;
	color: #4f46e5;
	transition: all 0.3s ease;
}

.dark .glass-btn {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
	color: #818cf8;
}

.glass-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
	border-color: rgba(79, 70, 229, 0.4);
}

.dark .glass-btn:hover {
	box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
	border-color: rgba(79, 70, 229, 0.6);
}

/* List transitions */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>