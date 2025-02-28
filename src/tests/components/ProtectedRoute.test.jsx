vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(() => vi.fn()), // Ensure useNavigate returns a mock function
    };
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import { AuthContext } from '../../context/AuthContext';

describe('ProtectedRoute Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const TestComponent = () => <div>Protected Content</div>;

    const renderWithAuth = (isAuthenticated = false, loading = false) => {
        return render(
            <MemoryRouter>
                <AuthContext.Provider value={{ isAuthenticated, loading }}>
                    <ProtectedRoute>
                        <TestComponent />
                    </ProtectedRoute>
                </AuthContext.Provider>
            </MemoryRouter>
        );
    };

    it('shows loading state when authentication is being checked', () => {
        renderWithAuth(false, true);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders protected content when user is authenticated', () => {
        renderWithAuth(true, false);
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
