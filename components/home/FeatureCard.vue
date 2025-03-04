<template>
	<div
		class="feature-card"
		:data-aos="animation"
		:data-aos-duration="1000"
	>
		<div class="relative overflow-hidden h-full">
			<!-- Shine effect -->
			<div class="shine-effect"></div>

			<div class="feature-icon-wrapper">
				<!-- Lightning icon -->
				<svg v-if="icon === 'bolt'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
				</svg>

				<!-- Analytics chart icon -->
				<svg v-else-if="icon === 'chart'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M18 20V10M12 20V4M6 20v-6" />
				</svg>

				<!-- Pencil icon -->
				<svg v-else-if="icon === 'pencil'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
				</svg>

				<!-- Shield icon -->
				<svg v-else-if="icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				</svg>

				<!-- QR code icon -->
				<svg v-else-if="icon === 'qrcode'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<rect x="3" y="3" width="5" height="5" />
					<rect x="16" y="3" width="5" height="5" />
					<rect x="3" y="16" width="5" height="5" />
					<path d="M21 16h-3a2 2 0 0 0-2 2v3" />
					<path d="M21 21v.01" />
					<path d="M12 7v3a2 2 0 0 1-2 2H7" />
					<path d="M16 11h.01" />
					<path d="M12 16h.01" />
				</svg>

				<!-- Share icon -->
				<svg v-else-if="icon === 'share'" xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
					<polyline points="16 6 12 2 8 6" />
					<line x1="12" y1="2" x2="12" y2="15" />
				</svg>

				<!-- Default icon -->
				<svg v-else xmlns="http://www.w3.org/2000/svg" class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4" />
					<path d="M12 16h.01" />
				</svg>
			</div>

			<h3 class="text-xl font-bold mb-3 text-slate-800 dark:text-white">{{ title }}</h3>
			<p class="text-slate-600 dark:text-slate-400">{{ description }}</p>

			<!-- Decorative circle -->
			<div class="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-md"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
		default: 'default',
	},
	animation: {
		type: String,
		default: 'fade-up',
	},
});
</script>

<style scoped>
.feature-card {
	background: var(--glass-bg);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid var(--glass-border);
	box-shadow: var(--glass-shadow);
	border-radius: 24px;
	padding: 24px;
	position: relative;
	overflow: hidden;
	height: 100%;
	transition: all 0.3s ease;
}

.dark .feature-card {
	background: var(--glass-bg-dark);
	border-color: var(--glass-border-dark);
	box-shadow: var(--glass-shadow-dark);
}

.feature-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
	border-color: rgba(124, 58, 237, 0.3);
}

.dark .feature-card:hover {
	box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
	border-color: rgba(124, 58, 237, 0.6);
}

.feature-icon-wrapper {
	width: 64px;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2));
	border-radius: 16px;
	margin-bottom: 20px;
	color: #4f46e5;
	transition: all 0.3s ease;
}

.dark .feature-icon-wrapper {
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(124, 58, 237, 0.3));
	color: #818cf8;
}

.feature-card:hover .feature-icon-wrapper {
	background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(124, 58, 237, 0.8));
	color: white;
	transform: scale(1.05);
}

.feature-icon {
	width: 28px;
	height: 28px;
	transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
	transform: scale(1.1);
}

.shine-effect {
	position: absolute;
	width: 50%;
	height: 100%;
	background: linear-gradient(
		to right,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.3) 50%,
		rgba(255, 255, 255, 0) 100%
	);
	top: 0;
	left: -100%;
	transform: skewX(-25deg);
	animation: shine 6s ease-in-out infinite;
	pointer-events: none;
}

@keyframes shine {
	0% {
		left: -100%;
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		left: 100%;
		opacity: 0;
	}
}
</style>