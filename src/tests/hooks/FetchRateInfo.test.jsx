import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

describe('useApi Hook for Rate Info', () => {
    let fetchSpy;

    beforeEach(() => {
        vi.clearAllMocks();
        fetchSpy = vi.spyOn(global, 'fetch');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('fetches rate info successfully', async () => {
        const mockResponse = { data: 'test data' };
        fetchSpy.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        const { result } = renderHook(() => useApi('rates', false));
        let response;

        await act(async () => {
            response = await result.current.postData({});
        });

        expect(fetchSpy).toHaveBeenCalled();
        expect(response).toEqual(mockResponse);
    });

    it('handles rate info errors', async () => {
        fetchSpy.mockRejectedValueOnce(new Error('Rate API Error'));

        const { result } = renderHook(() => useApi('rates', false));

        try {
            await act(async () => {
                await result.current.postData({});
            });
            expect().fail('Expected error to be thrown');
        } catch (error) {
            expect(error).toBeDefined();
            expect(result.current.error).toBeDefined();
        }
    });
});
