<template>
	<div class="container mx-auto px-4 py-12">
		<div class="max-w-md mx-auto">
			<LoginForm />
		</div>
	</div>
</template>

<script setup lang="ts">
// SEO
useHead({
	title: 'Log In - URL Shortener Pro',
	meta: [
		{ name: 'description', content: 'Log in to your URL Shortener Pro account to access advanced URL shortening features.' },
	]
})
</script>