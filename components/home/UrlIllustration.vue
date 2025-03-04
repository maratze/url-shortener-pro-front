<template>
	<div class="url-illustration">
		<svg width="100%" height="100%" viewBox="0 0 500 400" class="url-animation">
			<!-- Long URL box -->
			<g class="long-url-container">
				<rect
					x="50"
					y="80"
					width="350"
					height="50"
					rx="10"
					class="url-box long-url-bg"
				/>
				<text x="70" y="112" class="url-text">
					https://very-long-website-domain-name.com/with/lots/of/parameters?utm_source=email
				</text>
			</g>

			<!-- Arrow -->
			<g class="arrow-container">
				<line x1="225" y1="150" x2="225" y2="190" stroke="currentColor" stroke-width="4" class="arrow-line" />
				<polygon points="225,200 215,180 235,180" class="arrow-head" />
			</g>

			<!-- Short URL box -->
			<g class="short-url-container">
				<rect
					x="150"
					y="220"
					width="150"
					height="50"
					rx="10"
					class="url-box short-url-bg"
				/>
				<text x="170" y="252" class="url-text short-url-text">short.link/abc</text>
			</g>

			<!-- Sparkles -->
			<g class="sparkles">
				<path class="sparkle sparkle1" d="M120,240 L130,240 M125,235 L125,245" stroke="currentColor" stroke-width="3" />
				<path class="sparkle sparkle2" d="M320,240 L330,240 M325,235 L325,245" stroke="currentColor" stroke-width="3" />
				<path class="sparkle sparkle3" d="M225,300 L235,300 M230,295 L230,305" stroke="currentColor" stroke-width="3" />
			</g>

			<!-- CPU/Gear -->
			<g class="gear-container">
				<circle cx="400" cy="130" r="25" class="gear-bg" />
				<path
					d="M400,110 v-10 h-5 l-2,8 a15,15 0 0,0-4.3,2.5 l-7.6-2.5 l-3.5,3.5 l2.5,7.6 a15,15 0 0,0-2.5,4.3 l-8,2 v5 l8,2 a15,15 0 0,0,2.5,4.3 l-2.5,7.6 l3.5,3.5 l7.6-2.5 a15,15 0 0,0,4.3,2.5 l2,8 h5 l2-8 a15,15 0 0,0,4.3-2.5 l7.6,2.5 l3.5-3.5 l-2.5-7.6 a15,15 0 0,0,2.5-4.3 l8-2 v-5 l-8-2 a15,15 0 0,0-2.5-4.3 l2.5-7.6 l-3.5-3.5 l-7.6,2.5 a15,15 0 0,0-4.3-2.5 l-2-8 Z"
					class="gear-path"
				/>
				<circle cx="400" cy="130" r="10" class="gear-center" />
			</g>

			<!-- Cloud -->
			<g class="cloud-container">
				<path
					d="M80,100 a20,20 0 0,1 20,-20 a20,20 0 0,1 35,10 a15,15 0 0,1 25,15 h-80 a20,20 0 0,1 0,-5 Z"
					class="cloud-path"
				/>
			</g>
		</svg>
	</div>
</template>

<style scoped>
.url-illustration {
	width: 100%;
	height: 100%;
	overflow: hidden;
	color: #4f46e5;
}

.dark .url-illustration {
	color: #818cf8;
}

.url-box {
	fill: white;
	stroke: #e2e8f0;
	stroke-width: 1;
	filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));
	transition: all 0.5s ease;
}

.dark .url-box {
	fill: #1e293b;
	stroke: #334155;
}

.long-url-bg {
	animation: pulse 4s infinite alternate;
}

.short-url-bg {
	animation: pulse 4s infinite alternate-reverse;
}

.url-text {
	fill: #334155;
	font-family: monospace;
	font-size: 14px;
}

.dark .url-text {
	fill: #e2e8f0;
}

.arrow-line {
	stroke: currentColor;
}

.arrow-head {
	fill: currentColor;
}

.short-url-text {
	fill: currentColor;
	font-weight: bold;
}

.sparkle {
	stroke: currentColor;
	opacity: 0;
}

.sparkle1 {
	animation: sparkle 4s infinite 0s;
}

.sparkle2 {
	animation: sparkle 4s infinite 0.5s;
}

.sparkle3 {
	animation: sparkle 4s infinite 1s;
}

.gear-bg {
	fill: rgba(79, 70, 229, 0.1);
	transition: all 0.5s ease;
}

.dark .gear-bg {
	fill: rgba(129, 140, 248, 0.2);
}

.gear-path {
	fill: rgba(79, 70, 229, 0.2);
	stroke: currentColor;
	stroke-width: 1;
	animation: rotate 20s linear infinite;
	transform-origin: 400px 130px;
}

.dark .gear-path {
	fill: rgba(129, 140, 248, 0.3);
}

.gear-center {
	fill: white;
	stroke: currentColor;
	stroke-width: 1;
}

.dark .gear-center {
	fill: #1e293b;
}

.cloud-path {
	fill: white;
	stroke: #e2e8f0;
	stroke-width: 1;
	filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07));
	animation: float 6s ease-in-out infinite;
}

.dark .cloud-path {
	fill: #334155;
	stroke: #475569;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.03);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes sparkle {
	0%, 100% {
		opacity: 0;
		transform: scale(0.5);
	}
	50% {
		opacity: 1;
		transform: scale(1.2);
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes float {
	0%, 100% {
		transform: translateX(0);
	}
	50% {
		transform: translateX(20px);
	}
}
</style>