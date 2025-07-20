import React, { useState, useEffect } from 'react';

const UserManagementView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ firstName: '', lastName: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', username: '', email: '', isAdmin: false });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://3.15.153.52:3307/admin/users'
           //,{ credentials: 'include' }
          );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.userID ?? user.id);
    setEditData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditData({ name: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`http://3.15.153.52:3307/admin/users/${editingUser}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
        //credentials: 'include',
      });

      if (!res.ok) throw new Error(`Failed to save user: ${res.status}`);

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser ? { ...u, ...editData } : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handlePromote = async (id) => {
    try {
      const res = await fetch(`http://3.15.153.52:3307/admin/users/${id}/promote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: true }),
        //credentials: 'include',
      });

      if (!res.ok) throw new Error(`Failed to promote user: ${res.status}`);

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isAdmin: true } : user
        )
      );
    } catch (err) {
      console.error('Error promoting user:', err);
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    const newId = users.length ? Math.max(...users.map(u => u.userID ?? u.id)) + 1 : 1;
    setUsers([...users, { userID: newId, ...newUser }]);
    setNewUser({ firstName: '', lastName: '', email: '', isAdmin: false });
    setShowAddForm(false);
  };

  const filteredAndSortedUsers = users
    .filter(user => {
      const term = searchTerm.toLowerCase();
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
      return (
        fullName.includes(term) ||
        user.username?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const valA = a[sortKey]?.toLowerCase?.() || a[sortKey];
      const valB = b[sortKey]?.toLowerCase?.() || b[sortKey];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

   return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-1 gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-auto flex-grow"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="firstName">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          {showAddForm ? 'Cancel Add' : 'Add New User'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 border p-4 rounded-lg shadow-sm bg-gray-50">
          <h3 className="font-semibold text-lg mb-3">Add New User</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input name="firstName" value={newUser.firstName} onChange={handleAddChange} placeholder="First Name" className="p-2 border rounded w-full" />
            <input name="lastName" value={newUser.lastName} onChange={handleAddChange} placeholder="Last Name" className="p-2 border rounded w-full" />
            <input name="username" value={newUser.username} onChange={handleAddChange} placeholder="Username" className="p-2 border rounded w-full" />
            <input name="email" type="email" value={newUser.email} onChange={handleAddChange} placeholder="Email" className="p-2 border border-gray-300 rounded w-full flex-grow" required />
            <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Add User</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-lg mt-8">Loading users...</p>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg shadow">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Email</th>
                <th className="border p-3 text-left">Role</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredAndSortedUsers.map((user) => (
                  <tr key={user.userID ?? user.id} className="text-center">
                    {editingUser === (user.userID ?? user.id) ? (
                      <>
                        <td className="border p-2">
                          <input name="firstName" value={editData.firstName} onChange={handleChange} className="p-1 border rounded" />
                        </td>
                        <td className="border p-2">
                          <input name="lastName" value={editData.lastName} onChange={handleChange} className="p-1 border border-gray-300 rounded w-full" />
                        </td>
                        <td className="border p-2">
                          <input name="email" type="email" value={editData.email} onChange={handleChange} className="p-1 border border-gray-300 rounded w-full" />
                        </td>
                        <td className="border p-2">
                          {user.isAdmin ? 'Admin' : 'User'}
                        </td>
                        <td className="border p-2 space-x-2 flex flex-wrap gap-2 justify-center">
                          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">Save</button>
                          <button onClick={handleCancelEdit} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">Cancel</button>
                          {!user.isAdmin && (
                            <button onClick={() => handlePromote(user.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">Promote to Admin</button>
                          )}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border p-2">{`${user.firstName} ${user.lastName}`}</td>
                        <td className="border p-2">{user.email}</td>
                        <td className="border p-2">{user.isAdmin ? 'Admin' : 'User'}</td>
                        <td className="border p-2 space-x-2 flex flex-wrap gap-2 justify-center">
                          <button onClick={() => handleEdit(user)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors">Edit</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagementView;