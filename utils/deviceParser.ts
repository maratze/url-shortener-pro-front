/**
 * Преобразует строку информации о устройстве в более читаемый формат
 * @param deviceInfo Строка информации о устройстве
 * @returns Более читаемая версия информации о устройстве
 */
export function parseDeviceInfo(deviceInfo: string): string {
    // Если данные отсутствуют, возвращаем неизвестно
    if (!deviceInfo || deviceInfo === 'Unknown device') {
        return 'Unknown device';
    }

    try {
        // Пытаемся выделить из строки браузер и ОС
        let deviceType = 'Device';
        let browser = '';
        let os = '';

        // Ищем распространенные браузеры
        if (deviceInfo.includes('Chrome')) {
            browser = 'Chrome';
        } else if (deviceInfo.includes('Firefox')) {
            browser = 'Firefox';
        } else if (deviceInfo.includes('Safari') && !deviceInfo.includes('Chrome')) {
            browser = 'Safari';
        } else if (deviceInfo.includes('Edge')) {
            browser = 'Edge';
        } else if (deviceInfo.includes('Opera')) {
            browser = 'Opera';
        } else if (deviceInfo.includes('MSIE') || deviceInfo.includes('Trident')) {
            browser = 'Internet Explorer';
        }

        // Ищем распространенные ОС
        if (deviceInfo.includes('Windows')) {
            os = 'Windows';
        } else if (deviceInfo.includes('Mac OS')) {
            os = 'Mac';
        } else if (deviceInfo.includes('iPhone')) {
            os = 'iPhone';
            deviceType = 'Mobile';
        } else if (deviceInfo.includes('iPad')) {
            os = 'iPad';
            deviceType = 'Tablet';
        } else if (deviceInfo.includes('Android') && deviceInfo.includes('Mobile')) {
            os = 'Android';
            deviceType = 'Mobile';
        } else if (deviceInfo.includes('Android')) {
            os = 'Android';
            deviceType = 'Tablet';
        } else if (deviceInfo.includes('Linux')) {
            os = 'Linux';
        } else if (deviceInfo.includes('iOS')) {
            os = 'iOS';
            deviceType = 'Mobile';
        }

        // Если нашли и браузер и ОС, возвращаем их вместе
        if (browser && os) {
            return `${deviceType}: ${browser} on ${os}`;
        }
        // Если нашли только браузер
        else if (browser) {
            return `${deviceType}: ${browser}`;
        }
        // Если нашли только ОС
        else if (os) {
            return `${deviceType}: ${os}`;
        }

        // Если не удалось распарсить строку, возвращаем исходную строку, 
        // но ограничиваем ее длину до 50 символов
        if (deviceInfo.length > 50) {
            return deviceInfo.substring(0, 47) + '...';
        }

        return deviceInfo;
    } catch (error) {
        console.error('Error parsing device info:', error);
        // В случае ошибки возвращаем исходную строку
        return deviceInfo;
    }
} 