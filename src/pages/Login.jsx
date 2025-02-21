import AuthForm from '../components/AuthForm/AuthForm';
import '../styles/Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <h1 className="login-header">Welcome Back</h1>
            <p className="login-subheader">Please login to continue</p>
            <div className="login-form-wrapper">
                <AuthForm type="login" />
            </div>
        </div>
    );
};

export default Login;
