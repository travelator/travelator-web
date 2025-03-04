import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DateRangeComponent from '../../components/DatePicker/DateRangeComponent';

describe('DateRangeComponent', () => {
    it('should render the date input and label', () => {
        render(
            <DateRangeComponent selectedDate={null} setSelectedDate={vi.fn()} />
        );

        const label = screen.getByText(/select date \(optional\)/i);
        const dateInput = screen.getByRole('textbox');

        expect(label).toBeInTheDocument();
        expect(dateInput).toBeInTheDocument();
    });

    it('should render with calendar icon', () => {
        render(
            <DateRangeComponent selectedDate={null} setSelectedDate={vi.fn()} />
        );

        // Find the calendar icon - we're using a class selector since the icon might not have an accessible role
        const calendarIcon = document.querySelector('.calendar-icon');

        expect(calendarIcon).toBeInTheDocument();
    });
});
