// Sidebar Component
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', path: '/assistant/dashboard', icon: '📊' },
    { label: 'Appointments', path: '/assistant/appointments', icon: '📅' },
    { label: 'Patients', path: '/assistant/patients', icon: '👥' },
  ];

  return (
    <div className="sidebar">
      <div style={{ paddingLeft: '24px', marginBottom: '24px', color: '#60a5fa', fontWeight: '700' }}>
        Assistant Panel
      </div>
      <div className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.path}
            className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
