import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Coffee, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: 'admin@brewbites.com',
        password: 'admin123'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            if (formData.email === 'admin@brewbites.com' && formData.password === 'admin123') {
                login({
                    id: 1,
                    name: 'Admin User',
                    email: formData.email,
                    role: 'admin'
                });
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="brand-content">
                        <Coffee size={48} />
                        <h1>Brew & Bites</h1>
                        <p>Admin Dashboard</p>
                    </div>
                    <div className="features">
                        <div className="feature">
                            <div className="feature-icon">📊</div>
                            <div>
                                <h3>Real-time Analytics</h3>
                                <p>Monitor your cafe performance</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">🛒</div>
                            <div>
                                <h3>Order Management</h3>
                                <p>Track and manage all orders</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">📅</div>
                            <div>
                                <h3>Reservations</h3>
                                <p>Handle table bookings easily</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <h2>Welcome Back!</h2>
                        <p>Sign in to your admin account</p>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" defaultChecked />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot Password?</a>
                            </div>

                            <button type="submit" className="btn-login" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="demo-credentials">
                            <p><strong>Demo Credentials:</strong></p>
                            <p>Email: admin@brewbites.com</p>
                            <p>Password: admin123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
