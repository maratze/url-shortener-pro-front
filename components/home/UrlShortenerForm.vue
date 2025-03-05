<template>
	<div>
		<form @submit.prevent="submitForm" class="url-shortener-form">
			<div class="grid grid-cols-1 md:grid-cols-7 gap-3">
				<div class="md:col-span-5 relative">
					<input
						v-model="form.url"
						type="url"
						placeholder="Paste your long URL here"
						class="url-input"
						:disabled="isLoading"
						required
						ref="urlInput"
					/>
					<div
						v-if="form.url"
						@click="clearInput"
						class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd"
								  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								  clip-rule="evenodd"/>
						</svg>
					</div>
				</div>

				<div class="md:col-span-2">
					<button
						type="submit"
						class="submit-button"
						:disabled="isLoading"
					>
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
				   viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
					  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortening...
            </span>
						<span v-else class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
					  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
					  clip-rule="evenodd"/>
              </svg>
              Shorten URL
            </span>
					</button>
				</div>
			</div>

			<div class="flex justify-between mt-4">
				<div class="flex items-center">
					<input
						type="checkbox"
						id="customAlias"
						v-model="showAliasInput"
						class="form-checkbox h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 dark:border-slate-600 dark:focus:ring-blue-500"
					/>
					<label for="customAlias" class="ml-2 text-sm text-slate-600 dark:text-slate-400">
						Custom alias
					</label>
				</div>

				<button
					type="button"
					@click="showAdvancedOptions = !showAdvancedOptions"
					class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
				>
					<span>{{ showAdvancedOptions ? 'Hide' : 'Show' }} advanced options</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 ml-1 transition-transform"
						:class="{ 'rotate-180': showAdvancedOptions }"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path fill-rule="evenodd"
							  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							  clip-rule="evenodd"/>
					</svg>
				</button>
			</div>

			<Transition name="slide">
				<div v-if="showAliasInput" class="glass-inner-panel mt-4">
					<label for="alias" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
						Custom alias (optional)
					</label>
					<div class="flex items-center">
						<span class="text-slate-500 dark:text-slate-400 mr-1 text-sm">short.link/</span>
						<input
							v-model="form.alias"
							type="text"
							id="alias"
							placeholder="your-custom-alias"
							class="glass-input text-sm py-2 px-3 flex-grow"
							pattern="[a-zA-Z0-9-_]+"
							title="Only letters, numbers, hyphens and underscores are allowed"
						/>
					</div>
					<p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
						Only letters, numbers, hyphens and underscores are allowed
					</p>
				</div>
			</Transition>

			<Transition name="slide">
				<div v-if="showAdvancedOptions" class="glass-inner-panel mt-4 space-y-4">
					<div>
						<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Link expiration
						</label>
						<select
							v-model="form.expiration"
							class="glass-select w-full"
						>
							<option value="never">Never expires</option>
							<option value="1d">1 day</option>
							<option value="7d">7 days</option>
							<option value="30d">30 days</option>
							<option value="custom">Custom date</option>
						</select>
					</div>

					<div v-if="form.expiration === 'custom'">
						<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Custom expiration date
						</label>
						<input
							type="date"
							v-model="form.expirationDate"
							class="glass-input w-full"
							:min="minDate"
						/>
					</div>
				</div>
			</Transition>

			<div v-if="error" class="glass-error mt-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20"
					 fill="currentColor">
					<path fill-rule="evenodd"
						  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
						  clip-rule="evenodd"/>
				</svg>
				<p class="text-sm">{{ error }}</p>
			</div>
		</form>

		<!-- Result Section -->
		<Transition name="fade">
			<div v-if="shortenedUrl" class="glass-result mt-6">
				<div class="shine-effect"></div>
				<h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Your shortened URL</h3>

				<div class="glass-inner-panel mb-3">
					<a
						:href="shortenedUrl"
						target="_blank"
						class="text-blue-600 dark:text-blue-400 font-medium hover:underline truncate mr-2"
					>
						{{ shortenedUrl }}
					</a>

					<div class="flex space-x-2">
						<button
							@click="copyToClipboard(shortenedUrl)"
							class="p-2 glass-btn-sm"
							:title="copied ? 'Copied!' : 'Copy to clipboard'"
						>
              <span v-if="copied" class="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"/>
                </svg>
              </span>
							<span v-else class="text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/>
                  <path
					  d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"/>
                </svg>
              </span>
						</button>

						<button
							@click="shareUrl(shortenedUrl)"
							class="p-2 glass-btn-sm"
							title="Share URL"
							v-if="canShare"
						>
              <span class="text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
					  d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                </svg>
              </span>
						</button>
					</div>
				</div>

				<div class="flex justify-between items-center">
					<NuxtLink
						:to="`/analytics/${extractShortCode(shortenedUrl)}`"
						class="text-sm flex items-center text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
							 fill="currentColor">
							<path fill-rule="evenodd"
								  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
								  clip-rule="evenodd"/>
						</svg>
						View Analytics
					</NuxtLink>

					<button
						@click="generateQrCode(shortenedUrl)"
						class="text-sm flex items-center text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20"
							 fill="currentColor">
							<path fill-rule="evenodd"
								  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
								  clip-rule="evenodd"/>
							<path
								d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z"/>
						</svg>
						Generate QR Code
					</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import { useUrlStore } from '~/stores/url';
