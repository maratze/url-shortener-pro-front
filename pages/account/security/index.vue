<template>
    <div class="w-full">
        <div class="space-y-4">
            <!-- Password Change -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Password Change</h2>
                </div>

                <!-- Information for Google users -->
                <div v-if="isGoogleUser && !hasPasswordSet"
                    class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>You signed in with Google. Set a password to be able to log in with email and password.</span>
                </div>

                <!-- Information for Google users who already set a password -->
                <div v-if="isGoogleUser && hasPasswordSet"
                    class="mb-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd" />
                    </svg>
                    <span>Password has been set. You can now log in with email and password, or continue using
                        Google.</span>
                </div>

                <form @submit.prevent="changePassword" class="space-y-4">
                    <!-- Two columns for more compact display of fields -->
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Current password (only for non-Google users or Google users with password set) -->
                        <div v-if="!isGoogleUser || (isGoogleUser && hasPasswordSet)" class="form-field">
                            <label for="currentPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Current Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="currentPassword" v-model="form.currentPassword"
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Enter current password"
                                    :required="!isGoogleUser || (isGoogleUser && hasPasswordSet)" />
                                <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showCurrentPassword" xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.currentPassword }}
                            </p>
                        </div>

                        <!-- New password -->
                        <div class="form-field">
                            <label for="newPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                New Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="newPassword" v-model="form.newPassword"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Enter new password" required />
                                <button type="button" @click="showNewPassword = !showNewPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.newPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.newPassword }}
                            </p>
                        </div>

                        <!-- Confirm new password -->
                        <div class="form-field">
                            <label for="confirmPassword"
                                class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Confirm Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400"
                                        fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input id="confirmPassword" v-model="form.confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    class="block w-full h-11 px-4 pl-10 pr-10 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-base"
                                    placeholder="Confirm password" required />
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none">
                                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                {{ errors.confirmPassword }}
                            </p>
                        </div>
                    </div>

                    <!-- Password strength indicator -->
                    <div v-if="form.newPassword" class="mt-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs font-medium" :class="passwordStrengthClass">
                                {{ passwordStrengthText }}
                            </span>
                            <span class="text-xs text-slate-500 dark:text-slate-400">
                                {{ passwordTipsText }}
                            </span>
                        </div>
                        <div class="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-300" :class="strengthColorClass(0)"
                                :style="{ width: passwordStrength > 0 ? '25%' : '5%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(1)"
                                :style="{ width: passwordStrength > 1 ? '50%' : '0%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(2)"
                                :style="{ width: passwordStrength > 2 ? '75%' : '0%' }"></div>
                            <div class="h-full rounded-full transition-all duration-300 -mt-1.5"
                                :class="strengthColorClass(3)"
                                :style="{ width: passwordStrength > 3 ? '100%' : '0%' }"></div>
                        </div>
                    </div>

                    <!-- Error message -->
                    <div v-if="errors.general"
                        class="py-3 px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>{{ errors.general }}</span>
                    </div>

                    <!-- Change password button -->
                    <div class="pt-2">
                        <button type="submit"
                            class="inline-flex justify-center items-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[120px] h-10"
                            :disabled="isLoading">
                            <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <template v-if="isLoading">Saving...</template>
                            <template v-else-if="isGoogleUser">Set Password</template>
                            <template v-else>Change Password</template>
                        </button>
                    </div>
                </form>
            </section>

            <!-- Two-Factor Authentication -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h2>
                        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <button @click="toggle2FA"
                        class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white h-10 min-w-[100px]"
                        :class="is2FAEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'"
                        :disabled="isToggling2FA">
                        <svg v-if="isToggling2FA" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <span>{{ isToggling2FA
                            ? (is2FAEnabled ? 'Disabling...' : 'Enabling...')
                            : (is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA') }}</span>
                    </button>
                </div>
                <div v-if="is2FAEnabled" class="mt-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                        Two-factor authentication is currently enabled. You'll need to enter a verification code from
                        your authenticator app when signing in.
                    </p>
                </div>
            </section>

            <!-- Active Sessions -->
            <section
                class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Active Sessions</h2>
                    <button v-if="activeSessions.length > 0" @click="confirmTerminateAllSessions"
                        class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="isTerminating || isLoadingSessions">
                        <span v-if="isTerminating" class="flex items-center">
                            <svg class="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Terminating...
                        </span>
                        <span v-else>Terminate All</span>
                    </button>
                </div>

                <!-- Session error message -->
                <div v-if="sessionError"
                    class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
                    <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clip-rule="evenodd" />
                        </svg>
                        <span>{{ sessionError }}</span>
                    </div>
                    <div class="mt-2 flex justify-end">
                        <button @click="loadSessions"
                            class="px-3 py-1 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-800 dark:text-red-200 rounded text-xs font-medium transition-colors">
                            Retry
                        </button>
                    </div>
                </div>

                <!-- Loading state -->
                <div v-if="isLoadingSessions" class="py-8 flex justify-center items-center">
                    <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="ml-3 text-sm text-slate-500 dark:text-slate-400">Loading sessions...</span>
                </div>

                <!-- No sessions state -->
                <div v-else-if="activeSessions.length === 0 && !isLoadingSessions" class="py-8 text-center">
                    <div class="flex justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300 dark:text-slate-600"
                            fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p class="text-slate-500 dark:text-slate-400 text-sm">No active sessions found</p>
                </div>

                <!-- Sessions list -->
                <div v-else class="mt-2 space-y-3">
                    <!-- Current session -->
                    <div v-for="session in activeSessions" :key="session.id" class="p-4 rounded-lg border relative"
                        :class="[
                            session.current
                                ? 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        ]">
                        <div class="flex items-start justify-between">
                            <div class="flex space-x-3">
                                <!-- Device icon -->
                                <div class="mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="h-7 w-7 text-slate-400 dark:text-slate-500"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path v-if="session.device.toLowerCase().includes('mobile')"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        <path v-else-if="session.device.toLowerCase().includes('tablet')"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <!-- Session info -->
                                <div>
                                    <div class="flex items-center">
                                        <h3 class="text-base font-medium text-slate-900 dark:text-white">{{
                                            session.device }}</h3>
                                        <span v-if="session.current"
                                            class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                            Current
                                        </span>
                                    </div>
                                    <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        <div class="flex flex-wrap gap-x-4">
                                            <span class="inline-flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4 mr-1 text-slate-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {{ session.location }}
                                            </span>
                                            <span class="inline-flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-4 w-4 mr-1 text-slate-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {{ session.lastActive }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Terminate button (not for current session) -->
                            <button v-if="!session.current" @click="terminateSession(session.id)"
                                class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors text-sm font-medium flex items-center"
                                :disabled="isTerminating && terminatingSessionId === session.id">
                                <span v-if="isTerminating && terminatingSessionId === session.id"
                                    class="flex items-center">
                                    <svg class="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4">
                                        </circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Terminating...
                                </span>
                                <span v-else>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Terminate
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- QR Code Modal -->
        <QrCodeModal v-model="showQrCodeModal" :url="qrCodeUrl" :manual-key="manualEntryKey" :is-setup="true"
            :close-on-backdrop="false" title="Setup 2FA settings" @verify="verifyAndEnableTwoFactor" />

        <!-- Verification Code Modal -->
        <VerificationCodeModal v-model="showVerificationCodeModal" title="Disable 2FA"
            message="Enter the verification code from the authenticator app to disable two-factor authentication"
            :close-on-backdrop="false" @verify="verifyAndDisableTwoFactor" />

        <!-- Confirm Terminate All Sessions Modal -->
        <div v-if="showConfirmAllSessionsModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen">
                <div class="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
                    @click="showConfirmAllSessionsModal = false"></div>
                <div class="relative bg-white dark:bg-slate-800 rounded-lg max-w-md w-full mx-auto shadow-xl p-6">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Terminate All Sessions</h3>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        This will terminate all your sessions from other devices. You will remain signed in on this
                        device.
                        <span class="block mt-1 font-medium">Are you sure you want to continue?</span>
                    </p>

                    <div class="mt-4 flex justify-end space-x-3">
                        <button @click="showConfirmAllSessionsModal = false"
                            class="px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-sm transition">
                            Cancel
                        </button>
                        <button @click="confirmAndTerminateAll"
                            class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition">
                            Terminate All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useToastStore } from '~/stores/toast';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import { useAuthService } from '~/composables/useAuthService';
import QrCodeModal from '~/components/QrCodeModal.vue';
import VerificationCodeModal from '~/components/security/VerificationCodeModal.vue';
import { sessionApi } from '~/services/api/sessionApi';
import type { RawSessionData, UserSessionDisplay } from '~/types/session';

definePageMeta({
    layout: 'account',
    middleware: ['auth'],
});

const toastStore = useToastStore();
const router = useRouter();
const { changePassword: changePasswordService, user, toggleTwoFactorAuth } = useAuthService();

// Session management
const activeSessions = ref<UserSessionDisplay[]>([]);
const isLoadingSessions = ref(false);
const sessionError = ref('');
const isTerminating = ref(false);
const terminatingSessionId = ref<number | null>(null);
const showConfirmAllSessionsModal = ref(false);

// Formats a date to relative time (e.g. "2 minutes ago")
function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) {
        return 'Just now';
    }

    if (diffMinutes < 60) {
        return `${diffMinutes} min ago`;
    }

    const hours = Math.floor(diffMinutes / 60);
    if (hours < 24) {
        return `${hours} hr ago`;
    }

    const days = Math.floor(diffMinutes / 1440);
    if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 5) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
}

