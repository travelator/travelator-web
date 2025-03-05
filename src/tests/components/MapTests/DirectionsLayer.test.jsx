import { render } from '@testing-library/react';
import DirectionsLayer from '../../../components/Map/DirectionsLayer';
import { describe, it, expect, vi } from 'vitest';

const mockItinerary = [
    { latitude: 51.505, longitude: -0.09 },
    { transport: true, transportMode: 'walking' },
    { latitude: 51.51, longitude: -0.1 },
];

const mockSetSelectedRoute = vi.fn();
const mockGetColor = vi.fn().mockReturnValue('blue');

describe('DirectionsLayer Component', () => {
    it('renders without crashing', () => {
        render(
            <DirectionsLayer
                itinerary={mockItinerary}
                setSelectedRoute={mockSetSelectedRoute}
                getColor={mockGetColor}
            />
        );
    });

    it('does not render if itinerary is invalid', () => {
        const { container } = render(
            <DirectionsLayer
                itinerary={[]}
                setSelectedRoute={mockSetSelectedRoute}
                getColor={mockGetColor}
            />
        );
        expect(container.firstChild).toBeNull();
    });
});
