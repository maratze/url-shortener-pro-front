<template>
	<section class="relative min-h-[calc(100vh-74px)] flex items-center">
		<div class="container mx-auto px-4 py-24">
			<!-- Заголовок и описание по центру -->
			<div class="text-center max-w-4xl mx-auto mb-10 animate-fade-in">
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-800 dark:text-white leading-tight">
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Simplify</span>
					your links,
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">amplify</span>
					your reach
				</h1>
				<p class="text-lg md:text-md text-slate-600 dark:text-slate-300 mb-10 animation-delay-200">
					Transform long, complex URLs into short, memorable links that are easy to share
					and track with our powerful URL shortener.
				</p>
			</div>

			<!-- URL Shortener Form - по центру -->
			<div class="max-w-2xl mx-auto">
				<div class="glass-card p-6 md:p-8 animate-fade-in animation-delay-400 relative overflow-hidden">
					<!-- Shine effect -->
					<div class="shine-effect"></div>

					<UrlShortenerForm/>
					<RequestCounter class="mt-3"/>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import RequestCounter from '~/components/home/RequestCounter.vue';
import UrlShortenerForm from '~/components/home/UrlShortenerForm.vue';
</script>