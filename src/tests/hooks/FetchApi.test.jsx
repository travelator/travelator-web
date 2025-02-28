import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useApi from '../../hooks/FetchApi';

/* global global */

describe('useApi Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('uses auth URL for auth routes', async () => {
        global.fetch = vi.fn(() =>
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
            `${import.meta.env.VITE_APP_AUTH_API_URL}login`,
            expect.any(Object)
        );
    });

    it('uses general URL for non-auth routes', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: [] }),
            })
        );

        const { result } = renderHook(() => useApi('activities', true));
        await result.current.postData({});

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                `${import.meta.env.VITE_APP_FETCH_GENERAL_API_URL}activities`,
                expect.any(Object)
            );
        });
    });

    it('includes credentials in requests', async () => {
        global.fetch = vi.fn(() =>
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
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                json: () => Promise.resolve({ message: 'Unauthorized' }),
            })
        );

        const { result } = renderHook(() => useApi('login', false));

        await expect(
            result.current.postData({
                email: 'test@example.com',
                password: 'wrong',
            })
        ).rejects.toThrow('HTTP error! Status: 401');
    });
});
