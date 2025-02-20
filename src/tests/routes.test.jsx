import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import router from '../routes';
import Home from '../pages/Home';
import Rate from '../pages/Rate';
import Itinerary from '../pages/Itinerary';

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

    it('should render rate page at /rate', async () => {
        render(
            <MemoryRouter initialEntries={['/rate']}>
                <Routes>
                    <Route path="/rate" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Rate activities in/i));

        expect(screen.getByText(/Rate activities in/i)).toBeInTheDocument();
    });

    it('should render itinerary page at /itinerary', async () => {
        render(
            <MemoryRouter initialEntries={['/itinerary']}>
                <Routes>
                    <Route path="/itinerary" element={<Itinerary />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/See your itinerary/i));

        expect(screen.getByText(/See your itinerary/i)).toBeInTheDocument();
        expect(
            screen.getByText(/See itinerary results here./i)
        ).toBeInTheDocument();
    });

    it('should handle 404 for unknown routes', () => {
        const testRouter = createMemoryRouter(router.routes, {
            initialEntries: ['/this-route-does-not-exist'],
        });

        render(<RouterProvider router={testRouter} />);

        expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
});
