<template>
	<div class="space-y-4">
		<div
			v-for="(item, index) in faqItems"
			:key="index"
			class="faq-item"
			:class="{ 'is-active': activeIndex === index }"
		>
			<button
				@click="toggleItem(index)"
				class="faq-question"
			>
				<span>{{ item.question }}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 transition-transform"
					:class="{ 'rotate-180': activeIndex === index }"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			<div
				class="faq-answer"
				:style="{ maxHeight: activeIndex === index ? `${getAnswerHeight(index)}px` : '0px' }"
			>
				<div class="faq-answer-content" ref="answerContents">
					<p>{{ item.answer }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const activeIndex = ref(-1);
const answerHeights = ref<number[]>([]);
const answerContents = ref<HTMLElement[]>([]);

const faqItems = [
	{
		question: "What is a URL shortener?",
		answer: "A URL shortener is a service that converts long URLs into shorter, more manageable links that redirect to the original URL when visited. This makes sharing links easier, especially on platforms with character limits."
	},
	{
		question: "How long will my shortened links work?",
		answer: "By default, links shortened with URL Shortener Pro never expire. However, you can set custom expiration dates for your links if you prefer them to be temporary."
	},
	{
		question: "Can I create custom aliases for my links?",
		answer: "Yes! URL Shortener Pro allows you to create custom aliases for your shortened links, making them more memorable and on-brand."
	},
	{
		question: "Is there a limit to how many URLs I can shorten?",
		answer: "Free accounts can create up to 30 shortened URLs per day. For unlimited URL shortening and additional features, consider upgrading to one of our premium plans."
	},
	{
		question: "Can I track the performance of my shortened links?",
		answer: "Absolutely! URL Shortener Pro provides detailed analytics for all your shortened links, including click counts, geographic data, and device information of visitors."
	}
];

const getAnswerHeight = (index: number): number => {
	return answerHeights.value[index] || 0;
};

const toggleItem = (index: number): void => {
	activeIndex.value = activeIndex.value === index ? -1 : index;
};

onMounted(() => {
	// Using nextTick to ensure the DOM is fully rendered
	nextTick(() => {
		if (!Array.isArray(answerContents.value)) return;

		// Calculate heights of all answers
		answerContents.value.forEach((content, index) => {
			if (content) {
				answerHeights.value[index] = content.offsetHeight;
			}
		});
	});
});
</script>

<style scoped>

.faq-item {
	background: rgba(255, 255, 255, 0.7);	
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	border-radius: 16px;
	overflow: hidden;
	transition: all 0.2s linear;
}

.dark .faq-item {
	background: transparent;
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.faq-item.is-active {
	box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
	border-color: rgba(124, 58, 237, 0.3);
}

.dark .faq-item.is-active {
	box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
	border-color: rgba(124, 58, 237, 0.5);
}

.faq-question {
	@apply w-full flex items-center justify-between p-5 text-left font-medium text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors;
}

.faq-answer {
	@apply overflow-hidden transition-all duration-200 ease-in-out;
	background: rgba(255, 255, 255, 0.5);
}

.dark .faq-answer {
	background: rgba(15, 23, 42, 1);
}

.faq-answer-content {
	@apply p-5 pt-0 text-slate-600 dark:text-slate-300;
}
</style>