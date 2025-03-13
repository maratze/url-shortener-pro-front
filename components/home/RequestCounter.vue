<template>
	<div class="request-counter-wrapper">
		<!-- Счетчик с прогресс-баром -->
		<div class="counter-container">
			<div class="flex items-center justify-between w-full">
				<div class="flex items-start">
					<!-- Разный текст для бесплатных и PRO пользователей -->
					<span v-if="isPremiumUser" class="counter-text flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd" />
						</svg>
						Неограниченное количество сокращений (PRO)
					</span>
					<span v-else class="counter-text">{{ remainingRequests }} бесплатных сокращений осталось</span>

					<!-- Иконка с улучшенной подсказкой (только для бесплатных пользователей) -->
					<div v-if="!isPremiumUser" class="relative ml-1.5">
						<button
							@click="toggleTooltip"
							type="button"
							class="info-icon-button"
							aria-label="More information">
							<svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clip-rule="evenodd" />
							</svg>
						</button>

						<!-- Улучшенная компактная подсказка с обновленным позиционированием -->
						<Transition name="tooltip">
							<div
								v-if="showTooltip"
								class="tooltip-container"
								@mouseleave="startCloseTimer"
								@mouseenter="clearCloseTimer"
								ref="tooltip">
								<p class="tooltip-text">Бесплатные аккаунты ограничены {{ totalFreeRequests }}
									сокращениями URL в месяц</p>
								<div class="tooltip-divider"></div>
								<NuxtLink to="/pricing" class="tooltip-link">
									Улучшить аккаунт
								</NuxtLink>
								<div class="tooltip-arrow"></div>
							</div>
						</Transition>
					</div>
				</div>

				<!-- Визуальный индикатор использования и кнопка апгрейда (только для бесплатных пользователей с высоким уровнем использования) -->
				<NuxtLink to="/pricing" class="upgrade-link" v-if="!isPremiumUser && usageRatio >= 0.7">
					Улучшить
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20"
						fill="currentColor">
						<path fill-rule="evenodd"
							d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
							clip-rule="evenodd" />
					</svg>
				</NuxtLink>
			</div>

			<!-- Прогресс-бар (только для бесплатных пользователей) -->
			<div v-if="!isPremiumUser" class="progress-bar-container">
				<div
					class="progress-bar"
					:class="progressBarClass"
					:style="{ width: `${usagePercentage}%` }"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import { useUrlStore } from '~/stores/url';
import { useAuthStore } from '~/stores/auth';

// Получаем хранилища
const urlStore = useUrlStore();
const authStore = useAuthStore();

// Проверяем, является ли пользователь премиум-пользователем
const isPremiumUser = computed(() => {
	return authStore.isAuthenticated && authStore.user?.isPremium;
});

// Общее количество бесплатных запросов в месяц (из конфигурации или констант)
const totalFreeRequests = computed(() => urlStore.totalFreeRequests || 30);

// Получаем оставшееся количество бесплатных запросов
const remainingRequests = computed(() => urlStore.remainingFreeRequests);

const showTooltip = ref(false);
const tooltip = ref(null);
const tooltipCloseTimer = ref(null);

// Расчет процента использования
const usageRatio = computed(() => {
	return (totalFreeRequests.value - remainingRequests.value) / totalFreeRequests.value;
});

const usagePercentage = computed(() => {
	return Math.min(100, usageRatio.value * 100);
});

// Класс для прогресс-бара в зависимости от использования
const progressBarClass = computed(() => {
	if (usageRatio.value >= 0.9) return 'progress-high';
	if (usageRatio.value >= 0.7) return 'progress-medium';
	return 'progress-low';
});

// Управление подсказкой
const toggleTooltip = () => {
	showTooltip.value = !showTooltip.value;
	if (showTooltip.value) {
		clearCloseTimer();
	}
};

const clearCloseTimer = () => {
	if (tooltipCloseTimer.value) {
		clearTimeout(tooltipCloseTimer.value);
		tooltipCloseTimer.value = null;
	}
};

const startCloseTimer = () => {
	tooltipCloseTimer.value = setTimeout(() => {
		showTooltip.value = false;
	}, 500); // Задержка перед закрытием при уходе мыши
};

// Закрытие подсказки при клике вне её
onMounted(() => {
	// Альтернатива без vueuse
	const handleClickOutside = (event) => {
		if (tooltip.value && !tooltip.value.contains(event.target) &&
			!event.target.closest('.info-icon-button')) {
			showTooltip.value = false;
		}
	};

	document.addEventListener('click', handleClickOutside);

	onBeforeUnmount(() => {
		document.removeEventListener('click', handleClickOutside);
		clearCloseTimer();
	});
});
</script>

<style scoped>
.request-counter-wrapper {
	@apply py-1;
}

.counter-container {
	@apply w-full;
}

.counter-text {
	@apply text-sm text-slate-700 dark:text-slate-300 font-medium;
}

.info-icon-button {
	@apply inline-flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 w-5 h-5 text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-colors duration-200;
}

.info-icon {
	@apply h-3.5 w-3.5;
}

/* Обновленный контейнер подсказки с увеличенной шириной */
.tooltip-container {
	@apply absolute z-50 bottom-full left-1/2 w-60 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-xl mb-2;
	transform: translateX(-50%);
	filter: drop-shadow(0 4px 6px var(--card-border));
}

/* Увеличенный размер текста */
.tooltip-text {
	@apply text-slate-700 dark:text-slate-300 text-sm;
}

.tooltip-divider {
	@apply my-1.5 border-t border-slate-200 dark:border-slate-700;
}

/* Увеличенный размер ссылки */
.tooltip-link {
	@apply text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm block;
}

/* Исправленная стрелка подсказки - частично внутри контейнера */
.tooltip-arrow {
	@apply absolute left-1/2 w-2.5 h-2.5 bg-white dark:bg-slate-800 transform -translate-x-1/2 rotate-45;
	top: calc(100% - 4px);
	/* Стрелка теперь частично внутри подсказки */
}

.progress-bar-container {
	@apply w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden;
}

.progress-bar {
	@apply h-full rounded-full transition-all duration-500;
}

.progress-low {
	@apply bg-green-500 dark:bg-green-600;
}

.progress-medium {
	@apply bg-amber-500 dark:bg-amber-600;
}

.progress-high {
	@apply bg-red-500 dark:bg-red-600;
}

.upgrade-link {
	@apply text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors;
}

/* Обновленная анимация для тултипа */
.tooltip-enter-active,
.tooltip-leave-active {
	transition: opacity 0.2s, transform 0.2s;
}

.tooltip-enter-from,
.tooltip-leave-to {
	opacity: 0;
	transform: translateX(-50%) translateY(4px);
}
</style>