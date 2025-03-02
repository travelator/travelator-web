import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { FactsProvider } from './providers/FactsProvider';
import { ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import theme from './providers/theme';
import router from './routes';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <FactsProvider>
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </FactsProvider>
        </AuthProvider>
    </StrictMode>
);
