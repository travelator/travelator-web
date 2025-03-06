import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../../pages/Layout';
import { describe, it, expect, vi } from 'vitest';

// Mock the Navbar component
vi.mock('../../components/Navbar/Navbar', () => ({
    default: () => <div>Navbar Mock</div>,
}));

// Mock a component to be rendered by Outlet
const MockOutletComponent = () => <div>Outlet Content</div>;

describe('Layout Component', () => {
    it('renders the Navbar and Outlet components', () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<MockOutletComponent />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        // Verify Navbar is rendered
        expect(screen.getByText('Navbar Mock')).toBeInTheDocument();

        // Verify Outlet content is rendered
        expect(screen.getByText('Outlet Content')).toBeInTheDocument();
    });
});
