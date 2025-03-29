<template>
    <!-- No changes to template section -->
</template>

<script>
import { computed } from 'vue';

const userInitials = computed(() => {
    if (!user.value) return '?';

    const firstName = user.value.firstName || '';
    const lastName = user.value.lastName || '';

    if (firstName && lastName) {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    } else if (firstName) {
        return firstName.charAt(0);
    } else if (user.value.email) {
        return user.value.email.charAt(0).toUpperCase();
    } else {
        return '?';
    }
});

const userEmail = computed(() => {
    return user.value?.email || 'Не авторизован';
});

const userFullName = computed(() => {
    if (!user.value) return 'Гость';

    const firstName = user.value.firstName || '';
    const lastName = user.value.lastName || '';

    if (firstName || lastName) {
        return `${firstName} ${lastName}`.trim();
    } else {
        return user.value.email || 'Гость';
    }
});
</script>

<style>
/* No changes to style section */
</style>