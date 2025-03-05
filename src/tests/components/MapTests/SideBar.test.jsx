import SideBar from '../../../components/Map/SideBar';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

const mockItinerary = [
    { title: 'Start', start: '10:00', end: '10:30' },
    { transport: true, transportMode: 'walking', start: '10:30', end: '11:00' },
    { title: 'End', start: '11:00', end: '11:30' },
];

const mockOnSelectItem = vi.fn();
const mockSelectedItem = mockItinerary[0];
const mockSelectedRoute = mockItinerary[1];

describe('SideBar Component', () => {
    it('renders without crashing', () => {
        render(
            <SideBar
                itinerary={mockItinerary}
                onSelectItem={mockOnSelectItem}
                selectedItem={mockSelectedItem}
                selectedRoute={mockSelectedRoute}
            />
        );
        expect(screen.getByText('Itinerary')).toBeInTheDocument();
    });

    it('renders selected route details', () => {
        render(
            <SideBar
                itinerary={mockItinerary}
                onSelectItem={mockOnSelectItem}
                selectedItem={mockSelectedItem}
                selectedRoute={mockSelectedRoute}
            />
        );

        // Check for the "Selected Route" heading
        expect(screen.getByText('Selected Route')).toBeInTheDocument();

        // Check for the "Mode: walking" text
        const modeElement = screen.getByText(/Mode:/i).closest('div');
        expect(modeElement).toHaveTextContent('Mode: walking');

        // Check for the "From: 10:30" text
        const fromElement = screen.getByText(/From:/i).closest('div');
        expect(fromElement).toHaveTextContent('From: 10:30');

        // Check for the "To: 11:00" text
        const toElement = screen.getByText(/To:/i).closest('div');
        expect(toElement).toHaveTextContent('To: 11:00');
    });
});
