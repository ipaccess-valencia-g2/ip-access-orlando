import React, { useState, useEffect } from 'react';

const UserManagementView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   
    const mockUsers = [
      { userID: 101, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
      { userID: 102, name: 'Bob Williams', email: 'bob@example.com', role: 'User' },
      { userID: 103, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' },
      { userID: 104, name: 'Diana Miller', email: 'diana@example.com', role: 'User' },
    ];
    setUsers(mockUsers);
  }, []);

  
  const handlePromote = (userIdToPromote) => {
    console.log(`Promoting user with ID: ${userIdToPromote}`);
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.userID === userIdToPromote ? { ...user, role: 'Admin' } : user
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handlePromote(user.userID)}
                    disabled={user.role === 'Admin'} // Disables the button if user is already an Admin
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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