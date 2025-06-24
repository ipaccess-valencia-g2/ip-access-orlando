import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', isAdmin: false },
  { id: 2, name: 'John Smith', email: 'john@example.com', isAdmin: false },
];

const UserManagementView = () => {
  const [users, setUsers] = useState(mockUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', isAdmin: false });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData({ name: user.name, email: user.email });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser ? { ...u, ...editData } : u))
    );
    setEditingUser(null);
  };

  const handlePromote = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isAdmin: true } : user
      )
    );
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: '', email: '', isAdmin: false });
    setShowAddForm(false);
  };

  const filteredAndSortedUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey].toLowerCase?.() || a[sortKey];
      const valB = b[sortKey].toLowerCase?.() || b[sortKey];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-gray-600 text-white px-3 py-1 rounded"
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          {showAddForm ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {/* Add New User Form */}
      {showAddForm && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Add New User</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              name="name"
              value={newUser.name}
              onChange={handleAddChange}
              placeholder="Full Name"
              className="p-2 border rounded w-full"
            />
            <input
              name="email"
              value={newUser.email}
              onChange={handleAddChange}
              placeholder="Email"
              className="p-2 border rounded w-full"
            />
            <button
              onClick={handleAddUser}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedUsers.map((user) => (
            <tr key={user.id} className="text-center">
              {editingUser === user.id ? (
                <>
                  <td className="border p-2">
                    <input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="p-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="p-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    {user.isAdmin ? 'Admin' : 'User'}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    {!user.isAdmin && (
                      <button
                        onClick={() => handlePromote(user.id)}
                        className="bg-purple-600 text-white px-3 py-1 rounded"
                      >
                        Promote to Admin
                      </button>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementView;
