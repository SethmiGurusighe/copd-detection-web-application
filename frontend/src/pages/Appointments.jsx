// Appointments Page
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { assistantAPI } from '../services/apiService';
import '../styles/layout.css';

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/assistant/login');
      return;
    }

    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await assistantAPI.getAppointments();
      setAppointments(response.data.data);
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    return `badge badge-${status.toLowerCase()}`;
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
          <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600', color: '#1e1e2e' }}>
            All Appointments
          </h2>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.patientId?.fullName || 'N/A'}</td>
                      <td>{appointment.doctorId?.fullName || 'N/A'}</td>
                      <td>{formatDate(appointment.appointmentDate)}</td>
                      <td>
                        <span className={getStatusBadge(appointment.status)}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>{appointment.notes || '-'}</td>
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
