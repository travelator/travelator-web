import { render, screen, fireEvent } from '@testing-library/react';
import RegenerateModal from '../../../pages/ItineraryTabs/RegenerateModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('RegenerateModal Component', () => {
    const mockHandleClose = vi.fn();
    const mockHandleRegenerate = vi.fn();

    const renderModal = (open = true) => {
        render(
            <RegenerateModal
                open={open}
                handleClose={mockHandleClose}
                handleRegenerate={mockHandleRegenerate}
            />
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the modal when open is true', () => {
        renderModal(true);

        // Verify modal title
        expect(screen.getByText('Regenerate Itinerary')).toBeInTheDocument();

        // Verify feedback text field
        expect(
            screen.getByPlaceholderText(
                'Itinerary feedback concerning e.g. timing, activity selection, number of activities, start and end point.'
            )
        ).toBeInTheDocument();

        // Verify regenerate button
        expect(
            screen.getByRole('button', { name: 'Regenerate' })
        ).toBeInTheDocument();
    });

    it('does not render the modal when open is false', () => {
        renderModal(false);

        // Verify modal is not in the document
        expect(
            screen.queryByText('Regenerate Itinerary')
        ).not.toBeInTheDocument();
    });

    it('updates the feedback text field when user types', async () => {
        renderModal(true);

        const feedbackInput = screen.getByPlaceholderText(
            'Itinerary feedback concerning e.g. timing, activity selection, number of activities, start and end point.'
        );
        fireEvent.change(feedbackInput, {
            target: { value: 'More activities needed' },
        });

        // Verify the input value is updated
        expect(feedbackInput.value).toBe('More activities needed');
    });

    it('calls handleRegenerate with feedback when the regenerate button is clicked', async () => {
        renderModal(true);

        const feedbackInput = screen.getByPlaceholderText(
            'Itinerary feedback concerning e.g. timing, activity selection, number of activities, start and end point.'
        );
        fireEvent.change(feedbackInput, {
            target: { value: 'More activities needed' },
        });

        const regenerateButton = screen.getByRole('button', {
            name: 'Regenerate',
        });
        fireEvent.click(regenerateButton);

        // Verify handleRegenerate is called with the correct feedback
        expect(mockHandleRegenerate).toHaveBeenCalledWith(
            'More activities needed'
        );
    });

    it('calls handleClose when the modal is closed', async () => {
        renderModal(true);

        // Simulate closing the modal (e.g., clicking outside the modal)
        const modalBackdrop = document.querySelector('.MuiBackdrop-root');
        fireEvent.click(modalBackdrop);

        // Verify handleClose is called
        expect(mockHandleClose).toHaveBeenCalled();
    });
});
