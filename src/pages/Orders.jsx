import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';
import './Orders.css';

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        { id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', items: ['Cappuccino', 'Croissant'], total: 12.50, status: 'completed', date: '2024-01-15', time: '10:30 AM', payment: 'Credit Card' },
        { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', items: ['Latte', 'Cheesecake', 'Muffin'], total: 18.00, status: 'preparing', date: '2024-01-15', time: '11:15 AM', payment: 'Cash' },
        { id: 'ORD-003', customer: 'Mike Brown', email: 'mike@email.com', items: ['Espresso x2'], total: 8.00, status: 'pending', date: '2024-01-15', time: '11:45 AM', payment: 'Credit Card' },
        { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@email.com', items: ['Mocha', 'Muffin'], total: 11.50, status: 'completed', date: '2024-01-15', time: '12:00 PM', payment: 'Apple Pay' },
        { id: 'ORD-005', customer: 'Chris Wilson', email: 'chris@email.com', items: ['Americano', 'Bagel'], total: 9.50, status: 'delivering', date: '2024-01-15', time: '12:30 PM', payment: 'Credit Card' },
        { id: 'ORD-006', customer: 'Amanda Lee', email: 'amanda@email.com', items: ['Green Tea', 'Cookie'], total: 7.00, status: 'cancelled', date: '2024-01-15', time: '1:00 PM', payment: 'Cash' },
        { id: 'ORD-007', customer: 'David Kim', email: 'david@email.com', items: ['Flat White', 'Brownie', 'Scone'], total: 16.50, status: 'completed', date: '2024-01-15', time: '1:30 PM', payment: 'Credit Card' },
        { id: 'ORD-008', customer: 'Lisa Wang', email: 'lisa@email.com', items: ['Iced Latte', 'Sandwich'], total: 14.00, status: 'preparing', date: '2024-01-15', time: '2:00 PM', payment: 'Google Pay' },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={14} />;
            case 'preparing': return <Clock size={14} />;
            case 'pending': return <Clock size={14} />;
            case 'delivering': return <Truck size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        delivering: orders.filter(o => o.status === 'delivering').length,
        completed: orders.filter(o => o.status === 'completed').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    return (
        <div className="orders-page">
            <div className="page-header">
                <div>
                    <h1>Orders</h1>
                    <p>Manage and track all customer orders</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="status-filters">
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <button
                            key={status}
                            className={`status-filter ${statusFilter === status ? 'active' : ''}`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            <span className="count">{count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date & Time</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="order-id">{order.id}</td>
                                <td>
                                    <div className="customer-info">
                                        <span className="name">{order.customer}</span>
                                        <span className="email">{order.email}</span>
                                    </div>
                                </td>
                                <td className="items">{order.items.join(', ')}</td>
                                <td className="total">${order.total.toFixed(2)}</td>
                                <td className="datetime">
                                    <span>{order.date}</span>
                                    <span className="time">{order.time}</span>
                                </td>
                                <td>{order.payment}</td>
                                <td>
                                    <span className={`status-badge ${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Order Details</h2>
                            <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <span className="label">Order ID:</span>
                                <span className="value">{selectedOrder.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Customer:</span>
                                <span className="value">{selectedOrder.customer}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Email:</span>
                                <span className="value">{selectedOrder.email}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Items:</span>
                                <span className="value">{selectedOrder.items.join(', ')}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Total:</span>
                                <span className="value">${selectedOrder.total.toFixed(2)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Payment:</span>
                                <span className="value">{selectedOrder.payment}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Status:</span>
                                <span className={`status-badge ${selectedOrder.status}`}>
                                    {selectedOrder.status}
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                                Close
                            </button>
                            <button className="btn btn-primary">
                                Update Status
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
