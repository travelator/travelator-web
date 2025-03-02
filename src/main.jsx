import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { FactsProvider } from './providers/FactsProvider';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <FactsProvider>
                <RouterProvider router={router} />
            </FactsProvider>
        </AuthProvider>
    </StrictMode>
);
