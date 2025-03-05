import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor /*fireEvent*/ } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Rate from '../../pages/Rate';
import { AuthContext } from '../../context/AuthContext';
//import Itinerary from '../../pages/Itinerary';
import useApi from '../../hooks/FetchApi';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock useApi
vi.mock('../../hooks/FetchApi', () => ({
    __esModule: true,
    default: vi.fn(),
}));

describe('Rate Page Component', () => {
    /*beforeEach(() => {
        vi.clearAllMocks();
    });*/

    it('should display city name from URL parameter', async () => {
        useApi.mockReturnValue({
            activities: [],
            error: null,
            loading: false,
        });

        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <AuthContext.Provider value={{ isAuthenticated: true }}>
                    <Routes>
                        <Route path="/rate/:city" element={<Rate />} />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Rate activities in/i));

        expect(
            screen.getByText(/Rate activities in London/i)
        ).toBeInTheDocument();
    });

    it('should adjust visible cards based on container width', async () => {
        useApi.mockReturnValue({
            activities: [],
            error: null,
            loading: false,
        });

        console.log(useApi());

        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <AuthContext.Provider value={{ isAuthenticated: true }}>
                    <Routes>
                        <Route path="/rate/:city" element={<Rate />} />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByTestId('activity-cards-container'));

        const container = screen.getByTestId('activity-cards-container');
        expect(container).toBeInTheDocument();
        // Note: actual resizing behavior would need to be tested in an integration test
    });
    /*
    it('should move to the next page when all cards are rated', async () => {
        useApi.mockReturnValue({
            activities: [
                { title: 'Activity 1', description: 'Description 1', price: '10', theme: 'Adventure', url: 'test-image-1.jpg' },
                { title: 'Activity 2', description: 'Description 2', price: '20', theme: 'Relaxation', url: 'test-image-2.jpg' },
            ],
            error: null,
            loading: false,
        });

        render(
            <MemoryRouter initialEntries={['/rate/London']}>
                <Routes>
                    <Route path="/rate/:city" element={<Rate />} />
                    <Route path="/itinerary/:city" element={<Itinerary />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText(/Rate activities in/i));

        await waitFor(() => expect(screen.getByText('Activity 1')).toBeInTheDocument());

        const likeButtons = await screen.findAllByTestId('FavoriteIcon');
        const dislikeButtons = await screen.findAllByTestId('CloseIcon');

        // Simulate clicking all like buttons
        for (const button of likeButtons) {
            fireEvent.click(button);
        }

        // Simulate clicking all dislike buttons
        for (const button of dislikeButtons) {
            fireEvent.click(button);
        }

        // Wait for navigation to the itinerary page
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/itinerary/London'));
    }); */
});
