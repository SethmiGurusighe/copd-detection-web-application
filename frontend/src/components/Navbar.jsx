// Navbar Component
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header-title">
        <h1>COPD Detection System</h1>
      </div>
      <div className="header-user">
        <span>{user?.fullName || 'Guest'}</span>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
