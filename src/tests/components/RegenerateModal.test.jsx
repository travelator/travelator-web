import { render, screen } from '@testing-library/react';
import RegenerateModal from '../../components/Modal/RegenerateModal';
import { describe, it, expect, vi } from 'vitest';

//Mock the modalConfig
vi.mock('./config', () => ({
    default: {
        key1: {
            title: 'Regenerate Title',
            feedbackLabel: 'Feedback Label',
            feedbackPlaceholder: 'Enter your feedback',
            feedbackDescription: 'Please provide detailed feedback.',
            buttonText: 'Regenerate',
        },
    },
}));

// Mock the props
const mockProps = {
    open: true,
    handleClose: vi.fn(),
    handleRegenerate: vi.fn(),
    configKey: 'key1', // Ensure this matches the key in the mocked modalConfig
};

describe('RegenerateModal', () => {
    it('does not render the modal when open is false', () => {
        render(<RegenerateModal {...mockProps} open={false} />);

        // Check if the modal is not rendered
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
});
