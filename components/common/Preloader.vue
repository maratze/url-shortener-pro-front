<template>
    <!-- Контейнер для прелоадера, может быть полноэкранным или встроенным -->
    <div
        :class="[
            fullscreen ? 'fixed inset-0 z-[9999] flex items-center justify-center' : 'relative flex items-center justify-center',
            fullscreen ? 'bg-slate-100 dark:bg-slate-900' : '',
            containerClass
        ]"
        :style="containerStyle"
        v-if="active"
        :data-testid="testId">
        <div class="text-center" :style="{ opacity: opacity || 1 }">
            <!-- Спиннер (вращающееся кольцо) -->
            <div
                v-if="type === 'spinner'"
                :class="[
                    'border-4 rounded-full animate-spin',
                    `border-${spinnerBaseColor}-100 dark:border-${spinnerBaseColor}-900 border-t-${spinnerBaseColor}-600 dark:border-t-${spinnerBaseColor}-400`
                ]"
                :style="{
                    width: size,
                    height: size
                }"></div>

            <!-- Пульсирующие точки -->
            <div v-else-if="type === 'dots'" class="flex space-x-2">
                <div v-for="i in 3" :key="i"
                    :class="`w-${dotSize} h-${dotSize} bg-${spinnerBaseColor}-600 dark:bg-${spinnerBaseColor}-400 rounded-full animate-pulse`"
                    :style="{ animationDelay: `${(i - 1) * 0.2}s` }"></div>
            </div>

            <!-- Скелетон (прямоугольный блок с пульсацией) -->
            <div
                v-else-if="type === 'skeleton'"
                :class="`animate-pulse bg-slate-300 dark:bg-slate-700 rounded`"
                :style="{
                    width: skeletonWidth || '100%',
                    height: skeletonHeight || '1rem'
                }"></div>

            <!-- Текст под прелоадером (опционально) -->
            <p v-if="text" class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

/**
 * Пропсы для компонента Preloader
 */
interface Props {
    /** Активен ли прелоадер */
    active: boolean;
    /** Полноэкранный режим с затемнением фона */
    fullscreen?: boolean;
    /** Тип прелоадера: spinner (вращающееся кольцо), dots (точки), skeleton (прямоугольник) */
    type?: 'spinner' | 'dots' | 'skeleton';
    /** Текст, отображаемый под прелоадером */
    text?: string;
    /** Размер спиннера (CSS значение) */
    size?: string;
    /** Цвет спиннера (префикс Tailwind, например: blue, indigo, green) */
    spinnerBaseColor?: string;
    /** Непрозрачность прелоадера (0-1) */
    opacity?: number;
    /** CSS класс для контейнера */
    containerClass?: string;
    /** Стили для контейнера */
    containerStyle?: any;
    /** Размер точек для типа dots */
    dotSize?: number;
    /** Ширина для типа skeleton */
    skeletonWidth?: string;
    /** Высота для типа skeleton */
    skeletonHeight?: string;
    /** ID для тестирования */
    testId?: string;
}

const props = withDefaults(defineProps<Props>(), {
    fullscreen: false,
    type: 'spinner',
    size: '4rem',
    spinnerBaseColor: 'blue',
    opacity: 1,
    containerClass: '',
    containerStyle: () => ({}),
    dotSize: 3,
    skeletonWidth: '100%',
    skeletonHeight: '1rem',
    text: '',
    testId: 'preloader'
});
</script>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
}

.animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}
</style>