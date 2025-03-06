<template>
	<div class="min-h-screen relative overflow-hidden">

		<HeroSection/>
		<RecentUrls/>
		<WhyChooseSection/>
		<StatisticsSection/>
		<HowItWorksSection/>

		<!-- FAQ Section -->
		<section class="py-24 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-panel">
					<div class="text-center max-w-3xl mx-auto mb-12">
						<h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Frequently Asked
							Questions</h2>
						<p class="text-lg text-slate-600 dark:text-slate-300">
							Everything you need to know about our URL shortening service
						</p>
					</div>

					<div class="max-w-3xl mx-auto">
						<FaqAccordion/>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="py-24 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-card-highlight overflow-hidden relative">
					<!-- Decorative elements -->
					<div class="absolute top-0 left-0 w-full h-full">
						<div class="absolute top-[10%] left-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
						<div
							class="absolute bottom-[10%] right-[10%] w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
					</div>

					<div class="relative z-10 text-center py-12 px-6">
						<h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to simplify your links?</h2>
						<p class="text-xl text-white/90 max-w-2xl mx-auto mb-8">
							Start shortening URLs for free and unlock the power of link management
						</p>
						<button class="btn-glow mx-auto">
							Get Started Free
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useUrlStore } from '~/stores/url';
import RecentUrls from '~/components/home/RecentUrls.vue';
import FaqAccordion from '~/components/FaqAccordion.vue';
import HeroSection from '~/components/sections/HeroSection.vue';
import WhyChooseSection from '~/components/sections/WhyChooseSection.vue';
import StatisticsSection from '~/components/sections/StatisticsSection.vue';
import HowItWorksSection from '~/components/sections/HowItWorksSection.vue';

const urlStore = useUrlStore();

// Fetch remaining requests on page load
onMounted(async () => {
	try {
		await urlStore.fetchRemainingRequests();
		urlStore.loadFromLocalStorage();
	} catch (error) {
		console.error('Failed to fetch remaining requests:', error);
		// Gracefully handle the error - we don't need to show an error to the user here
		// as RequestCounter component will handle the loading state
	}
});

// SEO
useHead({
	title: 'TinyLink - Make Your URLs Shorter',
	meta: [
		{
			name: 'description',
			content: 'Shorten your URLs quickly and securely with TinyLink. Simple, fast, and reliable URL shortening service.'
		},
		{ property: 'og:title', content: 'TinyLink - Make Your Links Shorter' },
		{ property: 'og:description', content: 'Shorten your URLs quickly and securely with TinyLink.' },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: 'https://urlshortenerpro.com' },
		{ property: 'og:image', content: 'https://urlshortenerpro.com/og-image.jpg' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: 'TinyLink - Make Your Links Shorter' },
		{ name: 'twitter:description', content: 'Shorten your URLs quickly and securely with TinyLink.' },
	],
})
</script>

<style>
/* Стили остаются без изменений */
:root {
	--glass-border: rgba(255, 255, 255, 0.5);
	--glass-border-dark: rgba(255, 255, 255, 0.1);
	--glass-bg: rgba(255, 255, 255, 0.7);
	--glass-bg-dark: rgba(15, 23, 42, 0.7);
	--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	--glass-shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.3);
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
	100% {
		transform: translateY(0px);
	}
}

@keyframes float-delay {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-12px);
	}
	100% {
		transform: translateY(0px);
	}
}

@keyframes float-slow {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-6px);
	}
	100% {
		transform: translateY(0px);
	}
}

@keyframes pulse-delay {
	0%, 100% {
		opacity: 0.5;
	}
	50% {
		opacity: 0.8;
	}
}

@keyframes shine {
	0% {
		left: -100%;
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		left: 100%;
		opacity: 0;
	}
}

.animate-float {
	animation: float 4s ease-in-out infinite;
}

.animate-float-delay {
	animation: float-delay 6s ease-in-out infinite;
}

.animate-float-slow {
	animation: float-slow 7s ease-in-out infinite;
}

.animate-pulse-delay {
	animation: pulse-delay 3s ease-in-out infinite;
}

.animation-delay-200 {
	animation-delay: 200ms;
}

.animation-delay-400 {
	animation-delay: 400ms;
}

.animation-delay-600 {
	animation-delay: 600ms;
}

.shine-effect {
	position: absolute;
	width: 50%;
	height: 100%;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.3) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	top: 0;
	left: -100%;
	transform: skewX(-25deg);
	animation: shine 6s ease-in-out infinite;
	pointer-events: none;
}

.glass-card {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 24px;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.dark .glass-card {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.glass-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.dark .glass-card:hover {
	box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.glass-panel {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	position: relative;
}

.dark .glass-panel {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.glass-card-highlight {
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(124, 58, 237, 0.8));
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
	border-radius: 24px;
	transition: all 0.3s ease;
}

.glass-pill {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 9999px;
	padding: 4px 8px;
}

.dark .glass-pill {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.btn-glow {
	position: relative;
	background: white;
	color: #6366f1;
	font-weight: 600;
	padding: 12px 32px;
	border-radius: 9999px;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.5),
	0 0 30px rgba(255, 255, 255, 0.3),
	0 0 45px rgba(255, 255, 255, 0.1);
	overflow: hidden;
}

.btn-glow:hover {
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
	0 0 40px rgba(255, 255, 255, 0.4),
	0 0 60px rgba(255, 255, 255, 0.2);
	transform: translateY(-2px);
}

.btn-glow:before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent 0%,
		rgba(255, 255, 255, 0.2) 50%,
		transparent 100%
	);
	transform: skewX(-25deg);
	animation: shine 3s infinite;
}

.stat-card {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 16px;
	padding: 24px;
	text-align: center;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}

.dark .stat-card {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.stat-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dark .stat-card:hover {
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.step-card {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 16px;
	padding: 24px;
	text-align: center;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}

.dark .step-card {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.step-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dark .step-card:hover {
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.step-number {
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(124, 58, 237, 0.8));
	color: white;
	font-size: 20px;
	font-weight: bold;
	border-radius: 50%;
	margin: 0 auto 16px;
}

@keyframes fade-in {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fade-in 1s ease-out forwards;
}
</style>