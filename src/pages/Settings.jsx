import { useState } from 'react';
import { useAuth, useTheme } from '../App';
import { User, Bell, Shield, Palette, Store, Save, Camera } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@brewbites.com',
        phone: '555-0100',
        role: 'Administrator'
    });

    const [notifications, setNotifications] = useState({
        orderAlerts: true,
        reservationAlerts: true,
        customerAlerts: false,
        marketingEmails: false,
        weeklyReports: true
    });

    const [cafe, setCafe] = useState({
        name: 'Brew & Bites Cafe',
        address: '123 Coffee Street, Bean City',
        phone: '555-CAFE',
        email: 'hello@brewbites.com',
        openingHours: '7:00 AM - 9:00 PM',
        currency: 'USD'
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'cafe', label: 'Cafe Info', icon: <Store size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    ];

    return (
        <div className="settings-page">
            <div className="page-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences</p>
            </div>

            <div className="settings-container">
                {/* Tabs */}
                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="settings-content">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h2>Profile Settings</h2>
                            <p>Update your personal information</p>

                            <div className="profile-photo">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${profile.name}&background=6F4E37&color=fff&size=100`}
                                    alt="Profile"
                                />
                                <button className="change-photo">
                                    <Camera size={16} />
                                    Change Photo
                                </button>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <input type="text" value={profile.role} disabled />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <h2>Notification Preferences</h2>
                            <p>Choose what notifications you receive</p>

                            <div className="notification-options">
                                {Object.entries({
                                    orderAlerts: 'New Order Alerts',
                                    reservationAlerts: 'Reservation Notifications',
                                    customerAlerts: 'New Customer Sign-ups',
                                    marketingEmails: 'Marketing Emails',
                                    weeklyReports: 'Weekly Performance Reports'
                                }).map(([key, label]) => (
                                    <div key={key} className="notification-item">
                                        <div>
                                            <span className="notification-label">{label}</span>
                                            <span className="notification-desc">
                                                Receive notifications for {label.toLowerCase()}
                                            </span>
                                        </div>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={notifications[key]}
                                                onChange={(e) => setNotifications({
                                                    ...notifications,
                                                    [key]: e.target.checked
                                                })}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appearance Tab */}
                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <h2>Appearance</h2>
                            <p>Customize how the dashboard looks</p>

                            <div className="theme-selector">
                                <h3>Theme</h3>
                                <div className="theme-options">
                                    <button
                                        className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                                        onClick={() => setTheme('light')}
                                    >
                                        <div className="theme-preview light"></div>
                                        <span>Light</span>
                                    </button>
                                    <button
                                        className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => setTheme('dark')}
                                    >
                                        <div className="theme-preview dark"></div>
                                        <span>Dark</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cafe Info Tab */}
                    {activeTab === 'cafe' && (
                        <div className="settings-section">
                            <h2>Cafe Information</h2>
                            <p>Update your cafe details</p>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Cafe Name</label>
                                    <input
                                        type="text"
                                        value={cafe.name}
                                        onChange={(e) => setCafe({ ...cafe, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={cafe.address}
                                        onChange={(e) => setCafe({ ...cafe, address: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={cafe.phone}
                                        onChange={(e) => setCafe({ ...cafe, phone: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={cafe.email}
                                        onChange={(e) => setCafe({ ...cafe, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Opening Hours</label>
                                    <input
                                        type="text"
                                        value={cafe.openingHours}
                                        onChange={(e) => setCafe({ ...cafe, openingHours: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Currency</label>
                                    <select
                                        value={cafe.currency}
                                        onChange={(e) => setCafe({ ...cafe, currency: e.target.value })}
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <h2>Security</h2>
                            <p>Manage your account security</p>

                            <div className="security-section">
                                <h3>Change Password</h3>
                                <div className="form-grid single">
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input type="password" placeholder="Enter current password" />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" placeholder="Enter new password" />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input type="password" placeholder="Confirm new password" />
                                    </div>
                                </div>
                            </div>

                            <div className="security-section">
                                <h3>Two-Factor Authentication</h3>
                                <p className="section-desc">Add an extra layer of security to your account</p>
                                <button className="btn btn-secondary">Enable 2FA</button>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="settings-footer">
                        <button className={`btn btn-primary ${saved ? 'saved' : ''}`} onClick={handleSave}>
                            <Save size={16} />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
