import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';

describe('AuthForm Component Tests', () => {
    const mockOnSubmit = vi.fn();

    beforeEach(() => {
        // Clear mock before each test
        mockOnSubmit.mockClear();
    });

    it('should render login form', () => {
        render(
            <MemoryRouter>
                <AuthForm type="login" onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument();
        expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
    });

    it('should render signup form', () => {
        render(
            <MemoryRouter>
                <AuthForm type="signup" onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Sign Up/i })
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/Confirm Password/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/Already have an account?/i)
        ).toBeInTheDocument();
    });

    it('should show error if passwords do not match on signup', () => {
        render(
            <MemoryRouter>
                <AuthForm type="signup" onSubmit={mockOnSubmit} />
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
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit with form data when passwords match', () => {
        render(
            <MemoryRouter>
                <AuthForm type="signup" onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    });

    it('should call onSubmit with form data for login', () => {
        render(
            <MemoryRouter>
                <AuthForm type="login" onSubmit={mockOnSubmit} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockOnSubmit).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    });
});
