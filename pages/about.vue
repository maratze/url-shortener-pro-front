<template>
	<div class="container mx-auto px-6 py-20 max-w-7xl">
		<!-- Hero Section -->
		<div class="text-center mb-20">
			<h1 class="text-5xl font-bold mb-6 text-slate-800 dark:text-white leading-tight">
				About
				<span
					class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">TinyLink</span>
			</h1>
			<p class="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
				TinyLink is a modern URL shortening service designed to make sharing links easier, more efficient, and
				more powerful with advanced analytics.
			</p>
		</div>

		<!-- Mission Section -->
		<div
			class="glass-card glass-card-border p-10 rounded-xl mb-20 max-w-4xl mx-auto transition-all duration-300 hover:shadow-lg">
			<h2 class="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Our Mission</h2>
			<p class="text-slate-600 dark:text-slate-400 mb-5 text-lg">
				At TinyLink, our mission is to provide simple, reliable, and feature-rich URL shortening services
				that help users track, manage, and optimize their links.
			</p>
			<p class="text-slate-600 dark:text-slate-400 text-lg">
				We believe in making technology accessible to everyone, whether you're a casual user or a business
				professional.
			</p>
			<div class="mt-8 flex justify-center">
				<button
					class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center">
					<span>Learn More About Our Mission</span>
					<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Features Section -->
		<div class="mb-20">
			<h2 class="text-3xl font-semibold mb-10 text-slate-800 dark:text-white text-center">Why Choose TinyLink?
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				<div
					v-for="(feature, index) in features"
					:key="index"
					class="glass-card glass-card-border p-6 rounded-xl transition-all duration-300 hover:shadow-xl">
					<div class="flex items-start space-x-4">
						<div class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex-shrink-0">
							<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
								stroke="currentColor">
								<path :d="feature.iconPath" stroke-linecap="round" stroke-linejoin="round"
									stroke-width="2" />
							</svg>
						</div>
						<div>
							<h3 class="font-semibold text-slate-800 dark:text-white text-xl mb-2">{{ feature.title }}
							</h3>
							<p class="text-slate-600 dark:text-slate-400 mb-3">{{ feature.description }}</p>
							<button
								class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center text-sm font-medium">
								Learn More
								<svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Testimonials Section -->
		<div class="mb-20 max-w-5xl mx-auto" v-if="false">
			<h2 class="text-3xl font-semibold mb-10 text-slate-800 dark:text-white text-center">What Our Users Say</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div
					v-for="(testimonial, index) in testimonials"
					:key="index"
					class="glass-card glass-card-border p-8 rounded-xl transition-all duration-300 hover:shadow-xl relative">
					<div class="absolute -top-4 -left-4">
						<div class="text-5xl text-indigo-200 dark:text-indigo-800">"</div>
					</div>
					<div class="relative">
						<p class="text-slate-600 dark:text-slate-400 text-lg italic mb-6 pt-4">{{ testimonial.quote }}
						</p>
						<div class="flex items-center">
							<div
								class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
								{{testimonial.author.split(',')[0].split(' ').map(name => name[0]).join('')}}
							</div>
							<div class="ml-4">
								<p class="font-medium text-slate-800 dark:text-white">{{
									testimonial.author.split(',')[0] }}</p>
								<p class="text-sm text-slate-500 dark:text-slate-400">{{
									testimonial.author.split(',')[1] }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Team Section -->
		<div class="mb-20 max-w-5xl mx-auto" v-if="false">
			<h2 class="text-3xl font-semibold mb-10 text-slate-800 dark:text-white text-center">Our Team</h2>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				<div
					v-for="(member, index) in team"
					:key="index"
					class="glass-card glass-card-border p-6 rounded-xl text-center transition-all duration-300 hover:shadow-xl">
					<div
						class="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
						<span class="text-2xl font-bold text-white">{{ member.initials }}</span>
					</div>
					<h3 class="font-semibold text-slate-800 dark:text-white text-xl mb-1">{{ member.name }}</h3>
					<p class="text-indigo-600 dark:text-indigo-400 mb-4">{{ member.role }}</p>
					<p class="text-slate-600 dark:text-slate-400 text-sm">
						Passionate about creating exceptional user experiences and driving innovation in web
						technologies.
					</p>
					<!-- <div class="mt-4 flex justify-center space-x-3">
						<button
							class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
								</path>
							</svg>
						</button>
						<button
							class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z">
								</path>
							</svg>
						</button>
						<button
							class="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z">
								</path>
							</svg>
						</button>
					</div> -->
				</div>
			</div>
		</div>

		<!-- Contact Section -->
		<div class="max-w-4xl mx-auto">
			<div
				class="glass-card glass-card-border glass-card-prevent-transform p-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-center">
				<h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-4">
					Have questions? Get in touch!
				</h2>
				<p class="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
					We're always looking to improve our service and would love to hear from you. Whether you have a
					question, feedback, or just want to say hello, don't hesitate to reach out.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						class="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center">
						<svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<span>Contact Support</span>
					</button>
					<!-- <button
						class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center">
						<svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						<span>Live Chat</span>
					</button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'About TinyLink - URL Shortener',
	meta: [
		{
			name: 'description',
			content: 'Discover the story behind TinyLink, our mission, and why we are the best choice for URL shortening.'
		},
		{ property: 'og:title', content: 'About TinyLink - Learn Our Story' },
		{
			property: 'og:description',
			content: 'Discover the story behind TinyLink, our mission, and why we are the best choice for URL shortening.'
		},
	],
});

const features = [
	{
		title: 'Simple & Fast',
		description: 'Shorten your URLs in seconds with our intuitive interface. Our platform is designed to be lightning fast and incredibly easy to use, whether you\'re a casual user or a marketing professional.',
		iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
	},
	{
		title: 'Advanced Analytics',
		description: 'Track clicks, geographic data, and referral sources. Understand your audience better with comprehensive data visualization and real-time statistics to optimize your marketing campaigns.',
		iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
	},
	{
		title: 'Always Available',
		description: 'Our service is reliable with 99.9% uptime guarantee. Your shortened links will always be accessible when you need them, backed by our robust infrastructure and redundant systems.',
		iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
	},
	{
		title: 'Secure & Private',
		description: 'Your data is protected with industry-standard security measures. We prioritize the privacy and security of your information, ensuring that your links and analytics are safe from unauthorized access.',
		iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
	},
];

const testimonials = [
	{
		quote: "TinyLink has transformed how we share links. It's fast, reliable, and the analytics dashboard provides valuable insights that help us optimize our marketing campaigns.",
		author: 'Jane Doe, Marketing Manager',
	},
	{
		quote: "The detailed analytics and custom domain feature have been game-changers for our business. TinyLink's user-friendly interface makes it easy for our entire team to manage and track our links.",
		author: 'John Smith, Business Owner',
	},
];

const team = [
	{
		initials: 'JD',
		name: 'John Doe',
		role: 'CEO & Founder',
	},
	{
		initials: 'JS',
		name: 'Jane Smith',
		role: 'CTO',
	},
	{
		initials: 'MJ',
		name: 'Mike Johnson',
		role: 'Head of Marketing',
	},
];
</script>

<style scoped>
.glass-card {
	backdrop-filter: blur(8px);
	border: 1px solid var(--card-border);
	transform: translateY(0);
	transition: all 0.3s ease;
}

.glass-card:hover:not(.glass-card-prevent-transform) {
	transform: translateY(-5px);
}

.dark .glass-card {
	border-color: rgba(255, 255, 255, 0.05);
}

.glass-card-prevent-transform {
	transform: none !important;
}
</style>
