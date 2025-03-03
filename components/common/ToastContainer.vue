<template>
	<div class="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
		<Toast
			v-for="toast in toasts"
			:key="toast.id"
			:message="toast.message"
			:type="toast.type"
			:duration="toast.duration"
		/>
	</div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';
import Toast from '~/components/common/Toast.vue';

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);
</script>