import { format, addDays } from 'date-fns';

const urlStore = useUrlStore();
const urlInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const copied = ref(false);
const showAliasInput = ref(false);
const showAdvancedOptions = ref(false);
const shortenedUrl = ref<string | null>(null);
const canShare = ref(false);

const form = ref({
	url: '',
	alias: '',
	expiration: 'never',
	expirationDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
});

const minDate = computed(() => {
	return format(new Date(), 'yyyy-MM-dd');
});

// Check if Web Share API is available
onMounted(() => {
	try {
		canShare.value = !!navigator.share;
	} catch (e) {
		canShare.value = false;
	}
});

const clearInput = () => {
	form.value.url = '';
	nextTick(() => {
		urlInput.value?.focus();
	});
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
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
};

const shareUrl = async (url: string) => {
	if (navigator.share) {
		try {
			await navigator.share({
				title: 'Check out this shortened URL',
				text: 'I shortened this link with URL Shortener Pro',
				url
			});
		} catch (err) {
			// User might have canceled the action
			console.error('Error sharing:', err);
		}
	}
};

const generateQrCode = (url: string) => {
	// QR code generation service URL
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
	modalContent.className = 'glass-modal p-6 rounded-xl max-w-sm mx-auto';

	const qrHeader = document.createElement('div');
	qrHeader.className = 'flex justify-between items-center mb-4';

	const qrTitle = document.createElement('h3');
	qrTitle.textContent = 'QR Code for your short URL';
	qrTitle.className = 'text-lg font-medium';

	const closeBtn = document.createElement('button');
	closeBtn.innerHTML = '&times;';
	closeBtn.className = 'text-2xl leading-none';
	closeBtn.onclick = () => document.body.removeChild(modal);

	qrHeader.appendChild(qrTitle);
	qrHeader.appendChild(closeBtn);

	const qrContainer = document.createElement('div');
	qrContainer.className = 'bg-white p-4 rounded-lg mb-4';

	const qrImage = document.createElement('img');
	qrImage.src = qrCodeUrl;
	qrImage.alt = 'QR Code';
	qrImage.className = 'w-full h-auto';

	const downloadLink = document.createElement('a');
	downloadLink.href = qrCodeUrl;
	downloadLink.download = 'qr-code.png';
	downloadLink.className = 'block mt-4 text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors';
	downloadLink.textContent = 'Download QR Code';

	qrContainer.appendChild(qrImage);

	modalContent.appendChild(qrHeader);
	modalContent.appendChild(qrContainer);
	modalContent.appendChild(downloadLink);
	modal.appendChild(modalContent);

	// Close on background click
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			document.body.removeChild(modal);
		}
	});

	document.body.appendChild(modal);
};

