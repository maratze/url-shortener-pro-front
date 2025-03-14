<template>
	<div class="login-page py-20 px-6 relative min-h-screen flex items-start justify-center overflow-hidden">
		<div class="container mx-auto max-w-lg z-10">
			<LoginForm />
		</div>
	</div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';

// SEO
useHead({
	title: 'Log In to TinyLink - Access Your Account',
	meta: [
		{
			name: 'description',
			content: 'Log in to your TinyLink account to manage your shortened URLs, view analytics, and access premium features.'
		},
	]
})

definePageMeta({
	middleware: ['auth']
})
</script>

<style scoped>
.login-page {
	background: transparent;
}
</style>