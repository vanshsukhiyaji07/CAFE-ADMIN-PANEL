import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from '../App';
import {
    Coffee, LayoutDashboard, ShoppingBag, Calendar, UtensilsCrossed,
    Users, BarChart2, Settings, LogOut, Menu, X, Bell, Search, Sun, Moon
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const navigate = useNavigate();

    const notifications = [
        { id: 1, title: 'New Order', message: 'Order #ORD-008 received from Lisa Wang', time: '2 min ago', unread: true },
        { id: 2, title: 'Reservation Confirmed', message: 'Table for Johnson confirmed for 12:00 PM', time: '15 min ago', unread: true },
        { id: 3, title: 'Low Stock Alert', message: 'Croissants running low - only 5 left', time: '1 hour ago', unread: false },
        { id: 4, title: 'New Review', message: 'Mike Brown left a 5-star review', time: '2 hours ago', unread: false },
    ];

    const navItems = [
        { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
        { path: '/reservations', icon: <Calendar size={20} />, label: 'Reservations' },
        { path: '/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu' },
        { path: '/customers', icon: <Users size={20} />, label: 'Customers' },
        { path: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand">
                        <Coffee size={28} />
                        <span>Brew & Bites</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <span className="nav-label">MAIN MENU</span>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                end={item.path === '/'}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="nav-section">
                        <span className="nav-label">SETTINGS</span>
                        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                        <button className="nav-item logout" onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="main-wrapper">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="search-box">
                            <Search size={18} />
                            <input type="text" placeholder="Search..." />
                        </div>
                    </div>

                    <div className="header-right">
                        <button
                            className="icon-btn"
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <div className="notification-wrapper">
                            <button 
                                className="icon-btn notification"
                                onClick={() => setNotificationsOpen(!notificationsOpen)}
                            >
                                <Bell size={20} />
                                {notifications.some(n => n.unread) && <span className="badge-dot"></span>}
                            </button>
                            {notificationsOpen && (
                                <div className="notification-dropdown">
                                    <div className="notification-header">
                                        <h3>Notifications</h3>
                                        <button className="mark-read">Mark all as read</button>
                                    </div>
                                    <div className="notification-list">
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                                                <div className="notif-content">
                                                    <span className="notif-title">{notif.title}</span>
                                                    <span className="notif-message">{notif.message}</span>
                                                    <span className="notif-time">{notif.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="notification-footer">
                                        <button>View All Notifications</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="user-menu">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=6F4E37&color=fff`}
                                alt="User"
                            />
                            <div className="user-info">
                                <span className="user-name">{user?.name || 'Admin'}</span>
                                <span className="user-role">Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
