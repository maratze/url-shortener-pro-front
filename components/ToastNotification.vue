<template>
	<Teleport to="body">
		<div class="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
			<TransitionGroup name="toast" tag="div" class="space-y-2 w-full max-w-md">
				<div
					v-for="toast in toastStore.toasts"
					:key="toast.id"
					class="toast-notification pointer-events-auto"
					:class="`toast-${toast.type}`"
				>
					<div class="flex items-center">
						<!-- Success icon -->
						<div v-if="toast.type === 'success'" class="flex-shrink-0 text-green-500 dark:text-green-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>

						<!-- Error icon -->
						<div v-else-if="toast.type === 'error'" class="flex-shrink-0 text-red-500 dark:text-red-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
							</svg>
						</div>

						<!-- Info icon -->
						<div v-else class="flex-shrink-0 text-blue-500 dark:text-blue-400">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd" />
							</svg>
						</div>

						<div class="ml-3 w-0 flex-1">
							<p class="toast-text">{{ toast.message }}</p>
						</div>

						<div class="ml-4 flex-shrink-0 flex">
							<button
								@click="toastStore.remove(toast.id)"
								class="toast-close-btn"
							>
								<span class="sr-only">Close</span>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
							</button>
						</div>
					</div>

					<div class="toast-progress-bar" :style="{ width: `${toast.progressPercentage}%` }"></div>
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();
</script>

<style scoped>
.toast-notification {
	@apply rounded-lg py-3 px-4 shadow-lg relative overflow-hidden;
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
}

.dark .toast-notification {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.toast-success {
	border-left: 4px solid #10b981;
}

.toast-error {
	border-left: 4px solid #ef4444;
}

.toast-info {
	border-left: 4px solid #3b82f6;
}

.toast-text {
	@apply text-sm font-medium text-slate-800 dark:text-white;
}

.toast-close-btn {
	@apply inline-flex rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400;
}

.toast-progress-bar {
	@apply absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300;
}

.toast-success .toast-progress-bar {
	@apply bg-green-500;
}

.toast-error .toast-progress-bar {
	@apply bg-red-500;
}

.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}

.toast-enter-from {
	opacity: 0;
	transform: translateY(-20px);
}

.toast-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}
</style>