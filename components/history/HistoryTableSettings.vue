<template>
	<div class="flex flex-col space-y-4 p-4 glass-card rounded-xl">
		<h3 class="text-lg font-medium text-slate-800 dark:text-white mb-2">Table Settings</h3>

		<!-- Отображаемые колонки -->
		<div>
			<h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Visible Columns</h4>
			<div class="space-y-2">
				<div v-for="column in columns" :key="column.key" class="flex items-center">
					<input
						type="checkbox"
						:id="`column-${column.key}`"
						:checked="column.visible"
						@change="toggleColumn(column.key)"
						class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
					<label :for="`column-${column.key}`" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
						{{ column.label }}
					</label>
				</div>
			</div>
		</div>

		<!-- Настройки внешнего вида -->
		<div>
			<h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Appearance</h4>
			<div class="space-y-3">
				<div class="flex items-center">
					<input
						type="checkbox"
						id="setting-compact"
						:checked="isCompact"
						@change="toggleCompact"
						class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
					<label for="setting-compact" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
						Compact Mode
					</label>
				</div>

				<div class="flex items-center">
					<input
						type="checkbox"
						id="setting-borders"
						:checked="showBorders"
						@change="toggleBorders"
						class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
						class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
					<label for="setting-stripes" class="ml-2 text-sm text-slate-700 dark:text-slate-300">
						Striped Rows
					</label>
				</div>
			</div>
		</div>

		<div class="pt-2">
			<button
				@click="resetSettings"
				class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200">
				Reset to Default
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Column {
	key: string;
	label: string;
	visible: boolean;
}

const props = defineProps<{
	columns: Column[];
	isCompact: boolean;
	showBorders: boolean;
	showStripes: boolean;
}>();

const emit = defineEmits<{
	(e: 'toggle-column', key: string): void;
	(e: 'toggle-compact'): void;
	(e: 'toggle-borders'): void;
	(e: 'toggle-stripes'): void;
	(e: 'reset-settings'): void;
}>();

const toggleColumn = (key: string) => {
	emit('toggle-column', key);
};

const toggleCompact = () => {
	emit('toggle-compact');
};

const toggleBorders = () => {
	emit('toggle-borders');
};

const toggleStripes = () => {
	emit('toggle-stripes');
};

const resetSettings = () => {
	emit('reset-settings');
};
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
</style>