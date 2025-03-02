import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DateRangeComponent from '../../components/DatePicker/DateRangeComponent';

describe('DateRangeComponent', () => {
    it('should render the date input box', () => {
        render(<DateRangeComponent value={null} onChange={vi.fn()} />);
        const dateInput = screen.getByLabelText(/select date/i);
        expect(dateInput).toBeInTheDocument();
    });

    it('should open the calendar popup when date input is clicked', () => {
        render(<DateRangeComponent value={null} onChange={vi.fn()} />);
        const dateInput = screen.getByLabelText(/select date/i);
        fireEvent.click(dateInput);
        const calendarPopup = screen.getByRole('dialog');
        expect(calendarPopup).toBeInTheDocument();
    });

    it('should call onChange with the selected date', () => {
        const handleChange = vi.fn();
        render(<DateRangeComponent value={null} onChange={handleChange} />);
        const dateInput = screen.getByLabelText(/select date/i);
        fireEvent.click(dateInput);
        const dateOption = screen.getByText('15');
        fireEvent.click(dateOption);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
    });

    it('should close the calendar popup after selecting a date', () => {
        render(<DateRangeComponent value={null} onChange={vi.fn()} />);
        const dateInput = screen.getByLabelText(/select date/i);
        fireEvent.click(dateInput);
        const dateOption = screen.getByText('15');
        fireEvent.click(dateOption);
        const calendarPopup = screen.queryByRole('dialog');
        expect(calendarPopup).not.toBeInTheDocument();
    });
});
