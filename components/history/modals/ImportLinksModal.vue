<template>
    <base-modal
        title="Import Links"
        :is-open="true"
        @close="$emit('close')">
        <div class="p-6">
            <div class="mb-4">
                <p class="text-slate-700 dark:text-slate-300 mb-2">
                    Import links from CSV or JSON file. The file should contain the following fields:
                </p>
                <ul class="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 mb-4">
                    <li>originalUrl (required) - The original URL</li>
                    <li>title (optional) - Link title</li>
                    <li>customSlug (optional) - Custom short URL path</li>
                    <li>tags (optional) - Tags separated by semicolons</li>
                </ul>
            </div>

            <div class="mb-6">
                <div class="flex justify-center items-center">
                    <label
                        class="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                        :class="{ 'border-indigo-500 dark:border-indigo-400': isDragging }"
                        @dragover.prevent="isDragging = true"
                        @dragleave.prevent="isDragging = false"
                        @drop.prevent="handleFileDrop">
                        <div v-if="!selectedFile">
                            <svg class="mx-auto h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p class="mt-2 text-slate-700 dark:text-slate-300 font-medium">
                                Drag file here or <span class="text-indigo-600 dark:text-indigo-400">choose file</span>
                            </p>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Supported formats: CSV and JSON
                            </p>
                        </div>
                        <div v-else class="text-center">
                            <svg class="mx-auto h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="mt-2 text-slate-700 dark:text-slate-300 font-medium">
                                {{ selectedFile.name }}
                            </p>
                            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {{ formatFileSize(selectedFile.size) }}
                            </p>
                            <button
                                @click.prevent="selectedFile = null"
                                class="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                                Choose another file
                            </button>
                        </div>
                        <input
                            type="file"
                            class="hidden"
                            accept=".csv,.json"
                            @change="handleFileSelect"
                            ref="fileInput" />
                    </label>
                </div>
            </div>

            <div class="flex justify-end space-x-3">
                <button
                    @click="$emit('close')"
                    class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
                    Cancel
                </button>
                <button
                    @click="importLinks"
                    :disabled="!selectedFile || isProcessing"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                    <svg v-if="isProcessing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    {{ isProcessing ? 'Importing...' : 'Import' }}
                </button>
            </div>
        </div>
    </base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '~/stores/toast';
import BaseModal from '~/components/common/BaseModal.vue';
import type { LinkData } from '~/types/link';

const emit = defineEmits(['close', 'import']);
const toastStore = useToastStore();

const isDragging = ref(false);
const selectedFile = ref<File | null>(null);
const isProcessing = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Process file selection via dialog
const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
};

// Process file drop
const handleFileDrop = (event: DragEvent) => {
    isDragging.value = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];

        if (file.type === 'application/json' || file.type === 'text/csv' || file.name.endsWith('.json') || file.name.endsWith('.csv')) {
            selectedFile.value = file;
        } else {
            toastStore.error('Only CSV and JSON files are supported');
        }
    }
};

// Format file size for display
const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
        return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
    } else {
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
};

// Import links function
const importLinks = async () => {
    if (!selectedFile.value) return;

    isProcessing.value = true;

    try {
        const fileContent = await readFileContent(selectedFile.value);
        let links: LinkData[] = [];

        if (selectedFile.value.name.endsWith('.json')) {
            links = JSON.parse(fileContent);
        } else if (selectedFile.value.name.endsWith('.csv')) {
            links = parseCSV(fileContent);
        }

        // Validate links
        const validLinks = links.filter(link => {
            return link.originalUrl && typeof link.originalUrl === 'string';
        });

        if (validLinks.length === 0) {
            toastStore.error('No valid links found to import');
            isProcessing.value = false;
            return;
        }

        // Limit on number of imported links for free users
        // (will be implemented on backend)

        emit('import', validLinks);
    } catch (error) {
        console.error('Error importing links:', error);
        toastStore.error('An error occurred while importing links');
        isProcessing.value = false;
    }
};

// Read file content
const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                resolve(event.target.result as string);
            } else {
                reject(new Error('Error reading file'));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

// Parse CSV file
const parseCSV = (csvContent: string): LinkData[] => {
    // Simple CSV parser (in a real app, a specialized library would be better)
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    const result: LinkData[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(',').map(value => value.trim());
        const link: any = {};

        headers.forEach((header, index) => {
            if (header === 'tags' && values[index]) {
                link[header] = values[index].split(';').map(tag => tag.trim());
            } else {
                link[header] = values[index];
            }
        });

        // Add required fields if missing
        if (link.originalUrl) {
            if (!link.id) link.id = `imported_${Date.now()}_${i}`;
            if (!link.shortUrl) link.shortUrl = '';
            if (!link.clicks) link.clicks = 0;
            if (link.isActive === undefined) link.isActive = true;
            if (!link.createdAt) link.createdAt = new Date().toISOString();

            result.push(link as LinkData);
        }
    }

    return result;
};
</script>