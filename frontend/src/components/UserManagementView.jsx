import React, { useState, useEffect } from 'react'; // <--- FIX: Added useEffect

const UserManagementView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', isAdmin: false });

  // --- FETCH USERS ON COMPONENT MOUNT ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading true before fetching
        const res = await fetch('http://3.15.153.52:3307/admin/users', { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        // You might want to show an error message to the user here
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- HANDLERS ---
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData({ name: user.name, email: user.email });
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
      // Simulate API call to update user
      // Replace with your actual PUT/PATCH API call
      const res = await fetch(`http://3.15.153.52:3307/admin/users/${editingUser}`, {
        method: 'PUT', // Or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to save user: ${res.status}`);
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser ? { ...u, ...editData } : u))
      );
      setEditingUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
      // Handle error (e.g., show a toast notification)
    }
  };

  const handlePromote = async (id) => {
    try {
      // Simulate API call to promote user
      // Replace with your actual PUT/PATCH API call
      const res = await fetch(`http://3.15.153.52:3307/admin/users/${id}/promote`, {
        method: 'PATCH', // Or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: true }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to promote user: ${res.status}`);
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isAdmin: true } : user
        )
      );
    } catch (err) {
      console.error('Error promoting user:', err);
      // Handle error
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    // Basic validation
    if (!newUser.name || !newUser.email) {
      alert('Name and Email are required.');
      return;
    }

    try {
      // Simulate API call to add new user
      // Replace with your actual POST API call
      const res = await fetch('http://3.15.153.52:3307/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to add user: ${res.status}`);
      }

      const addedUserData = await res.json(); // Assuming your API returns the new user with an ID
      setUsers((prev) => [...prev, addedUserData]); // Use data from API for ID
      setNewUser({ name: '', email: '', isAdmin: false });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding user:', err);
      // Handle error
    }
  };

  // --- FILTERING AND SORTING LOGIC ---
  const filteredAndSortedUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = String(a[sortKey]).toLowerCase(); // Ensure string conversion
      const valB = String(b[sortKey]).toLowerCase(); // Ensure string conversion

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // --- RENDER COMPONENT ---
  return (
    <div className="p-4"> {/* Added some padding for better spacing */}
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-1 gap-2 flex-wrap"> {/* Added flex-wrap for responsiveness */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-auto flex-grow" // flex-grow for better filling
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
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
        >
          {showAddForm ? 'Cancel Add' : 'Add New User'}
        </button>
      </div>

      {/* Add New User Form */}
      {showAddForm && (
        <div className="mb-6 border p-4 rounded-lg shadow-sm bg-gray-50">
          <h3 className="font-semibold text-lg mb-3">Add New User</h3>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              name="name"
              value={newUser.name}
              onChange={handleAddChange}
              placeholder="Full Name"
              className="p-2 border border-gray-300 rounded w-full flex-grow"
              required
            />
            <input
              name="email"
              type="email" // Use type="email" for better validation
              value={newUser.email}
              onChange={handleAddChange}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded w-full flex-grow"
              required
            />
            <button
              onClick={handleAddUser}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Add User
            </button>
          </div>
        </div>
      )}

      {/* User Table */}
      {loading ? (
        <p className="text-center text-lg mt-8">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow"> {/* Changed overflow-y-auto to overflow-x-auto for table scrolling */}
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100 sticky top-0"> {/* sticky top-0 for fixed header */}
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
                  <tr key={user.id} className="bg-white hover:bg-gray-50 transition-colors">
                    {editingUser === user.id ? (
                      <>
                        <td className="border p-2">
                          <input
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className="p-1 border border-gray-300 rounded w-full"
                          />
                        </td>
                        <td className="border p-2">
                          <input
                            name="email"
                            type="email"
                            value={editData.email}
                            onChange={handleChange}
                            className="p-1 border border-gray-300 rounded w-full"
                          />
                        </td>
                        <td className="border p-2">
                          {user.isAdmin ? 'Admin' : 'User'}
                        </td>
                        <td className="border p-2 space-x-2 flex flex-wrap gap-2 justify-center">
                          <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                          {!user.isAdmin && (
                            <button
                              onClick={() => handlePromote(user.id)}
                              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
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
                        <td className="border p-2 space-x-2 flex flex-wrap gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            Edit
                          </button>
                          {/* You might want a delete button here too */}
                          {/* <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button> */}
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