<template>
	<div class="min-h-screen flex flex-col">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
useHead({
	htmlAttrs: {
		lang: 'en'
	}
})
</script>