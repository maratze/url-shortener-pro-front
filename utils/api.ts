// Re-export functions from the urlApi service
// This file is kept for backward compatibility

import { urlApi } from '~/services/api/urlApi';

// Re-export functions
export const shortenUrl = urlApi.shortenUrl;
export const getRemainingRequests = urlApi.getRemainingRequests;