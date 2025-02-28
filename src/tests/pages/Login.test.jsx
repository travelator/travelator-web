import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import * as FetchApi from '../../hooks/FetchApi';

// Mock useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('Login Page Tests', () => {
    it('should render login page', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Please login to continue/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument();
    });

    it('navigates to signup page when "Sign Up" link is clicked on login page', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        );

        // Find the "Sign Up" link and click it
        const signUpLink = screen.getByText(/Sign Up/i);
        await user.click(signUpLink);

        // Wait for the page to navigate and check if we're on the signup page
        await waitFor(() => screen.getByRole('heading', { name: /Join Us/i }));

        // Confirm that the URL changed to the signup page
        expect(
            screen.getByRole('heading', { name: /Join Us/i })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Create an account to get started/i)
        ).toBeInTheDocument();
    });

    it('handles successful login', async () => {
        const mockPostData = vi.fn().mockResolvedValue({ token: 'fake-token' });
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: mockPostData,
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Fill in the form
        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(mockPostData).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123'
            });
        });
    });

    it('displays error message on login failure', async () => {
        const mockPostData = vi.fn().mockRejectedValue(new Error('Failed to login'));
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: mockPostData,
            loading: false,
            error: null
        }));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'wrongpassword' }
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to login/i)).toBeInTheDocument();
        });
    });

    it('shows loading state while logging in', async () => {
        vi.spyOn(FetchApi, 'default').mockImplementation(() => ({
            postData: vi.fn(),
            loading: true,
            error: null
        }));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();
    });
});
