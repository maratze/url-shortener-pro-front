<template>
	<div v-if="shortUrl" class="card border-l-4 border-primary-500">
		<div class="flex justify-between items-start">
			<h3 class="text-lg font-semibold text-secondary-900 dark:text-white">URL успешно сокращен!</h3>
			<button
				@click="$emit('close')"
				class="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 p-1"
				aria-label="Close"
			>
				<span class="material-icons">close</span>
			</button>
		</div>

		<div class="text-sm text-secondary-500 dark:text-secondary-400 mt-1 truncate">
			<span class="font-medium text-secondary-700 dark:text-secondary-300">Оригинальный URL:</span>
			{{ shortUrl.originalUrl }}
		</div>

		<div class="mt-4">
			<div class="bg-secondary-50 dark:bg-secondary-800 p-3 rounded-lg flex items-center justify-between">
				<div class="break-all font-medium text-primary-600 dark:text-primary-400">{{ fullShortUrl }}</div>
				<button
					@click="copyToClipboard"
					class="ml-2 p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 focus:outline-none rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700"
					:title="copied ? 'Скопировано!' : 'Копировать в буфер обмена'"
				>
					<span class="material-icons">{{ copied ? 'check' : 'content_copy' }}</span>
				</button>
			</div>
		</div>

		<div class="mt-4 flex flex-wrap gap-2">
			<a
				:href="fullShortUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-primary flex items-center"
			>
				<span class="material-icons text-sm mr-2">open_in_new</span>
				Открыть ссылку
			</a>

			<button
				v-if="navigator.share"
				@click="shareUrl"
				class="btn btn-secondary flex items-center"
			>
				<span class="material-icons text-sm mr-2">share</span>
				Поделиться
			</button>

			<button
				v-if="!isAuthenticated"
				@click="navigateToRegister"
				class="btn btn-outline flex items-center"
			>
				<span class="material-icons text-sm mr-2">person_add</span>
				Зарегистрироваться для сохранения
			</button>
		</div>

		<div class="mt-4 text-sm flex items-center" v-if="shortUrl.expiresAt">
			<span class="material-icons text-amber-500 mr-1">schedule</span>
			<span class="text-secondary-600 dark:text-secondary-400">
        Срок действия: {{ formatDate(shortUrl.expiresAt) }}
      </span>
		</div>

		<div class="mt-4 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg" v-if="qrCode">
			<div class="flex justify-between items-center mb-2">
				<span class="text-sm font-medium text-secondary-700 dark:text-secondary-300">QR код:</span>
				<button
					@click="downloadQRCode"
					class="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center"
				>
					<span class="material-icons text-sm mr-1">download</span>
					Скачать
				</button>
			</div>
			<div class="flex justify-center">
				<img :src="qrCode" alt="QR Code" class="w-40 h-40" ref="qrCodeRef" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import QRCode from 'qrcode';

const props = defineProps({
	shortUrl: {
		type: Object,
		required: true
	}
});

const emit = defineEmits(['close']);

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const copied = ref(false);
const qrCode = ref<string | null>(null);
const qrCodeRef = ref<HTMLImageElement | null>(null);

const fullShortUrl = computed(() => {
	if (process.client) {
		return `${window.location.origin}/s/${props.shortUrl.shortCode}`;
	}
	return `${props.shortUrl.shortCode}`;
});

onMounted(async () => {
	if (props.shortUrl && process.client) {
		try {
			qrCode.value = await QRCode.toDataURL(fullShortUrl.value);
		} catch (err) {
			console.error('Ошибка при создании QR-кода:', err);
		}
	}
});

const copyToClipboard = () => {
	navigator.clipboard.writeText(fullShortUrl.value);
	copied.value = true;
	setTimeout(() => {
		copied.value = false;
	}, 2000);
};

const shareUrl = () => {
	if (navigator.share) {
		navigator.share({
			title: 'Сокращенный URL',
			text: `Проверьте мою сокращенную ссылку: ${fullShortUrl.value}`,
			url: fullShortUrl.value
		}).catch(err => {
			console.error('Ошибка при попытке поделиться:', err);
		});
	}
};

const navigateToRegister = () => {
	navigateTo('/register');
};

const downloadQRCode = () => {
	if (!qrCode.value) return;

	const link = document.createElement('a');
	link.download = `qrcode-${props.shortUrl.shortCode}.png`;
	link.href = qrCode.value;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
};
</script>