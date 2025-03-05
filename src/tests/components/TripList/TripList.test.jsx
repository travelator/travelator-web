import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TripList from '../../../components/TripList/TripList';

const mockTrips = [
    {
        trip_id: 1,
        city: 'London',
        custom_name: 'Weekend in London',
        dateCreated: '2024-03-20',
        timeOfDay: ['morning', 'afternoon'],
        group: 'solo',
        itinerary: { activities: [] },
    },
    {
        trip_id: 2,
        city: 'Paris',
        custom_name: null,
        dateCreated: '2024-03-15',
        timeOfDay: ['evening'],
        group: 'couples',
        itinerary: { activities: [] },
    },
];

describe('TripList', () => {
    it('renders all trips', () => {
        render(
            <BrowserRouter>
                <TripList trips={mockTrips} />
            </BrowserRouter>
        );

        expect(screen.getByText('Weekend in London')).toBeInTheDocument();
        expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    it('filters trips by search term', () => {
        render(
            <BrowserRouter>
                <TripList trips={mockTrips} />
            </BrowserRouter>
        );

        const searchInput = screen.getByLabelText('Search trips');
        fireEvent.change(searchInput, { target: { value: 'London' } });

        expect(screen.getByText('Weekend in London')).toBeInTheDocument();
        expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    });

    it('shows "All Groups" correctly', () => {
        render(
            <BrowserRouter>
                <TripList trips={mockTrips} />
            </BrowserRouter>
        );

        const filterSelect = screen.getByLabelText('Filter by group');
        fireEvent.mouseDown(filterSelect);

        // Use role to specifically select the menu item
        const allOption = screen.getByRole('option', { name: 'All Groups' });
        fireEvent.click(allOption);

        expect(screen.getByText('Weekend in London')).toBeInTheDocument();
        expect(screen.getByText('Paris')).toBeInTheDocument();
    });
});
