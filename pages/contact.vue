<template>
	<div class="container mx-auto px-4 py-12">
		<div class="max-w-2xl mx-auto glass-card">
			<h1 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Contact Us</h1>

			<p class="mb-6 text-slate-700 dark:text-slate-300">
				Have questions, feedback, or need assistance? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
			</p>

			<form @submit.prevent="submitForm" class="space-y-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputField v-model="form.name" label="Name" placeholder="Your name" required />
					<InputField v-model="form.email" type="email" label="Email" placeholder="your@email.com" required />
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
						Message
					</label>
					<textarea
						v-model="form.message"
						id="message"
						rows="6"
						class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:border-primary-500 focus:ring-primary-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
						placeholder="How can we help you?"
						required
					></textarea>
				</div>

				<Button type="submit" variant="primary" :loading="loading">
					Send Message
				</Button>

				<p v-if="submitStatus" :class="[
          'text-center py-2 px-4 rounded',
          submitStatus === 'success' ? 'bg-green-500/20 text-green-800 dark:text-green-200' : 'bg-red-500/20 text-red-800 dark:text-red-200'
        ]">
					{{ submitMessage }}
				</p>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();
const loading = ref(false);
const submitStatus = ref<'success' | 'error' | null>(null);
const submitMessage = ref('');

const form = reactive({
	name: '',
	email: '',
	message: ''
});

const submitForm = async () => {
	loading.value = true;
	submitStatus.value = null;

	try {
		// This is a placeholder for future API integration
		// Here you would normally send the form data to your backend

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));

		// Success response
		submitStatus.value = 'success';
		submitMessage.value = 'Thank you for your message! We will respond shortly.';
		toastStore.success('Message sent successfully!');

		// Reset form
		form.name = '';
		form.email = '';
		form.message = '';
	} catch (error) {
		submitStatus.value = 'error';
		submitMessage.value = 'Failed to send your message. Please try again later.';
		toastStore.error('Failed to send message.');
	} finally {
		loading.value = false;
	}
};

// SEO
useHead({
	title: 'Contact Us - URL Shortener Pro',
	meta: [
		{ name: 'description', content: 'Contact the URL Shortener Pro team with your questions, feedback, or support needs.' },
	]
})
</script>