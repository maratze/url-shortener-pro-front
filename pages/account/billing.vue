<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Current Plan -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Current Plan</h2>
                    <span v-if="isPremium"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Active
                    </span>
                </div>

                <div class="p-4 rounded-lg"
                    :class="isPremium ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-lg font-medium"
                                :class="isPremium ? 'text-green-800 dark:text-green-400' : 'text-amber-800 dark:text-amber-400'">
                                {{ isPremium ? 'PRO Plan' : 'Free Plan' }}
                            </h3>
                            <p class="mt-1 text-sm"
                                :class="isPremium ? 'text-green-600 dark:text-green-300' : 'text-amber-600 dark:text-amber-300'">
                                {{ isPremium ? '$9.99/month' : 'Free forever' }}
                            </p>
                        </div>
                        <NuxtLink v-if="!isPremium" to="/pricing"
                            class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[140px] h-10">
                            Upgrade to PRO
                        </NuxtLink>
                    </div>
                </div>

                <div v-if="isPremium" class="mt-4">
                    <div class="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                        <span>Next billing date</span>
                        <span>{{ nextBillingDate }}</span>
                    </div>
                    <button @click="cancelSubscription"
                        class="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 inline-flex items-center justify-center min-w-[150px] h-8"
                        :disabled="isCancelling">
                        <svg v-if="isCancelling" class="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600 dark:text-red-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isCancelling ? 'Cancelling...' : 'Cancel subscription' }}</span>
                    </button>
                </div>
            </section>

            <!-- Payment Method -->
            <section v-if="isPremium"
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4 min-h-[36px] flex items-center">
                    Payment Method</h2>
                <div v-if="paymentMethod"
                    class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8" :class="getCardIcon(paymentMethod.brand)" viewBox="0 0 24 24"
                                fill="currentColor">
                                <!-- Card icon path based on brand -->
                                <path v-if="paymentMethod.brand === 'visa'"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-slate-900 dark:text-white">
                                •••• •••• •••• {{ paymentMethod.last4 }}
                            </p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">
                                Expires {{ paymentMethod.expMonth }}/{{ paymentMethod.expYear }}
                            </p>
                        </div>
                    </div>
                    <button @click="updatePaymentMethod"
                        class="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center justify-center min-w-[80px] h-8"
                        :disabled="isUpdatingPayment">
                        <svg v-if="isUpdatingPayment"
                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isUpdatingPayment ? 'Updating...' : 'Update' }}</span>
                    </button>
                </div>

                <button v-else @click="addPaymentMethod"
                    class="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[160px] h-10"
                    :disabled="isAddingPayment">
                    <svg v-if="isAddingPayment" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span>{{ isAddingPayment ? 'Adding...' : 'Add Payment Method' }}</span>
                </button>
            </section>

            <!-- Billing History -->
            <section v-if="isPremium"
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-4 min-h-[36px] flex items-center">
                    Billing History</h2>

                <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead>
                            <tr>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Date</th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Amount</th>
                                <th
                                    class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Invoice</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
                            <tr v-for="invoice in billingHistory" :key="invoice.id">
                                <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                    {{ formatDate(invoice.date) }}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                                    ${{ invoice.amount }}
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        :class="getStatusClasses(invoice.status)">
                                        {{ invoice.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 whitespace-nowrap text-right text-sm">
                                    <button @click="downloadInvoice(invoice.id)"
                                        class="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center justify-center min-w-[100px] h-8"
                                        :disabled="isDownloading && downloadingInvoiceId === invoice.id">
                                        <svg v-if="isDownloading && downloadingInvoiceId === invoice.id"
                                            class="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span>{{ isDownloading && downloadingInvoiceId === invoice.id ? 'Downloading...'
                                            : 'Download' }}</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthService } from '~/composables/useAuthService';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();
const { isPremium } = useAuthService();

// Состояния загрузки
const isCancelling = ref(false);
const isUpdatingPayment = ref(false);
const isAddingPayment = ref(false);
const isDownloading = ref(false);
const downloadingInvoiceId = ref<number | null>(null);

// Mock data
const nextBillingDate = computed(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toLocaleDateString();
});

const paymentMethod = ref({
    brand: 'visa',
    last4: '4242',
    expMonth: '12',
    expYear: '2024'
});

const billingHistory = ref([
    {
        id: 1,
        date: new Date('2024-03-01'),
        amount: '9.99',
        status: 'Paid'
    },
    {
        id: 2,
        date: new Date('2024-02-01'),
        amount: '9.99',
        status: 'Paid'
    }
]);

// Helper functions
const formatDate = (date: Date) => {
    return date.toLocaleDateString();
};

const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
        case 'paid':
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'failed':
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        default:
            return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400';
    }
};

const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
        case 'visa':
            return 'text-blue-600 dark:text-blue-400';
        case 'mastercard':
            return 'text-red-600 dark:text-red-400';
        case 'amex':
            return 'text-indigo-600 dark:text-indigo-400';
        default:
            return 'text-slate-600 dark:text-slate-400';
    }
};

// Actions
const cancelSubscription = async () => {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
        try {
            isCancelling.value = true;
            // Здесь будет API запрос для отмены подписки
            await new Promise(resolve => setTimeout(resolve, 500));
            toastStore.success('Subscription cancelled successfully');
        } catch (error) {
            toastStore.error('Failed to cancel subscription');
        } finally {
            isCancelling.value = false;
        }
    }
};

const updatePaymentMethod = async () => {
    try {
        isUpdatingPayment.value = true;
        // Здесь будет API запрос для обновления способа оплаты
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Payment method updated successfully');
    } catch (error) {
        toastStore.error('Failed to update payment method');
    } finally {
        isUpdatingPayment.value = false;
    }
};

const addPaymentMethod = async () => {
    try {
        isAddingPayment.value = true;
        // Здесь будет API запрос для добавления способа оплаты
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Payment method added successfully');
    } catch (error) {
        toastStore.error('Failed to add payment method');
    } finally {
        isAddingPayment.value = false;
    }
};

const downloadInvoice = async (invoiceId: number) => {
    try {
        isDownloading.value = true;
        downloadingInvoiceId.value = invoiceId;
        // Здесь будет API запрос для скачивания счета
        await new Promise(resolve => setTimeout(resolve, 500));
        toastStore.success('Invoice downloaded successfully');
    } catch (error) {
        toastStore.error('Failed to download invoice');
    } finally {
        isDownloading.value = false;
        downloadingInvoiceId.value = null;
    }
};
</script>