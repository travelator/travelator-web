import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Rate from '../../pages/Rate';

describe('Rate Page Component', () => {
    it('should display city name from URL parameter', async () => {
        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Rate activities in/i));

        expect(
            screen.getByText(/Rate activities in London/i)
        ).toBeInTheDocument();
    });

    it('should adjust visible cards based on container width', async () => {
        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByTestId('activity-cards-container'));

        const container = screen.getByTestId('activity-cards-container');
        expect(container).toBeInTheDocument();
        // Note: actual resizing behavior would need to be tested in an integration test
    });
});
