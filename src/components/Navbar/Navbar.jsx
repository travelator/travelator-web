import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="content-wrapper">
                <div className="navbar-title">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar-signup">Sign up</div>
            </div>
        </nav>
    );
};

export default Navbar;
