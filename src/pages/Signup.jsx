import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import useApi from '../hooks/FetchApi';
import '../styles/Login.css'; // Reusing the same CSS for consistency

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { postData, loading } = useApi('register', false);

    const handleSignup = async (formData) => {
        try {
            const response = await postData(formData);
            console.log('Signup response:', response);

            if (
                response.message === 'User registered successfully' ||
                response.message ===
                    'User registered and logged in successfully'
            ) {
                navigate('/');
            } else {
                throw new Error('Failed to register. Please try again later.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            const errorMessage = mapErrorToMessage(err);
            setError(errorMessage);
        }
    };

    const mapErrorToMessage = (err) => {
        if (err.response && err.response.status === 400) {
            return 'Failed to register, maybe an account with this email already exists? Please log in or try again.';
        }
        return 'Failed to register. Please try again later.';
    };

    if (loading) {
        return <div>Creating your account...</div>;
    }

    return (
        <div className="login-page">
            <h1 className="login-header">Join Us</h1>
            <p className="login-subheader">Create an account to get started</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="login-form-wrapper">
                <AuthForm type="signup" onSubmit={handleSignup} />
            </div>
        </div>
    );
};

export default Signup;
