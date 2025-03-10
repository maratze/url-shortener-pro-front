<template>
	<div class="container mx-auto px-4 py-20 max-w-7xl">
		<!-- Hero Section -->
		<div class="text-center mb-16">
			<h1 class="text-4xl font-bold text-slate-800 dark:text-white mb-4">
				Simple Pricing, Powerful Features
			</h1>
			<p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
				Whether you're shortening links for personal use or managing a business, we've got you covered.
				Start free and upgrade anytime to unlock premium features.
			</p>
		</div>

		<!-- Pricing Cards -->
		<div class="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
			<!-- Free Tier -->
			<div class="glass-card glass-card-border p-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]">
				<div class="flex items-center mb-6">
					<div class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
						<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-xl font-semibold text-slate-800 dark:text-white">Free</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">Great for personal use</p>
					</div>
				</div>

				<div class="mb-8">
					<div class="text-5xl font-bold text-slate-800 dark:text-white">$0</div>
					<p class="text-slate-600 dark:text-slate-400">Forever free</p>
				</div>

				<div class="mb-8 space-y-4">
					<div class="flex items-center">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>30 links/month</span>
					</div>
					<div class="flex items-center">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Basic analytics</span>
					</div>
					<div class="flex items-center">
						<svg class="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
						<span class="text-slate-500">No custom domains</span>
					</div>
				</div>

				<button class="w-full px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition">
					Get Started
				</button>
			</div>

			<!-- Pro Tier -->
			<div class="glass-card glass-card-border p-8 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 transition-all duration-300 hover:scale-[1.02]">
				<div class="flex items-center mb-6">
					<div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
						<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Pro</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">For businesses & power users</p>
					</div>
				</div>

				<div class="mb-8">
					<div class="text-5xl font-bold text-indigo-600 dark:text-indigo-400">$9.99</div>
					<p class="text-slate-600 dark:text-slate-400">Per month, billed annually</p>
				</div>

				<div class="mb-8 space-y-4">
					<div class="flex items-center">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Unlimited links</span>
					</div>
					<div class="flex items-center">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Advanced analytics</span>
					</div>
					<div class="flex items-center">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Custom domains</span>
					</div>
				</div>

				<button class="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
					Upgrade to Pro
				</button>
			</div>
		</div>

		<!-- FAQ Section -->
		<div class="mt-24 max-w-3xl mx-auto">
			<h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
				Frequently Asked Questions
			</h2>

			<div class="space-y-4">
				<div class="glass-card glass-card-border p-6 rounded-lg">
					<h3 class="font-medium text-slate-800 dark:text-white">Can I upgrade later?</h3>
					<p class="mt-2 text-slate-600 dark:text-slate-400">
						Yes, you can upgrade to Pro at any time from your account settings.
					</p>
				</div>

				<div class="glass-card glass-card-border p-6 rounded-lg">
					<h3 class="font-medium text-slate-800 dark:text-white">Is there a free trial?</h3>
					<p class="mt-2 text-slate-600 dark:text-slate-400">
						We offer a 14-day money-back guarantee for Pro subscriptions.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Pricing - TinyLink',
	meta: [
		{ name: 'description', content: 'Choose the right plan for your needs with TinyLink\'s simple pricing. Free and Pro plans available.' }
	]
})
</script>
