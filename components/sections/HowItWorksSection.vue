<template>
	<section class="how-it-works-section py-24 relative overflow-hidden">
		<div class="container mx-auto max-w-7xl relative px-6">
			<!-- Обновленный заголовок в соответствии с предыдущими блоками -->
			<div class="text-center max-w-3xl mx-auto mb-16">
				<h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-slate-800 dark:text-white">
					How It
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Works</span>
				</h2>
				<div class="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
				<p class="text-lg text-slate-600 dark:text-slate-300">
					Three simple steps to get your shortened URL
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
				<!-- Step 1 -->
				<div class="step-card feature-card-1" data-aos="fade-up" data-aos-delay="0">
					<div class="step-number">1</div>
					<h3 class="step-title">Paste Your URL</h3>
					<p class="step-description">
						Paste your long URL into the input field at the top of the page
					</p>
				</div>

				<!-- Step 2 -->
				<div class="step-card feature-card-2" data-aos="fade-up" data-aos-delay="100">
					<div class="step-number">2</div>
					<h3 class="step-title">Click Shorten</h3>
					<p class="step-description">
						Click the shorten button and wait for our system to generate your link
					</p>
				</div>

				<!-- Step 3 -->
				<div class="step-card feature-card-3" data-aos="fade-up" data-aos-delay="200">
					<div class="step-number">3</div>
					<h3 class="step-title">Copy & Share</h3>
					<p class="step-description">
						Copy your shortened URL and share it wherever you want
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.how-it-works-section {
	position: relative;
	box-shadow: var(--glass-shadow);
}

.step-card {
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
	border-radius: 16px;
	padding: 32px 24px;
	text-align: center;
	position: relative;
	overflow: hidden;
	transition: all .2s linear !important;
	cursor: pointer;
	z-index: 1;
}

.dark .step-card {
	border-color: rgba(30, 41, 59, 0.6);
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.step-card:hover {
	transform: translateY(-8px);
	border-color: rgba(99, 102, 241, 0.5);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.2);
	margin-top: -4px;
}

.dark .step-card:hover {
	border-color: rgba(99, 102, 241, 0.7);
	box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.3);
}

.step-number {
	width: 56px;
	height: 56px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(124, 58, 237, 0.8));
	color: white;
	font-size: 22px;
	font-weight: bold;
	border-radius: 50%;
	margin: 0 auto 20px;
	position: relative;
	transition: all .2s linear;
}

.step-card:hover .step-number {
	transform: scale(1.15);
	box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
	background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(124, 58, 237, 0.9));
}

.step-title {
	font-size: 1.25rem;
	font-weight: 600;
	color: #1e293b;
	margin-bottom: 12px;
	transition: all .2s linear;
}

.dark .step-title {
	color: #f1f5f9;
}

.step-card:hover .step-title {
	color: #4f46e5;
}

.dark .step-card:hover .step-title {
	color: #818cf8;
}

.step-description {
	color: #64748b;
	font-size: 1rem;
	line-height: 1.6;
}

.dark .step-description {
	color: #cbd5e1;
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