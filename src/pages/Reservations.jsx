import { useState } from 'react';
import { Search, Plus, Calendar, Clock, Users, Check, X, Edit2, Trash2 } from 'lucide-react';
import './Reservations.css';

const Reservations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    const [reservations, setReservations] = useState([
        { id: 1, name: 'John Smith', email: 'john@email.com', phone: '555-0101', date: '2024-01-20', time: '12:00', guests: 4, table: 'T-05', status: 'confirmed', notes: 'Birthday celebration' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '555-0102', date: '2024-01-20', time: '14:00', guests: 2, table: 'T-02', status: 'pending', notes: '' },
        { id: 3, name: 'Mike Brown', email: 'mike@email.com', phone: '555-0103', date: '2024-01-20', time: '18:00', guests: 6, table: 'T-08', status: 'confirmed', notes: 'Business dinner' },
        { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '555-0104', date: '2024-01-21', time: '19:00', guests: 2, table: 'T-01', status: 'confirmed', notes: 'Anniversary' },
        { id: 5, name: 'Chris Wilson', email: 'chris@email.com', phone: '555-0105', date: '2024-01-21', time: '13:00', guests: 8, table: 'T-10', status: 'pending', notes: 'Team lunch' },
        { id: 6, name: 'Amanda Lee', email: 'amanda@email.com', phone: '555-0106', date: '2024-01-22', time: '20:00', guests: 4, table: 'T-06', status: 'cancelled', notes: '' },
    ]);

    const [newReservation, setNewReservation] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        notes: ''
    });

    const handleStatusChange = (id, newStatus) => {
        setReservations(reservations.map(res =>
            res.id === id ? { ...res, status: newStatus } : res
        ));
    };

    const filteredReservations = reservations.filter(res => {
        const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddReservation = (e) => {
        e.preventDefault();
        const newRes = {
            id: reservations.length + 1,
            ...newReservation,
            table: `T-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`,
            status: 'pending'
        };
        setReservations([...reservations, newRes]);
        setShowAddModal(false);
        setNewReservation({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '' });
    };

    const statusCounts = {
        all: reservations.length,
        pending: reservations.filter(r => r.status === 'pending').length,
        confirmed: reservations.filter(r => r.status === 'confirmed').length,
        cancelled: reservations.filter(r => r.status === 'cancelled').length,
    };

    return (
        <div className="reservations-page">
            <div className="page-header">
                <div>
                    <h1>Reservations</h1>
                    <p>Manage table reservations and bookings</p>
                </div>
                <button className="btn-add" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} />
                    New Reservation
                </button>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search reservations..."
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

            {/* Reservations Grid */}
            <div className="reservations-grid">
                {filteredReservations.map((res) => (
                    <div key={res.id} className={`reservation-card ${res.status}`}>
                        <div className="card-header">
                            <span className={`status-badge ${res.status}`}>{res.status}</span>
                            <span className="table-number">{res.table}</span>
                        </div>
                        <div className="card-body">
                            <h3>{res.name}</h3>
                            <div className="info-row">
                                <Calendar size={14} />
                                <span>{res.date}</span>
                            </div>
                            <div className="info-row">
                                <Clock size={14} />
                                <span>{res.time}</span>
                            </div>
                            <div className="info-row">
                                <Users size={14} />
                                <span>{res.guests} guests</span>
                            </div>
                            {res.notes && (
                                <p className="notes">{res.notes}</p>
                            )}
                        </div>
                        <div className="card-footer">
                            {res.status === 'pending' && (
                                <>
                                    <button
                                        className="action-btn confirm"
                                        onClick={() => handleStatusChange(res.id, 'confirmed')}
                                    >
                                        <Check size={16} />
                                        Confirm
                                    </button>
                                    <button
                                        className="action-btn cancel"
                                        onClick={() => handleStatusChange(res.id, 'cancelled')}
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>
                                </>
                            )}
                            {res.status === 'confirmed' && (
                                <button
                                    className="action-btn cancel"
                                    onClick={() => handleStatusChange(res.id, 'cancelled')}
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>New Reservation</h2>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleAddReservation}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Guest Name</label>
                                    <input
                                        type="text"
                                        value={newReservation.name}
                                        onChange={(e) => setNewReservation({ ...newReservation, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={newReservation.email}
                                            onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            value={newReservation.phone}
                                            onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            value={newReservation.date}
                                            onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Time</label>
                                        <input
                                            type="time"
                                            value={newReservation.time}
                                            onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Number of Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        value={newReservation.guests}
                                        onChange={(e) => setNewReservation({ ...newReservation, guests: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Special Notes</label>
                                    <textarea
                                        value={newReservation.notes}
                                        onChange={(e) => setNewReservation({ ...newReservation, notes: e.target.value })}
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Reservation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservations;
