<template>
	<div class="glass-card mx-auto">
		<form @submit.prevent="shortenUrl" class="flex flex-col gap-4">
			<div class="form-group">
				<label for="originalUrl" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
					Enter your long URL
				</label>
				<input
					v-model="form.originalUrl"
					type="text"
					id="originalUrl"
					placeholder="https://example.com/very/long/url/that/needs/shortening"
					class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500"
					:disabled="isLoading"
					required
					autocomplete="off"
					ref="urlInput"
				>
				<p v-if="validationError" class="text-red-500 text-sm mt-1">{{ validationError }}</p>
			</div>

			<button
				type="submit"
				class="btn-primary flex items-center justify-center h-12"
				:disabled="isLoading"
			>
        <span v-if="isLoading">
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
				<span v-else>Shorten URL</span>
			</button>
		</form>

		<!-- Result display -->
		<div v-if="shortenedUrl" class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
			<div class="text-left mb-4">
				<h3 class="font-medium text-slate-900 dark:text-white">Your shortened URL:</h3>
				<div class="mt-2 flex items-stretch">
					<input
						type="text"
						readonly
						:value="shortenedUrl"
						class="flex-1 rounded-l-lg px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
					/>
					<button
						@click="copyToClipboard(shortenedUrl)"
						class="bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-r-lg flex items-center"
					>
						<span v-if="copied">Copied!</span>
						<span v-else>Copy</span>
					</button>
				</div>
			</div>

			<!-- QR Code -->
			<div class="flex flex-col items-center mt-6">
				<h4 class="font-medium text-slate-900 dark:text-white mb-2">QR Code:</h4>
				<img :src="qrCodeUrl" alt="QR Code" class="h-48 w-48 bg-white p-2 rounded-lg" />
				<a
					:href="qrCodeUrl"
					download="qrcode.png"
					class="mt-3 btn-secondary text-sm"
				>
					Download QR Code
				</a>
			</div>

			<button
				@click="resetForm"
				class="mt-6 w-full btn-secondary"
			>
				Shorten Another URL
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUrlStore } from '~/stores/url';
import { useToastStore } from '~/stores/toast';
import { useUrlValidation } from '~/composables/useUrlValidation';

const urlStore = useUrlStore();
const toastStore = useToastStore();
const { validateUrl, formatUrl } = useUrlValidation();

const form = reactive({
	originalUrl: ''
});

const isLoading = ref(false);
const validationError = ref('');
const shortenedUrl = ref('');
const qrCodeUrl = ref('');
const copied = ref(false);
const urlInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
	if (urlInput.value) {
		urlInput.value.focus();
	}
});

const shortenUrl = async () => {
	validationError.value = '';

	if (!form.originalUrl.trim()) {
		validationError.value = 'Please enter a URL';
		return;
	}

	if (!validateUrl(form.originalUrl)) {
		validationError.value = 'Please enter a valid URL';
		return;
	}

	// Format URL correctly
	const formattedUrl = formatUrl(form.originalUrl);

	try {
		isLoading.value = true;
		const result = await urlStore.shortenUrl(formattedUrl);
		shortenedUrl.value = result.shortUrl;
		qrCodeUrl.value = result.qrCodeUrl;
		toastStore.success('URL successfully shortened!');
	} catch (error: any) {
		validationError.value = error.message || 'Failed to shorten URL. Please try again.';
		toastStore.error(validationError.value);
	} finally {
		isLoading.value = false;
	}
};

const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		copied.value = true;
		toastStore.success('URL copied to clipboard!');
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error('Failed to copy: ', err);
		toastStore.error('Failed to copy URL to clipboard');
	}
};

const resetForm = () => {
	form.originalUrl = '';
	shortenedUrl.value = '';
	qrCodeUrl.value = '';
	validationError.value = '';
	if (urlInput.value) {
		urlInput.value.focus();
	}
};
</script>