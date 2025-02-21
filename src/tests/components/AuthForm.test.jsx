import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';

describe('AuthForm Component Tests', () => {
    it('should render login form', async () => {
        render(
            <MemoryRouter>
                <AuthForm type="login" />
            </MemoryRouter>
        );

        expect(
            await screen.getByRole('heading', { name: /Login/i })
        ).toBeInTheDocument();
        expect(
            await screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument();
    });

    it('should render signup form', async () => {
        render(
            <MemoryRouter>
                <AuthForm type="signup" />
            </MemoryRouter>
        );

        expect(
            await screen.getByRole('heading', { name: /Sign Up/i })
        ).toBeInTheDocument();
        expect(
            await screen.getByRole('button', { name: /Sign Up/i })
        ).toBeInTheDocument();
    });

    it('should show error if passwords do not match on signup', () => {
        render(
            <MemoryRouter>
                <AuthForm type="signup" />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
            target: { value: 'password456' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
});
