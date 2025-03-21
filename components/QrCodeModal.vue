<template>
	<div v-if="modelValue" class="fixed inset-0 z-[2000] flex items-center justify-center">
		<!-- Backdrop -->
		<div class="absolute inset-0 bg-black bg-opacity-50" @click="closeOnBackdrop ? close : null"></div>

		<!-- Modal Content -->
		<div
			class="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
			<!-- Header -->
			<div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
				<h3 class="text-lg font-medium text-slate-900 dark:text-white">{{ title }}</h3>
				<button @click="close" class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
					<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Body -->
			<div class="p-6">
				<div class="flex flex-col items-center">
					<!-- Инструкции со шагами -->
					<div v-if="isSetup" class="w-full">
						<div class="flex items-center gap-2 mb-4">
							<div
								class="bg-indigo-600 text-white rounded-full min-w-6 w-6 h-6 flex items-center justify-center font-semibold text-sm">
								1
							</div>
							<p class="text-slate-600 dark:text-slate-300 font-medium text-sm">
								Откройте ваше приложение-аутентификатор
							</p>
						</div>
						<div class="flex items-center gap-2 mb-4">
							<div
								class="bg-indigo-600 text-white rounded-full min-w-6 w-6 h-6 flex items-center justify-center font-semibold text-sm">
								2
							</div>
							<p class="text-slate-600 dark:text-slate-300 font-medium text-sm">
								Отсканируйте QR-код или введите ключ вручную
							</p>
						</div>
						<div class="flex items-center gap-2">
							<div
								class="bg-indigo-600 text-white rounded-full min-w-6 w-6 h-6 flex items-center justify-center font-semibold text-sm">
								3
							</div>
							<p class="text-slate-600 dark:text-slate-300 font-medium text-sm">
								Введите 6-значный код из приложения и нажмите "Подтвердить"
							</p>
						</div>
					</div>

					<!-- QR Code -->
					<div class="bg-white p-4 rounded-lg">
						<img :src="url" alt="QR Code" class="w-64 h-64" />
					</div>

					<!-- Instructions -->
					<p class="text-center text-sm text-slate-600 dark:text-slate-300">
						Отсканируйте этот QR-код с помощью приложения-аутентификатора (например, Google Authenticator,
						Microsoft Authenticator или Authy) для настройки двухфакторной аутентификации.
					</p>

					<p v-if="manualKey" class="text-sm text-center text-slate-500 dark:text-slate-400 mt-2">
						<span class="block mb-1">Если вы не можете отсканировать код, введите этот ключ вручную:</span>
						<code class="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-mono">{{ manualKey }}</code>
					</p>

					<!-- Verification code input -->
					<div v-if="isSetup" class="w-full mt-4">
						<label for="verificationCode"
							class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
							Код подтверждения
						</label>
						<div class="mt-1">
							<input
								id="verificationCode"
								v-model="verificationCode"
								type="text"
								maxlength="6"
								placeholder="Введите 6-значный код"
								class="block w-full px-3 py-[9px] border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white" />
							<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
								Откройте приложение-аутентификатор и введите 6-значный код, сгенерированный для этого
								аккаунта
							</p>
						</div>
						<div v-if="verificationError" class="mt-2 text-sm text-red-600">
							{{ verificationError }}
						</div>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
				<button
					@click="close"
					class="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
					Отмена
				</button>

				<button
					v-if="isSetup"
					@click="verify"
					:disabled="!verificationCode || verificationCode.length < 6 || isVerifying"
					class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
					<span v-if="isVerifying" class="flex items-center">
						<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
							fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
							</circle>
							<path class="opacity-75" fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
							</path>
						</svg>
						Проверка...
					</span>
					<span v-else>Подтвердить</span>
				</button>
				<button
					v-else
					@click="close"
					class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
					Закрыть
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	title: {
		type: String,
		default: 'QR Code'
	},
	manualKey: {
		type: String,
		default: ''
	},
	isSetup: {
		type: Boolean,
		default: false
	},
	closeOnBackdrop: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:modelValue', 'verify']);

const verificationCode = ref('');
const verificationError = ref('');
const isVerifying = ref(false);

const close = () => {
	// Сбрасываем состояние при закрытии
	verificationCode.value = '';
	verificationError.value = '';
	isVerifying.value = false;
	emit('update:modelValue', false);
};

const verify = async () => {
	// Проверка ввода
	if (!verificationCode.value || verificationCode.value.length < 6) {
		verificationError.value = 'Введите корректный 6-значный код';
		return;
	}

	isVerifying.value = true;
	verificationError.value = '';

	try {
		// Вызываем родительский метод для проверки кода
		emit('verify', verificationCode.value);
	} catch (error) {
		console.error('Ошибка верификации:', error);
		verificationError.value = 'Не удалось проверить код. Пожалуйста, попробуйте еще раз.';
		isVerifying.value = false;
	}
};
</script>