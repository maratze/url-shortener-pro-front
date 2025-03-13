<template>
	<div class="container mx-auto px-4 py-12">
		<div
			class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-10 border border-slate-200 dark:border-slate-700">
			<h1 class="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Terms of Service</h1>

			<div class="space-y-8 text-slate-600 dark:text-slate-300">
				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">1. Acceptance of Terms</h2>
					<p>By using our service, you agree to these terms of service. If you disagree with any part, please
						discontinue use of the service.</p>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">2. Service Description</h2>
					<p>URL Shortener Pro provides URL shortening services and usage analytics. We reserve the right to
						modify, suspend, or discontinue the service at any time.</p>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">3. Registration and Security</h2>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>You are responsible for maintaining the security of your account credentials</li>
						<li>You must promptly notify us of any unauthorized use of your account</li>
						<li>We reserve the right to suspend accounts that violate these terms</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">4. Prohibited Use</h2>
					<p>You may not use the service for:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Distribution of malware</li>
						<li>Intellectual property rights violations</li>
						<li>Spam distribution</li>
						<li>Any illegal activities</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">5. Limitation of Liability</h2>
					<p>We provide the service "as is" and are not liable for:</p>
					<ul class="list-disc list-inside space-y-2 ml-4">
						<li>Service interruptions</li>
						<li>Data loss</li>
						<li>Any indirect damages</li>
						<li>Third-party actions</li>
					</ul>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">6. Intellectual Property</h2>
					<p>All rights to the service, including code, design, and content, belong to URL Shortener Pro.
						Copying, modification, or distribution without our written permission is prohibited.</p>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">7. Changes to Terms</h2>
					<p>We reserve the right to modify these terms at any time. By continuing to use the service after
						changes are made, you accept the new terms.</p>
				</section>

				<section class="space-y-4">
					<h2 class="text-2xl font-semibold text-slate-800 dark:text-white">8. Governing Law</h2>
					<p>These terms are governed by and construed in accordance with the laws of the United States.</p>
				</section>
			</div>

			<div class="mt-12 text-sm text-slate-500 dark:text-slate-400">
				<p>Last updated: {{ new Date().toLocaleDateString() }}</p>
			</div>
		</div>
	</div>
</template>