import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage, RegisterPage, ReservationPage, LoginPage, AdminPage, ConfirmationPage, UserDashboard } from './pages';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register </Link> | 
        <Link to="/reservation">Reserve</Link> | <Link to="/login">Login</Link> | 
        <Link to="/admin">Admin</Link> | <Link to="/confirmation">Confirmation</Link> |
        <Link to="/dashboard">User Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
