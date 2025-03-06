import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AuthForm.css'; // Assuming you're using the same CSS for both

const AuthForm = ({ type, onSubmit, serverError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for signup
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [showValidationError, setShowValidationError] = useState(false);

    useEffect(() => {
        if (password) {
            const validationError = validatePassword(password);
            setPasswordError(validationError);
        }
    }, [password]);

    // Check if passwords match whenever either changes
    useEffect(() => {
        if (type === 'signup' && password && confirmPassword) {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
            } else {
                setError(null);
            }
        }
    }, [password, confirmPassword, type]);

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long.';
        }
        if (!hasNumber.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar.test(password)) {
            return 'Password must contain at least one special character.';
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowValidationError(true);

        if (type === 'signup') {
            if (passwordError) {
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
        }

        // If all validations pass, clear errors and submit the form
        setError(null);
        onSubmit({ email, password });
    };

    const isFormValid = () => {
        if (type === 'signup') {
            return (
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword &&
                !passwordError
            );
        } else {
            return email && password;
        }
    };

    const handlePasswordBlur = () => {
        if (password) {
            setShowValidationError(true);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (confirmPassword) {
            setShowValidationError(true);
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
                <div className="password-container">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
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
                            onBlur={handleConfirmPasswordBlur}
                            required
                        />
                        <label htmlFor="password" className="password-label">
                            Password must be at least 8 characters long and
                            contain at least one number and one special
                            character.
                        </label>
                    </>
                )}
                {/* Display client-side errors */}
                {showValidationError && error && (
                    <p className="error-message">{error}</p>
                )}
                {showValidationError && passwordError && (
                    <p className="error-message">{passwordError}</p>
                )}

                {/* Display server-side errors */}
                {serverError && <p className="error-message">{serverError}</p>}
                <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={!isFormValid() ? 'disabled-button' : ''}
                >
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
    serverError: PropTypes.string,
};

export default AuthForm;
