<template>
	<div class="glass-card h-full flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 text-primary-600 dark:text-primary-400 mb-4">
			<component :is="icons[icon]" class="h-8 w-8" />
		</div>
		<h3 class="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{{ title }}</h3>
		<p class="text-slate-600 dark:text-slate-400">{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	description: string;
	icon: 'shield-check' | 'chart-bar' | 'lightning-bolt';
}>();

const ShieldCheckIcon = defineComponent({
	render() {
		return h('svg', {
			xmlns: 'http://www.w3.org/2000/svg',
			fill: 'none',
			viewBox: '0 0 24 24',
			stroke: 'currentColor'
		}, [
			h('path', {
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': '2',
				d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
			})
		]);
	}
});

const ChartBarIcon = defineComponent({
	render() {
		return h('svg', {
			xmlns: 'http://www.w3.org/2000/svg',
			fill: 'none',
			viewBox: '0 0 24 24',
			stroke: 'currentColor'
		}, [
			h('path', {
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': '2',
				d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
			})
		]);
	}
});

const LightningBoltIcon = defineComponent({
	render() {
		return h('svg', {
			xmlns: 'http://www.w3.org/2000/svg',
			fill: 'none',
			viewBox: '0 0 24 24',
			stroke: 'currentColor'
		}, [
			h('path', {
				'stroke-linecap': 'round',
				'stroke-linejoin': 'round',
				'stroke-width': '2',
				d: 'M13 10V3L4 14h7v7l9-11h-7z'
			})
		]);
	}
});

const icons = {
	'shield-check': ShieldCheckIcon,
	'chart-bar': ChartBarIcon,
	'lightning-bolt': LightningBoltIcon
};
</script>