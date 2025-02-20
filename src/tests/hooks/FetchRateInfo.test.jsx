import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useUserRateInfo from '../../hooks/FetchRateInfo.jsx';

describe('useUserRateInfo Hook', () => {
    const mockActivities = [
        {
            title: 'Visit the British Museum',
            description: 'Explore a vast collection of art and antiquities...',
            image_link: 'https://example.com/museum.jpg',
            id: 1,
        },
        {
            title: 'Ride the London Eye',
            description: "Experience panoramic views of London's skyline...",
            image_link: 'https://example.com/londoneye.jpg',
            id: 2,
        },
    ];

    beforeEach(() => {
        // Mock the fetch before each test
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(mockActivities),
                })
            )
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should fetch activities successfully', async () => {
        const { result } = renderHook(() => useUserRateInfo());

        await waitFor(() => {
            expect(result.current.activities).toEqual(mockActivities);
        });

        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    it('should handle server errors', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    status: 500,
                    json: () => Promise.resolve({ error: 'Server error' }),
                })
            )
        );

        const { result } = renderHook(() => useUserRateInfo());

        await waitFor(() => {
            expect(result.current.error).toBeDefined();
            expect(result.current.loading).toBe(false);
            expect(result.current.activities).toBeNull();
        });
    });

    it('should show loading state initially', () => {
        const { result } = renderHook(() => useUserRateInfo());

        expect(result.current.loading).toBe(true);
        expect(result.current.activities).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('should use the correct API URL', async () => {
        renderHook(() => useUserRateInfo());

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                import.meta.env.VITE_APP_FETCH_API_URL,
                expect.objectContaining({
                    mode: 'cors',
                })
            );
        });
    });
});
