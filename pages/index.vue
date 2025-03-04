<template>
	<div class="min-h-screen relative overflow-hidden">
		<!-- Animated background elements -->
		<div class="fixed inset-0 overflow-hidden -z-10">
			<!-- Gradient background -->
			<div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950"></div>

			<!-- Colorful blurred shapes -->
			<div class="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/30 dark:bg-blue-600/20 blur-[80px] animate-float"></div>
			<div class="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-400/20 dark:bg-purple-600/20 blur-[100px] animate-float-delay"></div>
			<div class="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-green-400/10 dark:bg-green-600/10 blur-[70px] animate-float-slow"></div>
		</div>

		<!-- Hero section -->
		<section class="relative py-16 md:py-24 px-4">
			<div class="container mx-auto max-w-7xl">
				<div class="flex flex-col lg:flex-row items-center justify-between gap-12">
					<div class="lg:w-1/2">
						<h1 class="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-800 dark:text-white leading-tight">
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Simplify</span> your links,
							<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">amplify</span> your reach
						</h1>
						<p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 animate-fade-in animation-delay-200">
							Transform long, complex URLs into short, memorable links that are easy to share
							and track with our powerful URL shortener.
						</p>

						<!-- URL Shortener Form -->
						<div class="glass-card p-6 md:p-8 animate-fade-in animation-delay-400 relative overflow-hidden">
							<!-- Shine effect -->
							<div class="shine-effect"></div>

							<UrlShortenerForm />
							<RequestCounter class="mt-3" />
						</div>
					</div>

					<!-- Hero illustration -->
					<div class="lg:w-1/2 flex justify-center animate-fade-in animation-delay-600">
						<div class="relative">
							<!-- Main image with glassmorphism effect -->
							<div class="glass-card p-8 relative overflow-hidden">
								<img
									src="/images/url-shortener-illustration.svg"
									alt="URL Shortener Illustration"
									class="w-full h-auto max-w-lg mx-auto relative z-10"
								/>

								<!-- Decoration elements -->
								<div class="absolute top-[20%] left-[10%] w-16 h-16 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-md animate-pulse"></div>
								<div class="absolute bottom-[15%] right-[10%] w-20 h-20 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-md animate-pulse-delay"></div>
							</div>

							<!-- Floating elements -->
							<div class="absolute -top-5 -right-5 glass-pill animate-float">
								<div class="flex items-center space-x-2 p-3">
									<div class="w-3 h-3 bg-green-400 rounded-full"></div>
									<span class="text-sm font-medium">Fast & Secure</span>
								</div>
							</div>

							<div class="absolute -bottom-5 -left-5 glass-pill animate-float-delay">
								<div class="flex items-center space-x-2 p-3">
									<div class="w-3 h-3 bg-blue-400 rounded-full"></div>
									<span class="text-sm font-medium">Easy Sharing</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Recent URLs section -->
		<section class="py-16 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-panel">
					<RecentUrls />
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="py-20 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="text-center max-w-3xl mx-auto mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
						Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">URL Shortener Pro</span>
					</h2>
					<p class="text-lg text-slate-600 dark:text-slate-300">
						Our platform combines simplicity with powerful features, giving you everything you need for effective link management
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<!-- Feature 1 -->
					<FeatureCard
						title="Lightning Fast"
						description="Create shortened URLs instantly and enjoy rapid redirection speeds for all your users"
						icon="bolt"
						animation="fade-right"
					/>

					<!-- Feature 2 -->
					<FeatureCard
						title="Advanced Analytics"
						description="Track clicks, geographic data, and visitor devices to optimize your marketing efforts"
						icon="chart"
						animation="fade-up"
					/>

					<!-- Feature 3 -->
					<FeatureCard
						title="Custom Aliases"
						description="Create branded, memorable short links with your own custom text to enhance recognition"
						icon="pencil"
						animation="fade-left"
					/>

					<!-- Feature 4 -->
					<FeatureCard
						title="Secure & Reliable"
						description="Your links are always available and protected with enterprise-grade security measures"
						icon="shield"
						animation="fade-right"
					/>

					<!-- Feature 5 -->
					<FeatureCard
						title="QR Code Generation"
						description="Instantly generate QR codes for your shortened links for seamless offline-to-online transitions"
						icon="qrcode"
						animation="fade-up"
					/>

					<!-- Feature 6 -->
					<FeatureCard
						title="Cross-Platform Sharing"
						description="Share your links seamlessly across any platform, social media, or messaging app"
						icon="share"
						animation="fade-left"
					/>
				</div>
			</div>
		</section>

		<!-- Statistics Section -->
		<section class="py-20 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-panel">
					<div class="text-center max-w-3xl mx-auto mb-12">
						<h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Trusted by thousands worldwide</h2>
						<p class="text-lg text-slate-600 dark:text-slate-300">
							Join our growing community of users who rely on URL Shortener Pro every day
						</p>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<!-- Stat 1 -->
						<div class="stat-card">
							<div class="relative z-10">
								<div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
									<CountUp :to="5" :duration="3" />M+
								</div>
								<div class="text-lg font-medium text-slate-700 dark:text-slate-300">URLs Shortened</div>
							</div>
						</div>

						<!-- Stat 2 -->
						<div class="stat-card">
							<div class="relative z-10">
								<div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
									<CountUp :to="99.9" :duration="3" :decimals="1" />%
								</div>
								<div class="text-lg font-medium text-slate-700 dark:text-slate-300">Uptime</div>
							</div>
						</div>

						<!-- Stat 3 -->
						<div class="stat-card">
							<div class="relative z-10">
								<div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
									<CountUp :to="50" :duration="3" />K+
								</div>
								<div class="text-lg font-medium text-slate-700 dark:text-slate-300">Active Users</div>
							</div>
						</div>

						<!-- Stat 4 -->
						<div class="stat-card">
							<div class="relative z-10">
								<div class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
									<CountUp :to="200" :duration="3" />M+
								</div>
								<div class="text-lg font-medium text-slate-700 dark:text-slate-300">Monthly Clicks</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- How it works -->
		<section class="py-20 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="text-center max-w-3xl mx-auto mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">How It Works</h2>
					<p class="text-lg text-slate-600 dark:text-slate-300">
						Three simple steps to get your shortened URL
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<!-- Step 1 -->
					<div class="step-card" data-aos="fade-up" data-aos-delay="0">
						<div class="step-number">1</div>
						<h3 class="text-xl font-bold mb-3 text-slate-800 dark:text-white">Paste Your URL</h3>
						<p class="text-slate-600 dark:text-slate-400">
							Paste your long URL into the input field at the top of the page
						</p>
					</div>

					<!-- Step 2 -->
					<div class="step-card" data-aos="fade-up" data-aos-delay="100">
						<div class="step-number">2</div>
						<h3 class="text-xl font-bold mb-3 text-slate-800 dark:text-white">Click Shorten</h3>
						<p class="text-slate-600 dark:text-slate-400">
							Click the shorten button and wait for our system to generate your link
						</p>
					</div>

					<!-- Step 3 -->
					<div class="step-card" data-aos="fade-up" data-aos-delay="200">
						<div class="step-number">3</div>
						<h3 class="text-xl font-bold mb-3 text-slate-800 dark:text-white">Copy & Share</h3>
						<p class="text-slate-600 dark:text-slate-400">
							Copy your shortened URL and share it wherever you want
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- FAQ Section -->
		<section class="py-20 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-panel">
					<div class="text-center max-w-3xl mx-auto mb-12">
						<h2 class="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Frequently Asked Questions</h2>
						<p class="text-lg text-slate-600 dark:text-slate-300">
							Everything you need to know about our URL shortening service
						</p>
					</div>

					<div class="max-w-3xl mx-auto">
						<FaqAccordion />
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="py-20 px-4 relative">
			<div class="container mx-auto max-w-7xl">
				<div class="glass-card-highlight overflow-hidden relative">
					<!-- Decorative elements -->
					<div class="absolute top-0 left-0 w-full h-full">
						<div class="absolute top-[10%] left-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
						<div class="absolute bottom-[10%] right-[10%] w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
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
import FeatureCard from '~/components/home/FeatureCard.vue';
import RecentUrls from '~/components/home/RecentUrls.vue';
import RequestCounter from '~/components/home/RequestCounter.vue';
import UrlShortenerForm from '~/components/home/UrlShortenerForm.vue';
import CountUp from '~/components/CountUp.vue';
import FaqAccordion from '~/components/FaqAccordion.vue';

