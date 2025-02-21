import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';

describe('Signup Page Tests', () => {
    it('should render signup page', () => {
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Join Us/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Create an account to get started/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Sign Up/i })
        ).toBeInTheDocument();
    });

    it('navigates to login page when "Login" link is clicked on signup page', async () => {
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
});
