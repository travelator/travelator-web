import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';

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
});
