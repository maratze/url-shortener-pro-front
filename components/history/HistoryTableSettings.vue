<template>
	<div class="relative">
		<button
			@click="isOpen = !isOpen"
			class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
			aria-label="Table settings"
		>
			<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		</button>

		<!-- Выпадающая панель настроек -->
		<div
			v-if="isOpen"
			class="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 z-10"
			@click.outside="isOpen = false"
		>
			<div class="p-4">
				<h3 class="text-sm font-medium text-slate-800 dark:text-white mb-3">Table Columns</h3>

				<div class="space-y-2">
					<div
						v-for="column in columns"
						:key="column.id"
						class="flex items-center"
					>
						<input
							type="checkbox"
							:id="`column-${column.id}`"
							v-model="column.visible"
							:disabled="column.required"
							class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600"
						/>
						<label :for="`column-${column.id}`" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
							{{ column.label }}
							<span v-if="column.required" class="text-xs text-slate-500 dark:text-slate-400">(required)</span>
						</label>
					</div>
				</div>

				<hr class="my-3 border-slate-200 dark:border-slate-700">

				<h3 class="text-sm font-medium text-slate-800 dark:text-white mb-3">Table Density</h3>

				<div class="flex space-x-4">
					<button
						@click="setDensity('compact')"
						class="flex-1 py-1.5 text-xs rounded-md transition-colors"
						:class="density === 'compact' 
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'"
					>
						Compact
					</button>
					<button
						@click="setDensity('normal')"
						class="flex-1 py-1.5 text-xs rounded-md transition-colors"
						:class="density === 'normal' 
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'"
					>
						Normal
					</button>
					<button
						@click="setDensity('relaxed')"
						class="flex-1 py-1.5 text-xs rounded-md transition-colors"
						:class="density === 'relaxed' 
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' 
              : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'"
					>
						Relaxed
					</button>
				</div>

				<div class="flex justify-end mt-4">
					<button
						@click="savePreferences"
						class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md"
					>
						Save Preferences
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const emit = defineEmits<{
	(e: 'columns-change', columns: any[]): void;
	(e: 'density-change', density: string): void;
}>();

// Состояние выпадающего меню
const isOpen = ref(false);

// Возможные колонки таблицы
const columns = reactive([
	{ id: 'link', label: 'Link', visible: true, required: true },
	{ id: 'shortUrl', label: 'Short URL', visible: true, required: true },
	{ id: 'clicks', label: 'Clicks', visible: true, required: false },
	{ id: 'created', label: 'Created Date', visible: true, required: false },
	{ id: 'status', label: 'Status', visible: true, required: false },
	{ id: 'tags', label: 'Tags', visible: false, required: false },
	{ id: 'lastClick', label: 'Last Click', visible: false, required: false },
]);

// Плотность таблицы
const density = useLocalStorage('table-density', 'normal');

// Установка плотности таблицы
const setDensity = (value: string) => {
	density.value = value;
	emit('density-change', value);
};

// Сохранение настроек
const savePreferences = () => {
	// Сохраняем настройки колонок в локальное хранилище
	localStorage.setItem('table-columns', JSON.stringify(columns));

	// Передаем обновленные настройки наверх
	emit('columns-change', columns);

	// Закрываем выпадающее меню
	isOpen.value = false;
};

// Загрузка сохраненных настроек при монтировании компонента
watch(
	() => density.value,
	(newDensity) => {
		emit('density-change', newDensity);
	},
	{ immediate: true }
);
</script>