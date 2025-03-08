<template>
	<div class="relative">
		<button
			@click="toggleMenu"
			class="table-settings-button p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center"
			title="Table Settings">
			<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		</button>

		<!-- Выпадающая панель настроек -->
		<div
			v-if="isOpen"
			class="table-settings-menu absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10">
			<div class="p-4">
				<h3 class="text-sm font-medium text-slate-800 dark:text-white mb-3">Table Settings</h3>

				<!-- Видимые колонки -->
				<div class="mb-4">
					<h4 class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Visible Columns</h4>
					<div class="space-y-2">
						<div
							v-for="column in columns"
							:key="column.key"
							class="flex items-center">
							<input
								type="checkbox"
								:id="`column-${column.key}`"
								:checked="column.visible"
								@change="toggleColumn(column.key)"
								class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
							<label :for="`column-${column.key}`"
								class="ml-2 text-sm text-slate-700 dark:text-slate-300">
								{{ column.label }}
							</label>
						</div>
					</div>
				</div>

				<!-- Плотность таблицы -->
				<div class="mb-4">
					<h4 class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Table Density</h4>
					<div class="flex space-x-2">
						<button
							@click="setDensity('compact')"
							class="flex-1 py-1.5 text-xs rounded-md transition-colors"
							:class="density === 'compact'
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'">
							Compact
						</button>
						<button
							@click="setDensity('normal')"
							class="flex-1 py-1.5 text-xs rounded-md transition-colors"
							:class="density === 'normal'
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'">
							Normal
						</button>
						<button
							@click="setDensity('relaxed')"
							class="flex-1 py-1.5 text-xs rounded-md transition-colors"
							:class="density === 'relaxed'
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'">
							Relaxed
						</button>
					</div>
				</div>

				<!-- Внешний вид таблицы -->
				<div class="mb-4">
					<h4 class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Appearance</h4>
					<div class="space-y-2">
						<div class="flex items-center">
							<input
								type="checkbox"
								id="setting-borders"
								:checked="showBorders"
								@change="toggleBorders"
								class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
							<label for="setting-borders" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
								Show Borders
							</label>
						</div>
						<div class="flex items-center">
							<input
								type="checkbox"
								id="setting-stripes"
								:checked="showStripes"
								@change="toggleStripes"
								class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600" />
							<label for="setting-stripes" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
								Striped Rows
							</label>
						</div>
					</div>
				</div>

				<!-- Добавляем секцию для выбора количества элементов на странице -->
				<div class="mb-4">
					<h4 class="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Items Per Page</h4>
					<div class="flex space-x-2">
						<button
							v-for="count in itemsPerPageOptions"
							:key="count"
							@click="changeItemsPerPage(count)"
							class="flex-1 py-1.5 text-xs rounded-md transition-colors"
							:class="selectedItemsPerPage === count
								? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
								: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'">
							{{ count }}
						</button>
					</div>
				</div>

				<div class="flex justify-between">
					<button
						@click="resetSettings"
						class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
						Reset Settings
					</button>
					<button
						@click="savePreferences"
						class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md">
						Apply
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const props = defineProps<{
	columns: Array<{
		key: string;
		label: string;
		visible: boolean;
	}>;
	isCompact?: boolean;
	showBorders?: boolean;
	showStripes?: boolean;
}>();

const emit = defineEmits<{
	(e: 'toggle-column', key: string): void;
	(e: 'toggle-compact'): void;
	(e: 'toggle-compact', isCompact: boolean): void;
	(e: 'toggle-borders'): void;
	(e: 'toggle-stripes'): void;
	(e: 'reset-settings'): void;
	(e: 'items-per-page-change', count: number): void;
}>();

// Состояние выпадающего меню
const isOpen = ref(false);

// Плотность таблицы
const density = useLocalStorage('table-density', 'normal');
const showBorders = ref(props.showBorders ?? true);
const showStripes = ref(props.showStripes ?? true);
const itemsPerPageOptions = [10, 25, 50, 100];
const selectedItemsPerPage = useLocalStorage('items-per-page', 10);

// Переключение меню
const toggleMenu = () => {
	isOpen.value = !isOpen.value;
	if (isOpen.value) {
		// Добавляем обработчик клика за пределами меню
		setTimeout(() => {
			document.addEventListener('click', closeMenuOnClickOutside);
		}, 0);
	}
};

// Установка плотности таблицы
const setDensity = (value: string) => {
	density.value = value;
	if (value === 'compact') {
		emit('toggle-compact', true);
	} else {
		emit('toggle-compact', false);
	}
};

// Переключение колонки
const toggleColumn = (key: string) => {
	emit('toggle-column', key);
};

// Переключение границ
const toggleBorders = () => {
	showBorders.value = !showBorders.value;
	emit('toggle-borders');
};

// Переключение полос
const toggleStripes = () => {
	showStripes.value = !showStripes.value;
	emit('toggle-stripes');
};

// Изменение количества элементов на странице
const changeItemsPerPage = (count: number) => {
	selectedItemsPerPage.value = count;
	emit('items-per-page-change', count);
};

// Сброс настроек
const resetSettings = () => {
	density.value = 'normal';
	showBorders.value = true;
	showStripes.value = true;
	selectedItemsPerPage.value = 10;
	emit('reset-settings');
};

// Сохранение настроек
const savePreferences = () => {
	// Применяем настройки
	if (density.value === 'compact') {
		emit('toggle-compact', true);
	} else {
		emit('toggle-compact', false);
	}
	emit('toggle-borders');
	emit('toggle-stripes');
	emit('items-per-page-change', selectedItemsPerPage.value);

	// Закрываем выпадающее меню
	isOpen.value = false;
	document.removeEventListener('click', closeMenuOnClickOutside);
};

// Закрытие меню при клике вне элемента
const closeMenuOnClickOutside = (event: MouseEvent) => {
	const target = event.target as HTMLElement;
	const settingsMenu = document.querySelector('.table-settings-menu');
	const settingsButton = document.querySelector('.table-settings-button');

	if (settingsMenu && settingsButton &&
		!settingsMenu.contains(target) &&
		!settingsButton.contains(target)) {
		isOpen.value = false;
		document.removeEventListener('click', closeMenuOnClickOutside);
	}
};

// Убираем обработчик событий при размонтировании компонента
onBeforeUnmount(() => {
	document.removeEventListener('click', closeMenuOnClickOutside);
});

// Применяем настройки при загрузке
onMounted(() => {
	if (density.value === 'compact') {
		emit('toggle-compact', true);
	} else {
		emit('toggle-compact', false);
	}
	emit('toggle-borders');
	emit('toggle-stripes');
	emit('items-per-page-change', selectedItemsPerPage.value);
});
</script>

<style scoped>
.glass-card {
	background: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .glass-card {
	background: rgba(15, 23, 42, 0.7);
	border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Стили для всплывающей подсказки */
[data-tooltip] {
	position: relative;
}

[data-tooltip]::after {
	content: attr(data-tooltip);
	position: absolute;
	bottom: -35px;
	left: 50%;
	transform: translateX(-50%);
	padding: 6px 10px;
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	border-radius: 6px;
	font-size: 14px;
	white-space: nowrap;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.15s, visibility 0.15s;
	z-index: 100;
}

[data-tooltip]:hover::after {
	opacity: 1;
	visibility: visible;
	transition-delay: 0.1s;
}
</style>