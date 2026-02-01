// Assistant Dashboard
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { assistantAPI } from '../services/apiService';
import '../styles/layout.css';

export default function AssistantDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    appointmentsList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/assistant/login');
      return;
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await assistantAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = status.toLowerCase().replace(' ', '-');
    return `badge badge-${statusClass}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) {
    return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar user={user} />
        <div className="content">
          {error && <div className="alert alert-error">{error}</div>}

          {/* Dashboard Stats */}
          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-value">{dashboardData.totalPatients}</div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{dashboardData.todayAppointments}</div>
              <div className="stat-label">Today's Appointments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{dashboardData.pendingAppointments}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          {/* Appointments Table */}
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#1e1e2e' }}>
            Appointments
          </h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.appointmentsList && dashboardData.appointmentsList.length > 0 ? (
                  dashboardData.appointmentsList.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.patientId?.fullName || 'N/A'}</td>
                      <td>{appointment.doctorId?.fullName || 'N/A'}</td>
                      <td>{formatDate(appointment.appointmentDate)}</td>
                      <td>
                        <span className={getStatusBadge(appointment.status)}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Do Test
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
