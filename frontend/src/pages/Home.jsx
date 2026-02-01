// Home Page
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo">
          <div className="logo-icon">⚕️</div>
          <h1>COPD Detection</h1>
        </div>
        <p className="subtitle">Clinical Support Portal</p>
        <p className="description">
          Access the COPD early detection dashboard through advanced deep learning technology
        </p>
      </div>

      <div className="roles-grid">
        {/* Doctor Option */}
        <div className="role-card">
          <div className="role-icon">👨‍⚕️</div>
          <h2>Doctor</h2>
          <p>Access your patient records and manage diagnoses</p>
          <button className="btn btn-primary" onClick={() => navigate('/doctor/login')}>
            Login / Register
          </button>
        </div>

        {/* Assistant Option */}
        <div className="role-card">
          <div className="role-icon">👩‍💼</div>
          <h2>Assistant</h2>
          <p>Manage appointments and assist doctors</p>
          <button className="btn btn-primary" onClick={() => navigate('/assistant/login')}>
            Login / Register
          </button>
        </div>

        {/* Patient Option */}
        <div className="role-card">
          <div className="role-icon">🧑‍🤝‍🧑</div>
          <h2>Patient</h2>
          <p>Check your test results and appointments</p>
          <button className="btn btn-primary" onClick={() => navigate('/patient/login')}>
            Login
          </button>
        </div>
      </div>

      <div className="home-footer">
        <p>© 2024 COPD Detection System – Authorized clinical personnel access only</p>
      </div>
    </div>
  );
}
