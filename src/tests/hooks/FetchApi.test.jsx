import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext

/* global global */

describe('useApi Hook', () => {
    let fetchSpy;

    beforeEach(() => {
        vi.clearAllMocks();
        fetchSpy = vi.spyOn(global, 'fetch');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // Utility function to wrap hook in the AuthContext.Provider
    const wrapper = ({ children }) => (
        <AuthContext.Provider value={{ isAuthenticated: true }}>
            {children}
        </AuthContext.Provider>
    );

    it('handles errors appropriately', async () => {
        fetchSpy.mockRejectedValueOnce(new Error('API Error'));

        const { result } = renderHook(() => useApi('test-endpoint', false), {
            wrapper,
        });

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

    it('sets loading state correctly', async () => {
        const mockResponse = { data: 'test data' };
        fetchSpy.mockImplementation(
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

        const { result } = renderHook(() => useApi('test-endpoint', false), {
            wrapper,
        });

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
