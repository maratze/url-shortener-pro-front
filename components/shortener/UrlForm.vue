<template>
	<!-- предыдущая часть кода -->
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useUrlStore } from '~/stores/url';

const authStore = useAuthStore();
const urlStore = useUrlStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isPremium = computed(() => authStore.user?.isPremium || false);

const showAdvanced = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);

const form = reactive({
	originalUrl: '',
	customAlias: '',
	expiresAt: ''
});

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

const toggleAdvanced = () => {
	showAdvanced.value = !showAdvanced.value;
};

const shortenUrl = async () => {
	try {
		error.value = null;
		loading.value = true;

		// Подготовка данных для запроса
		const urlData = {
			originalUrl: form.originalUrl,
			customAlias: form.customAlias || undefined,
			expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined
		};

		// Вызов метода создания короткого URL из store
		await urlStore.createShortUrl(urlData);

		// Очистка формы после успешного создания
		form.originalUrl = '';
		form.customAlias = '';
		form.expiresAt = '';

	} catch (err: any) {
		error.value = err?.message || 'Произошла ошибка при сокращении URL';
	} finally {
		loading.value = false;
	}
};
</script>