// Load user sessions
const loadSessions = async () => {
    try {
        isLoadingSessions.value = true;
        sessionError.value = ''; // Clear previous errors

        // Try to get sessions first
        let sessions;
        try {
            sessions = await sessionApi.getSessions() as RawSessionData[];
        } catch (error) {
            console.error('Failed to load sessions:', error);
            // Save the error message but continue trying to get current session
            sessionError.value = error instanceof Error ? error.message : 'Failed to load active sessions';

            // If authentication failed, redirect to login
            if (sessionError.value.includes('Authentication failed') ||
                sessionError.value.includes('session may have expired')) {
                toastStore.error('Your session has expired. Please log in again.');
                // Clear token and redirect to login
                const authStore = useAuthStore();
                authStore.logout();

                // Используем router, объявленный в глобальной области компонента
                const currentPath = router.currentRoute.value.fullPath;
                setTimeout(() => {
                    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
                }, 500);
                return;
            }
        }

        // If sessions couldn't be loaded, don't try to get current session
        if (!sessions) {
            activeSessions.value = [];
            return;
        }

        // Get current session to identify the current device
        try {
            const currentSession = await sessionApi.getCurrentSession() as RawSessionData;

            // Map and format session data if both operations succeeded
            activeSessions.value = sessions.map((session: RawSessionData): UserSessionDisplay => ({
                id: session.id,
                device: session.deviceInfo || 'Unknown device',
                location: session.location || 'Unknown location',
                lastActive: formatRelativeTime(session.lastActivityAt),
                ipAddress: session.ipAddress || undefined,
                createdAt: session.createdAt,
                current: session.id === currentSession.id
            }));
        } catch (error) {
            console.error('Failed to get current session:', error);

            // If we can't determine current session, just show all sessions
            activeSessions.value = sessions.map((session: RawSessionData): UserSessionDisplay => ({
                id: session.id,
                device: session.deviceInfo || 'Unknown device',
                location: session.location || 'Unknown location',
                lastActive: formatRelativeTime(session.lastActivityAt),
                ipAddress: session.ipAddress || undefined,
                createdAt: session.createdAt,
                current: false // We don't know which is current
            }));
        }
    } catch (error) {
        console.error('Error in session loading process:', error);
        sessionError.value = error instanceof Error ? error.message : 'Failed to load active sessions';
        activeSessions.value = [];
    } finally {
        isLoadingSessions.value = false;
    }
};

