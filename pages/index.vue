<template>
	<div class="container mx-auto px-4 py-12">
		<!-- Hero Section -->
		<section class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
				Shorten Your Long URLs
			</h1>
			<p class="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10">
				Make your links more manageable, trackable, and shareable with our powerful URL shortening service.
			</p>

			<!-- URL Shortener Form -->
			<div class="max-w-3xl mx-auto">
				<UrlShortenerForm />
			</div>

			<!-- Request Counter -->
			<div class="mt-8">
				<RequestCounter :remaining-requests="remainingRequests" />
			</div>
		</section>

		<!-- Recent URLs Section -->
		<RecentUrls />

		<!-- Features Section -->
		<section class="py-12">
			<h2 class="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
				Why Choose URL Shortener Pro?
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<FeatureCard
					title="Security & Reliability"
					description="Protection from malicious links and long-term link storage for your peace of mind."
					icon="shield-check"
				/>

				<FeatureCard
					title="Analytics & Statistics"
					description="Track clicks, geography, and devices for registered users to understand your audience."
					icon="chart-bar"
				/>

				<FeatureCard
					title="Speed & Convenience"
					description="Fast shortening and custom link creation for premium users to enhance your brand."
					icon="lightning-bolt"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useUrlStore } from '~/stores/url';
import FeatureCard from '~/components/home/FeatureCard.vue';
import RecentUrls from '~/components/home/RecentUrls.vue';
import RequestCounter from '~/components/home/RequestCounter.vue';
import UrlShortenerForm from '~/components/home/UrlShortenerForm.vue';

const urlStore = useUrlStore();
const remainingRequests = computed(() => urlStore.remainingFreeRequests);

// Fetch remaining requests on page load
onMounted(async () => {
	await urlStore.fetchRemainingRequests();
	urlStore.loadFromLocalStorage();
});

// SEO
useHead({
	title: 'URL Shortener Pro - Make Your Links Shorter',
	meta: [
		{ name: 'description', content: 'Shorten your URLs quickly and securely with URL Shortener Pro. Simple, fast, and reliable URL shortening service.' },
		{ property: 'og:title', content: 'URL Shortener Pro - Make Your Links Shorter' },
		{ property: 'og:description', content: 'Shorten your URLs quickly and securely with URL Shortener Pro.' },
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: 'https://urlshortenerpro.com' },
		{ property: 'og:image', content: 'https://urlshortenerpro.com/og-image.jpg' },
		{ name: 'twitter:card', content: 'summary_large_image' },
		{ name: 'twitter:title', content: 'URL Shortener Pro - Make Your Links Shorter' },
		{ name: 'twitter:description', content: 'Shorten your URLs quickly and securely with URL Shortener Pro.' },
	],
})
</script>