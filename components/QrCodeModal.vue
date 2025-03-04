<template>
	<Teleport to="body">
		<Transition name="modal">
			<div v-if="modelValue" class="modal-overlay" @click="closeOnBackdrop ? $emit('update:modelValue', false) : null">
				<div class="modal-container" @click.stop>
					<div class="modal-header">
						<h3 class="text-lg font-medium text-slate-900 dark:text-white">{{ title }}</h3>
						<button @click="$emit('update:modelValue', false)" class="modal-close-btn">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
						</button>
					</div>

					<div class="modal-body">
						<div class="mb-4 bg-white rounded-lg p-4 flex items-center justify-center">
							<img
								:src="qrImageUrl"
								alt="QR Code"
								class="w-full max-w-[250px] h-auto"
								:class="{ 'opacity-50': isLoading }"
							/>
							<div v-if="isLoading" class="absolute">
								<svg class="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
							</div>
						</div>

						<div class="text-center text-sm text-slate-600 dark:text-slate-400 mb-4">
							<p>Scan this QR code to access <br> <span class="font-medium text-slate-900 dark:text-white break-all">{{ url }}</span></p>
						</div>

						<div class="flex space-x-3">
							<a
								:href="qrImageUrl"
								download="qr-code.png"
								class="flex-1 btn-secondary"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
								Download
							</a>
							<button
								@click="shareQrCode"
								class="flex-1 btn-secondary"
								v-if="canShare"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
									<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
								</svg>
								Share
							</button>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false
	},
	url: {
		type: String,
		required: true
	},
	title: {
		type: String,
		default: 'QR Code'
	},
	closeOnBackdrop: {
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(['update:modelValue']);

const isLoading = ref(true);
const canShare = ref(false);
const qrImageUrl = ref('');

// Add event listener for ESC key
const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === 'Escape' && props.modelValue) {
		emit('update:modelValue', false);
	}
};

onMounted(() => {
	// Check if Web Share API is available
	try {
		canShare.value = !!navigator.share;
	} catch (e) {
		canShare.value = false;
	}

	// Listen for ESC key
	document.addEventListener('keydown', handleKeydown);

	// Clean up
	onBeforeUnmount(() => {
		document.removeEventListener('keydown', handleKeydown);
	});
});

// Generate new QR code when URL changes
watch(() => props.url, generateQrCode, { immediate: true });

// Also regenerate QR when modal opens
watch(() => props.modelValue, (newVal) => {
	if (newVal) {
		generateQrCode();
	}
});

function generateQrCode() {
	if (!props.url) return;

	isLoading.value = true;

	// Use a QR code generation API
	qrImageUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(props.url)}`;

	// Create a new image to detect when it's loaded
	const img = new Image();
	img.onload = () => {
		isLoading.value = false;
	};
	img.onerror = () => {
		isLoading.value = false;
		// Could set an error state here
	};
	img.src = qrImageUrl.value;
}

function shareQrCode() {
	if (navigator.share) {
		// First download the image
		fetch(qrImageUrl.value)
			.then(response => response.blob())
			.then(blob => {
				// Create a File object
				const file = new File([blob], 'qr-code.png', { type: 'image/png' });

				navigator.share({
					title: 'QR Code for ' + props.url,
					text: 'Scan this QR code to visit: ' + props.url,
					files: [file]
				}).catch((error) => {
					// Fallback if file sharing not supported
					navigator.share({
						title: 'QR Code for ' + props.url,
						text: 'Scan this QR code to visit: ' + props.url,
						url: props.url
					}).catch(console.error);
				});
			})
			.catch(error => {
				console.error('Error sharing QR code:', error);
			});
	}
}
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 50;
}

.modal-container {
	background: var(--glass-bg);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 16px;
	width: 90%;
	max-width: 400px;
	max-height: 90vh;
	overflow-y: auto;
	padding: 20px;
}

.dark .modal-container {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
}

.modal-close-btn {
	color: #64748b;
	transition: color 0.2s;
}

.modal-close-btn:hover {
	color: #475569;
}

.dark .modal-close-btn:hover {
	color: #cbd5e1;
}

.modal-body {
	position: relative;
}

.btn-secondary {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 12px;
	transition: all 0.2s;
	font-weight: 500;
	background: var(--glass-bg);
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border: 1px solid var(--glass-border);
	color: #4f46e5;
	font-size: 14px;
}

.dark .btn-secondary {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	color: #818cf8;
}

.btn-secondary:hover {
	background: rgba(79, 70, 229, 0.1);
}

.dark .btn-secondary:hover {
	background: rgba(129, 140, 248, 0.1);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}
</style>