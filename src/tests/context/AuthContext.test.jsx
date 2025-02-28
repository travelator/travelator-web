/* global global, beforeEach, afterEach */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

// Test component that uses the auth context
const TestComponent = () => {
    const { isAuthenticated, loading } = useAuth();
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div data-testid="auth-status">
                    {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </div>
            )}
        </div>
    );
};

describe('AuthContext Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        if (global.fetch) {
            delete global.fetch;
        }
    });

    it('provides initial authentication state', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'No session' }),
            })
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent(
            'Not Authenticated'
        );
    });

    it('updates authentication state when validate endpoint returns email', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ email: 'test@example.com' }),
            })
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent(
            'Authenticated'
        );
    });

    it('sets unauthenticated state when validate endpoint returns no email', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'No session' }),
            })
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent(
            'Not Authenticated'
        );
    });

    it('handles fetch errors gracefully', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByTestId('auth-status')).toHaveTextContent(
            'Not Authenticated'
        );
    });
});
