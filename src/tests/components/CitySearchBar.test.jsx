import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CitySearchBar from '../../components/CitySearchBar';

describe('CitySearchBar', () => {
  it('should render the CitySearchBar component', () => {
    render(<CitySearchBar selectedCity={null} setSelectedCity={() => {}} />);
    
    const inputElement = screen.getByLabelText(/search for a city/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call setSelectedCity when a city is selected', () => {
    const mockSetSelectedCity = vi.fn();
    const cities = [
      { city: 'London', country: 'United Kingdom', code: 'GB' },
      { city: 'Paris', country: 'France', code: 'fr' },
    ];

    render(
      <CitySearchBar
        selectedCity={null}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const inputElement = screen.getByLabelText(/search for a city/i);
    fireEvent.change(inputElement, { target: { value: 'London' } });

    // Simulate selecting a city
    const londonOption = screen.getByText(/London \(United Kingdom\)/i);
    fireEvent.click(londonOption);

    // Check if the mock function was called with the correct city
    expect(mockSetSelectedCity).toHaveBeenCalledWith({
      city: 'London',
      country: 'United Kingdom',
      code: 'GB',
    });
  });

  it('should display the selected city', () => {
    const selectedCity = { city: 'London', country: 'United Kingdom', code: 'GB' };

    render(
      <CitySearchBar
        selectedCity={selectedCity}
        setSelectedCity={() => {}}
      />
    );

    const inputElement = screen.getByLabelText(/search for a city/i);
    expect(inputElement).toHaveValue('London (United Kingdom)');
  });
  

  it('should update selectedCity when an option is selected', () => {
    const mockSetSelectedCity = vi.fn();
    const selectedCity = { city: 'London', country: 'UK', code: 'gb' };

    render(
      <CitySearchBar
        selectedCity={selectedCity}
        setSelectedCity={mockSetSelectedCity}
      />
    );

    const inputElement = screen.getByLabelText(/search for a city/i);
    fireEvent.change(inputElement, { target: { value: 'Paris' } });

    const parisOption = screen.getByText(/Paris \(France\)/i);
    fireEvent.click(parisOption);

    expect(mockSetSelectedCity).toHaveBeenCalledWith({
      city: 'Paris',
      country: 'France',
      code: 'FR',
    });
  });
});


