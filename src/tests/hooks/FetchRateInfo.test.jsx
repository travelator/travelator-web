import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext

/* global global */

describe('useApi Hook for Rate Info', () => {
    let fetchSpy;

    // Utility function to wrap the hook in the AuthContext.Provider
    const wrapper = ({ children }) => (
        <AuthContext.Provider value={{ isAuthenticated: true }}>
            {children}
        </AuthContext.Provider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
        fetchSpy = vi.spyOn(global, 'fetch');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('handles rate info errors', async () => {
        fetchSpy.mockRejectedValueOnce(new Error('Rate API Error'));

        const { result } = renderHook(() => useApi('rates', false), {
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
});
