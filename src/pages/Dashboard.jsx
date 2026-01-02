import { useState } from 'react';
import {
    DollarSign, ShoppingBag, Users, Calendar, TrendingUp, TrendingDown,
    ArrowRight, Clock, MoreVertical
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('week');

    // Stats data
    const stats = [
        {
            title: 'Total Revenue',
            value: '$12,845',
            change: '+12.5%',
            trend: 'up',
            icon: <DollarSign size={24} />,
            color: 'green'
        },
        {
            title: 'Total Orders',
            value: '384',
            change: '+8.2%',
            trend: 'up',
            icon: <ShoppingBag size={24} />,
            color: 'blue'
        },
        {
            title: 'Customers',
            value: '1,245',
            change: '+5.7%',
            trend: 'up',
            icon: <Users size={24} />,
            color: 'purple'
        },
        {
            title: 'Reservations',
            value: '48',
            change: '-2.4%',
            trend: 'down',
            icon: <Calendar size={24} />,
            color: 'orange'
        }
    ];

    // Revenue chart data
    const revenueData = [
        { name: 'Mon', revenue: 4000, orders: 24 },
        { name: 'Tue', revenue: 3000, orders: 18 },
        { name: 'Wed', revenue: 5000, orders: 32 },
        { name: 'Thu', revenue: 4500, orders: 28 },
        { name: 'Fri', revenue: 6000, orders: 40 },
        { name: 'Sat', revenue: 7500, orders: 52 },
        { name: 'Sun', revenue: 5500, orders: 36 },
    ];

    // Popular items data
    const popularItems = [
        { name: 'Cappuccino', sales: 145, percentage: 28 },
        { name: 'Latte', sales: 120, percentage: 23 },
        { name: 'Espresso', sales: 98, percentage: 19 },
        { name: 'Croissant', sales: 85, percentage: 16 },
        { name: 'Cheesecake', sales: 72, percentage: 14 },
    ];

    // Pie chart data
    const categoryData = [
        { name: 'Coffee', value: 45, color: '#6F4E37' },
        { name: 'Pastries', value: 25, color: '#D4A574' },
        { name: 'Desserts', value: 15, color: '#8B7355' },
        { name: 'Other', value: 15, color: '#C4B39A' },
    ];

    // Recent orders
    const recentOrders = [
        { id: '#ORD-001', customer: 'John Smith', items: 'Cappuccino, Croissant', total: '$12.50', status: 'completed', time: '5 min ago' },
        { id: '#ORD-002', customer: 'Sarah Johnson', items: 'Latte, Cheesecake', total: '$15.00', status: 'preparing', time: '12 min ago' },
        { id: '#ORD-003', customer: 'Mike Brown', items: 'Espresso x2', total: '$8.00', status: 'pending', time: '18 min ago' },
        { id: '#ORD-004', customer: 'Emily Davis', items: 'Mocha, Muffin', total: '$11.50', status: 'completed', time: '25 min ago' },
        { id: '#ORD-005', customer: 'Chris Wilson', items: 'Americano', total: '$4.50', status: 'completed', time: '32 min ago' },
    ];

    // Upcoming reservations
    const reservations = [
        { id: 1, name: 'Table for Johnson', guests: 4, time: '12:00 PM', date: 'Today' },
        { id: 2, name: 'Birthday Party', guests: 8, time: '2:00 PM', date: 'Today' },
        { id: 3, name: 'Business Meeting', guests: 6, time: '4:00 PM', date: 'Today' },
        { id: 4, name: 'Anniversary Dinner', guests: 2, time: '7:00 PM', date: 'Tomorrow' },
    ];

    return (
        <div className="dashboard">
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening today.</p>
                </div>
                <div className="time-range">
                    <button
                        className={timeRange === 'day' ? 'active' : ''}
                        onClick={() => setTimeRange('day')}
                    >
                        Day
                    </button>
                    <button
                        className={timeRange === 'week' ? 'active' : ''}
                        onClick={() => setTimeRange('week')}
                    >
                        Week
                    </button>
                    <button
                        className={timeRange === 'month' ? 'active' : ''}
                        onClick={() => setTimeRange('month')}
                    >
                        Month
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card ${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <span className="stat-title">{stat.title}</span>
                            <span className="stat-value">{stat.value}</span>
                            <span className={`stat-change ${stat.trend}`}>
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {stat.change} from last week
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                <div className="chart-card revenue-chart">
                    <div className="chart-header">
                        <h3>Revenue Overview</h3>
                        <button className="chart-menu"><MoreVertical size={18} /></button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6F4E37" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6F4E37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="name" stroke="#888" fontSize={12} />
                            <YAxis stroke="#888" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6F4E37"
                                strokeWidth={2}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card orders-chart">
                    <div className="chart-header">
                        <h3>Orders by Day</h3>
                        <button className="chart-menu"><MoreVertical size={18} /></button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="name" stroke="#888" fontSize={12} />
                            <YAxis stroke="#888" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="orders" fill="#D4A574" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="bottom-row">
                {/* Popular Items */}
                <div className="card popular-items">
                    <div className="card-header">
                        <h3>Popular Items</h3>
                        <a href="#" className="view-all">View All <ArrowRight size={14} /></a>
                    </div>
                    <div className="items-list">
                        {popularItems.map((item, index) => (
                            <div key={index} className="item-row">
                                <div className="item-rank">{index + 1}</div>
                                <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-sales">{item.sales} sold</span>
                                </div>
                                <div className="item-bar">
                                    <div className="bar-fill" style={{ width: `${item.percentage}%` }}></div>
                                </div>
                                <span className="item-percentage">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sales by Category */}
                <div className="card category-chart">
                    <div className="card-header">
                        <h3>Sales by Category</h3>
                    </div>
                    <div className="pie-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="category-legend">
                            {categoryData.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <span className="legend-color" style={{ background: item.color }}></span>
                                    <span className="legend-label">{item.name}</span>
                                    <span className="legend-value">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card recent-orders">
                    <div className="card-header">
                        <h3>Recent Orders</h3>
                        <a href="/orders" className="view-all">View All <ArrowRight size={14} /></a>
                    </div>
                    <div className="orders-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="order-id">{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className="items-cell">{order.items}</td>
                                        <td className="total">{order.total}</td>
                                        <td>
                                            <span className={`status-badge ${order.status}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Reservations */}
                <div className="card upcoming-reservations">
                    <div className="card-header">
                        <h3>Upcoming Reservations</h3>
                        <a href="/reservations" className="view-all">View All <ArrowRight size={14} /></a>
                    </div>
                    <div className="reservations-list">
                        {reservations.map((res) => (
                            <div key={res.id} className="reservation-item">
                                <div className="res-time">
                                    <Clock size={16} />
                                    <span>{res.time}</span>
                                </div>
                                <div className="res-info">
                                    <span className="res-name">{res.name}</span>
                                    <span className="res-details">{res.guests} guests • {res.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
