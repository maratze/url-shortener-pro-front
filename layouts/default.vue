<template>
	<div class="flex flex-col min-h-screen">
		<TheHeader/>
		<main class="flex-grow">
			<slot/>
		</main>
		<TheFooter/>
	</div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/common/TheHeader.vue';
import TheFooter from '~/components/common/TheFooter.vue';
</script>