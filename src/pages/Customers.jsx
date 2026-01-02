import { useState } from 'react';
import { Search, Mail, Phone, Star, MoreVertical } from 'lucide-react';
import './Customers.css';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const customers = [
        { id: 1, name: 'John Smith', email: 'john@email.com', phone: '555-0101', orders: 24, spent: 286.50, joined: '2023-06-15', status: 'vip', lastOrder: '2024-01-15' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '555-0102', orders: 18, spent: 215.00, joined: '2023-07-20', status: 'regular', lastOrder: '2024-01-14' },
        { id: 3, name: 'Mike Brown', email: 'mike@email.com', phone: '555-0103', orders: 35, spent: 425.75, joined: '2023-04-10', status: 'vip', lastOrder: '2024-01-15' },
        { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '555-0104', orders: 12, spent: 145.00, joined: '2023-09-05', status: 'regular', lastOrder: '2024-01-12' },
        { id: 5, name: 'Chris Wilson', email: 'chris@email.com', phone: '555-0105', orders: 8, spent: 98.50, joined: '2023-11-01', status: 'new', lastOrder: '2024-01-10' },
        { id: 6, name: 'Amanda Lee', email: 'amanda@email.com', phone: '555-0106', orders: 42, spent: 512.00, joined: '2023-02-28', status: 'vip', lastOrder: '2024-01-15' },
        { id: 7, name: 'David Kim', email: 'david@email.com', phone: '555-0107', orders: 15, spent: 178.25, joined: '2023-08-12', status: 'regular', lastOrder: '2024-01-13' },
        { id: 8, name: 'Lisa Wang', email: 'lisa@email.com', phone: '555-0108', orders: 5, spent: 62.00, joined: '2024-01-02', status: 'new', lastOrder: '2024-01-11' },
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const badges = {
            vip: { label: 'VIP', class: 'vip' },
            regular: { label: 'Regular', class: 'regular' },
            new: { label: 'New', class: 'new' },
        };
        return badges[status] || badges.regular;
    };

    return (
        <div className="customers-page">
            <div className="page-header">
                <div>
                    <h1>Customers</h1>
                    <p>View and manage your customer base</p>
                </div>
            </div>

            {/* Stats */}
            <div className="customer-stats">
                <div className="stat-card">
                    <span className="stat-value">{customers.length}</span>
                    <span className="stat-label">Total Customers</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{customers.filter(c => c.status === 'vip').length}</span>
                    <span className="stat-label">VIP Members</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">{customers.filter(c => c.status === 'new').length}</span>
                    <span className="stat-label">New This Month</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">${customers.reduce((sum, c) => sum + c.spent, 0).toFixed(0)}</span>
                    <span className="stat-label">Total Revenue</span>
                </div>
            </div>

            {/* Search */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="customers-table-container">
                <table className="customers-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <div className="customer-info">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${customer.name}&background=6F4E37&color=fff`}
                                            alt={customer.name}
                                        />
                                        <span className="name">{customer.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-info">
                                        <span className="email"><Mail size={12} /> {customer.email}</span>
                                        <span className="phone"><Phone size={12} /> {customer.phone}</span>
                                    </div>
                                </td>
                                <td className="orders">{customer.orders}</td>
                                <td className="spent">${customer.spent.toFixed(2)}</td>
                                <td className="joined">{customer.joined}</td>
                                <td>
                                    <span className={`status-badge ${getStatusBadge(customer.status).class}`}>
                                        {customer.status === 'vip' && <Star size={12} />}
                                        {getStatusBadge(customer.status).label}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => setSelectedCustomer(customer)}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Customer Details</h2>
                            <button className="close-btn" onClick={() => setSelectedCustomer(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="customer-profile">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${selectedCustomer.name}&background=6F4E37&color=fff&size=80`}
                                    alt={selectedCustomer.name}
                                />
                                <div>
                                    <h3>{selectedCustomer.name}</h3>
                                    <span className={`status-badge ${getStatusBadge(selectedCustomer.status).class}`}>
                                        {selectedCustomer.status === 'vip' && <Star size={12} />}
                                        {getStatusBadge(selectedCustomer.status).label}
                                    </span>
                                </div>
                            </div>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="label">Email</span>
                                    <span className="value">{selectedCustomer.email}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Phone</span>
                                    <span className="value">{selectedCustomer.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Total Orders</span>
                                    <span className="value">{selectedCustomer.orders}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Total Spent</span>
                                    <span className="value">${selectedCustomer.spent.toFixed(2)}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Member Since</span>
                                    <span className="value">{selectedCustomer.joined}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Last Order</span>
                                    <span className="value">{selectedCustomer.lastOrder}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>
                                Close
                            </button>
                            <button className="btn btn-primary">
                                View Orders
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
