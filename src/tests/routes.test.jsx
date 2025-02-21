import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Rate from '../pages/Rate';
//import Itinerary from '../pages/Itinerary';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

describe('Routes Tests', () => {
    it('should render home page at /', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MemoryRouter>
        );

        // Check for something you know exists on your home page
        expect(screen.getByText(/Voya/i)).toBeInTheDocument();
    });

    it('should render rate page at /rate/:city', async () => {
        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Rate activities in/i));
        expect(screen.getByText(/Rate activities in/i)).toBeInTheDocument();
    });
    /*
    it('should render itinerary page at /itinerary/:city', async () => {
        render(
            <MemoryRouter initialEntries={['/itinerary/London']}>
                <Routes>
                    <Route path="/itinerary/:city" element={<Itinerary />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Get ready to explore/i));
        expect(screen.getByText(/Get ready to explore/i)).toBeInTheDocument();
    });
    */
    it('should render login page at /login', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        );

        // Check for something you know exists on your login page
        expect(
            screen.getByText(/Please login to continue/i)
        ).toBeInTheDocument();
    });

    it('should handle 404 for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
});
