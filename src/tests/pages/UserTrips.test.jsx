import { render, screen, waitFor } from '@testing-library/react';
import UserTrips from '../../pages/UserTrips';
import useApi from '../../hooks/FetchApi';
import { expect, vi, beforeEach, afterEach, test, describe } from 'vitest';

// Mock the useApi hook
vi.mock('../../hooks/FetchApi', () => ({
    default: vi.fn(),
}));

// Mock the getItinerary function
vi.mock('../../hooks/LocalStorage', () => ({
    getItinerary: vi.fn(),
}));

// Mock the Loading component
vi.mock('../../components/Loading', () => ({
    default: ({ text }) => <div>{text}</div>,
}));

// Mock the TripList component
vi.mock('../../components/TripList/TripList', () => ({
    default: ({ trips }) => (
        <div>
            {trips.map((trip) => (
                <div key={trip.id}>{trip.customName || trip.city}</div>
            ))}
        </div>
    ),
}));

describe('UserTrips Component', () => {
    const mockGetData = vi.fn();
    const mockPostData = vi.fn();

    beforeEach(() => {
        useApi.mockReturnValue({
            getData: mockGetData,
            postData: mockPostData,
            loading: false,
            error: null,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('displays loading spinner when fetching data', () => {
        useApi.mockReturnValue({
            getData: mockGetData,
            postData: mockPostData,
            loading: true,
            error: null,
        });

        render(<UserTrips />);
        expect(screen.getByText('Fetching activities')).toBeInTheDocument();
    });

    test('fetches and displays trips', async () => {
        const mockTrips = [
            {
                id: 1,
                customName: 'Trip 1',
                city: 'City 1',
                group: 'leisure',
                dateCreated: '2023-01-01',
                timeOfDay: ['morning'],
                itinerary: {},
            },
            {
                id: 2,
                customName: 'Trip 2',
                city: 'City 2',
                group: 'business',
                dateCreated: '2023-01-02',
                timeOfDay: ['afternoon'],
                itinerary: {},
            },
        ];
        mockGetData.mockResolvedValue({ trips: mockTrips });

        render(<UserTrips />);

        await waitFor(() => {
            expect(screen.getByText('Trip 1')).toBeInTheDocument();
            expect(screen.getByText('Trip 2')).toBeInTheDocument();
        });
    });

    test('displays no trips found message when no trips are returned', async () => {
        mockGetData.mockResolvedValue({ trips: [] });

        render(<UserTrips />);

        await waitFor(() => {
            expect(screen.getByText('No trips found!')).toBeInTheDocument();
        });
    });
});
