<template>
	<div>
		<!-- Скелетон для таблицы -->
		<div v-if="viewMode === 'table'" class="overflow-hidden glass-card animate-pulse">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
					<thead class="bg-slate-50 dark:bg-slate-800/80">
					<tr>
						<th v-for="i in 6" :key="`head-${i}`" scope="col" class="table-head-cell">
							<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
						</th>
					</tr>
					</thead>
					<tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
					<tr v-for="i in itemCount" :key="`row-${i}`">
						<td v-for="j in 6" :key="`cell-${i}-${j}`" class="table-cell">
							<div
								class="h-4 bg-slate-200 dark:bg-slate-700 rounded"
								:class="j === 1 ? 'w-48' : j === 2 ? 'w-32' : 'w-16'"
							></div>
							<div
								v-if="j === 1"
								class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32 mt-2"
							></div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Скелетон для карточек -->
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="i in itemCount"
				:key="`card-${i}`"
				class="glass-card p-5 animate-pulse"
			>
				<!-- Заголовок -->
				<div class="flex justify-between mb-3">
					<div class="flex items-center">
						<div class="h-6 w-6 rounded-sm bg-slate-200 dark:bg-slate-700 mr-2"></div>
						<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
					</div>
					<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
				</div>

				<!-- URL -->
				<div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>

				<!-- Короткий URL -->
				<div class="flex items-center bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 mb-4">
					<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-40"></div>
					<div class="ml-auto h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
				</div>

				<!-- Статистика -->
				<div class="flex justify-between mb-4">
					<div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
					<div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
				</div>

				<!-- Кнопки -->
				<div class="flex divide-x divide-slate-200 dark:divide-slate-700 -mx-5 -mb-5 mt-3 border-t border-slate-200 dark:border-slate-700">
					<div class="flex-1 py-2.5 flex items-center justify-center">
						<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
					</div>
					<div class="flex-1 py-2.5 flex items-center justify-center">
						<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
					</div>
					<div class="flex-1 py-2.5 flex items-center justify-center">
						<div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	viewMode: {
		type: String,
		default: 'table',
		validator: (value: string) => ['table', 'cards'].includes(value)
	},
	itemCount: {
		type: Number,
		default: 5
	}
});
</script>

<style scoped>
.glass-card {
	@apply bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md;
}

.table-head-cell {
	@apply px-4 py-3 text-left text-xs font-medium;
}

.table-cell {
	@apply px-4 py-3 whitespace-nowrap;
}
</style>