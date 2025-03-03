<template>
	<div>
		<!-- Hero секция -->
		<section class="bg-gradient-to-b from-white to-blue-50 dark:from-secondary-900 dark:to-secondary-950 py-16 md:py-24">
			<div class="container mx-auto px-4">
				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 md:pr-12">
						<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 dark:text-white mb-4 leading-tight">
							Сократите URL и отслеживайте статистику кликов
						</h1>
						<p class="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
							URL Shortener Pro предлагает простой и мощный способ создания коротких ссылок, а также детальную аналитику для отслеживания эффективности ваших кампаний.
						</p>
						<div class="flex flex-wrap gap-4">
							<NuxtLink to="/register" class="btn btn-primary">
								Начать бесплатно
							</NuxtLink>
							<NuxtLink to="/features" class="btn btn-outline">
								Узнать больше
							</NuxtLink>
						</div>
					</div>
					<div class="md:w-1/2 mt-10 md:mt-0">
<!--						<img src="/images/hero-illustration.svg" alt="URL Shortener Illustration" class="mx-auto max-w-full h-auto">-->
					</div>
				</div>
			</div>
		</section>

		<!-- Форма сокращения URL -->
		<section class="py-12 md:py-16 bg-white dark:bg-secondary-900">
			<div class="container mx-auto px-4">
				<div class="max-w-3xl mx-auto">
					<UrlForm v-if="!urlStore.recentUrl" @created="handleUrlCreated" />
					<ResultCard
						v-else
						:short-url="urlStore.recentUrl"
						@close="urlStore.clearRecentUrl()"
					/>
				</div>
			</div>
		</section>

		<!-- Преимущества -->
		<section class="py-12 md:py-16 bg-secondary-50 dark:bg-secondary-950">
			<div class="container mx-auto px-4">
				<h2 class="text-2xl md:text-3xl font-bold text-center text-secondary-900 dark:text-white mb-12">Почему выбирают URL Shortener Pro</h2>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div class="card">
						<div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
							<span class="material-icons text-primary-600 dark:text-primary-400">speed</span>
						</div>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">Быстрый и надежный</h3>
						<p class="text-secondary-600 dark:text-secondary-400">
							Наш сервис обеспечивает мгновенное создание коротких ссылок и гарантирует их стабильную работу.
						</p>
					</div>

					<div class="card">
						<div class="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
							<span class="material-icons text-green-600 dark:text-green-400">analytics</span>
						</div>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">Подробная аналитика</h3>
						<p class="text-secondary-600 dark:text-secondary-400">
							Отслеживайте количество кликов, геолокацию, устройства и другие важные метрики для каждой ссылки.
						</p>
					</div>

					<div class="card">
						<div class="bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
							<span class="material-icons text-purple-600 dark:text-purple-400">security</span>
						</div>
						<h3 class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">Безопасность</h3>
						<p class="text-secondary-600 dark:text-secondary-400">
							Все ссылки проверяются на вредоносный контент, а ваши данные надежно защищены.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Призыв к действию -->
		<section class="py-12 md:py-16 bg-primary-600 dark:bg-primary-800 text-white">
			<div class="container mx-auto px-4 text-center">
				<h2 class="text-2xl md:text-3xl font-bold mb-4">Готовы начать сокращать URL?</h2>
				<p class="max-w-2xl mx-auto mb-8 text-primary-50">
					Зарегистрируйтесь бесплатно и получите доступ к расширенным возможностям сервиса.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<NuxtLink to="/register" class="btn bg-white text-primary-600 hover:bg-primary-50">
						Создать аккаунт
					</NuxtLink>
					<NuxtLink to="/pricing" class="btn border border-white text-white hover:bg-primary-700">
						Посмотреть тарифы
					</NuxtLink>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useUrlStore } from '~/stores/url';

const urlStore = useUrlStore();

const handleUrlCreated = () => {
	// Прокручиваем страницу к компоненту с результатом
	setTimeout(() => {
		const resultElement = document.querySelector('.card');
		if (resultElement) {
			resultElement.scrollIntoView({ behavior: 'smooth' });
		}
	}, 100);
};

definePageMeta({
	layout: 'default'
});
</script>