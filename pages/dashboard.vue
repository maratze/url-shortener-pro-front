<template>
    <div class="py-8">
        <!-- Hero секция с приветствием и действиями -->
        <div
            class="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-xl p-6 md:p-8 mb-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 opacity-10">
                <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M137.129 32.8284C144.259 25.6985 156.066 25.6985 163.196 32.8284V32.8284C170.326 39.9582 170.326 51.7652 163.196 58.895L103.47 118.621C96.3401 125.751 84.5331 125.751 77.4033 118.621V118.621C70.2734 111.491 70.2734 99.6844 77.4033 92.5546L137.129 32.8284Z"
                        fill="currentColor" />
                    <path
                        d="M95.7531 74.9043C102.883 67.7744 114.69 67.7744 121.82 74.9043V74.9043C128.95 82.0341 128.95 93.8411 121.82 100.971L77.4033 145.388C70.2734 152.518 58.4665 152.518 51.3366 145.388V145.388C44.2068 138.258 44.2068 126.451 51.3366 119.321L95.7531 74.9043Z"
                        fill="currentColor" />
                </svg>
            </div>

            <div class="relative flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Hello, {{
                        userFullName }}!</h1>
                    <p class="text-slate-700 dark:text-slate-300 max-w-2xl">
                        Welcome to TinyLink Dashboard. Here you can quickly create short links,
                        manage existing ones, and view analytics.
                    </p>
                </div>
                <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <NuxtLink to="/qr-codes"
                        class="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create QR Code
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Основной контент -->
        <div class="mb-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Activity Overview</h2>
                <div class="relative">
                    <select
                        class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-800 dark:text-white appearance-none pr-8">
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg class="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Карточки с ключевыми метриками -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Всего ссылок -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">Total Links</h3>
                                    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">12</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-500 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 15l7-7 7 7" />
                                </svg>
                                +3
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 px-5 py-2 text-xs text-slate-500 dark:text-slate-400">
                    In the last 7 days
                </div>
            </div>

            <!-- Ссылки с QR-кодами -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">Links with
                                        QR Codes</h3>
                                    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">4</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span class="text-green-500 text-sm font-medium flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 15l7-7 7 7" />
                                </svg>
                                +2
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 px-5 py-2 text-xs text-slate-500 dark:text-slate-400">
                    In the last 7 days
                </div>
            </div>

            <!-- Активные ссылки -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="p-5">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">Active Links
                                    </h3>
                                    <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">10</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span class="text-slate-800 dark:text-slate-200 text-sm font-medium">92%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 px-5 py-2 text-xs text-slate-500 dark:text-slate-400">
                    Of total links
                </div>
            </div>

            <!-- Активный тариф -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="p-5">
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-slate-500 dark:text-slate-400">Your Plan</h3>
                                    <p class="text-xl font-bold text-slate-900 dark:text-white mt-1">Free</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 px-5 py-2 flex justify-between items-center">
                    <span class="text-xs text-slate-500 dark:text-slate-400">
                        <span class="text-emerald-500 dark:text-emerald-400">100 links</span> available per month
                    </span>
                    <NuxtLink to="/account/billing"
                        class="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center">
                        Upgrade
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Быстрые действия -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <!-- Карточка быстрого создания ссылки -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="flex items-start mb-4">
                    <div
                        class="flex-shrink-0 h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <div class="flex-grow w-full">
                        <h3 class="text-md font-semibold text-slate-900 dark:text-white mb-1">Quick Shortening</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">Quickly create a random short link
                        </p>

                        <div class="flex">
                            <input type="url" placeholder="Paste your long URL"
                                class="flex-grow rounded-l-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                            <button
                                class="px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-r-lg whitespace-nowrap">
                                Shorten
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Карточка аналитики -->
            <div
                class="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="flex items-start">
                    <div
                        class="flex-shrink-0 h-10 w-10 bg-amber-500 rounded-full flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div class="flex-grow">
                        <h3 class="text-md font-semibold text-slate-900 dark:text-white mb-1">Click Analytics</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Get detailed information about clicks
                            on your links</p>

                        <div class="flex space-x-3">
                            <NuxtLink to="/analytics"
                                class="flex-grow text-center px-4 py-2 border border-amber-400 dark:border-amber-700 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all text-sm font-medium">
                                Analytics
                            </NuxtLink>
                            <NuxtLink to="/qr-codes"
                                class="px-4 py-2 border border-amber-400 dark:border-amber-700 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all text-sm font-medium">
                                QR Codes
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Создание новой ссылки -->
        <div
            class="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-medium text-slate-900 dark:text-white">Create New Short Link</h2>
                <button id="toggle-advanced"
                    class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    Advanced Settings
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <div class="flex items-center mb-2">
                        <label for="long-url"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-300">Long URL</label>
                        <span class="ml-1 text-xs text-red-500">*</span>
                    </div>
                    <input type="url" id="long-url" placeholder="https://example.com/your-long-url"
                        class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div class="flex items-center mb-2">
                            <label for="custom-slug"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Custom
                                Slug</label>
                            <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">(optional)</span>
                        </div>
                        <div class="flex rounded-lg overflow-hidden">
                            <span
                                class="inline-flex items-center px-3 bg-slate-100 dark:bg-slate-600 border border-r-0 border-slate-300 dark:border-slate-600 rounded-l-lg text-slate-500 dark:text-slate-400 text-sm">
                                tinylink.io/
                            </span>
                            <input type="text" id="custom-slug" placeholder="your-slug"
                                class="w-full rounded-r-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center mb-2">
                            <label for="expiration"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300">Expiration
                                Date</label>
                            <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">(optional)</span>
                        </div>
                        <select id="expiration"
                            class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                            <option value="never">Never expires</option>
                            <option value="1d">1 day</option>
                            <option value="7d">7 days</option>
                            <option value="30d">30 days</option>
                            <option value="90d">90 days</option>
                            <option value="custom">Custom date</option>
                        </select>
                    </div>
                </div>

                <div id="advanced-options" class="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div class="flex items-center mb-2">
                                <label for="password"
                                    class="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">(optional)</span>
                            </div>
                            <input type="password" id="password" placeholder="Set a password for link protection"
                                class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                        </div>

                        <div>
                            <div class="flex items-center mb-2">
                                <label for="custom-domain"
                                    class="block text-sm font-medium text-slate-700 dark:text-slate-300">Custom
                                    Domain</label>
                                <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">(Pro plan)</span>
                            </div>
                            <select id="custom-domain"
                                class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2.5 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                                <option value="default">tinylink.io (default)</option>
                                <option value="custom" disabled>Add your custom domain (Pro plan)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center mb-2">
                            <label for="utm-builder"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300">UTM-tag</label>
                            <span class="ml-1 text-xs text-slate-500 dark:text-slate-400">(optional)</span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <input type="text" placeholder="utm_source"
                                    class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm" />
                            </div>
                            <div>
                                <input type="text" placeholder="utm_medium"
                                    class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm" />
                            </div>
                            <div>
                                <input type="text" placeholder="utm_campaign"
                                    class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center mb-2">
                            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Additional
                                Options</label>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center">
                                <input type="checkbox" id="track-clicks"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded">
                                <label for="track-clicks"
                                    class="ml-2 block text-sm text-slate-700 dark:text-slate-300">Track
                                    Clicks</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="generate-qr"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded">
                                <label for="generate-qr"
                                    class="ml-2 block text-sm text-slate-700 dark:text-slate-300">Create QR Code</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="social-preview"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded">
                                <label for="social-preview"
                                    class="ml-2 block text-sm text-slate-700 dark:text-slate-300">Set social media
                                    preview</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button
                        class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Shorten URL
                    </button>
                </div>
            </div>
        </div>

        <!-- Недавние ссылки -->
        <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden mb-4">
            <div class="p-5 border-b border-slate-200 dark:border-slate-700">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 class="text-lg font-medium text-slate-900 dark:text-white">Recent Links</h2>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div class="relative w-full sm:w-auto">
                            <input type="text" placeholder="Search links..."
                                class="w-full sm:w-48 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <NuxtLink to="/analytics"
                            class="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center whitespace-nowrap">
                            Detailed Analytics
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div class="border-b border-slate-200 dark:border-slate-700">
                <div class="flex flex-wrap p-4 gap-2">
                    <button
                        class="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                        All Links
                    </button>
                    <button
                        class="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        Last 7 Days
                    </button>
                    <button
                        class="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        With QR Code
                    </button>
                    <button
                        class="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                        Popular
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead class="bg-slate-50 dark:bg-slate-800/60">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Short URL</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Original URL</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Clicks</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Created</th>
                            <th scope="col"
                                class="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        <tr v-for="i in 5" :key="i"
                            class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <a href="#"
                                        class="text-indigo-600 dark:text-indigo-400 hover:underline">tinylink.io/xYz{{ i
                                        }}Ab</a>
                                    <button class="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                        title="Copy">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <div class="max-w-xs truncate text-slate-500 dark:text-slate-400">
                                        https://example.com/very-long-url-that-needs-to-be-shortened-for-sharing-on-social-media-{{
                                            i }}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-slate-900 dark:text-white font-medium">{{ i * 23 }}</div>
                                    <div class="ml-2 text-xs flex items-center space-x-1">
                                        <span class="text-green-500 flex items-center" v-if="i === 1 || i === 3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                            </svg>
                                            <span class="ml-0.5">{{ i * 3 }}</span>
                                        </span>
                                        <span class="text-red-500 flex items-center" v-else>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                            <span class="ml-0.5">{{ i * 2 }}</span>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                {{ new Date(Date.now() - i * 86400000).toLocaleDateString() }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                                <div class="flex space-x-2 justify-end">
                                    <button
                                        class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                        title="Copy">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        title="Statistics">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    <button
                                        class="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                                        title="Edit">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
                    </tbody>
                </table>
            </div>
            <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                        Showing 5 of 12 links
                    </p>
                    <div class="flex space-x-2">
                        <button
                            class="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 text-sm">
                            Previous
                        </button>
                        <button
                            class="px-3 py-1 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 text-sm">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Секция советов и рекомендаций -->
        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">Usage Tips</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Use UTM parameters to track campaign
                            effectiveness in Google Analytics.</p>
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
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">How to Improve CTR</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Use descriptive and informative links to
                            increase click-through rates.</p>
                    </div>
                </div>
                <NuxtLink to="#"
                    class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center">
                    Read More
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
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-md font-bold text-slate-900 dark:text-white mb-2">Advanced Features</h3>
                        <p class="text-sm text-slate-600 dark:text-slate-400">Use password protection and other security
                            settings when needed.</p>
                    </div>
                </div>
                <NuxtLink to="#"
                    class="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center">
                    Explore Features
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
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    middleware: ['auth'],
    layout: 'dashboard'
});

