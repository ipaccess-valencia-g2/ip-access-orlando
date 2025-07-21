import React, { useState, useEffect } from 'react';


// Import all the components for the dashboard
import AdminCheckInView from '../components/AdminCheckInView.jsx';
import ManualCheckout from '../components/ManualCheckout.jsx';
import UserManagementView from '../components/UserManagementView.jsx';
import ManualReservationForm from '../components/ManualReservationForm.jsx';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('devices'); // 'devices', 'users', or 'howto'
  const [firstName, setFirstName] = useState('');
  const [authError, setAuthError] = useState(false);

 useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3307/user/me', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Session expired or not logged in.');

        const data = await res.json();
        console.log("User is logged in! userID:", data.firstName);
        setFirstName(data.firstName);
      } catch (err) {
        console.error('Failed to fetch user info:', err.message);
        setAuthError(true);
      }
    };

    fetchUser();
  }, []);

  const tabStyle = "px-4 py-2 font-semibold rounded-t-lg focus:outline-none";
  const activeTabStyle = "bg-green-700 text-white";
  const inactiveTabStyle = "bg-green-600 text-white hover:bg-green-700";

  if (authError) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-lg">Please log in as an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        {firstName && <p className="mt-2">Welcome, {firstName}!</p>}
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
        <button
          onClick={() => setActiveTab('howto')}
          className={`${tabStyle} ${activeTab === 'howto' ? activeTabStyle : inactiveTabStyle}`}
        >
          How To
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
            <hr className="my-10" />
            <section className="bg-white p-6 rounded-lg shadow-md">
              <ManualReservationForm />
            </section>
          </div>
        )}

        {activeTab === 'users' && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <UserManagementView />
          </section>
        )}

        {activeTab === 'howto' && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">App Tutorial</h2>
            <p className="mb-4">This will eventually contain a walkthrough video on how to use the system.</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/placeholder"
                title="Tutorial Video"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
