<template>
	<div class="min-h-screen flex flex-col justify-center items-center p-4 bg-white dark:bg-secondary-900">
		<div v-if="error" class="max-w-md w-full text-center">
			<div class="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
				<span class="material-icons text-3xl text-red-600 dark:text-red-400">error_outline</span>
			</div>
			<h1 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">{{ errorTitle }}</h1>
			<p class="text-secondary-600 dark:text-secondary-400 mb-6">
				{{ errorMessage }}
			</p>
			<NuxtLink to="/" class="btn btn-primary">
				Вернуться на главную
			</NuxtLink>
		</div>

		<div v-else class="max-w-md w-full text-center">
			<div class="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
				<span class="material-icons text-3xl text-primary-600 dark:text-primary-400 animate-pulse">link</span>
			</div>
			<h1 class="text-2xl font-bold text-secondary-900 dark:text-white mb-2">Перенаправление</h1>
			<p class="text-secondary-600 dark:text-secondary-400 mb-6">
				Вы будете перенаправлены на запрашиваемый сайт через несколько секунд...
			</p>
			<div class="relative pt-1">
				<div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200 dark:bg-primary-900/50">
					<div class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"
						 :style="`width: ${progress}%`"></div>
				</div>
			</div>
			<div class="break-all text-sm text-secondary-500 dark:text-secondary-400 mb-4">
				Переход на: {{ originalUrl }}
			</div>
			<a
				:href="originalUrl"
				class="btn btn-primary"
				target="_blank"
				rel="noopener noreferrer"
			>
				Перейти сейчас
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
	layout: 'minimal'
});

const route = useRoute();
const shortCode = computed(() => route.params.code as string);

const originalUrl = ref<string>('');
const progress = ref(0);
const error = ref<boolean>(false);
const errorTitle = ref<string>('');
const errorMessage = ref<string>('');

// Функция для обновления прогресса
const updateProgress = () => {
	const interval = setInterval(() => {
		progress.value += 4;
		if (progress.value >= 100) {
			clearInterval(interval);
			// Перенаправление на оригинальный URL
			if (originalUrl.value) {
				window.location.href = originalUrl.value;
			}
		}
	}, 100);
};

// Получаем оригинальный URL по короткому коду и выполняем редирект
onMounted(async () => {
	try {
		const { $api } = useNuxtApp();
		const response = await $api(`/s/${shortCode.value}`, {
			method: 'GET'
		});

		if (response && response.originalUrl) {
			originalUrl.value = response.originalUrl;
			updateProgress();
		} else {
			throw new Error('URL не найден');
		}
	} catch (err: any) {
		error.value = true;

		if (err.statusCode === 404) {
			errorTitle.value = 'Ссылка не найдена';
			errorMessage.value = 'Возможно, срок её действия истек или она была удалена.';
		} else if (err.statusCode === 410) {
			errorTitle.value = 'Срок действия ссылки истек';
			errorMessage.value = 'Эта ссылка больше не действительна, так как срок её действия истек.';
		} else {
			errorTitle.value = 'Ошибка при перенаправлении';
			errorMessage.value = 'Произошла ошибка при перенаправлении по этой ссылке. Пожалуйста, попробуйте позже.';
		}
	}
});

// Добавляем переход по метапрессу
useHead({
	meta: [
		{
			httpEquiv: 'refresh',
			content: originalUrl.value ? `5; url=${originalUrl.value}` : ''
		}
	]
});
</script>