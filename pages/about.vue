<template>
	<div class="container mx-auto px-4 py-20">
		<div class="max-w-4xl mx-auto">
			<!-- Hero Section -->
			<div class="text-center mb-12">
				<h1 class="text-4xl font-bold mb-4 text-slate-800 dark:text-white">About TinyLink</h1>
				<p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
					TinyLink is a modern URL shortening service designed to make sharing links easier and more
					efficient.
				</p>
			</div>

			<!-- Mission Section -->
			<div class="glass-card p-8 rounded-xl mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">Our Mission</h2>
				<p class="text-slate-600 dark:text-slate-400 mb-4">
					At TinyLink, our mission is to provide simple, reliable, and feature-rich URL shortening services
					that help users track, manage, and optimize their links.
				</p>
				<p class="text-slate-600 dark:text-slate-400">
					We believe in making technology accessible to everyone, whether you're a casual user or a business
					professional.
				</p>
				<div class="mt-6 flex justify-center">
					<button class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
						Learn More About Our Mission
					</button>
				</div>
			</div>

			<!-- Features Section -->
			<div class="glass-card p-8 rounded-xl mb-8">
				<h2 class="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">Why Choose TinyLink?</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="flex items-start space-x-4" v-for="(feature, index) in features" :key="index">
						<div class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
							<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
								 stroke="currentColor">
								<path :d="feature.iconPath" stroke-linecap="round" stroke-linejoin="round"
									  stroke-width="2"/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-slate-800 dark:text-white mb-1">{{ feature.title }}</h3>
							<p class="text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
							<button class="text-indigo-600 dark:text-indigo-400 hover:underline mt-2">Learn More
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Testimonials Section -->
			<div class="glass-card p-8 rounded-xl mb-8">
				<h2 class="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">What Our Users Say</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="p-6 rounded-lg bg-slate-50 dark:bg-slate-800"
						 v-for="(testimonial, index) in testimonials" :key="index">
						<p class="text-slate-600 dark:text-slate-400">"{{ testimonial.quote }}"</p>
						<p class="mt-4 font-medium text-slate-800 dark:text-white">— {{ testimonial.author }}</p>
					</div>
				</div>
			</div>

			<!-- Team Section -->
			<div class="glass-card p-8 rounded-xl">
				<h2 class="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Our Team</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div class="flex items-center space-x-4" v-for="(member, index) in team" :key="index">
						<div
							class="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
							<span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{
									member.initials
								}}</span>
						</div>
						<div>
							<h3 class="font-medium text-slate-800 dark:text-white">{{ member.name }}</h3>
							<p class="text-slate-600 dark:text-slate-400">{{ member.role }}</p>
						</div>
					</div>
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
		description: 'Shorten your URLs in seconds with our intuitive interface.',
		iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
	},
	{
		title: 'Advanced Analytics',
		description: 'Track clicks, geographic data, and referral sources.',
		iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
	},
	{
		title: 'Always Available',
		description: 'Our service is reliable with 99.9% uptime.',
		iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
	},
	{
		title: 'Secure & Private',
		description: 'Your data is protected with industry-standard security.',
		iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
	},
];

const testimonials = [
	{
		quote: "TinyLink has transformed how we share links. It's fast, reliable, and easy to use!",
		author: 'Jane Doe, Marketing Manager',
	},
	{
		quote: "The analytics dashboard helps us track performance and optimize our campaigns.",
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
];
</script>
