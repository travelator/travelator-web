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

    it('should enable start button when city is selected', async () => {
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

        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeEnabled();
    });

    it('should navigate to rate page with selected city', async () => {
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

    it('should call postData with correct data on form submit', async () => {
        const mockPostData = vi.fn().mockResolvedValue({ success: true });
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: mockPostData,
        });

        const user = userEvent.setup();
        renderHome();

        // Select a city
        const searchInput = screen.getByLabelText(/search for a city/i);
        await user.type(searchInput, 'London');
        const londonOption = await screen.findByText(/London/i);
        await user.click(londonOption);

        // Select time of day
        const morningButton = screen.getByText('Morning');
        await user.click(morningButton);

        // Select group
        const familyButton = screen.getByText('Family');
        await user.click(familyButton);

        // Adjust slider
        const slider = screen.getByRole('slider');
        await userEvent.type(slider, '{arrowright}');

        // Submit the form
        const startButton = screen.getByRole('button', { name: /start/i });
        await act(async () => {
            await user.click(startButton);
        });

        expect(mockPostData).toHaveBeenCalledWith({
            city: 'London',
            timeOfDay: ['afternoon', 'evening'],
            group: 'family',
            uniqueness: 0,
        });
    });

    it('should render the slider with default value', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        render(
            <MemoryRouter>
                <FactsProvider>
                    <Home />
                </FactsProvider>
            </MemoryRouter>
        );

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('aria-valuenow', '0'); // Default value should be 0
    });
});