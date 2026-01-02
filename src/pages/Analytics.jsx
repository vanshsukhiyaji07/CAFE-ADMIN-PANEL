import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Coffee } from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
    const [timeRange, setTimeRange] = useState('month');

    // Monthly revenue data
    const revenueData = [
        { month: 'Jan', revenue: 12500, orders: 320 },
        { month: 'Feb', revenue: 14200, orders: 380 },
        { month: 'Mar', revenue: 15800, orders: 410 },
        { month: 'Apr', revenue: 13900, orders: 350 },
        { month: 'May', revenue: 16500, orders: 440 },
        { month: 'Jun', revenue: 18200, orders: 490 },
        { month: 'Jul', revenue: 17100, orders: 460 },
        { month: 'Aug', revenue: 19500, orders: 520 },
        { month: 'Sep', revenue: 18800, orders: 500 },
        { month: 'Oct', revenue: 20100, orders: 540 },
        { month: 'Nov', revenue: 21500, orders: 580 },
        { month: 'Dec', revenue: 24000, orders: 640 },
    ];

    // Hourly traffic data
    const trafficData = [
        { hour: '6AM', customers: 15 },
        { hour: '7AM', customers: 45 },
        { hour: '8AM', customers: 85 },
        { hour: '9AM', customers: 65 },
        { hour: '10AM', customers: 50 },
        { hour: '11AM', customers: 40 },
        { hour: '12PM', customers: 75 },
        { hour: '1PM', customers: 70 },
        { hour: '2PM', customers: 55 },
        { hour: '3PM', customers: 60 },
        { hour: '4PM', customers: 45 },
        { hour: '5PM', customers: 70 },
        { hour: '6PM', customers: 55 },
        { hour: '7PM', customers: 35 },
        { hour: '8PM', customers: 20 },
    ];

    // Category distribution
    const categoryData = [
        { name: 'Coffee', value: 45, color: '#6F4E37' },
        { name: 'Pastries', value: 25, color: '#D4A574' },
        { name: 'Desserts', value: 18, color: '#8B7355' },
        { name: 'Beverages', value: 12, color: '#C4B39A' },
    ];

    // Top products
    const topProducts = [
        { name: 'Cappuccino', sales: 1245, revenue: 5602, growth: 12.5 },
        { name: 'Latte', sales: 1120, revenue: 5040, growth: 8.3 },
        { name: 'Espresso', sales: 980, revenue: 3430, growth: -2.1 },
        { name: 'Croissant', sales: 856, revenue: 2996, growth: 15.7 },
        { name: 'Cheesecake', sales: 720, revenue: 3960, growth: 6.4 },
    ];

    // Stats
    const stats = [
        { title: 'Total Revenue', value: '$192,100', change: '+18.2%', trend: 'up', icon: <DollarSign size={20} /> },
        { title: 'Total Orders', value: '5,630', change: '+12.5%', trend: 'up', icon: <ShoppingBag size={20} /> },
        { title: 'New Customers', value: '847', change: '+24.3%', trend: 'up', icon: <Users size={20} /> },
        { title: 'Avg Order Value', value: '$34.12', change: '-3.1%', trend: 'down', icon: <Coffee size={20} /> },
    ];

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Track your cafe's performance and insights</p>
                </div>
                <div className="time-range">
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
                    <button
                        className={timeRange === 'year' ? 'active' : ''}
                        onClick={() => setTimeRange('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-content">
                            <span className="stat-title">{stat.title}</span>
                            <span className="stat-value">{stat.value}</span>
                            <span className={`stat-change ${stat.trend}`}>
                                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="chart-card full-width">
                <h3>Revenue & Orders Overview</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={revenueData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6F4E37" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6F4E37" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4A574" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#D4A574" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="month" stroke="#888" fontSize={12} />
                        <YAxis yAxisId="left" stroke="#888" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e5e5e5',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6F4E37"
                            strokeWidth={2}
                            fill="url(#colorRevenue)"
                            name="Revenue ($)"
                        />
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="orders"
                            stroke="#D4A574"
                            strokeWidth={2}
                            fill="url(#colorOrders)"
                            name="Orders"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Middle Row */}
            <div className="charts-row">
                <div className="chart-card">
                    <h3>Customer Traffic by Hour</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={trafficData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="hour" stroke="#888" fontSize={11} />
                            <YAxis stroke="#888" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: 'white',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="customers" fill="#6F4E37" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Sales by Category</h3>
                    <div className="pie-chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
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
                        <div className="pie-legend">
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
            </div>

            {/* Top Products */}
            <div className="chart-card">
                <h3>Top Selling Products</h3>
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Sales</th>
                            <th>Revenue</th>
                            <th>Growth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topProducts.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="product-info">
                                        <span className="rank">{index + 1}</span>
                                        <span className="name">{product.name}</span>
                                    </div>
                                </td>
                                <td>{product.sales.toLocaleString()}</td>
                                <td>${product.revenue.toLocaleString()}</td>
                                <td>
                                    <span className={`growth ${product.growth >= 0 ? 'positive' : 'negative'}`}>
                                        {product.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {Math.abs(product.growth)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analytics;
