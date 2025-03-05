// theme.test.js
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { describe, it, expect } from 'vitest';

// Import your custom theme
import theme from '../../../providers/theme'; // Adjust the import path as needed

describe('Custom Theme', () => {
    it('should apply the custom styles to MuiButton', () => {
        const { getByText } = render(
            <ThemeProvider theme={theme}>
                <Button>Test Button</Button>
            </ThemeProvider>
        );

        const button = getByText('Test Button');

        // Check if the textTransform style is applied correctly
        expect(button).toHaveStyle('text-transform: none');
    });
});
