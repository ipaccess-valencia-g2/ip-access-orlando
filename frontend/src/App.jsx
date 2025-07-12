import { Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  HomePage,
  RegisterPage,
  ReservationPage,
  LoginPage,
  AdminPage,
  ConfirmationPage,
  UserDashboard
} from './pages';

function App() {
  return (
    <>
      <nav className="main-nav">
        <Link to="/">Home</Link><span className="separator">|</span>
        <Link to="/register">Register</Link><span className="separator">|</span>
        <Link to="/login">Login</Link><span className="separator">|</span>
        <Link to="/dashboard">User Dashboard</Link><span className="separator">|</span>
        <Link to="/reservation">Reserve</Link><span className="separator">|</span>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/"             element={<HomePage />}          />
        <Route path="/register"     element={<RegisterPage />}      />
        <Route path="/login"        element={<LoginPage />}         />
        <Route path="/dashboard"    element={<UserDashboard />}     />
        <Route path="/reservation"  element={<ReservationPage />}   />
        <Route path="/confirmation" element={<ConfirmationPage />}  />
        <Route path="/admin"        element={<AdminPage />}         />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
