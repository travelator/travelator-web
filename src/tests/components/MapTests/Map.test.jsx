import { render, screen, waitFor } from '@testing-library/react';
import Map from '../../../components/Map/map';
import { describe, it, expect, vi } from 'vitest';
import { AuthProvider } from '../../../context/AuthContext';

// Mock the entire react-leaflet module
vi.mock('react-leaflet', async () => {
    const actual = await vi.importActual('react-leaflet');
    return {
        ...actual,
        MapContainer: vi.fn(({ children }) => <div>{children}</div>),
        TileLayer: vi.fn(() => null),
        Marker: vi.fn(({ children }) => (
            <div data-testid="mock-marker">{children}</div>
        )),
        Popup: vi.fn(({ children }) => <div>{children}</div>),
        useMap: vi.fn(() => ({
            flyTo: vi.fn(),
        })),
    };
});

// Mock createCustomPin
vi.mock('../../../components/Map/CustomPin', () => ({
    default: vi.fn(() => null),
}));

// Mock DirectionsLayer
vi.mock('../../../components/Map/DirectionsLayer', () => ({
    default: vi.fn(() => null),
}));

const mockItinerary = [
    {
        latitude: 51.505,
        longitude: -0.09,
        title: 'Start',
        description: 'Start point',
        price: 0,
        duration: 0,
        transport: false,
    },
    {
        latitude: 51.51,
        longitude: -0.1,
        title: 'End',
        description: 'End point',
        price: 0,
        duration: 0,
        transport: false,
    },
];

const mockSelectedItem = { latitude: 51.505, longitude: -0.09 };
const mockSetSelectedRoute = vi.fn();

describe('Map Component', () => {
    it('renders without crashing', async () => {
        const { container } = render(
            <AuthProvider>
                <Map
                    itinerary={mockItinerary}
                    selectedItem={mockSelectedItem}
                    setSelectedRoute={mockSetSelectedRoute}
                />
            </AuthProvider>
        );

        // Log the entire container content for debugging
        console.log('Container content:', container.innerHTML);

        await waitFor(
            () => {
                const markers = screen.getAllByTestId('mock-marker');
                expect(markers.length).toBeGreaterThan(0);
            },
            { timeout: 2000 }
        );
    });

    it('does not render if itinerary is empty', async () => {
        const { container } = render(
            <AuthProvider>
                <Map
                    itinerary={[]}
                    selectedItem={mockSelectedItem}
                    setSelectedRoute={mockSetSelectedRoute}
                />
            </AuthProvider>
        );

        // Log the entire container content for debugging
        console.log('Empty itinerary container content:', container.innerHTML);

        await waitFor(
            () => {
                const noDataMessage = screen.getByText(
                    /No itinerary data available/i
                );
                expect(noDataMessage).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });
});
