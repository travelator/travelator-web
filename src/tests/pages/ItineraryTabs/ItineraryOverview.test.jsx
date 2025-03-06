import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItineraryOverview from '../../../pages/ItineraryTabs/ItineraryOverview';

// Mock dependencies
vi.mock('../../../components/Carousel', () => ({
    __esModule: true,
    default: ({ children }) => <div data-testid="carousel">{children}</div>,
}));

vi.mock('../../../components/ItineraryCards/ActivityCard', () => ({
    __esModule: true,
    default: ({ handleSwapClick, title }) => (
        <div data-testid="activity-card">
            <button onClick={() => handleSwapClick(1)}>
                {title} - Activity
            </button>
        </div>
    ),
}));

vi.mock('../../../components/ItineraryCards/TravelCard', () => ({
    __esModule: true,
    default: ({ title }) => (
        <div data-testid="travel-card">{title} - Travel</div>
    ),
}));

describe('ItineraryOverview', () => {
    const mockHandleSwapClick = vi.fn();
    const itinerary = [
        {
            id: 1,
            transport: true,
            start: 'City A',
            end: 'City B',
            title: 'Flight to City B',
            description: 'A short flight to City B',
            price: 100,
            theme: 'Flight',
            transportMode: 'Airplane',
        },
        {
            id: 2,
            transport: false,
            start: 'City B',
            end: 'City C',
            title: 'Visit Museum in City C',
            description: 'Explore the history at the museum',
            price: 20,
            theme: 'Museum',
            image_link: 'some-image-url',
            booking_url: 'some-booking-url',
            temperature: 20,
            weather: 'Sunny',
        },
    ];

    it('renders itinerary correctly', async () => {
        render(
            <ItineraryOverview
                itinerary={itinerary}
                handleSwapClick={mockHandleSwapClick}
            />
        );

        screen.debug(); // Debug output

        await waitFor(() => {
            expect(screen.getByTestId('travel-card')).toHaveTextContent(
                'Flight to City B - Travel'
            );
            expect(screen.getByTestId('activity-card')).toHaveTextContent(
                'Visit Museum in City C - Activity'
            );
        });
    });

    it('renders no cards when itinerary is empty', () => {
        render(
            <ItineraryOverview
                itinerary={[]}
                handleSwapClick={mockHandleSwapClick}
            />
        );

        expect(screen.queryByTestId('travel-card')).not.toBeInTheDocument();
        expect(screen.queryByTestId('activity-card')).not.toBeInTheDocument();
    });
});
