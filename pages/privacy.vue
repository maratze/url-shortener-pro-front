<template>
	<div class="container mx-auto px-4 py-12">
		<div
			class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-10 border border-slate-200 dark:border-slate-700">
			<h1 class="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Privacy Policy</h1>

			<div class="space-y-8 text-slate-600 dark:text-slate-300">
				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">1. Information Collection</h2>
					<p>We collect the following information when you use our service:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Email address</li>
						<li>Service usage information</li>
						<li>Technical data (IP address, browser type)</li>
						<li>Shortened URL usage statistics</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">2. Use of Information</h2>
					<p>The collected information is used for:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Providing and improving our services</li>
						<li>Ensuring service security</li>
						<li>Analyzing service usage</li>
						<li>Communicating with users</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">3. Information Protection</h2>
					<p>We take the following measures to protect your data:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Using encryption for data transmission</li>
						<li>Regular security system updates</li>
						<li>Limiting access to personal data</li>
						<li>Monitoring and auditing security systems</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">4. Cookies</h2>
					<p>We use cookies for:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Saving user preferences</li>
						<li>Analyzing service usage</li>
						<li>Improving user experience</li>
						<li>Ensuring security</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">5. Your Rights</h2>
					<p>You have the right to:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Access your data</li>
						<li>Correct inaccurate data</li>
						<li>Delete your data</li>
						<li>Withdraw consent for data processing</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">6. Contact Information</h2>
					<p>If you have questions about our privacy policy, please contact us:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Email: privacy@urlshortener.pro</li>
						<li>Contact form on our contact page</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">7. Changes</h2>
					<p>We reserve the right to update this privacy policy at any time. We will notify you of any changes
						by posting the new version on this page.</p>
				</section>
			</div>

			<div class="mt-12 text-sm text-slate-500 dark:text-slate-400">
				<p>Last updated: {{ new Date().toLocaleDateString() }}</p>
			</div>
		</div>
	</div>
</template>