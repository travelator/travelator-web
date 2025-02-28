import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate, Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
import * as FetchApi from '../../hooks/FetchApi';

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
    });

    it('should render signup page', () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn().mockResolvedValue({ message: "User registered successfully" }),
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(screen.getByText(/Join Us/i)).toBeInTheDocument();
        expect(screen.getByText(/Create an account to get started/i)).toBeInTheDocument();
    });

    it('navigates to login page when "Login" link is clicked on signup page', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn().mockResolvedValue({ message: "User registered successfully" }),
            loading: false,
            error: null
        }));

        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

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

    it('handles successful registration', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn().mockResolvedValue({ message: "User registered successfully" }),
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'newuser@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
        });
    });

    it('displays error message on registration failure', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn().mockRejectedValue(new Error('Failed to register')),
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'existing@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to register/i)).toBeInTheDocument();
        });
    });

    it('shows loading state while registering', () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn(),
            loading: true,
            error: null
        }));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(screen.getByText(/Creating your account.../i)).toBeInTheDocument();
    });
});
