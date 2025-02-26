import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TripList from '../../../components/TripList/TripList';

const mockTrips = [
    {
        id: 1,
        city: "London",
        customName: "Weekend in London",
        dateCreated: "2024-03-20",
        timeOfDay: ["morning", "afternoon"],
        group: "family",
        itinerary: { activities: [] }
    },
    {
        id: 2,
        city: "Paris",
        customName: null,
        dateCreated: "2024-03-15",
        timeOfDay: ["evening"],
        group: "couples",
        itinerary: { activities: [] }
    }
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

    it('filters trips by group', () => {
        render(
            <BrowserRouter>
                <TripList trips={mockTrips} />
            </BrowserRouter>
        );

        const filterSelect = screen.getByLabelText('Filter by group');
        fireEvent.mouseDown(filterSelect);
        const familyOption = screen.getByText('Family');
        fireEvent.click(familyOption);

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