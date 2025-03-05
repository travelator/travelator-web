import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm/AuthForm';
import { clearItinerary, getItinerary } from '../hooks/LocalStorage';
import useApi from '../hooks/FetchApi';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { postData, loading } = useApi('login', false);
    const { checkAuthStatus } = useAuth();
    const { postData: saveData, loading: saveLoading } = useApi('save', false);

    const handleLogin = async (formData) => {
        try {
            console.log('Attempting login...');
            const response = await postData(formData, {
                credentials: 'include',
            });
            console.log('Login response:', response);

            if (response && response.token) {
                console.log('Login successful, checking auth status...');
                await checkAuthStatus();
                console.log('Navigating to user-trips...');
                // save the trip
                const savedItinerary = getItinerary();
                if (savedItinerary) {
                    try {
                        await saveData({ itinerary: savedItinerary });
                        clearItinerary();
                    } catch (err) {
                        console.error('Failed to save itinerary:', err);
                    }
                }
                navigate('/');
            } else {
                throw new Error('Invalid login credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = mapErrorToMessage(err);
            setError(errorMessage);
        }
    };

    const mapErrorToMessage = (err) => {
        if (err.response && err.response.status === 401) {
            return 'Incorrect username or password. Please try again.';
        }
        return 'Incorrect username or password. Please try again.';
    };

    return (
        <div className="login-page">
            <h1 className="login-header">Welcome Back</h1>
            <p className="login-subheader">Please login to continue</p>
            {error && (
                <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>
            )}
            <div className="login-form-wrapper">
                <AuthForm type="login" onSubmit={handleLogin} />
            </div>
            {(loading || saveLoading) && (
                <p style={{ marginTop: '20px' }}>Please wait...</p>
            )}
        </div>
    );
};

export default Login;
