import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AuthForm.css'; // Assuming you're using the same CSS for both

const AuthForm = ({ type, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Only for signup
    const [error, setError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if form was attempted to be submitted
    const [showValidationError, setShowValidationError] = useState(false);

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
        setIsSubmitted(true); // Mark form as attempted to be submitted

        if (type === 'signup') {
            const passwordValidationError = validatePassword(password);
            if (passwordValidationError) {
                setPasswordError(passwordValidationError);
                setShowValidationError(true);
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match');
                setShowValidationError(true);
                return;
            }
        }

        // If all validations pass, clear errors and submit the form
        setError(null);
        setPasswordError(null);
        setShowValidationError(false);
        onSubmit({ email, password });
    };

    const isFormValid = () => {
        if (type === 'signup') {
            const passwordValidationError = validatePassword(password);
            return (
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword &&
                !passwordValidationError
            );
        } else {
            return email && password;
        }
    };

    const handleButtonClick = () => {
        if (!isFormValid()) {
            setShowValidationError(true); // Show validation error if button is clicked while disabled
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
                            contain at least one number and one special
                            character.
                        </label>
                    </>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {(isSubmitted || showValidationError) && passwordError && (
                    <p style={{ color: 'red' }}>{passwordError}</p>
                )}
                <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={!isFormValid() ? 'disabled-button' : ''}
                    onClick={handleButtonClick}
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
};

export default AuthForm;
