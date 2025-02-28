import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CitySearchBar from '../../components/CitySearchBar';

// Mock city data
const mockCities = [
    { city: 'London', country: 'United Kingdom', code: 'GB' },
    { city: 'Paris', country: 'France', code: 'FR' },
];

// Mock the MUI Autocomplete component
vi.mock('@mui/material/Autocomplete', () => ({
    default: ({ options, value, onChange, renderInput }) => {
        const displayValue = value ? `${value.city} (${value.country})` : '';
        return (
            <div>
                {renderInput({
                    inputProps: {
                        'aria-label': 'search for a city',
                        value: displayValue,
                    },
                })}
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => onChange(null, option)}
                            data-testid="city-option"
                        >
                            {`${option.city} (${option.country})`}
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
}));

describe('CitySearchBar', () => {
    it('should render the CitySearchBar component', () => {
        render(
            <CitySearchBar selectedCity={null} setSelectedCity={() => {}} />
        );

        const inputElement = screen.getByLabelText(/search for a city/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('should call setSelectedCity when a city is selected', async () => {
        const mockSetSelectedCity = vi.fn();

        render(
            <CitySearchBar
                selectedCity={null}
                setSelectedCity={mockSetSelectedCity}
            />
        );

        const inputElement = screen.getByLabelText(/search for a city/i);
        fireEvent.change(inputElement, { target: { value: 'London' } });

        // Wait for and click the London option
        const londonOption = await screen.findByText(
            /London \(United Kingdom\)/i
        );
        fireEvent.click(londonOption);

        // Check if the mock function was called with the correct city
        expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCities[0]);
    });

    it('should display the selected city', () => {
        const selectedCity = mockCities[0];

        render(
            <CitySearchBar
                selectedCity={selectedCity}
                setSelectedCity={() => {}}
            />
        );

        const inputElement = screen.getByLabelText(/search for a city/i);
        expect(inputElement).toHaveValue('London (United Kingdom)');
    });

    it('should update selectedCity when an option is selected', async () => {
        const mockSetSelectedCity = vi.fn();
        const selectedCity = mockCities[0];

        render(
            <CitySearchBar
                selectedCity={selectedCity}
                setSelectedCity={mockSetSelectedCity}
            />
        );

        const inputElement = screen.getByLabelText(/search for a city/i);
        fireEvent.change(inputElement, { target: { value: 'Paris' } });

        // Wait for and click the Paris option
        const parisOption = await screen.findByText(/Paris \(France\)/i);
        fireEvent.click(parisOption);

        expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCities[1]);
    });
});
