import { render, screen } from '@testing-library/react';
import Map from '../../../components/Map/map';
import { describe, it, expect, vi } from 'vitest';

const mockItinerary = [
    {
        latitude: 51.505,
        longitude: -0.09,
        title: 'Start',
        description: 'Start point',
        price: 0,
        duration: 0,
    },
    { transport: true, transportMode: 'walking', start: '10:00', end: '10:30' },
    {
        latitude: 51.51,
        longitude: -0.1,
        title: 'End',
        description: 'End point',
        price: 0,
        duration: 0,
    },
];

const mockSelectedItem = { latitude: 51.505, longitude: -0.09 };
const mockSetSelectedRoute = vi.fn();

describe('Map Component', () => {
    it('renders without crashing', () => {
        render(
            <Map
                itinerary={mockItinerary}
                selectedItem={mockSelectedItem}
                setSelectedRoute={mockSetSelectedRoute}
            />
        );

        // Check if the map container is rendered
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toBeInTheDocument();
    });

    it('renders markers for valid itinerary', () => {
        render(
            <Map
                itinerary={mockItinerary}
                selectedItem={mockSelectedItem}
                setSelectedRoute={mockSetSelectedRoute}
            />
        );

        // Check if markers are rendered by querying their class name
        const markers = screen.getAllByRole('button', { name: /📍/i }); // Query by the emoji in the marker
        expect(markers.length).toBe(2); // Two markers for "Start" and "End"
    });

    it('does not render if itinerary is empty', () => {
        render(
            <Map
                itinerary={[]}
                selectedItem={mockSelectedItem}
                setSelectedRoute={mockSetSelectedRoute}
            />
        );

        // Check if the "No itinerary data available" message is rendered
        expect(
            screen.getByText('No itinerary data available.')
        ).toBeInTheDocument();
    });
});
