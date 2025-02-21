import { beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';
import useApi from '../../hooks/FetchApi';

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

    it('should have disabled start button when no city is selected', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

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
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const searchInput = screen.getByLabelText(/search for a city/i);
        await user.type(searchInput, 'London');

        // Simulate selecting a city from the dropdown
        const londonOption = await screen.findByText(/London/i);
        await user.click(londonOption);

        const startButton = screen.getByRole('button', { name: /start/i });
        expect(startButton).toBeEnabled();
    });

    it('should navigate to rate page with selected city', async () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: false,
            postData: vi.fn(),
        });

        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

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

        expect(mockNavigate).toHaveBeenCalledWith('/rate/London');
    });

    it('should display loading message when loading', () => {
        useApi.mockReturnValue({
            activities: null,
            error: null,
            loading: true,
            postData: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();
    });

    it('should display error message when there is an error', () => {
        useApi.mockReturnValue({
            activities: null,
            error: new Error('Something went wrong'),
            loading: false,
            postData: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

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
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

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

        expect(mockPostData).toHaveBeenCalledWith({
            city: 'London',
            timeOfDay: 'morning',
            group: 'family',
        });
    });
});
