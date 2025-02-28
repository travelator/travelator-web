import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const Navbar = () => {
    const { isAuthenticated, checkAuthStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Navbar auth state changed:', isAuthenticated);
    }, [isAuthenticated]);

    const handleLogout = async () => {
        try {
            console.log('Logging out...');
            await fetch(`${import.meta.env.VITE_APP_AUTH_API_URL}logout`, {
                method: 'POST',
                credentials: 'include',
            });
            console.log('Logout successful, checking auth status...');
            await checkAuthStatus();
            console.log('Navigating to home...');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="content-wrapper">
                <div className="navbar-title">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar-signup">
                    {console.log(
                        'Rendering navbar buttons, isAuthenticated:',
                        isAuthenticated
                    )}
                    {isAuthenticated ? (
                        <>
                            <Link to="/user-trips">My Trips</Link>
                            <button onClick={handleLogout}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
