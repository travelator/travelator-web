import { render, screen, waitFor } from '@testing-library/react';
import Map from '../../../components/Map/map';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider } from '../../../context/AuthContext';

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
    it('renders without crashing', async () => {
        render(
            <AuthProvider>
                <Map
                    itinerary={mockItinerary}
                    selectedItem={mockSelectedItem}
                    setSelectedRoute={mockSetSelectedRoute}
                />
            </AuthProvider>
        );

        await waitFor(() => screen.getByTestId('map-container'));

        // Check if the map container is rendered
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toBeInTheDocument();
    });

    it('does not render if itinerary is empty', async () => {
        render(
            <AuthProvider>
                <Map
                    itinerary={[]}
                    selectedItem={mockSelectedItem}
                    setSelectedRoute={mockSetSelectedRoute}
                />
            </AuthProvider>
        );

        // Check if the "No itinerary data available" message is rendered
        const noDataMessage = await screen.findByText(
            'No itinerary data available.'
        );
        expect(noDataMessage).toBeInTheDocument();
    });
});
