<template>
	<div class="register-page py-20 px-6 relative min-h-screen flex items-start justify-center overflow-hidden">
		<div class="container mx-auto max-w-lg z-10">
			<RegisterForm />
		</div>
	</div>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/auth/RegisterForm.vue';

// SEO
useHead({
	title: 'Join TinyLink - Create Your Account',
	meta: [
		{
			name: 'description',
			content: 'Create your TinyLink account in seconds to get 100 free URL shortening requests per month and access premium features like analytics and custom links.'
		},
	]
})
</script>

<style scoped>
.register-page {
	background: transparent;
}
</style>