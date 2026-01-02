import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Reservations from './pages/Reservations';
import Menu from './pages/Menu';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

// Auth Context
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Theme Context
const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

function App() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('cafe_admin_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('cafe_admin_theme');
        return saved || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('cafe_admin_theme', theme);
    }, [theme]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('cafe_admin_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cafe_admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <Router>
                    <Routes>
                        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                        <Route path="/*" element={
                            user ? (
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/orders" element={<Orders />} />
                                        <Route path="/reservations" element={<Reservations />} />
                                        <Route path="/menu" element={<Menu />} />
                                        <Route path="/customers" element={<Customers />} />
                                        <Route path="/analytics" element={<Analytics />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </Layout>
                            ) : (
                                <Navigate to="/login" />
                            )
                        } />
                    </Routes>
                </Router>
            </ThemeContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
