import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage, RegisterPage, ReservationPage } from './pages';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/register">Register </Link> | <Link to="/reservation">Reserve</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
