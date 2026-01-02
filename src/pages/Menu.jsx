import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Coffee, Cookie, Cake } from 'lucide-react';
import './Menu.css';

const MenuPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Espresso', description: 'Rich and bold single shot', price: 3.50, category: 'coffee', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200', available: true },
        { id: 2, name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 4.50, category: 'coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200', available: true },
        { id: 3, name: 'Latte', description: 'Espresso with steamed milk', price: 4.50, category: 'coffee', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=200', available: true },
        { id: 4, name: 'Mocha', description: 'Espresso with chocolate and milk', price: 5.00, category: 'coffee', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=200', available: true },
        { id: 5, name: 'Croissant', description: 'Buttery flaky French pastry', price: 3.50, category: 'pastry', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200', available: true },
        { id: 6, name: 'Chocolate Muffin', description: 'Rich chocolate chip muffin', price: 3.00, category: 'pastry', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=200', available: true },
        { id: 7, name: 'Cheesecake', description: 'Creamy New York style', price: 5.50, category: 'dessert', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200', available: true },
        { id: 8, name: 'Tiramisu', description: 'Italian coffee-flavored dessert', price: 6.00, category: 'dessert', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200', available: false },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'coffee',
        available: true
    });

    const categories = [
        { id: 'all', label: 'All Items', icon: null },
        { id: 'coffee', label: 'Coffee', icon: <Coffee size={16} /> },
        { id: 'pastry', label: 'Pastries', icon: <Cookie size={16} /> },
        { id: 'dessert', label: 'Desserts', icon: <Cake size={16} /> },
    ];

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setMenuItems(menuItems.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData, price: parseFloat(formData.price) }
                    : item
            ));
        } else {
            const newItem = {
                id: menuItems.length + 1,
                ...formData,
                price: parseFloat(formData.price),
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200'
            };
            setMenuItems([...menuItems, newItem]);
        }
        closeModal();
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            category: item.category,
            available: item.available
        });
        setShowAddModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setMenuItems(menuItems.filter(item => item.id !== id));
        }
    };

    const toggleAvailability = (id) => {
        setMenuItems(menuItems.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    const closeModal = () => {
        setShowAddModal(false);
        setEditingItem(null);
        setFormData({ name: '', description: '', price: '', category: 'coffee', available: true });
    };

    return (
        <div className="menu-page">
            <div className="page-header">
                <div>
                    <h1>Menu Management</h1>
                    <p>Add, edit, and manage your menu items</p>
                </div>
                <button className="btn-add" onClick={() => setShowAddModal(true)}>
                    <Plus size={18} />
                    Add Item
                </button>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search menu items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="category-filters">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-filter ${categoryFilter === cat.id ? 'active' : ''}`}
                            onClick={() => setCategoryFilter(cat.id)}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <div className="menu-grid">
                {filteredItems.map((item) => (
                    <div key={item.id} className={`menu-card ${!item.available ? 'unavailable' : ''}`}>
                        <div className="card-image">
                            <img src={item.image} alt={item.name} />
                            <span className={`availability-badge ${item.available ? 'available' : 'unavailable'}`}>
                                {item.available ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                        <div className="card-content">
                            <div className="card-header">
                                <h3>{item.name}</h3>
                                <span className="price">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="description">{item.description}</p>
                            <span className="category-tag">{item.category}</span>
                        </div>
                        <div className="card-actions">
                            <button className="action-btn" onClick={() => toggleAvailability(item.id)}>
                                {item.available ? 'Mark Unavailable' : 'Mark Available'}
                            </button>
                            <button className="action-btn edit" onClick={() => handleEdit(item)}>
                                <Edit2 size={16} />
                            </button>
                            <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="coffee">Coffee</option>
                                            <option value="pastry">Pastries</option>
                                            <option value="dessert">Desserts</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={formData.available}
                                            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                        />
                                        <span>Available for order</span>
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingItem ? 'Save Changes' : 'Add Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuPage;
