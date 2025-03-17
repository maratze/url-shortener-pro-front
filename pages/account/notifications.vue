<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Email Notifications -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Email Notifications</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-slate-900 dark:text-white">Security Alerts</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Get notified about important security
                                events
                            </p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="notifications.security" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600">
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-slate-900 dark:text-white">Link Performance</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">Weekly summary of your links'
                                performance</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="notifications.performance" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600">
                            </div>
                        </label>
                    </div>

                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-slate-900 dark:text-white">Marketing Updates</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">News about product features and
                                updates</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="notifications.marketing" class="sr-only peer">
                            <div
                                class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600">
                            </div>
                        </label>
                    </div>
                </div>
            </section>

            <!-- Push Notifications -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Push Notifications</h2>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Receive notifications directly in your browser
                        </p>
                    </div>
                    <button @click="togglePushNotifications"
                        class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white h-10 min-w-[100px]"
                        :class="pushEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'"
                        :disabled="isToggling">
                        <svg v-if="isToggling" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isToggling
                            ? (pushEnabled ? 'Disabling...' : 'Enabling...')
                            : (pushEnabled ? 'Disable' : 'Enable') }}</span>
                    </button>
                </div>
                <div v-if="pushEnabled" class="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                        Push notifications are enabled for this browser. You'll receive real-time alerts about important
                        events.
                    </p>
                </div>
            </section>

            <!-- Notification Schedule -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quiet Hours</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Set a time period during which you won't receive notifications
                </p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Start Time
                        </label>
                        <input type="time" v-model="quietHours.start"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            End Time
                        </label>
                        <input type="time" v-model="quietHours.end"
                            class="block w-full h-11 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base">
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '~/stores/toast';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();

// Email notification preferences
const notifications = ref({
    security: true,
    performance: true,
    marketing: false
});

// Push notifications state
const pushEnabled = ref(false);
const isToggling = ref(false);

// Quiet hours settings
const quietHours = ref({
    start: '22:00',
    end: '08:00'
});

// Toggle push notifications
const togglePushNotifications = async () => {
    try {
        isToggling.value = true;
        if (!pushEnabled.value) {
            // Здесь будет запрос разрешения на push-уведомления
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        pushEnabled.value = !pushEnabled.value;
        toastStore.success(`Push notifications ${pushEnabled.value ? 'enabled' : 'disabled'}`);
    } catch (error) {
        toastStore.error('Failed to update push notification settings');
    } finally {
        isToggling.value = false;
    }
};

// Watch for changes in notification settings
watch(notifications, async (newValue) => {
    try {
        // Здесь будет API запрос для сохранения настроек
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Notification settings updated');
    } catch (error) {
        toastStore.error('Failed to save notification settings');
    }
}, { deep: true });

// Watch for changes in quiet hours
watch(quietHours, async (newValue) => {
    try {
        // Здесь будет API запрос для сохранения настроек
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Quiet hours updated');
    } catch (error) {
        toastStore.error('Failed to save quiet hours');
    }
}, { deep: true });
</script>