<template>
	<div class="container mx-auto px-6 py-20 max-w-7xl">
		<!-- Hero Section -->
		<div class="text-center mb-20">
			<h1 class="text-5xl font-bold mb-6 text-slate-800 dark:text-white leading-tight">
				Choose your
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">TinyLink</span>
				plan
			</h1>
			<p class="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
				Start for free and unlock the full power of URL shortening. Get analytics, manage links, and expand your
				business capabilities with our premium features.
			</p>
		</div>

		<!-- Payment Period Toggle -->
		<div class="flex justify-center mb-10">
			<div class="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg inline-flex">
				<button
					@click="billingPeriod = 'monthly'"
					:class="[
						'px-5 py-2.5 text-base font-medium rounded-md transition-all duration-300',
						billingPeriod === 'monthly'
							? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400'
							: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
					]">
					Monthly
				</button>
				<button
					@click="billingPeriod = 'yearly'"
					:class="[
						'px-5 py-2.5 text-base font-medium rounded-md transition-all duration-300 relative',
						billingPeriod === 'yearly'
							? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400'
							: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
					]">
					Yearly
					<span
						class="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">-20%</span>
				</button>
			</div>
		</div>

		<!-- Pricing Cards -->
		<div class="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto relative">
			<!-- Free Tier -->
			<div
				class="glass-card glass-card-border p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
				<div class="flex items-center mb-6">
					<div class="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
						<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-xl font-semibold text-slate-800 dark:text-white">Free</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">Perfect for personal use</p>
					</div>
				</div>

				<div class="mb-8 flex items-end">
					<div class="text-5xl font-bold text-slate-800 dark:text-white">$0</div>
					<div class="text-slate-600 dark:text-slate-400 ml-2 pb-1">forever free</div>
				</div>

				<div class="mb-8 space-y-4">
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Up to 30 links per month</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Basic analytics (clicks, devices)</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>30 days data storage</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Custom short URLs</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
						<span class="text-slate-500 dark:text-slate-500">Custom domains</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
						<span class="text-slate-500 dark:text-slate-500">Advanced analytics</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
						<span class="text-slate-500 dark:text-slate-500">Team access</span>
					</div>
				</div>

				<button
					class="w-full px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center">
					<span>Start for free</span>
					<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>

			<!-- Pro Tier -->
			<div
				class="glass-card glass-card-border !border-indigo-400 p-8 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 transition-all duration-300 hover:shadow-xl relative">

				<div class="flex items-center mb-6">
					<div class="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
						<svg class="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Pro</h3>
						<p class="text-sm text-slate-600 dark:text-slate-400">For business and professionals</p>
					</div>
				</div>

				<div class="mb-8 flex items-end">
					<div class="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
						{{ billingPeriod === 'monthly' ? '$9.99' : '$95.88' }}
					</div>
					<div class="text-slate-600 dark:text-slate-400 ml-2 pb-1">
						{{ billingPeriod === 'monthly' ? 'per month' : 'per year' }}
					</div>
				</div>

				<div class="mb-8 space-y-4">
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span><strong>Unlimited</strong> links</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Advanced analytics (traffic sources, geo)</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Data storage from 1 year</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Custom short URLs</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Custom domains</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Team access</span>
					</div>
					<div class="flex items-start">
						<svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span>Priority support</span>
					</div>
				</div>

				<button
					class="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center">
					<span>Upgrade to Pro</span>
					<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Comparison Table -->
		<div class="mt-20 max-w-5xl mx-auto glass-card glass-card-border glass-card-prevent-transform p-6 rounded-xl">
			<h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
				Detailed Plan Comparison
			</h2>

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<th class="py-4 px-3 text-left text-slate-600 dark:text-slate-400">Features</th>
							<th class="py-4 px-3 text-center text-slate-800 dark:text-white">Free</th>
							<th class="py-4 px-3 text-center text-indigo-600 dark:text-indigo-400">Pro</th>
						</tr>
					</thead>
					<tbody>
						<!-- Text fields first -->
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Links per month</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">30</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">∞</td>
						</tr>
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Data storage</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">30 days</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">From 1 year</td>
						</tr>
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Support</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">Basic</td>
							<td class="py-3 px-3 text-center text-slate-600 dark:text-slate-400">Priority</td>
						</tr>

						<!-- Features with green checkmarks -->
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Custom short URLs</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
						</tr>
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Basic analytics</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
						</tr>

						<!-- Features with red crosses -->
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Custom domains</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
						</tr>
						<tr class="border-b border-slate-200 dark:border-slate-700">
							<td class="py-3 px-3 text-slate-800 dark:text-white">Advanced analytics</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
						</tr>
						<tr>
							<td class="py-3 px-3 text-slate-800 dark:text-white">Team access</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</td>
							<td class="py-3 px-3 text-center">
								<svg class="h-5 w-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24"
									stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7" />
								</svg>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- FAQ Section -->
		<div class="mt-20 max-w-3xl mx-auto">
			<h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
				Frequently Asked Questions
			</h2>

			<div class="space-y-2.5">
				<div
					v-for="(faq, index) in [
						{
							question: 'How do I upgrade to Pro after using the free plan?',
							answer: 'You can upgrade to Pro at any time from your account settings. After payment, all your existing links and data will be preserved and available in the enhanced version.'
						},
						{
							question: 'Is there a trial period for Pro accounts?',
							answer: 'We offer a 14-day money-back guarantee for Pro subscriptions. If you\'re not satisfied with the services, simply contact our support for a refund.'
						},
						{
							question: 'Can I change my plan at any time?',
							answer: 'Yes, you can switch between monthly and yearly plans. When switching to a yearly plan, you\'ll immediately receive a 20% discount for the remaining subscription period.'
						},
						{
							question: 'What happens if I exceed the link limit on the free plan?',
							answer: 'When you reach the 30-link limit, you won\'t be able to create new ones until the next month. However, all existing links will continue to work, and you can still track their statistics.'
						},
						{
							question: 'How do I add a custom domain?',
							answer: 'Pro users can add their own domains in the settings section. You\'ll need to configure a CNAME record with your DNS provider. We provide detailed setup instructions for most popular providers.'
						}
					]"
					:key="index"
					class="glass-card glass-card-border glass-card-prevent-transform !p-0 rounded-lg overflow-hidden hover:shadow-md"
					:class="{ 'shadow-md': activeFaq === index }">
					<button
						class="w-full py-4 px-5 text-left flex justify-between items-center"
						@click="toggleFaq(index)">
						<span class="font-medium text-slate-800 dark:text-white text-base">{{ faq.question }}</span>
						<svg
							class="h-5 w-5 text-slate-600 dark:text-slate-400 transform transition-transform duration-500"
							:class="{ 'rotate-180': activeFaq === index }"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					<div
						class="overflow-hidden transition-all duration-200 ease-linear"
						:style="{ maxHeight: activeFaq === index ? '55px' : '0' }">
						<p class="px-5 pb-4 text-slate-600 dark:text-slate-400 text-sm">
							{{ faq.answer }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Период оплаты (месячный или годовой)
const billingPeriod = ref('monthly');

// FAQ active states
const activeFaq = ref(-1);

const toggleFaq = (index: number) => {
	activeFaq.value = activeFaq.value === index ? -1 : index;
};

useHead({
	title: 'Pricing - TinyLink',
	meta: [
		{ name: 'description', content: 'Choose the right plan for your needs. Free and Pro plans for URL shortening.' }
	]
})
</script>
