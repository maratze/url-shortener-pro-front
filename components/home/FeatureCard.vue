<template>
	<div
		class="feature-card"
		:class="[animationClass]"
		:data-aos="animation"
		data-aos-duration="1000"
	>
		<div class="feature-icon-wrapper">
			<!-- Иконка с эффектом overlay при наведении -->
			<div class="feature-icon-bg"></div>
			<div class="feature-icon">
				<!-- Lightning bolt icon -->
				<svg v-if="icon === 'bolt'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>

				<!-- Chart icon -->
				<svg v-else-if="icon === 'chart'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>

				<!-- Pencil/Edit icon -->
				<svg v-else-if="icon === 'pencil'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
				</svg>

				<!-- Shield/Security icon -->
				<svg v-else-if="icon === 'shield'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
				</svg>

				<!-- QR code icon -->
				<svg v-else-if="icon === 'qrcode'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
				</svg>

				<!-- Share icon -->
				<svg v-else-if="icon === 'share'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
				</svg>
			</div>
		</div>

		<h3 class="feature-title">{{ title }}</h3>
		<p class="feature-description">{{ description }}</p>
	</div>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true,
		validator: (value: string) => ['bolt', 'chart', 'pencil', 'shield', 'qrcode', 'share'].includes(value)
	},
	animation: {
		type: String,
		default: 'fade-up'
	}
});

const animationClass = computed(() => {
	return `feature-card-${Math.floor(Math.random() * 3) + 1}`;
});
</script>

<style scoped>
.feature-card {
	background: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.6);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
	border-radius: 16px;
	padding: 32px 24px;
	position: relative;
	overflow: hidden;
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	cursor: pointer;
	z-index: 1;
}

.dark .feature-card {
	background: rgba(30, 41, 59, 0.85);
	border-color: rgba(30, 41, 59, 0.6);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
	transform: translateY(-8px);
	border-color: rgba(99, 102, 241, 0.5);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.2);
}

.dark .feature-card:hover {
	border-color: rgba(99, 102, 241, 0.7);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.3);
}

.feature-icon-wrapper {
	position: relative;
	width: 64px;
	height: 64px;
	margin-bottom: 24px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.feature-icon-bg {
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

.dark .feature-icon-bg {
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(124, 58, 237, 0.3));
}

.dark .feature-card:hover .feature-icon-bg {
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(124, 58, 237, 0.6));
}

.feature-icon {
	position: relative;
	z-index: 1;
	color: #4f46e5;
	transition: all 0.3s ease;
}

.dark .feature-icon {
	color: #818cf8;
}

.feature-card:hover .feature-icon {
	color: #6366f1;
	transform: scale(1.15);
}

.dark .feature-card:hover .feature-icon {
	color: #a5b4fc;
}

.feature-title {
	font-size: 1.25rem;
	font-weight: 600;
	color: #1e293b;
	margin-bottom: 12px;
	transition: all 0.3s ease;
}

.dark .feature-title {
	color: #f1f5f9;
}

.feature-card:hover .feature-title {
	color: #4f46e5;
}

.dark .feature-card:hover .feature-title {
	color: #818cf8;
}

.feature-description {
	color: #64748b;
	font-size: 1rem;
	line-height: 1.6;
	transition: all 0.3s ease;
}

.dark .feature-description {
	color: #cbd5e1;
}

/* Слегка разные карточки для визуального разнообразия */
.feature-card-1:hover {
	border-top: 4px solid #4f46e5;
}

.feature-card-2:hover {
	border-top: 4px solid #6366f1;
}

.feature-card-3:hover {
	border-top: 4px solid #7c3aed;
}

/* Анимации появления */
@keyframes fadeIn {
	from { opacity: 0; transform: translateY(20px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>