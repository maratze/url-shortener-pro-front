<template>
	<section class="statistics-section py-24 px-4 relative overflow-hidden">
		<div class="container mx-auto max-w-7xl relative">
			<!-- Обновленный заголовок в соответствии с предыдущими блоками -->
			<div class="text-center max-w-3xl mx-auto mb-16">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 dark:text-white">
					Trusted by
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">thousands</span>
					worldwide
				</h2>
				<div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
				<p class="text-lg text-slate-600 dark:text-slate-300">
					Join our growing community of users who rely on TinyLink every day
				</p>
			</div>

			<!-- Улучшенная сетка статистики -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<!-- Stat 1 -->
				<div class="stat-card feature-card-1">
					<div class="stat-content">
						<div class="stat-value text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
							<CountUp :to="5" :duration="3"/>M+
						</div>
						<div class="stat-label text-lg font-medium text-slate-700 dark:text-slate-300">URLs Shortened</div>
					</div>
				</div>

				<!-- Stat 2 -->
				<div class="stat-card feature-card-2">
					<div class="stat-content">
						<div class="stat-value text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
							<CountUp :to="99.9" :duration="3" :decimals="1"/>%
						</div>
						<div class="stat-label text-lg font-medium text-slate-700 dark:text-slate-300">Uptime</div>
					</div>
				</div>

				<!-- Stat 3 -->
				<div class="stat-card feature-card-3">
					<div class="stat-content">
						<div class="stat-value text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
							<CountUp :to="50" :duration="3"/>K+
						</div>
						<div class="stat-label text-lg font-medium text-slate-700 dark:text-slate-300">Active Users</div>
					</div>
				</div>

				<!-- Stat 4 -->
				<div class="stat-card feature-card-1">
					<div class="stat-content">
						<div class="stat-value text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
							<CountUp :to="200" :duration="3"/>M+
						</div>
						<div class="stat-label text-lg font-medium text-slate-700 dark:text-slate-300">Monthly Clicks</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import CountUp from '~/components/CountUp.vue';
</script>

<style scoped>
.statistics-section {
	background-color: var(--glass-bg);
	position: relative;
	box-shadow: var(--glass-shadow);
}

.dark .statistics-section {
	background-color: #0f172a;
}

.stat-card {
	background: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
	border-radius: 16px;
	padding: 32px 24px;
	text-align: center;
	position: relative;
	overflow: hidden;
	transition: all .2s linear;
	cursor: pointer;
	z-index: 1;
}

.dark .stat-card {
	background: var(--glass-bg-dark);
	border-color: rgba(30, 41, 59, 0.6);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.stat-card:hover {
	transform: translateY(-8px);
	border-color: rgba(99, 102, 241, 0.5);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.2);
	margin-top: -4px;
}

.dark .stat-card:hover {
	border-color: rgba(99, 102, 241, 0.7);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.3);
}

.stat-icon-wrapper {
	position: relative;
	width: 64px;
	height: 64px;
	margin: 0 auto 24px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.stat-icon-bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(124, 58, 237, 0.2));
	border-radius: 14px;
	z-index: -1;
	transition: all 0.5s ease;
}

.dark .stat-icon-bg {
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(124, 58, 237, 0.3));
}

.stat-card:hover .stat-icon-bg {
	transform: scale(1.2);
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(124, 58, 237, 0.5));
	box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}

.dark .stat-card:hover .stat-icon-bg {
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(124, 58, 237, 0.6));
}

.stat-icon {
	position: relative;
	z-index: 1;
	color: #4f46e5;
	transition: all 0.3s ease;
}

.dark .stat-icon {
	color: #818cf8;
}

.stat-card:hover .stat-icon {
	color: #6366f1;
	transform: scale(1.15);
}

.dark .stat-card:hover .stat-icon {
	color: #a5b4fc;
}

.stat-content {
	position: relative;
	z-index: 1;
}

/* Аналогично FeatureCard, используем разные акцентные границы при наведении */
.feature-card-1:hover {
	border-top: 4px solid #4f46e5;
}

.feature-card-2:hover {
	border-top: 4px solid #6366f1;
}

.feature-card-3:hover {
	border-top: 4px solid #7c3aed;
}
</style>