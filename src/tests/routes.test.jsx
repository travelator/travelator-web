import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';  
import router from '../routes'; 
import Home from '../pages/Home';
import Rate from '../pages/Rate';
import Itinerary from '../pages/Itinerary';


describe('Routes Tests', () => {
  it('should render home page at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Check for something you know exists on your home page
    expect(screen.getByText(/Voya/i)).toBeInTheDocument();
  });

  it('should render rate page at /rate', () => {
    render(
      <MemoryRouter initialEntries={['/rate']}>
        <Routes>
          <Route path="/rate" element={<Rate />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Preparing itinerary for/i)).toBeInTheDocument();
    expect(screen.getByText(/Rate the activities while you wait to update your preferences/i)).toBeInTheDocument();
  });

  it('should render itinerary page at /itinerary', () => {
    render(
      <MemoryRouter initialEntries={['/itinerary']}>
        <Routes>
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText(/See your itinerary/i)).toBeInTheDocument();
    expect(screen.getByText(/See itinerary results here./i)).toBeInTheDocument();
  });
  
  it('should handle 404 for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/some-random-route']}>
        <RouterProvider router={router} /> 
      </MemoryRouter>
    );
    // Check for your 404 page content
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
  
});
