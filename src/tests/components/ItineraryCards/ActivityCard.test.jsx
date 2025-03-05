import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActivityCard from '../../../components/ItineraryCards/ActivityCard';

describe('ActivityCard Component', () => {
    const mockHandleSwapClick = vi.fn();

    it('renders without crashing', () => {
        render(
            <ActivityCard
                title="Amazing Activity"
                start="10:00 AM"
                end="12:00 PM"
                description="This is an exciting activity."
                price={20}
                theme="Adventure"
                id={1}
                handleSwapClick={mockHandleSwapClick}
                link="https://example.com"
                url={['https://example.com/image1.jpg']}
            />
        );

        expect(screen.getByText('Amazing Activity')).toBeInTheDocument();
        expect(
            screen.getByText('This is an exciting activity.')
        ).toBeInTheDocument();
        expect(screen.getByText('£20')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            'https://example.com/image1.jpg'
        );
    });

    it('displays the correct price for free activities', () => {
        render(
            <ActivityCard
                title="Free Activity"
                start="10:00 AM"
                end="12:00 PM"
                description="This is a free activity."
                price={0}
                theme="Free"
                id={1}
                handleSwapClick={mockHandleSwapClick}
                link="https://example.com"
                url={['https://example.com/image1.jpg']}
            />
        );

        expect(screen.getByText('FREE')).toBeInTheDocument();
    });

    it('calls handleSwapClick when the Swap button is clicked', () => {
        render(
            <ActivityCard
                title="Swap Activity"
                start="10:00 AM"
                end="12:00 PM"
                description="Activity to swap."
                price={20}
                theme="Adventure"
                id={1}
                handleSwapClick={mockHandleSwapClick}
                link="https://example.com"
                url={['https://example.com/image1.jpg']}
            />
        );

        fireEvent.click(screen.getByText('Swap'));
        expect(mockHandleSwapClick).toHaveBeenCalledWith(1);
    });
});
