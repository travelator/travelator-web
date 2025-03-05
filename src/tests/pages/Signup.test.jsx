/* global global, beforeEach, afterEach */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import * as FetchApi from '../../hooks/FetchApi';
import { AuthProvider } from '../../context/AuthContext';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Signup Page Tests', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        vi.resetModules();
        // Mock fetch for auth checks
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: 'No session' }),
            })
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
        if (global.fetch) {
            delete global.fetch;
        }
    });

    it('should render signup page', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi
                .fn()
                .mockResolvedValue({ message: 'User registered successfully' }),
            loading: false,
            error: null,
        }));

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Signup />
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByText(/Join Us/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Create an account to get started/i)
        ).toBeInTheDocument();
    });

    it('navigates to login page when "Login" link is clicked on signup page', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi
                .fn()
                .mockResolvedValue({ message: 'User registered successfully' }),
            loading: false,
            error: null,
        }));

        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Find the "Login" link and click it
        const loginLink = screen.getByText(/Login/i);
        await user.click(loginLink);

        // Wait for the page to navigate and check if we're on the login page
        await waitFor(() =>
            screen.getByRole('heading', { name: /Welcome Back/i })
        );

        // Confirm that the URL changed to the login page
        expect(
            screen.getByRole('heading', { name: /Welcome Back/i })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Please login to continue/i)
        ).toBeInTheDocument();
    });
});
