/* global global, beforeEach, afterEach */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Rate from '../pages/Rate';
import Itinerary from '../pages/Itinerary';
import NotFound from '../pages/NotFound';

describe('Routes Tests', () => {
    beforeEach(() => {
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

    const renderWithRouter = (initialEntry) => {
        render(
            <MemoryRouter initialEntries={[initialEntry]}>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/rate/:city" element={<Rate />} />
                        <Route
                            path="/itinerary/:city"
                            element={<Itinerary />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </MemoryRouter>
        );
    };

    it('should render home page at /', async () => {
        renderWithRouter('/');
        // Wait for both loading indicators to disappear
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(
                screen.queryByText('Fetching activities...')
            ).not.toBeInTheDocument();
        });
        expect(screen.getByText('Voya')).toBeInTheDocument();
        expect(
            screen.getByText('Your personal itinerary planner')
        ).toBeInTheDocument();
    });

    it('should render login page at /login', async () => {
        renderWithRouter('/login');
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    });

    it('should render signup page at /signup', async () => {
        renderWithRouter('/signup');
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(screen.getByText(/Join Us/i)).toBeInTheDocument();
    });

    it('should render rate page at /rate/:city', async () => {
        renderWithRouter('/rate/london');
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(
            screen.getByText(/Rate activities in london/i)
        ).toBeInTheDocument();
    });

    it('should render itinerary page at /itinerary/:city', async () => {
        renderWithRouter('/itinerary/london');
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        // Check for the complete heading text
        expect(
            screen.getByText(/Get ready to explore London/i)
        ).toBeInTheDocument();
    });

    it('should handle 404 for unknown routes', async () => {
        renderWithRouter('/unknown');
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
        expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
});
