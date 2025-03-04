<template>
	<span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';

const props = defineProps({
	to: {
		type: Number,
		required: true
	},
	from: {
		type: Number,
		default: 0
	},
	duration: {
		type: Number,
		default: 2
	},
	decimals: {
		type: Number,
		default: 0
	},
	autoStart: {
		type: Boolean,
		default: true
	},
	delay: {
		type: Number,
		default: 0
	}
});

const displayValue = ref(props.from);
let animationFrame: number;
let startTime: number;

const formatValue = (value: number): string | number => {
	return props.decimals > 0
		? value.toFixed(props.decimals)
		: Math.floor(value);
};

const startAnimation = () => {
	const startValue = props.from;
	const endValue = props.to;
	const changeValue = endValue - startValue;

	startTime = Date.now();

	const animate = () => {
		const currentTime = Date.now();
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / (props.duration * 1000), 1);

		// Easing function for smooth animation (easeOutQuad)
		const easedProgress = 1 - (1 - progress) * (1 - progress);

		const currentValue = startValue + changeValue * easedProgress;
		displayValue.value = parseInt(formatValue(currentValue).toString());

		if (progress < 1) {
			animationFrame = requestAnimationFrame(animate);
		} else {
			displayValue.value = parseInt(formatValue(endValue).toString());
		}
	};

	animationFrame = requestAnimationFrame(animate);
};

const startCounter = () => {
	if (props.delay > 0) {
		setTimeout(startAnimation, props.delay * 1000);
	} else {
		startAnimation();
	}
};

onMounted(() => {
	if (props.autoStart) {
		startCounter();
	}
});

// Handle changes to the target value
watch(() => props.to, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		cancelAnimationFrame(animationFrame);
		displayValue.value = parseInt(formatValue(props.from).toString());
		startCounter();
	}
});

// Clean up on component unmount
onUnmounted(() => {
	cancelAnimationFrame(animationFrame);
});

// Expose start method for manual control
defineExpose({
	start: startCounter
});
</script>