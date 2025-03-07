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
</script>

<style scoped>
.login-page {
	background-image: radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.05) 0%, transparent 60%),
	radial-gradient(circle at 20% 90%, rgba(124, 58, 237, 0.05) 0%, transparent 60%);
}

.dark .login-page {
	background-image: radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
	radial-gradient(circle at 20% 90%, rgba(124, 58, 237, 0.08) 0%, transparent 60%);
}
</style>