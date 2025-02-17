import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RingedIcon from '../../components/RingedIcon';
import { Close } from '@mui/icons-material';

describe('RingedIcon Component Tests', () => {
  it('should render with the provided icon and color', () => {
    render(<RingedIcon Icon={Close} color="red" />);
    const iconContainer = screen.getByTestId('ringed-icon');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveStyle({ color: 'rgb\(255, 0, 0\)' });
    });
}); 