const authStore = useAuthStore();
const userFullName = computed(() => {
    if (!authStore.user) return 'Пользователь';

    // Проверяем наличие фамилии и имени
    if (authStore.user.lastName && authStore.user.firstName) {
        return `${authStore.user.lastName} ${authStore.user.firstName}`;
    }

    // Используем имя, если есть
    if (authStore.user.firstName) {
        return authStore.user.firstName;
    }

    // В крайнем случае используем email
    return authStore.user.email?.split('@')[0] || 'Пользователь';
});

// Управление отображением расширенных настроек
const showAdvancedOptions = ref(false);

onMounted(() => {
    // Инициализация скрытия расширенных настроек
    const advancedOptions = document.getElementById('advanced-options');
    if (advancedOptions) {
        advancedOptions.style.display = 'none';
    }

    // Обработчик клика по кнопке расширенных настроек
    const toggleAdvanced = document.getElementById('toggle-advanced');
    if (toggleAdvanced) {
        toggleAdvanced.addEventListener('click', () => {
            showAdvancedOptions.value = !showAdvancedOptions.value;
            if (advancedOptions) {
                advancedOptions.style.display = showAdvancedOptions.value ? 'block' : 'none';
            }
        });
    }
});

useHead({
    title: 'Dashboard - TinyLink',
    meta: [
        {
            name: 'description',
            content: 'Manage your TinyLink short links, track their effectiveness, and create new ones.'
        }
    ]
});
</script>