// Terminate a specific session
const terminateSession = async (sessionId: number) => {
    try {
        isTerminating.value = true;
        terminatingSessionId.value = sessionId;

        // Call API to terminate session
        const response = await sessionApi.terminateSession(sessionId);

        if (response.success) {
            // Update session list by removing the terminated session
            activeSessions.value = activeSessions.value.filter(session => session.id !== sessionId);
            toastStore.success(response.message || 'Session terminated successfully');
        } else {
            toastStore.error(response.error || 'Failed to terminate session');
        }
    } catch (error) {
        console.error('Error terminating session:', error);
        toastStore.error('Failed to terminate session');
    } finally {
        isTerminating.value = false;
        terminatingSessionId.value = null;
    }
};

// Show confirmation before terminating all sessions
const confirmTerminateAllSessions = () => {
    // Only show confirmation if there are other sessions to terminate
    if (activeSessions.value.filter(s => !s.current).length > 0) {
        showConfirmAllSessionsModal.value = true;
    }
};

// Confirm and execute termination of all sessions
const confirmAndTerminateAll = async () => {
    showConfirmAllSessionsModal.value = false;
    await terminateAllSessions();
};

// Terminate all sessions except current
const terminateAllSessions = async () => {
    try {
        isTerminating.value = true;

        // Call API to terminate all sessions except current
        const response = await sessionApi.terminateAllSessionsExceptCurrent();

        if (response.success) {
            // Update session list by keeping only the current session
            activeSessions.value = activeSessions.value.filter(session => session.current);
            toastStore.success(response.message || 'All other sessions terminated successfully');
        } else {
            toastStore.error(response.error || 'Failed to terminate sessions');
        }
    } catch (error) {
        console.error('Error terminating all sessions:', error);
        toastStore.error('Failed to terminate sessions');
    } finally {
        isTerminating.value = false;
    }
};

