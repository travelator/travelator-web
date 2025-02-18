import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Home Page Functionality', () => {
  it('should have disabled start button when no city is selected', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeDisabled();
  });

  it('should enable start button when city is selected', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/search for a city/i);
    await user.type(searchInput, 'London');
    
    // Simulate selecting a city from the dropdown
    const londonOption = await screen.findByText(/London/i);
    await user.click(londonOption);

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeEnabled();
  });

  it('should navigate to rate page with selected city', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Select a city
    const searchInput = screen.getByLabelText(/search for a city/i);
    await user.type(searchInput, 'London');
    const londonOption = await screen.findByText(/London/i);
    await user.click(londonOption);

    // Submit the form
    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);

    expect(mockNavigate).toHaveBeenCalledWith('/rate/London');
  });
}); 