import { useState } from 'react';
import './AuthForm.css'; // Assuming you're using the same CSS for both

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for signup
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === 'signup' && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Handle login/signup API calls here
        console.log(`${type === 'signup' ? 'Signing Up' : 'Logging In'} with`, email, password);

        // If successful, handle redirection or any other logic
        if (type === 'signup') {
            console.log('Redirecting to login page...');
        } else {
            console.log('Redirecting to home page...');
        }
    };

    return (
        <div className="auth-form-container">
            <h2>{type === 'signup' ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {type === 'signup' && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{type === 'signup' ? 'Sign Up' : 'Login'}</button>
            </form>

            <div>
                {type === 'signup' ? (
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                ) : (
                    <p>
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
