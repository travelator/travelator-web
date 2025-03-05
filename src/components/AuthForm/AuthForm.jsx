import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AuthForm.css'; // Assuming you're using the same CSS for both

const AuthForm = ({ type, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for signup
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (type === 'signup' && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Pass the data up to the parent component
        onSubmit({ email, password });
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
                <div className="password-container">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {type === 'signup' && (
                    <>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="password-label">
                            Password must be at least 8 characters long and
                            contain at least one number.
                        </label>
                    </>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">
                    {type === 'signup' ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <div>
                {type === 'signup' ? (
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                ) : (
                    <p>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(['login', 'signup']).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
