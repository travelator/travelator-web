import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm/AuthForm';
import useApi from '../hooks/FetchApi';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { postData, loading } = useApi('login', false);
    const { setIsAuthenticated, checkAuthStatus } = useAuth();

    const handleLogin = async (formData) => {
        try {
            console.log('Attempting login...');
            const response = await postData(formData);
            console.log('Login response:', response);
            
            if (response.token) {
                console.log('Login successful, checking auth status...');
                await checkAuthStatus();
                console.log('Navigating to user-trips...');
                navigate('/user-trips');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login');
        }
    };

    if (loading) {
        return <div>Logging in...</div>;
    }

    return (
        <div className="login-page">
            <h1 className="login-header">Welcome Back</h1>
            <p className="login-subheader">Please login to continue</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="login-form-wrapper">
                <AuthForm type="login" onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default Login;
