import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

describe('useApi Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('makes API calls successfully', async () => {
        const mockResponse = { data: 'test data' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        const { result } = renderHook(() => useApi('test-endpoint', false));
        const response = await result.current.postData({ test: 'data' });

        expect(global.fetch).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    it('handles errors appropriately', async () => {
        global.fetch.mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useApi('test-endpoint', false));

        try {
            await result.current.postData({});
            expect().fail('Expected error to be thrown');
        } catch (error) {
            expect(error).toBeDefined();
            expect(result.current.error).toBeDefined();
        }
    });

    it('sets loading state correctly', async () => {
        const mockResponse = { data: 'test data' };
        global.fetch.mockImplementation(
            () =>
                new Promise((resolve) =>
                    setTimeout(
                        () =>
                            resolve({
                                ok: true,
                                json: () => Promise.resolve(mockResponse),
                            }),
                        100
                    )
                )
        );

        const { result } = renderHook(() => useApi('test-endpoint', false));

        // Initial state should be not loading
        expect(result.current.loading).toBe(false);

        // Start the request
        let promise;
        await act(async () => {
            promise = result.current.postData({});
        });

        // Wait for the request to complete
        await act(async () => {
            await promise;
        });

        // Final state should be not loading
        expect(result.current.loading).toBe(false);
    });
});