// Form state
const form = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});

// Password visibility states
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Loading state
const isLoading = ref(false);

// Validation errors
const errors = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
});

// Clear errors
const clearErrors = () => {
    errors.currentPassword = '';
    errors.newPassword = '';
    errors.confirmPassword = '';
    errors.general = '';
};

// Password tips
const passwordTipsText = computed(() => {
    if (!form.newPassword) return 'Enter password';
    if (passwordStrength.value < 2) return 'Add uppercase letters, numbers, or special characters';
    return '';
});

// Calculate password strength
const passwordStrength = computed(() => {
    const password = form.newPassword;
    if (!password) return 0;

    let score = 0;

    // Password length
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 0.5;

    // Combination of different characters
    if (/[A-Z]/.test(password)) score += 0.5;
    if (/[a-z]/.test(password)) score += 0.5;
    if (/[0-9]/.test(password)) score += 0.5;
    if (/[\W_]/.test(password)) score += 1;

    return Math.min(4, Math.floor(score));
});

// Password strength indicator text
const passwordStrengthText = computed(() => {
    switch (passwordStrength.value) {
        case 0:
            return 'Too weak';
        case 1:
            return 'Weak';
        case 2:
            return 'Good';
        case 3:
            return 'Strong';
        case 4:
            return 'Very strong';
        default:
            return '';
    }
});

// Color class for the password strength indicator
const passwordStrengthClass = computed(() => {
    switch (passwordStrength.value) {
        case 0:
            return 'text-red-600 dark:text-red-400';
        case 1:
            return 'text-orange-600 dark:text-orange-400';
        case 2:
            return 'text-yellow-600 dark:text-yellow-400';
        case 3:
            return 'text-green-600 dark:text-green-400';
        case 4:
            return 'text-emerald-600 dark:text-emerald-400';
        default:
            return '';
    }
});

// Color class for the progress indicator
const strengthColorClass = (level: number) => {
    if (passwordStrength.value <= level) return 'bg-slate-200 dark:bg-slate-700';

    switch (level) {
        case 0:
            return 'bg-red-500';
        case 1:
            return 'bg-orange-500';
        case 2:
            return 'bg-yellow-500';
        case 3:
            return 'bg-emerald-500';
        default:
            return 'bg-slate-200 dark:bg-slate-700';
    }
};

// Determine if the user is registered via Google
const isGoogleUser = computed(() => {
    // Add logging for debugging
    console.log('User auth provider:', user.value?.authProvider);
    // Check for authProvider and its value (convert to lowercase for comparison)
    return user.value?.authProvider?.toLowerCase() === 'google';
});

// Переменная для отслеживания установленного пароля - получаем из модели пользователя
const hasPasswordSet = computed(() => {
    return user.value?.hasPasswordSet || false;
});

// Form validation
const validateForm = () => {
    clearErrors();
    let isValid = true;

    // Если это Google-пользователь без установленного пароля, не требуем текущий пароль
    // Иначе (обычный пользователь или Google-пользователь с установленным паролем) - требуем
    if ((!isGoogleUser.value || (isGoogleUser.value && hasPasswordSet.value)) && !form.currentPassword) {
        errors.currentPassword = 'Enter current password';
        isValid = false;
    }

    if (!form.newPassword) {
        errors.newPassword = 'Enter new password';
        isValid = false;
    } else if (form.newPassword.length < 6) {
        errors.newPassword = 'Password must contain at least 6 characters';
        isValid = false;
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = 'Confirm new password';
        isValid = false;
    } else if (form.newPassword !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
    }

    return isValid;
};

// Form submission handler
const changePassword = async () => {
    if (!validateForm()) return;

    isLoading.value = true;
    clearErrors();

    try {
        // Определяем данные для запроса в зависимости от типа пользователя и статуса пароля
        let passwordData;

        if (isGoogleUser.value && !hasPasswordSet.value) {
            // Google-пользователь без установленного пароля - не требуем текущий пароль
            passwordData = { newPassword: form.newPassword, isGoogleUser: true };
        } else {
            // Обычный пользователь или Google-пользователь с установленным паролем
            passwordData = { currentPassword: form.currentPassword, newPassword: form.newPassword };
        }

        const result = await changePasswordService(passwordData as any);

        if (result.success) {
            // Очищаем форму
            form.currentPassword = '';
            form.newPassword = '';
            form.confirmPassword = '';

            // Преобразуем result к правильному типу для доступа к сообщению
            const successResult = result as { success: true; message: string };
            toastStore.success(successResult.message || 'Password changed successfully');
        } else {
            // Преобразуем result к правильному типу для доступа к сообщению об ошибке
            const errorResult = result as { success: false; message: string };
            errors.general = errorResult.message || 'Failed to change password';
            toastStore.error(errors.general);
        }
    } catch (error: any) {
        const errorMessage = error.message || 'An error occurred while changing the password';
        errors.general = errorMessage;
        toastStore.error(errorMessage);
    } finally {
        isLoading.value = false;
    }
};

