import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TripCard from '../../../components/TripList/TripCard';

const mockTrip = {
    id: 1,
    city: 'London',
    customName: 'Weekend in London',
    dateCreated: '2024-03-20',
    timeOfDay: ['morning', 'afternoon'],
    group: 'family',
    itinerary: { activities: [] },
};

const mockTripNoCustomName = {
    id: 2,
    city: 'Paris',
    customName: null,
    dateCreated: '2024-03-15',
    timeOfDay: ['evening'],
    group: 'couples',
    itinerary: { activities: [] },
};

describe('TripCard', () => {
    it('renders trip details correctly', () => {
        render(
            <BrowserRouter>
                <TripCard trip={mockTrip} />
            </BrowserRouter>
        );

        expect(screen.getByText('Weekend in London')).toBeInTheDocument();
        expect(screen.getByText('family')).toBeInTheDocument();
        mockTrip.timeOfDay.forEach((time) => {
            expect(screen.getByText(time)).toBeInTheDocument();
        });
    });

    it('uses city name when no custom name is provided', () => {
        render(
            <BrowserRouter>
                <TripCard trip={mockTripNoCustomName} />
            </BrowserRouter>
        );

        expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    it('allows editing the trip name', async () => {
        render(
            <BrowserRouter>
                <TripCard trip={mockTrip} />
            </BrowserRouter>
        );

        // Click edit button
        const editButton = screen.getByTestId('EditIcon').parentElement;
        fireEvent.click(editButton);

        // Find input and change value
        const input = screen.getByPlaceholderText('Enter custom name');
        fireEvent.change(input, { target: { value: 'New Trip Name' } });

        // Press Enter to save and wait for edit mode to end
        fireEvent.keyPress(input, {
            key: 'Enter',
            code: 'Enter',
            charCode: 13,
        });

        // Use findByText instead of getByText to wait for the update
        expect(await screen.findByText('New Trip Name')).toBeInTheDocument();
    });

    it('cancels editing when clicking outside', () => {
        render(
            <BrowserRouter>
                <TripCard trip={mockTrip} />
            </BrowserRouter>
        );

        // Click edit button
        const editButton = screen.getByTestId('EditIcon').parentElement;
        fireEvent.click(editButton);

        // Find input and change value
        const input = screen.getByPlaceholderText('Enter custom name');
        fireEvent.change(input, { target: { value: 'New Trip Name' } });

        // Click outside (blur)
        fireEvent.blur(input);

        // Check if new name is displayed
        expect(screen.getByText('New Trip Name')).toBeInTheDocument();
    });
});
