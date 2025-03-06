<template>
	<section class="cta-section py-24 relative">
		<div class="container mx-auto max-w-7xl px-6">
			<div class="glass-card-highlight overflow-hidden relative">
				<!-- Декоративные элементы фона -->
				<div class="absolute top-0 left-0 w-full h-full">
					<div class="absolute top-[10%] left-[10%] w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
					<div class="absolute bottom-[10%] right-[10%] w-40 h-40 bg-purple-400/20 rounded-full blur-xl"></div>
					<!-- Дополнительный декоративный элемент для усиления глубины -->
					<div class="absolute top-[60%] right-[20%] w-24 h-24 bg-indigo-400/20 rounded-full blur-xl"></div>
				</div>

				<div class="relative z-10 text-center py-16 px-6">
					<h2 class="text-3xl md:text-4xl font-extrabold mb-4 text-white">
						Ready to
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">simplify</span>
						your links?
					</h2>
					<p class="text-xl text-white/90 max-w-2xl mx-auto mb-10">
						Start shortening URLs for free and unlock the power of link management
					</p>
					<button class="btn-glow mx-auto">
						Get Started Free
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.cta-section {
	position: relative;
}

.glass-card-highlight {
	background: linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.9));
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
	border-radius: 24px;
	transition: all 0.3s ease;
}

.btn-glow {
	position: relative;
	background: white;
	color: #6366f1;
	font-weight: 600;
	padding: 12px 32px;
	border-radius: 9999px;
	border: none;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 0 15px rgba(255, 255, 255, 0.5),
	0 0 30px rgba(255, 255, 255, 0.3),
	0 0 45px rgba(255, 255, 255, 0.1);
	overflow: hidden;
	font-size: 1rem;
}

.btn-glow:hover {
	box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
	0 0 40px rgba(255, 255, 255, 0.4),
	0 0 60px rgba(255, 255, 255, 0.2);
	transform: translateY(-3px);
}

.btn-glow:active {
	transform: translateY(-1px);
}

.btn-glow:before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent 0%,
		rgba(255, 255, 255, 0.2) 50%,
		transparent 100%
	);
	transform: skewX(-25deg);
	animation: shine 3s infinite;
}

@keyframes shine {
	0% {
		left: -100%;
		opacity: 0;
	}
	20% {
		opacity: 0.5;
	}
	100% {
		left: 100%;
		opacity: 0;
	}
}
</style>