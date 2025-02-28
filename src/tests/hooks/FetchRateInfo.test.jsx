import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

describe('useApi Hook for Rate Info', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches rate info successfully', async () => {
        const mockResponse = { data: 'test data' };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        const { result } = renderHook(() => useApi('rates', false));
        const response = await result.current.postData({});

        expect(global.fetch).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    it('handles rate info errors', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Rate API Error'));

        const { result } = renderHook(() => useApi('rates', false));

        try {
            await result.current.postData({});
            expect().fail('Expected error to be thrown');
        } catch (error) {
            expect(error).toBeDefined();
            expect(result.current.error).toBeDefined();
        }
    });
});
