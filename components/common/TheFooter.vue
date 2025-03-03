<template>
	<footer class="bg-white dark:bg-secondary-900 mt-auto">
		<div class="container mx-auto px-4 py-10">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div>
					<div class="flex items-center space-x-2 mb-4">
						<svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
							<path d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414L10.586 5A6 6 0 0 1 19 13.414l-1.343 1.414zM6.343 12A4 4 0 0 0 12 17.657l1.414-1.414 1.414 1.414-1.414 1.343A6 6 0 0 1 5 13.414L6.343 12zm2.829-8.486l1.414 1.414L8.172 7.343l-1.414-1.414 2.414-2.415zm6.486 12.728l1.414 1.414-2.414 2.414-1.414-1.414 2.414-2.414z" />
						</svg>
						<span class="font-bold text-xl text-secondary-900 dark:text-white">URL Shortener Pro</span>
					</div>
					<p class="text-secondary-600 dark:text-secondary-400 mb-4">
						Профессиональный сервис сокращения URL-адресов с аналитикой и дополнительными возможностями.
					</p>
					<div class="flex space-x-4">
						<a href="#" class="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
							<span class="sr-only">Twitter</span>
							<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
							</svg>
						</a>
						<a href="#" class="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
							<span class="sr-only">GitHub</span>
							<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
							</svg>
						</a>
					</div>
				</div>
				<div>
					<h3 class="font-semibold text-lg text-secondary-900 dark:text-white mb-4">Сервис</h3>
					<ul class="space-y-2">
						<li>
							<NuxtLink to="/" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Главная
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/features" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Возможности
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/pricing" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Тарифы
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/faq" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								FAQ
							</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="font-semibold text-lg text-secondary-900 dark:text-white mb-4">Учетная запись</h3>
					<ul class="space-y-2">
						<li>
							<NuxtLink to="/login" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Войти
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/register" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Регистрация
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/dashboard" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Панель управления
							</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/dashboard/urls" class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
								Мои ссылки
							</NuxtLink>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="font-semibold text-lg text-secondary-900 dark:text-white mb-4">Контакты</h3>
					<p class="text-secondary-600 dark:text-secondary-400 mb-2">
						Есть вопросы или предложения? Напишите нам:
					</p>
					<a href="mailto:support@urlshortener.pro" class="text-primary-600 dark:text-primary-400 hover:underline">
						support@urlshortener.pro
					</a>
				</div>
			</div>

			<div class="mt-10 pt-6 border-t border-secondary-200 dark:border-secondary-800 flex flex-col md:flex-row justify-between items-center text-secondary-600 dark:text-secondary-400 text-sm">
				<p>© {{ new Date().getFullYear() }} URL Shortener Pro. Все права защищены.</p>
				<div class="mt-4 md:mt-0 flex space-x-6">
					<NuxtLink to="/privacy" class="hover:text-primary-600 dark:hover:text-primary-400">
						Политика конфиденциальности
					</NuxtLink>
					<NuxtLink to="/terms" class="hover:text-primary-600 dark:hover:text-primary-400">
						Условия использования
					</NuxtLink>
				</div>
			</div>
		</div>
	</footer>
</template>