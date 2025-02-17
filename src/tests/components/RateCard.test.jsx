import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RateCard from '../../components/RateCard/RateCard';

describe('RateCard Component Tests', () => {
  const mockProps = {
    title: 'Test Activity',
    description: 'Test Description',
    url: 'test-image.jpg'
  };

  it('should render with provided props', () => {
    render(<RateCard {...mockProps} />);
    
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute('src', mockProps.url);
  });

  it('should render like and dislike icons', () => {
    render(<RateCard {...mockProps} />);
    
    const icons = screen.getAllByTestId('ringed-icon');
    expect(icons).toHaveLength(2);
  });
}); 