// 2FA state
const is2FAEnabled = ref(false);
const isToggling2FA = ref(false);
const showQrCodeModal = ref(false);
const showVerificationCodeModal = ref(false);
const qrCodeUrl = ref('');
const manualEntryKey = ref('');

// Check if 2FA is enabled when component is mounted
onMounted(() => {
    if (user.value?.isTwoFactorEnabled) {
        is2FAEnabled.value = true;
    }

    // Load active sessions
    loadSessions();
});

// Функция для конструирования URL для QR-кода из данных
const getQrCodeImageUrl = (qrCodeData: string) => {
    // Создаем URL для запроса QR-кода с бэкенда
    const apiBaseUrl = (import.meta.env.VITE_API_URL || 'https://localhost:7095');
    return `${apiBaseUrl}/api/qr-code/generate?data=${encodeURIComponent(qrCodeData)}`;
};

// Toggle 2FA
const toggle2FA = async () => {
    try {
        isToggling2FA.value = true;

        // Call API to enable/disable 2FA
        const enable = !is2FAEnabled.value;

        // Если мы выключаем 2FA и оно включено
        if (!enable && is2FAEnabled.value) {
            // Показываем модальное окно для ввода кода подтверждения
            showVerificationCodeModal.value = true;
            isToggling2FA.value = false;
            return;
        }
        // Если мы включаем 2FA
        else if (enable) {
            // Первый шаг: запрос QR-кода
            try {
                const setupResponse = await toggleTwoFactorAuth(enable);

                if (setupResponse) {
                    // Если есть данные для QR-кода, генерируем URL и показываем QR-код
                    if (setupResponse.qrCodeData) {
                        qrCodeUrl.value = getQrCodeImageUrl(setupResponse.qrCodeData);
                        manualEntryKey.value = setupResponse.manualEntryKey || '';
                        showQrCodeModal.value = true;
                    }
                    // Если есть прямой URL для QR-кода (для обратной совместимости)
                    else if (setupResponse.qrCodeUrl) {
                        qrCodeUrl.value = setupResponse.qrCodeUrl;
                        manualEntryKey.value = setupResponse.manualEntryKey || '';
                        showQrCodeModal.value = true;
                    }
                }
            } catch (error: any) {
                toastStore.error(error.message || 'Не удалось настроить 2FA');
            }
        }
    } catch (error: any) {
        toastStore.error(error.message || 'Не удалось обновить настройки 2FA');
    } finally {
        isToggling2FA.value = false;
    }
};

// Обработка верификации кода 2FA при отключении
const verifyAndDisableTwoFactor = async (code: string) => {
    try {
        isToggling2FA.value = true;
        const disableResponse = await toggleTwoFactorAuth(false, code);

        if (disableResponse) {
            is2FAEnabled.value = disableResponse.isEnabled;
            toastStore.success(disableResponse.message || 'Двухфакторная аутентификация отключена');
            showVerificationCodeModal.value = false;
        }
    } catch (error: any) {
        toastStore.error(error.message || 'Не удалось проверить код 2FA');
        // Не закрываем модальное окно при ошибке, чтобы пользователь мог повторить попытку
    } finally {
        isToggling2FA.value = false;
    }
};

// Обработка верификации кода 2FA после сканирования QR-кода
const verifyAndEnableTwoFactor = async (code: string) => {
    try {
        isToggling2FA.value = true;
        const enableResponse = await toggleTwoFactorAuth(true, code);

        if (enableResponse) {
            is2FAEnabled.value = enableResponse.isEnabled;
            toastStore.success(enableResponse.message || 'Двухфакторная аутентификация включена');
            showQrCodeModal.value = false;
        }
    } catch (error: any) {
        toastStore.error(error.message || 'Не удалось проверить код 2FA');
        // Не закрываем модальное окно при ошибке, чтобы пользователь мог повторить попытку
    } finally {
        isToggling2FA.value = false;
    }
};
</script>

<style scoped>
.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #1e293b;
    font-size: 0.875rem;
}

.dark .form-input {
    background-color: #1e293b;
    border-color: #334155;
    color: #f8fafc;
}

.form-error {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}
</style>