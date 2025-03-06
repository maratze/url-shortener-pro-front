<template>
	<section class="faq-section py-24 px-4 relative overflow-hidden">
		<div class="container mx-auto max-w-7xl relative">
			<!-- Обновленный заголовок в соответствии с предыдущими блоками -->
			<div class="text-center max-w-3xl mx-auto mb-16">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 dark:text-white">
					Frequently Asked
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Questions</span>
				</h2>
				<div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
				<p class="text-lg text-slate-600 dark:text-slate-300">
					Everything you need to know about our URL shortening service
				</p>
			</div>

			<div class="max-w-3xl mx-auto">
				<FaqAccordion/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import FaqAccordion from '~/components/FaqAccordion.vue';
</script>

<style scoped>
.faq-section {
	background-color: var(--glass-bg);
	position: relative;
	box-shadow: var(--glass-shadow);
}

.dark .faq-section {
	background-color: #0f172a;
}
</style>