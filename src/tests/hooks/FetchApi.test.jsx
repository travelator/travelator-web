import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

// Mock environment variables
vi.mock('@env', () => ({
    VITE_APP_AUTH_API_URL: 'http://test-auth-api.com/',
    VITE_APP_FETCH_GENERAL_API_URL: 'http://test-api.com/',
}));

describe('useApi Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset fetch mock before each test
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('uses auth URL for auth routes', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'fake-token' }),
            })
        );

        const { result } = renderHook(() => useApi('login', false));
        await result.current.postData({
            email: 'test@example.com',
            password: 'password',
        });

        expect(global.fetch).toHaveBeenCalledWith(
            'http://test-auth-api.com/login',
            expect.objectContaining({
                method: 'POST',
                headers: expect.any(Object),
                body: expect.any(String),
            })
        );
    });

    it('uses general URL for non-auth routes', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: [] }),
            })
        );

        const { result } = renderHook(() => useApi('activities', true));
        await result.current.postData({});

        expect(global.fetch).toHaveBeenCalledWith(
            'http://test-api.com/activities',
            expect.objectContaining({
                method: 'POST',
                headers: expect.any(Object),
                body: expect.any(String),
            })
        );
    });

    it('includes credentials in requests', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        const { result } = renderHook(() => useApi('login', false));
        await result.current.postData({
            email: 'test@example.com',
            password: 'password',
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                credentials: 'include',
            })
        );
    });

    it('handles API errors correctly', async () => {
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                json: () => Promise.resolve({ message: 'Unauthorized' }),
            })
        );

        const { result } = renderHook(() => useApi('login', false));

        try {
            await result.current.postData({
                email: 'test@example.com',
                password: 'wrong',
            });
            // If we reach here, the test should fail
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe('HTTP error! Status: 401');
        }
    });
});