const urlStore = useUrlStore();
const remainingRequests = computed(() => urlStore.remainingFreeRequests);

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
		{ name: 'description', content: 'Shorten your URLs quickly and securely with TinyLink. Simple, fast, and reliable URL shortening service.' },
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
:root {
	--glass-border: rgba(255, 255, 255, 0.5);
	--glass-border-dark: rgba(255, 255, 255, 0.1);
	--glass-bg: rgba(255, 255, 255, 0.7);
	--glass-bg-dark: rgba(15, 23, 42, 0.7);
	--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	--glass-shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.3);
}

@keyframes float {
	0% { transform: translateY(0px); }
	50% { transform: translateY(-10px); }
	100% { transform: translateY(0px); }
}

@keyframes float-delay {
	0% { transform: translateY(0px); }
	50% { transform: translateY(-12px); }
	100% { transform: translateY(0px); }
}

@keyframes float-slow {
	0% { transform: translateY(0px); }
	50% { transform: translateY(-6px); }
	100% { transform: translateY(0px); }
}

@keyframes pulse-delay {
	0%, 100% { opacity: 0.5; }
	50% { opacity: 0.8; }
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
	border-radius: 24px;
	padding: 32px;
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
	0% { opacity: 0; transform: translateY(20px); }
	100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
	animation: fade-in 1s ease-out forwards;
}
</style>