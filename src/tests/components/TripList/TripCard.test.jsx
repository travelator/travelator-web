import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TripCard from '../../../components/TripList/TripCard';
import { AuthContext } from '../../../context/AuthContext'; // Import the AuthContext

const mockTrip = {
    trip_id: 1,
    city: 'London',
    custom_name: 'Weekend in London',
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
    // Utility function to wrap component in the AuthContext.Provider
    const wrapper = ({ children }) => (
        <AuthContext.Provider value={{ isAuthenticated: true }}>
            <BrowserRouter>{children}</BrowserRouter>
        </AuthContext.Provider>
    );

    it('renders trip details correctly', () => {
        render(<TripCard trip={mockTrip} />, { wrapper });

        expect(screen.getByText('Weekend in London')).toBeInTheDocument();
        expect(screen.getByText('Family')).toBeInTheDocument();
        mockTrip.timeOfDay.forEach((time) => {
            expect(
                screen.getByText(new RegExp(`^${time}$`, 'i'))
            ).toBeInTheDocument();
        });
    });

    it('uses city name when no custom name is provided', () => {
        render(<TripCard trip={mockTripNoCustomName} />, { wrapper });

        expect(screen.getByText('Paris')).toBeInTheDocument();
    });
});
