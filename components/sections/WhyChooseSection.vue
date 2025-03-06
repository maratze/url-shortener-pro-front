<template>
	<section class="features-section py-24 relative overflow-hidden">
		<!-- Декоративный фоновый элемент -->
		<div
			class="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100/30 to-purple-100/30 blur-3xl rounded-full -z-10 dark:from-blue-900/10 dark:to-purple-900/10"></div>
		<div
			class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-100/30 to-blue-100/30 blur-3xl rounded-full -z-10 dark:from-purple-900/10 dark:to-blue-900/10"></div>

		<div class="container mx-auto max-w-7xl relative px-6">
			<!-- Заголовок секции -->
			<div class="text-center max-w-3xl mx-auto mb-20">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 dark:text-white">
					Why Choose
					<span
						class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">TinyLink</span>
				</h2>
				<div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
				<p class="text-lg text-slate-600 dark:text-slate-300">
					Our platform combines simplicity with powerful features, giving you everything you need for
					effective link management
				</p>
			</div>

			<!-- Grid с карточками функций -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
					class="lg:translate-y-6"
				/>

				<!-- Feature 5 -->
				<FeatureCard
					title="QR Code Generation"
					description="Instantly generate QR codes for your shortened links for seamless offline-to-online transitions"
					icon="qrcode"
					animation="fade-up"
					class="lg:translate-y-6"
				/>

				<!-- Feature 6 -->
				<FeatureCard
					title="Cross-Platform Sharing"
					description="Share your links seamlessly across any platform, social media, or messaging app"
					icon="share"
					animation="fade-left"
					class="lg:translate-y-6"
				/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import FeatureCard from '~/components/home/FeatureCard.vue';
</script>