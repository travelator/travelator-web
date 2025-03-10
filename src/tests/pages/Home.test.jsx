import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';
import useApi from '../../hooks/FetchApi';
import { FactsProvider } from '../../providers/FactsProvider';

// Mock the useNavigate hook
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock the useApi hook
vi.mock('../../hooks/FetchApi', () => ({
    __esModule: true,
    default: vi.fn(),
}));

describe('Home Page Functionality', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();
    });

    const renderHome = () => {
        render(
            <MemoryRouter>
                <FactsProvider>
                    <Home />
                </FactsProvider>
            </MemoryRouter>
        );
    };

    it('should have disabled start button when no city is selected', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        renderHome();

        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeDisabled();
    });

    it('should enable start button when city and time of day is selected', async () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        const user = userEvent.setup();
        renderHome();

        const searchInput = screen.getByLabelText(/search for a city/i);
        await user.type(searchInput, 'London');

        // Simulate selecting a city from the dropdown
        const londonOption = await screen.findByText(/London/i);
        await user.click(londonOption);

        const morningToggle = screen.getByRole('button', { name: /morning/i });
        await user.click(morningToggle);

        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeEnabled();
    });

    it('should navigate to rate page with selected city and time of dady', async () => {
        const mockPostData = vi
            .fn()
            .mockResolvedValue({ activities: ['Activity 1'] });

        const mockGetData = vi.fn().mockResolvedValue({ facts: ['Fact'] });

        // Mock the useApi hook to return the mocked postData function
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: mockPostData, // Ensure postData is mocked here
            getData: mockGetData,
        });

        const user = userEvent.setup();
        renderHome();

        // Select a city
        const searchInput = screen.getByLabelText(/search for a city/i);
        await user.type(searchInput, 'London');
        const londonOption = await screen.findByText(/London/i);
        await user.click(londonOption);

        // Select a time of day (e.g., "Morning")
        const morningToggle = screen.getByRole('button', { name: /morning/i });
        await user.click(morningToggle);

        // Submit the form
        const startButton = screen.getByRole('button', { name: /start/i });
        await act(async () => {
            await user.click(startButton);
        });

        // Ensure navigation was called
        expect(mockNavigate).toHaveBeenCalled();
    });

    it('should display loading message when loading', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: true,
            postData: vi.fn(),
        });

        renderHome();

        const startButton = screen.queryByRole('button', { name: /start/i });
        expect(startButton).not.toBeInTheDocument();
    });

    it('should display error message when there is an error', () => {
        useApi.mockReturnValue({
            activities: null,
            error: new Error('Something went wrong'),
            loading: false,
            postData: vi.fn(),
        });

        renderHome();

        const errorMessage = screen.getByText(/Error: Something went wrong/i);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should render the slider with default value', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        renderHome();

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('aria-valuenow', '0'); // Default value should be 0
    });
});
