<template>
    <div class="py-8">
        <!-- Заголовок страницы -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">QR Codes</h1>
            <p class="text-slate-600 dark:text-slate-400">
                Create and manage QR codes for your links. QR codes can be customized
                for different purposes and easily integrated into your marketing materials.
            </p>
        </div>

        <!-- Основные действия -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <!-- Карточка создания QR-кода -->
            <div
                class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Create New QR Code</h2>
                <div class="space-y-4">
                    <div>
                        <div class="flex items-center mb-2">
                            <label for="qr-url" class="block text-sm font-medium text-slate-700 dark:text-slate-300">URL
                                to encode</label>
                            <span class="ml-1 text-xs text-red-500">*</span>
                        </div>
                        <div class="flex space-x-2 w-full">
                            <div class="flex-grow">
                                <input type="url" id="qr-url" placeholder="https://example.com"
                                    class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                            </div>
                            <button
                                class="flex-shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                                Create QR Code
                            </button>
                        </div>
                        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Or select one of your shortened links
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div>
                            <label for="qr-style"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">QR Code
                                Style</label>
                            <select id="qr-style"
                                class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                                <option value="standard">Standard</option>
                                <option value="rounded">Rounded Corners</option>
                                <option value="dots">Dots</option>
                                <option value="circular">Circular</option>
                            </select>
                        </div>

                        <div>
                            <label for="qr-color"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Color</label>
                            <div class="flex space-x-2">
                                <input type="color" id="qr-color" value="#000000" class="h-10 w-10 rounded border-0" />
                                <select id="qr-preset-color"
                                    class="flex-grow rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                                    <option value="#000000">Black (Default)</option>
                                    <option value="#4f46e5">Indigo</option>
                                    <option value="#0284c7">Blue</option>
                                    <option value="#059669">Green</option>
                                    <option value="#d97706">Orange</option>
                                    <option value="#dc2626">Red</option>
                                    <option value="#7e22ce">Purple</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label for="qr-logo"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Add Logo
                                (Pro)</label>
                            <div class="flex items-center">
                                <input type="file" id="qr-logo" class="hidden"
                                    accept="image/png, image/jpeg, image/svg+xml" disabled />
                                <label for="qr-logo"
                                    class="cursor-not-allowed flex items-center justify-center w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    Upload Logo
                                </label>
                                <span class="ml-3 text-xs text-amber-600 dark:text-amber-400">Available in Pro
                                    Plan</span>
                            </div>
                        </div>

                        <div>
                            <label for="qr-error-correction"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Error
                                Correction Level</label>
                            <select id="qr-error-correction"
                                class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                                <option value="L">Low (7%)</option>
                                <option value="M" selected>Medium (15%)</option>
                                <option value="Q">High (25%)</option>
                                <option value="H">Very High (30%)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Предпросмотр QR-кода -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-4">Preview</h2>
                <div
                    class="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                    <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-24 w-24 mx-auto text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <p class="mt-4 text-slate-500 dark:text-slate-400 text-sm">
                            Enter URL and click "Create QR Code" to see the result
                        </p>
                    </div>
                </div>
                <div class="mt-4 flex flex-col space-y-2">
                    <button disabled
                        class="w-full px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-medium rounded-lg cursor-not-allowed">
                        Download QR Code
                    </button>
                    <div class="flex space-x-2">
                        <button disabled
                            class="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-medium rounded-lg cursor-not-allowed text-sm">
                            PNG
                        </button>
                        <button disabled
                            class="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-medium rounded-lg cursor-not-allowed text-sm">
                            SVG
                        </button>
                        <button disabled
                            class="flex-1 px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-medium rounded-lg cursor-not-allowed text-sm">
                            PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- История QR-кодов -->
        <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div class="p-5 border-b border-slate-200 dark:border-slate-700">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 class="text-lg font-medium text-slate-900 dark:text-white">Your QR Codes</h2>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div class="relative w-full sm:w-auto">
                            <input type="text" placeholder="Search QR codes..."
                                class="w-full sm:w-48 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead class="bg-slate-50 dark:bg-slate-800/60">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                QR Code
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                URL
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Created
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Scans
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="i in 3" :key="i"
                            class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="h-12 w-12 flex-shrink-0 border border-slate-200 dark:border-slate-700 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="h-10 w-10 m-0.5 text-slate-900 dark:text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="max-w-xs truncate text-slate-900 dark:text-white">
                                        https://tinylink.io/xYz{{ i }}Ab
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                {{ new Date(Date.now() - i * 86400000).toLocaleDateString() }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-slate-900 dark:text-white font-medium">{{ i * 12 }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                                <div class="flex space-x-2 justify-end">
                                    <button
                                        class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                        title="Download">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                                        title="Share">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                        title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <!-- Пустое состояние, если нет QR-кодов -->
                        <tr v-if="false" class="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <td colspan="5" class="px-6 py-10 text-center">
                                <div class="flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    <p class="text-slate-500 dark:text-slate-400 mb-2">You don't have any QR codes yet
                                    </p>
                                    <button
                                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                                        Create First QR Code
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                        Showing 3 of 3 QR codes
                    </p>
                    <div class="flex space-x-2">
                        <button
                            class="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600 text-sm cursor-not-allowed">
                            Previous
                        </button>
                        <button
                            class="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600 text-sm cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Советы по использованию QR-кодов -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div class="mb-4 flex items-start">
                    <div
                        class="flex-shrink-0 h-9 w-9 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">What are QR Codes?</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">A QR Code (Quick Response code) is a
                            two-dimensional barcode that can be scanned with a smartphone camera for quick access to a
                            URL or information.</p>
                    </div>
                </div>
                <NuxtLink to="#"
                    class="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>
            </div>

            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div class="mb-4 flex items-start">
                    <div
                        class="flex-shrink-0 h-9 w-9 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">Where to Use QR Codes?</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">QR codes can be used on business cards,
                            marketing materials, product packaging, posters, restaurant menus, and many other places.
                        </p>
                    </div>
                </div>
                <NuxtLink to="#"
                    class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
                    See Examples
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>
            </div>

            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div class="mb-4 flex items-start">
                    <div
                        class="flex-shrink-0 h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">Secure QR Codes</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">All QR codes created on our platform
                            undergo security checks. You can also add an expiration date and password to your QR codes.
                        </p>
                    </div>
                </div>
                <NuxtLink to="#"
                    class="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center">
                    Learn About Security
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard'
});

useHead({
    title: 'QR Codes - TinyLink',
    meta: [
        {
            name: 'description',
            content: 'Create and manage QR codes for your TinyLink shortened URLs. Customize appearance, add logos, and track scanning statistics.'
        }
    ]
});
</script>