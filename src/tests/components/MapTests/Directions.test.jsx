// Import PropTypes first
import PropTypes from 'prop-types';

// Define mocks before any imports that use them
// Create the mock function outside of the mock definition
const postDataMock = vi.fn();

// Mock modules
vi.mock('react-leaflet', () => {
    const MockPolyline = ({ children, positions, color, onClick }) => (
        <div
            data-testid="polyline"
            data-positions={JSON.stringify(positions)}
            data-color={color}
            onClick={onClick}
        >
            {children}
        </div>
    );

    const MockPopup = ({ children }) => (
        <div data-testid="popup">{children}</div>
    );

    // Add PropTypes to fix linting errors
    MockPolyline.propTypes = {
        children: PropTypes.node,
        positions: PropTypes.array.isRequired,
        color: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    MockPopup.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return {
        Polyline: MockPolyline,
        Popup: MockPopup,
    };
});

// Mock useApi hook - use a simple implementation
vi.mock('../../../hooks/FetchApi', () => ({
    default: () => ({
        postData: postDataMock,
    }),
}));

// Now import everything else
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Directions from '../../../components/Map/Directions';

describe('Directions Component', () => {
    const defaultProps = {
        origin: [40.7128, -74.006],
        destination: [34.0522, -118.2437],
        mode: 'driving',
        color: 'blue',
        onClick: vi.fn(),
    };

    const sampleRoute = [
        [40.7128, -74.006],
        [40.7129, -74.007],
        [40.713, -74.008],
        [34.0522, -118.2437],
    ];

    const mockApiResponse = {
        routes: [
            {
                polyline: sampleRoute,
            },
        ],
    };

    // Mock sessionStorage
    let sessionStorageMock;

    beforeEach(() => {
        vi.clearAllMocks();
        postDataMock.mockReset();

        // Reset sessionStorage mock for each test
        sessionStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
        };
        Object.defineProperty(window, 'sessionStorage', {
            value: sessionStorageMock,
            writable: true,
        });

        // Mock timers
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should not render anything when route is not available', async () => {
        // Setup
        postDataMock.mockResolvedValue({ routes: [] });

        // Render
        const { container } = render(<Directions {...defaultProps} />);

        // Advance timer to trigger the debounced API call
        vi.advanceTimersByTime(1000);

        // Wait for the promise to resolve
        await vi.runAllTimersAsync();

        // Assert
        expect(container.querySelector('[data-testid="polyline"]')).toBeNull();
    }, 10000);

    it('should fetch and render route when valid props are provided', async () => {
        // Setup
        postDataMock.mockResolvedValue(mockApiResponse);

        // Render
        render(<Directions {...defaultProps} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for promises to resolve
        await vi.runAllTimersAsync();

        // Assert API call
        expect(postDataMock).toHaveBeenCalledWith({
            origin: defaultProps.origin,
            destination: defaultProps.destination,
            mode: defaultProps.mode,
        });

        // Assert UI rendering
        const polyline = screen.queryByTestId('polyline');
        expect(polyline).toBeTruthy();
        expect(polyline.getAttribute('data-color')).toBe('blue');
        expect(JSON.parse(polyline.getAttribute('data-positions'))).toEqual(
            sampleRoute
        );
    }, 10000);

    it('should use cached route when available', async () => {
        // Setup - mock cached data
        const cacheKey = `directions_${defaultProps.origin.join(',')}_${defaultProps.destination.join(',')}_${defaultProps.mode}`;
        sessionStorageMock.getItem.mockReturnValue(JSON.stringify(sampleRoute));

        // Render
        const { rerender } = render(<Directions {...defaultProps} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for promises
        await vi.runAllTimersAsync();

        // Force a re-render to ensure the component processes the cached data
        rerender(<Directions {...defaultProps} />);

        // Advance timer again
        vi.advanceTimersByTime(1000);

        // Wait for promises again
        await vi.runAllTimersAsync();

        // Assert cache was checked
        expect(sessionStorageMock.getItem).toHaveBeenCalledWith(cacheKey);

        // Assert API was not called (used cache)
        expect(postDataMock).not.toHaveBeenCalled();

        // Assert UI rendering
        const polyline = screen.queryByTestId('polyline');
        expect(polyline).toBeTruthy();
    }, 10000);

    it('should cache the fetched route', async () => {
        // Setup
        postDataMock.mockResolvedValue(mockApiResponse);

        // Render
        render(<Directions {...defaultProps} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for promises
        await vi.runAllTimersAsync();

        // Calculate cache key
        const cacheKey = `directions_${defaultProps.origin.join(',')}_${defaultProps.destination.join(',')}_${defaultProps.mode}`;

        // Assert cache was set
        expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
            cacheKey,
            JSON.stringify(sampleRoute)
        );
    }, 10000);

    it('should handle API errors gracefully', async () => {
        // Setup
        const error = new Error('API Error');
        postDataMock.mockRejectedValue(error);
        const consoleSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        // Render
        render(<Directions {...defaultProps} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for promises
        await vi.runAllTimersAsync();

        // Assert error handling
        expect(postDataMock).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Error fetching directions:',
            error
        );

        // Cleanup
        consoleSpy.mockRestore();
    }, 10000);

    it('should handle invalid cached data gracefully', async () => {
        // Setup
        const cacheKey = `directions_${defaultProps.origin.join(',')}_${defaultProps.destination.join(',')}_${defaultProps.mode}`;
        sessionStorageMock.getItem.mockReturnValue('invalid-json');
        postDataMock.mockResolvedValue(mockApiResponse);
        const consoleSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        // Render
        render(<Directions {...defaultProps} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for promises
        await vi.runAllTimersAsync();

        // Assert cache error handling
        expect(sessionStorageMock.getItem).toHaveBeenCalledWith(cacheKey);
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to parse cached route:',
            expect.any(Error)
        );

        // Assert fallback to API
        expect(postDataMock).toHaveBeenCalled();

        // Cleanup
        consoleSpy.mockRestore();
    }, 10000);

    it('should not fetch when origin or destination is invalid', async () => {
        // Render with invalid props
        render(<Directions {...defaultProps} origin={null} />);

        // Advance timer
        vi.advanceTimersByTime(1000);

        // Wait for any potential promises
        await vi.runAllTimersAsync();

        // Assert no API call
        expect(postDataMock).not.toHaveBeenCalled();
    }, 10000);
});
