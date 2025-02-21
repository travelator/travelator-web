import AuthForm from '../components/AuthForm/AuthForm';
import '../styles/Login.css'; // Reusing the same CSS for consistency

const Signup = () => {
    return (
        <div className="login-page">
            <h1 className="login-header">Join Us</h1>
            <p className="login-subheader">Create an account to get started</p>
            <div className="login-form-wrapper">
                <AuthForm type="signup" />
            </div>
        </div>
    );
};

export default Signup;