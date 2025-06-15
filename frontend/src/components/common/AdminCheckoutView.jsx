import React, { useState, useEffect } from 'react';

const UserManagementView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // In a real app, this data would be fetched from your backend (GET /users)
    const mockUsers = [
      { id: 101, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
      { id: 102, name: 'Bob Williams', email: 'bob@example.com', role: 'User' },
      { id: 103, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' },
      { id: 104, name: 'Diana Miller', email: 'diana@example.com', role: 'User' },
    ];
    setUsers(mockUsers);
  }, []);

  // This function simulates promoting a user
  const handlePromote = (userId) => {
    // In a real app, you would send a request to your backend to update the user's role
    console.log(`Promoting user with ID: ${userId}`);
    
    // We update the user's role in our local state for now
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === userId ? { ...user, role: 'Admin' } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user.email}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.role === 'Admin' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="border p-3 text-center">
                  <button
                    onClick={() => handlePromote(user.id)}
                    disabled={user.role === 'Admin'} // Disable button if already an Admin
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Promote to Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementView;
