<template>
	<div class="flex items-center justify-end space-x-2">
		<!-- Кнопка "Назад" -->
		<button
			@click="handlePageChange(currentPage - 1)"
			:disabled="currentPage === 1"
			:class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
			class="pagination-button"
			aria-label="Previous page"
		>
			<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<!-- Номера страниц -->
		<div class="hidden sm:flex space-x-2">
			<!-- Первая страница -->
			<button
				v-if="showFirst"
				@click="handlePageChange(1)"
				class="pagination-number-button"
				:class="{ 'pagination-number-active': currentPage === 1 }"
			>
				1
			</button>

			<!-- Многоточие слева -->
			<span v-if="showLeftEllipsis" class="pagination-ellipsis">...</span>

			<!-- Динамические страницы вокруг текущей -->
			<button
				v-for="page in displayedPages"
				:key="page"
				@click="handlePageChange(page)"
				class="pagination-number-button"
				:class="{ 'pagination-number-active': currentPage === page }"
			>
				{{ page }}
			</button>

			<!-- Многоточие справа -->
			<span v-if="showRightEllipsis" class="pagination-ellipsis">...</span>

			<!-- Последняя страница -->
			<button
				v-if="showLast && totalPages > 1"
				@click="handlePageChange(totalPages)"
				class="pagination-number-button"
				:class="{ 'pagination-number-active': currentPage === totalPages }"
			>
				{{ totalPages }}
			</button>
		</div>

		<!-- Мобильная нумерация страниц -->
		<span class="text-sm text-slate-600 dark:text-slate-400 px-2 sm:hidden">
      {{ currentPage }} / {{ totalPages }}
    </span>

		<!-- Кнопка "Вперед" -->
		<button
			@click="handlePageChange(currentPage + 1)"
			:disabled="currentPage === totalPages || totalPages === 0"
			:class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages || totalPages === 0 }"
			class="pagination-button"
			aria-label="Next page"
		>
			<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	totalPages: number;
	currentPage: number;
}>();

const emit = defineEmits<{
	(e: 'page-change', page: number): void;
}>();

// Количество страниц, отображаемых вокруг текущей страницы
const surroundingPages = 1;

// Определение, какие страницы отображать
const displayedPages = computed(() => {
	const pages = [];
	let start = Math.max(2, props.currentPage - surroundingPages);
	let end = Math.min(props.totalPages - 1, props.currentPage + surroundingPages);

	// Корректировки для краевых случаев
	if (props.currentPage - surroundingPages <= 2) start = 2;
	if (props.currentPage + surroundingPages >= props.totalPages - 1) end = props.totalPages - 1;

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	return pages;
});

// Управление отображением ссылок пагинации
const showFirst = computed(() => props.totalPages > 0);
const showLast = computed(() => props.totalPages > 2);
const showLeftEllipsis = computed(() => props.currentPage - surroundingPages > 2);
const showRightEllipsis = computed(() => props.currentPage + surroundingPages < props.totalPages - 1);

// Обработка изменения страницы
const handlePageChange = (page: number) => {
	if (page < 1 || page > props.totalPages || page === props.currentPage) return;
	emit('page-change', page);
};
</script>

<style scoped>
.pagination-button {
	@apply p-1 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500;
}

.pagination-number-button {
	@apply w-8 h-8 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm;
}

.pagination-number-active {
	@apply bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-500 dark:border-indigo-600;
}

.pagination-ellipsis {
	@apply w-8 flex items-center justify-center text-slate-500 dark:text-slate-400;
}
</style>