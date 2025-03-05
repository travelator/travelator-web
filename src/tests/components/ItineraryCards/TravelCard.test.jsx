import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TravelCard from '../../../components/ItineraryCards/TravelCard'; // Adjust the import path if necessary

describe('TravelCard Component', () => {
    it('renders without crashing', () => {
        render(
            <TravelCard
                start="10:00 AM"
                end="11:00 AM"
                title="Morning Tube Ride"
                description="A nice tube ride through the city."
                price={10}
                theme="Tube"
            />
        );

        expect(screen.getByText('Morning Tube Ride')).toBeInTheDocument();
        expect(screen.getByText('Price: $10')).toBeInTheDocument();
        expect(
            screen.getByText('A nice tube ride through the city.')
        ).toBeInTheDocument();
    });

    it('renders the correct icon based on the theme', () => {
        const { rerender } = render(
            <TravelCard
                start="10:00 AM"
                end="11:00 AM"
                title="Morning Tube Ride"
                description="A nice tube ride through the city."
                price={10}
                theme="Tube"
            />
        );

        expect(screen.getByText('Mode: Tube')).toBeInTheDocument();

        rerender(
            <TravelCard
                start="10:00 AM"
                end="11:00 AM"
                title="Morning Walk"
                description="A pleasant walk around the park."
                price={5}
                theme="Walking"
            />
        );

        expect(screen.getByText('Mode: Walking')).toBeInTheDocument();
    });

    it('renders default icon when an invalid theme is provided', () => {
        render(
            <TravelCard
                start="10:00 AM"
                end="11:00 AM"
                title="Unknown Theme Trip"
                description="A mysterious journey."
                price={15}
                theme="Unknown"
            />
        );

        expect(screen.queryByRole('img')).toBeNull();
    });

    it('displays the correct price for free activities', () => {
        render(
            <TravelCard
                start="10:00 AM"
                end="11:00 AM"
                title="Free Event"
                description="Join us for a free event."
                price={0}
                theme="Walking"
            />
        );

        expect(screen.getByText('Price: $0')).toBeInTheDocument();
    });
});
