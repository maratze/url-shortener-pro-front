<template>
	<div class="glass-card p-5 animate-fadeIn">
		<div class="flex items-center justify-between mb-3">
			<h3 class="text-sm font-medium text-slate-800 dark:text-white flex items-center">
				<svg class="h-5 w-5 mr-1.5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
				Insights
			</h3>
			<button
				@click="refreshInsights"
				class="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
				title="Refresh insights"
			>
				<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
			</button>
		</div>

		<!-- Карусель рекомендаций -->
		<div class="relative">
			<div class="overflow-hidden">
				<div
					class="flex transition-transform duration-300 ease-in-out"
					:style="{ transform: `translateX(-${currentSlide * 100}%)` }"
				>
					<div
						v-for="(insight, index) in insights"
						:key="index"
						class="w-full flex-shrink-0 px-1"
					>
						<div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg">
							<div class="text-sm text-slate-700 dark:text-slate-300">
								<span class="font-medium text-indigo-600 dark:text-indigo-400 block mb-1">{{ insight.title }}</span>
								{{ insight.description }}
								<a
									v-if="insight.actionUrl"
									:href="insight.actionUrl"
									class="text-indigo-600 dark:text-indigo-400 hover:underline block mt-2 text-xs font-medium"
								>
									{{ insight.actionText }} →
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Индикаторы слайдов -->
			<div class="flex justify-center mt-3 space-x-1">
				<button
					v-for="(_, index) in insights"
					:key="index"
					@click="currentSlide = index"
					:class="[
            'w-2 h-2 rounded-full transition-colors', 
            currentSlide === index 
              ? 'bg-indigo-600 dark:bg-indigo-400' 
              : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
          ]"
					:aria-label="`Slide ${index + 1}`"
				></button>
			</div>

			<!-- Кнопки навигации -->
			<button
				v-if="insights.length > 1"
				@click="prevSlide"
				class="absolute top-1/2 -left-2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
			>
				<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				v-if="insights.length > 1"
				@click="nextSlide"
				class="absolute top-1/2 -right-2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
			>
				<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useInterval, useIntervalFn } from '@vueuse/core';

interface Insight {
	title: string;
	description: string;
	actionText?: string;
	actionUrl?: string;
}

const insights = ref<Insight[]>([]);
const currentSlide = ref(0);
const loading = ref(false);

// Пример рекомендаций (в реальном приложении они бы приходили с сервера)
const availableInsights: Insight[] = [
	{
		title: "Clicks peak on Wednesdays",
		description: "Your links get 32% more clicks on Wednesdays compared to other days. Consider scheduling important content for mid-week.",
		actionText: "View detailed analytics",
		actionUrl: "/dashboard/analytics"
	},
	{
		title: "Add UTM parameters for better tracking",
		description: "Links with UTM parameters receive 27% more clicks and provide better analytics tracking.",
		actionText: "Learn how to use UTM parameters",
		actionUrl: "/help/utm-parameters"
	},
	{
		title: "Your best performing link",
		description: "The link 'Product Launch' has received 342 clicks this month, making it your most successful link.",
		actionText: "View link details",
		actionUrl: "/links/top"
	},
	{
		title: "Custom slugs perform better",
		description: "Your links with custom slugs receive on average 40% more clicks than auto-generated ones.",
		actionText: "Create a link with custom slug",
		actionUrl: "/links/new"
	}
];

// Получение рекомендаций
const getInsights = () => {
	loading.value = true;

	// Имитация API-запроса
	setTimeout(() => {
		// Перемешиваем доступные рекомендации и берем первые 3
		insights.value = [...availableInsights]
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);

		loading.value = false;
	}, 800);
};

// Обновление рекомендаций
const refreshInsights = () => {
	getInsights();
};

// Навигация по слайдам
const nextSlide = () => {
	currentSlide.value = (currentSlide.value + 1) % insights.value.length;
};

const prevSlide = () => {
	currentSlide.value = (currentSlide.value - 1 + insights.value.length) % insights.value.length;
};

// FIX: Correct usage of useInterval and useIntervalFn
const { pause, resume } = useInterval(5000, { controls: true });

onMounted(() => {
	getInsights();
	resume();

	// FIX: Use useIntervalFn instead of useInterval for a callback
	useIntervalFn(() => {
		if (insights.value.length > 1) {
			nextSlide();
		}
	}, 8000);
});
</script>