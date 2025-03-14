<template>
	<div class="fixed bottom-4 left-4 flex flex-col space-y-3 min-w-[300px] z-[3000]">
		<TransitionGroup name="toast-list" tag="div" class="flex flex-col space-y-3">
			<Toast
				v-for="toast in toasts"
				:key="toast.id"
				:message="toast.message"
				:type="toast.type"
				:duration="toast.duration" />
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';
import Toast from '~/components/common/Toast.vue';

const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);

onMounted(() => {
	// Инициализация контейнера уведомлений
});
</script>

<style scoped>
.toast-list-enter-active,
.toast-list-leave-active {
	transition: all 0.4s ease;
}

.toast-list-enter-from {
	opacity: 0;
	transform: translateY(-10px);
}

.toast-list-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>