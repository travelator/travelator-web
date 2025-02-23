import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomToggle from '../../components/Toggles/CustomToggle';

describe('CustomToggle Component', () => {
    const options = [
        { value: 'morning', label: 'Morning' },
        { value: 'afternoon', label: 'Afternoon' },
        { value: 'evening', label: 'Evening' },
    ];

    it('should render with provided options', () => {
        const setSelected = vi.fn();
        render(<CustomToggle options={options} selected="morning" setSelected={setSelected} />);

        options.forEach(option => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it('should call setSelected with the correct value when an option is clicked', () => {
        const setSelected = vi.fn();
        render(<CustomToggle options={options} selected="morning" setSelected={setSelected} />);

        const afternoonButton = screen.getByText('Afternoon');
        fireEvent.click(afternoonButton);

        expect(setSelected).toHaveBeenCalledWith('afternoon');
    });

    it('should allow multiple selections when multiple is true', () => {
        const setSelected = vi.fn();
        render(<CustomToggle options={options} multiple={true} selected={['morning']} setSelected={setSelected} />);

        const afternoonButton = screen.getByText('Afternoon');
        fireEvent.click(afternoonButton);

        expect(setSelected).toHaveBeenCalledWith(['morning', 'afternoon']);
    });
});