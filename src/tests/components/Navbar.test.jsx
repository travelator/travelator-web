import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';

/* global global */

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Navbar Component Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        if (global.fetch) {
            delete global.fetch;
        }
    });

    const renderWithAuth = (isAuthenticated = false) => {
        const mockCheckAuthStatus = vi.fn();
        return render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{
                        isAuthenticated,
                        checkAuthStatus: mockCheckAuthStatus,
                    }}
                >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
    };

    it('renders login and signup links when not authenticated', () => {
        renderWithAuth(false);

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.queryByText('My Trips')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
    });

    it('renders my trips and sign out when authenticated', () => {
        renderWithAuth(true);

        expect(screen.getByText('My Trips')).toBeInTheDocument();
        expect(screen.getByText('Sign Out')).toBeInTheDocument();
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
    });

    it('handles logout correctly', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        const mockCheckAuthStatus = vi.fn().mockResolvedValue(undefined);
        render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{
                        isAuthenticated: true,
                        checkAuthStatus: mockCheckAuthStatus,
                    }}
                >
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const signOutButton = screen.getByText('Sign Out');
        await fireEvent.click(signOutButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/logout'),
                expect.objectContaining({
                    method: 'POST',
                    credentials: 'include',
                })
            );
        });

        await waitFor(() => {
            expect(mockCheckAuthStatus).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('navigates to correct routes when links are clicked', () => {
        renderWithAuth(true);

        const myTripsLink = screen.getByText('My Trips');
        expect(myTripsLink.closest('a')).toHaveAttribute('href', '/user-trips');
    });
});
