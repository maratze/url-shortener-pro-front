export function useUrlValidation() {
    const validateUrl = (url: string): boolean => {
        try {
            // Check if the URL starts with http:// or https://
            if (!url.match(/^https?:\/\//i)) {
                url = 'https://' + url;
            }

            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    };

    const formatUrl = (url: string): string => {
        // Add https:// if protocol is missing
        if (!url.match(/^https?:\/\//i)) {
            url = 'https://' + url;
        }
        return url;
    };

    const extractDomain = (url: string): string => {
        try {
            const urlObj = new URL(formatUrl(url));
            return urlObj.hostname;
        } catch (e) {
            return '';
        }
    };

    return {
        validateUrl,
        formatUrl,
        extractDomain
    };
}