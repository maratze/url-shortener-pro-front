<template>
	<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<!-- Фоновое затемнение -->
		<div class="fixed inset-0 bg-slate-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

		<div class="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all max-w-md w-full p-6"
				@click.stop
			>
				<!-- Иконка предупреждения -->
				<div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
					<svg class="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>

				<!-- Заголовок модального окна -->
				<h3 class="text-lg font-medium text-slate-800 dark:text-white mb-2" id="modal-title">
					Delete Link
				</h3>

				<!-- Текст предупреждения -->
				<p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
					Are you sure you want to delete this link?
				</p>
				<p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
					This action cannot be undone.
				</p>

				<!-- Информация о ссылке -->
				<div class="mb-6 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
					<p class="text-sm font-medium text-slate-800 dark:text-white">
						{{ link?.title || 'Untitled Link' }}
					</p>
					<p class="text-xs text-indigo-600 dark:text-indigo-400 truncate">
						{{ link?.shortUrl }}
					</p>
					<p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
						{{ link?.originalUrl }}
					</p>
				</div>

				<!-- Кнопки действий -->
				<div class="flex justify-end space-x-3">
					<button
						type="button"
						@click="closeModal"
						class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none"
					>
						Cancel
					</button>
					<button
						type="button"
						@click="confirmDelete"
						:disabled="isDeleting"
						:class="{'opacity-70 cursor-not-allowed': isDeleting}"
						class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none flex items-center"
					>
						<svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						{{ isDeleting ? 'Deleting...' : 'Delete Link' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { LinkData } from '~/types/link';

const props = defineProps<{
	link: LinkData | null;
}>();

const emit = defineEmits(['close', 'confirm']);

// Состояние удаления
const isDeleting = ref(false);

// Закрытие модального окна
const closeModal = () => {
	emit('close');
};

// Подтверждение удаления
const confirmDelete = async () => {
	isDeleting.value = true;

	try {
		// Имитация запроса к серверу
		await new Promise(resolve => setTimeout(resolve, 800));

		emit('confirm', props.link?.id);
	} catch (error) {
		console.error('Error deleting link:', error);
	} finally {
		isDeleting.value = false;
	}
};
</script>