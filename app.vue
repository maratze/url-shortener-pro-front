<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>

	<!-- Глобальный контейнер для уведомлений -->
	<ClientOnly>
		<ToastContainer />
	</ClientOnly>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onClientOnly } from '~/utils/client';
import { useTheme } from '~/composables/useTheme.js';
import { useAuthService } from '~/composables/useAuthService';
import ToastContainer from '~/components/common/ToastContainer.vue';

const isInitialized = ref(false);

// Функция для установки метаданных для SEO
const setupSEOMetadata = () => {
	// Базовые мета-данные для SEO
	document.title = 'TinyLink - Shorten Your URLs';

	// Установка мета-тегов для SEO
	const setMetaTag = (name, content, isProperty = false) => {
		const metaSelector = isProperty
			? `meta[property="${name}"]`
			: `meta[name="${name}"]`;

		const meta = document.querySelector(metaSelector);
		if (meta) {
			const attrName = isProperty ? 'property' : 'name';
			meta.setAttribute('content', content);
		} else {
			const newMeta = document.createElement('meta');
			if (isProperty) {
				newMeta.setAttribute('property', name);
			} else {
				newMeta.setAttribute('name', name);
			}
			newMeta.setAttribute('content', content);
			document.head.appendChild(newMeta);
		}
	};

	// Устанавливаем обычные мета-теги
	setMetaTag('description', 'TinyLink - fast, simple and secure URL shortener service.');

	// Устанавливаем Open Graph мета-теги
	setMetaTag('og:title', 'TinyLink - Shorten Your URLs', true);
	setMetaTag('og:description', 'Create short, memorable links with TinyLink URL shortener.', true);
	setMetaTag('og:type', 'website', true);
	setMetaTag('og:url', 'https://tinylink.io', true);
};

// Функции, которые выполняются после монтирования компонента
onMounted(() => {
	// Безопасно выполняем код, специфичный для клиента
	onClientOnly(() => {
		// Установка мета-тегов для SEO
		setupSEOMetadata();
	});

	// Инициализация аутентификации
	const { checkAuthStatus } = useAuthService();
	checkAuthStatus()
		.then(() => {
			isInitialized.value = true;
		})
		.catch(error => {
			console.error('Ошибка при инициализации аутентификации:', error);
			isInitialized.value = true; // Все равно устанавливаем как инициализированный
		});
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
	font-family: 'Inter', sans-serif;
	--glass-bg: rgba(255, 255, 255, 0.9);
	--glass-bg-dark: rgba(15, 23, 42, 0.9);
	--glass-border: rgba(255, 255, 255, 0.3);
	--glass-border-dark: rgba(30, 41, 59, 0.5);
	--glass-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	--glass-shadow-dark: 0 4px 6px rgba(0, 0, 0, 0.3);
}

html {
	visibility: visible;
}

body {
	@apply bg-slate-50 dark:bg-slate-900;
	font-family: 'Inter', sans-serif;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.animate-spin-slow {
	animation: spin 1.5s linear infinite;
}
</style>