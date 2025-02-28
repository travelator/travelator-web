import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

// Mock environment variables
vi.mock('@env', () => ({
    VITE_APP_AUTH_API_URL: 'http://test-auth-api.com/',
    VITE_APP_FETCH_GENERAL_API_URL: 'http://test-api.com/',
    VITE_USE_LOCAL_DATA: 'false',
}));

describe('useApi Hook for Rate Info', () => {
    const mockResponse = { data: 'test data' };
    let fetchMock;

    beforeEach(() => {
        fetchMock = vi.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            })
        );
        global.fetch = fetchMock;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch data successfully', async () => {
        const { result } = renderHook(() => useApi('test-route', true));

        // Trigger a fetch by calling postData
        const response = await result.current.postData({});

        expect(response).toEqual(mockResponse);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(fetchMock).toHaveBeenCalledWith(
            'http://test-api.com/test-route',
            expect.objectContaining({
                method: 'POST',
                headers: expect.any(Object),
                body: expect.any(String),
            })
        );
    });

    it('should handle POST requests', async () => {
        const { result } = renderHook(() => useApi('test-route', false));

        const postData = await result.current.postData({ test: 'data' });

        expect(postData).toEqual(mockResponse);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(fetchMock).toHaveBeenCalledWith(
            'http://test-auth-api.com/test-route',
            expect.objectContaining({
                method: 'POST',
                headers: expect.any(Object),
                body: JSON.stringify({ test: 'data' }),
            })
        );
    });

    it('should handle errors', async () => {
        const errorMessage = 'Network error';
        global.fetch = vi.fn(() => Promise.reject(new Error(errorMessage)));

        const { result } = renderHook(() => useApi('test-route', true));

        try {
            await result.current.postData({});
            // If we reach here, the test should fail
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(errorMessage);
        }
    });
});
