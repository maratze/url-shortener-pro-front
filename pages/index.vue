<template>
	<div class="min-h-screen relative overflow-hidden">
		<HeroSection/>
		<RecentUrls/>
		<WhyChooseSection/>
		<StatisticsSection/>
		<HowItWorksSection/>
		<FaqSection/>
		<CtaSection/>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUrlStore } from '~/stores/url';
import RecentUrls from '~/components/home/RecentUrls.vue';
import HeroSection from '~/components/sections/HeroSection.vue';
import WhyChooseSection from '~/components/sections/WhyChooseSection.vue';
import StatisticsSection from '~/components/sections/StatisticsSection.vue';
import HowItWorksSection from '~/components/sections/HowItWorksSection.vue';
import FaqSection from '~/components/sections/FaqSection.vue';
import CtaSection from '~/components/sections/CtaSection.vue';

const urlStore = useUrlStore();

// Fetch remaining requests on page load
onMounted(async () => {
	try {
		await urlStore.fetchRemainingRequests();
		urlStore.loadFromLocalStorage();
	} catch (error) {
		console.error('Failed to fetch remaining requests:', error);
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