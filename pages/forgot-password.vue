<template>
	<div class="container mx-auto px-4 py-20">
		<div class="max-w-md mx-auto">
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-slate-800 dark:text-white">Reset Password</h1>
				<p class="text-slate-600 dark:text-slate-300 mt-2">
					Enter your email address and we'll send you a link to reset your password.
				</p>
			</div>

			<div class="premium-glass-card p-8 bg-white dark:bg-slate-800">
				<form class="space-y-6">
					<div class="form-field">
						<label class="form-label" for="email">Email Address</label>
						<input
							id="email"
							type="email"
							class="form-input"
							placeholder="your@email.com"
							required />
					</div>

					<button
						type="submit"
						class="submit-button w-full">
						Send Reset Link
					</button>

					<div class="text-center mt-4">
						<NuxtLink to="/login" class="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
							Back to Login
						</NuxtLink>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Forgot Password - TinyLink',
	meta: [
		{ name: 'description', content: 'Reset your TinyLink password.' }
	]
})

definePageMeta({
	middleware: ['auth'],
	layout: 'auth'
})
</script>

<style scoped>
.premium-glass-card {
	border-radius: 16px;
	border: 1px solid rgb(0, 0, 0, .1);
}

.dark .premium-glass-card {
	border-color: rgb(0, 0, 0, .5);
	background: var(--glass-bg-dark);
}

.form-field {
	@apply mb-5;
}

.form-label {
	@apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5;
}

.form-input {
	@apply block w-full px-4 py-3 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-500;
}

.submit-button {
	@apply py-3 px-4 flex items-center justify-center text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden;
}
</style>