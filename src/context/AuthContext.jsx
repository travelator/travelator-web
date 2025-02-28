import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('AuthProvider mounted, checking auth status...');
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        console.log('Checking auth status...');
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_AUTH_API_URL}validate`,
                {
                    method: 'GET',
                    credentials: 'include', // Important: sends cookies with request
                }
            );

            const data = await response.json();
            console.log('Auth status response:', data);

            // If we get back an email, the user is authenticated
            const newAuthState = !!data.email;
            console.log('Setting isAuthenticated to:', newAuthState);
            setIsAuthenticated((prevState) => {
                console.log(
                    'Previous auth state:',
                    prevState,
                    'New auth state:',
                    newAuthState
                );
                return newAuthState;
            });
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                checkAuthStatus,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