const submitForm = async () => {
	try {
		error.value = null;
		isLoading.value = true;

		// Calculate expiration date if selected
		let expiresAt = null;
		if (form.value.expiration === 'custom') {
			expiresAt = form.value.expirationDate;
		} else if (form.value.expiration === '1d') {
			expiresAt = format(addDays(new Date(), 1), 'yyyy-MM-dd');
		} else if (form.value.expiration === '7d') {
			expiresAt = format(addDays(new Date(), 7), 'yyyy-MM-dd');
		} else if (form.value.expiration === '30d') {
			expiresAt = format(addDays(new Date(), 30), 'yyyy-MM-dd');
		}

		const result = await urlStore.shortenUrl({
			url: form.value.url,
			alias: showAliasInput.value ? form.value.alias : undefined,
			expiresAt
		});

		shortenedUrl.value = result.shortUrl;
		form.value.url = '';
		form.value.alias = '';

		// Reset advanced options
		showAliasInput.value = false;
		showAdvancedOptions.value = false;

	} catch (err: any) {
		console.error('Error shortening URL:', err);
		error.value = err?.message || 'An error occurred while shortening the URL';
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped>
.url-shortener-form {
	width: 100%;
}

.url-input {
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.6);
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
	padding: 12px 16px;
	width: 100%;
	color: #334155;
	transition: all 0.3s ease;
}

.dark .url-input {
	background: rgba(30, 41, 59, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: white;
}

.url-input:focus {
	border-color: rgba(79, 70, 229, 0.5);
	box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.25);
	outline: none;
}

.dark .url-input:focus {
	border-color: rgba(129, 140, 248, 0.5);
	box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
}

.submit-button {
	background: linear-gradient(135deg, #4f46e5, #7c3aed);
	border-radius: 12px;
	color: white;
	height: 100%;
	width: 100%;
	font-weight: 500;
	transition: all 0.3s ease;
	border: none;
	box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
	position: relative;
	overflow: hidden;
}

.submit-button:before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent 0%,
		rgba(255, 255, 255, 0.2) 50%,
		transparent 100%
	);
	transform: skewX(-25deg);
	animation: shine 3s infinite;
}

.submit-button:hover {
	background: linear-gradient(135deg, #4338ca, #6d28d9);
	box-shadow: 0 6px 18px rgba(79, 70, 229, 0.4);
	transform: translateY(-1px);
}

.submit-button:active {
	transform: translateY(0);
}

.submit-button:disabled {
	background: linear-gradient(135deg, #9ca3af, #6b7280);
	box-shadow: none;
	cursor: not-allowed;
}

.glass-inner-panel {
	background: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 12px;
	padding: 12px;
}

.dark .glass-inner-panel {
	background: rgba(30, 41, 59, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-input, .glass-select {
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 8px 12px;
	color: #334155;
	transition: all 0.3s ease;
}

.dark .glass-input, .dark .glass-select {
	background: rgba(30, 41, 59, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.1);
	color: white;
}

.glass-input:focus, .glass-select:focus {
	border-color: rgba(79, 70, 229, 0.5);
	box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.25);
	outline: none;
}

.dark .glass-input:focus, .dark .glass-select:focus {
	border-color: rgba(129, 140, 248, 0.5);
	box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
}

input::placeholder {
	color: #94a3b8; /* slate-400 - visible in both light and dark modes */
}

.dark input::placeholder {
	color: #64748b; /* slate-500 - slightly darker for dark mode */
}

.glass-error {
	display: flex;
	align-items: center;
	background: rgba(254, 226, 226, 0.7);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border-left: 4px solid #ef4444;
	border-radius: 8px;
	padding: 12px;
	color: #b91c1c;
}

.dark .glass-error {
	background: rgba(153, 27, 27, 0.3);
	color: #fca5a5;
}

.glass-result {
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 16px;
	padding: 16px;
	position: relative;
	overflow: hidden;
}

.dark .glass-result {
	background: rgba(30, 41, 59, 0.7);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-btn-sm {
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 8px;
	transition: all 0.3s ease;
}

.dark .glass-btn-sm {
	background: rgba(30, 41, 59, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-btn-sm:hover {
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transform: translateY(-2px);
}

.dark .glass-btn-sm:hover {
	background: rgba(30, 41, 59, 0.7);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.glass-modal {
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border: 1px solid rgba(255, 255, 255, 0.4);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	position: relative;
	overflow: hidden;
}

.dark .glass-modal {
	background: rgba(30, 41, 59, 0.8);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease;
	max-height: 200px;
	overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
	max-height: 0;
	opacity: 0;
	padding-top: 0;
	padding-bottom: 0;
	margin-top: 0;
	margin-bottom: 0;
	overflow: hidden;
}

/* Animation for shine effect */
@keyframes shine {
	0% {
		left: -100%;
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		left: 100%;
		opacity: 0;
	}
}

.shine-effect {
	position: absolute;
	width: 50%;
	height: 100%;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.3) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	top: 0;
	left: -100%;
	transform: skewX(-25deg);
	animation: shine 6s ease-in-out infinite;
	pointer-events: none;
	z-index: 1;
}

.dark .shine-effect {
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.1) 50%,
		rgba(255, 255, 255, 0) 100%
	);
}
</style>