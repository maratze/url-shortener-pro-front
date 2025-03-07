import { ref } from 'vue';

export function useDeviceFingerprint() {
    const fingerprint = ref<string | null>(null);

    // Функция для генерации fingerprint устройства
    const generateFingerprint = async (): Promise<string> => {
        // Если fingerprint уже был сгенерирован, возвращаем его
        if (fingerprint.value) {
            return fingerprint.value;
        }

        try {
            // Собираем компоненты для fingerprint
            const components = [
                navigator.userAgent,
                navigator.language,
                new Date().getTimezoneOffset(),
                navigator.platform,
                navigator.vendor,
                screen.width + 'x' + screen.height,
                screen.colorDepth,
                navigator.hardwareConcurrency || '',
                // Fix: Add type assertion for deviceMemory, which is non-standard
                (navigator as any).deviceMemory || '',
                // Дополнительные компоненты для улучшения точности
                'canvas:' + await getCanvasFingerprint(),
                'webgl:' + await getWebGLFingerprint(),
                'fonts:' + await getFontsFingerprint(),
                'audio:' + await getAudioFingerprint()
            ];

            // Создаем хеш из компонентов
            const fingerprintValue = await hashComponents(components.join('|'));
            fingerprint.value = fingerprintValue;

            return fingerprintValue;
        } catch (error) {
            console.error('Error generating fingerprint:', error);
            // В случае ошибки используем упрощенный хеш
            const simpleFp = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            fingerprint.value = simpleFp;
            return simpleFp;
        }
    };

    // Хеширование строки с использованием SubtleCrypto API
    const hashComponents = async (text: string): Promise<string> => {
        if (!window.crypto || !window.crypto.subtle) {
            // Если SubtleCrypto не поддерживается, используем простой хеш
            let hash = 0;
            for (let i = 0; i < text.length; i++) {
                const char = text.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return Math.abs(hash).toString(16);
        }

        // Используем SHA-256 через SubtleCrypto API
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return hashHex;
    };

    // Получение fingerprint из Canvas
    const getCanvasFingerprint = async (): Promise<string> => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 50;
            const ctx = canvas.getContext('2d');

            if (!ctx) return '';

            // Текст и стили
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#1a73e8';
            ctx.fillText('TinyLink Canvas Fingerprint 👋', 10, 10);

            // Добавляем различные графические элементы
            ctx.fillStyle = '#FF6347';
            ctx.fillRect(125, 25, 50, 10);
            ctx.fillStyle = '#6495ED';
            ctx.beginPath();
            ctx.arc(175, 10, 15, 0, Math.PI * 2, true);
            ctx.fill();

            // Получаем данные из canvas
            const dataURL = canvas.toDataURL();

            // Хешируем данные
            return await hashComponents(dataURL);
        } catch (e) {
            return '';
        }
    };

    // Получение fingerprint из WebGL
    const getWebGLFingerprint = async (): Promise<string> => {
        try {
            const canvas = document.createElement('canvas');
            // Fix: Add explicit type assertion for WebGLRenderingContext
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;

            if (!gl) return '';

            // Получаем информацию о WebGL
            const vendor = gl.getParameter(gl.VENDOR);
            const renderer = gl.getParameter(gl.RENDERER);
            const version = gl.getParameter(gl.VERSION);

            return await hashComponents(`${vendor}|${renderer}|${version}`);
        } catch (e) {
            return '';
        }
    };

    // Получение fingerprint на основе поддерживаемых шрифтов
    const getFontsFingerprint = async (): Promise<string> => {
        try {
            // Список распространенных шрифтов для проверки
            const fonts = [
                'Arial', 'Courier New', 'Georgia', 'Times New Roman',
                'Trebuchet MS', 'Verdana', 'Helvetica', 'Comic Sans MS'
            ];

            const body = document.body;
            const testDiv = document.createElement('div');
            const testString = 'mmmmmmmmmmlli';

            // Скрываем элемент
            testDiv.style.cssText = 'position: absolute; left: -9999px; visibility: hidden; display: block !important';

            // Создаем текстовые элементы для каждого шрифта
            const baseFontSpan = document.createElement('span');
            baseFontSpan.style.cssText = 'font-family: monospace; font-size: 72px;';
            baseFontSpan.textContent = testString;

            // Добавляем элементы в DOM для измерений
            testDiv.appendChild(baseFontSpan);
            body.appendChild(testDiv);

            // Измеряем ширину в моноширинном шрифте (базовая)
            const baseWidth = baseFontSpan.offsetWidth;
            const baseHeight = baseFontSpan.offsetHeight;

            // Проверяем наличие каждого шрифта
            const detectedFonts = [];
            for (const font of fonts) {
                // Меняем шрифт
                baseFontSpan.style.fontFamily = `'${font}', monospace`;

                // Если ширина изменилась - шрифт доступен
                if (baseFontSpan.offsetWidth !== baseWidth || baseFontSpan.offsetHeight !== baseHeight) {
                    detectedFonts.push(font);
                }
            }

            // Удаляем тестовый элемент
            body.removeChild(testDiv);

            return await hashComponents(detectedFonts.join('|'));
        } catch (e) {
            return '';
        }
    };

    // Получение fingerprint на основе обработки аудио
    const getAudioFingerprint = async (): Promise<string> => {
        try {
            if (!window.OfflineAudioContext) return '';

            const audioContext = new (window.OfflineAudioContext || (window as any).webkitOfflineAudioContext)(1, 5000, 44100);

            // Создаем осциллятор
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            const gain = audioContext.createGain();

            // Настраиваем осциллятор
            oscillator.type = 'triangle';
            oscillator.frequency.value = 10000;

            // Соединяем узлы
            gain.gain.value = 0.5;
            oscillator.connect(gain);
            gain.connect(analyser);
            analyser.connect(audioContext.destination);

            // Запускаем осциллятор
            oscillator.start(0);

            // Получаем данные из фреймбуфера
            const audioData = await audioContext.startRendering();
            const audioSamples = new Float32Array(audioData.length);
            audioData.copyFromChannel(audioSamples, 0);

            // Отбираем только ключевые образцы для уменьшения объема данных
            const keyPoints = [500, 1000, 1500, 2000, 2500];
            const samples = keyPoints.map(point => audioSamples[point]);

            // Хешируем данные
            return await hashComponents(samples.join('|'));
        } catch (e) {
            return '';
        }
    };

    return {
        fingerprint,
        generateFingerprint
    };
}