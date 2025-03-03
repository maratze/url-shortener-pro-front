<template>
	<footer class="glass mt-10 py-6">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="mb-4 md:mb-0">
					<img src="/logo.svg" alt="URL Shortener Pro" class="h-8 w-auto mb-2" />
					<p class="text-sm text-slate-600 dark:text-slate-400">
						&copy; {{ new Date().getFullYear() }} URL Shortener Pro. All rights reserved.
					</p>
				</div>

				<div class="flex flex-wrap gap-6">
					<NuxtLink to="/terms" class="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
						Terms of Service
					</NuxtLink>
					<NuxtLink to="/privacy" class="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
						Privacy Policy
					</NuxtLink>
					<NuxtLink to="/contact" class="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
						Contact Us
					</NuxtLink>
				</div>
			</div>
		</div>
	</footer>
</template>