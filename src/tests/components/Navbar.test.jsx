import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../../components/Navbar/Navbar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component Tests', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('navigates to home page when home link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    
    // Check if the link has the correct href
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('maintains visibility across different routes', () => {
    render(
      <MemoryRouter initialEntries={['/some-route']}>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('keeps correct styling when active', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    );
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('navbar');
  });
}); 