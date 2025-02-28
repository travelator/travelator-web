import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

// Mock environment variables
vi.mock('@env', () => ({
    VITE_APP_AUTH_API_URL: 'http://test-auth-api.com/',
    VITE_APP_FETCH_GENERAL_API_URL: 'http://test-api.com/',
    VITE_USE_LOCAL_DATA: 'false'
}));

describe('useApi Hook', () => {
    const mockResponse = { data: 'test data' };

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        ));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch data successfully', async () => {
        const { result } = renderHook(() => useApi('test-route', true));

        await waitFor(() => {
            expect(result.current.activities).toEqual(mockResponse);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
        });
    });

    it('should handle POST requests', async () => {
        const { result } = renderHook(() => useApi('test-route', false));

        const postData = await result.current.postData({ test: 'data' });

        expect(postData).toEqual(mockResponse);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject(new Error('Network error'))
        ));

        const { result } = renderHook(() => useApi('test-route', true));

        await waitFor(() => {
            expect(result.current.error).toBeDefined();
            expect(result.current.loading).toBe(false);
        });
    });
});
