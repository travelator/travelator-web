/* global global, beforeEach, afterEach */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

describe('Login Page Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
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

    it('should render login page', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(
                screen.queryByText(/Logging in.../i)
            ).not.toBeInTheDocument();
        });

        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Please login to continue/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument();
    });

    it('handles successful login', async () => {
        const mockPostData = vi.fn().mockResolvedValue({ token: 'fake-token' });
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: mockPostData,
            loading: false,
            error: null,
        }));

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' },
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(mockPostData).toHaveBeenCalledWith(
                {
                    email: 'test@example.com',
                    password: 'password123',
                },
                {
                    credentials: 'include',
                }
            );
        });
    });

    it('displays error message on login failure', async () => {
        const mockPostData = vi
            .fn()
            .mockRejectedValue(new Error('Failed to login'));
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: mockPostData,
            loading: false,
            error: null,
        }));

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/try again/i)).toBeInTheDocument();
        });
    });
});
