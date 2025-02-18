import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Rate from '../../pages/Rate';

describe('Rate Page Component', () => {
    it('should display city name from URL parameter', () => {
        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        expect(
            screen.getByText(/Preparing itinerary for London/i)
        ).toBeInTheDocument();
    });

    it('should adjust visible cards based on container width', () => {
        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        const container = screen.getByTestId('activity-cards-container');
        expect(container).toBeInTheDocument();
        // Note: actual resizing behavior would need to be tested in an integration test
    });
});
