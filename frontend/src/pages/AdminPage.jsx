import React, { useState } from 'react';

// Import all the components for the dashboard
import AdminCheckInView from '../components/AdminCheckInView.jsx';
import ManualCheckout from '../components/ManualCheckout.jsx';
import UserManagementView from '../components/UserManagementView.jsx';

const AdminPage = () => {
  // State to keep track of the currently active tab
  const [activeTab, setActiveTab] = useState('devices'); // 'devices' or 'users'

  // styles for the tab buttons
  const tabStyle = "px-4 py-2 font-semibold rounded-t-lg focus:outline-none";
  const activeTabStyle = "bg-gray-800 text-white";
  const inactiveTabStyle = "bg-gray-600 text-white hover:bg-gray-700";

  return (
    <div className="container mx-auto p-4 md:p-8">
      
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Tab Navigation */}
      <nav className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab('devices')}
          className={`${tabStyle} ${activeTab === 'devices' ? activeTabStyle : inactiveTabStyle}`}
        >
          Device Management
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`${tabStyle} ${activeTab === 'users' ? activeTabStyle : inactiveTabStyle}`}
        >
          User Management
        </button>
      </nav>

      <main className="mt-6">

        {activeTab === 'devices' && (
          <div>
            <section className="bg-white p-6 rounded-lg shadow-md">
              <AdminCheckInView />
            </section>
            <hr className="my-10" />
            <section className="bg-white p-6 rounded-lg shadow-md">
              <ManualCheckout />
            </section>
          </div>
        )}

      
        {activeTab === 'users' && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <UserManagementView />
          </section>
        )}
      </main>

    </div>
  );
};

export default AdminPage;