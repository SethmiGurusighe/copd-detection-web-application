// Patients Page
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { assistantAPI } from '../services/apiService';
import '../styles/layout.css';

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/assistant/login');
      return;
    }

    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await assistantAPI.getPatients();
      setPatients(response.data.data);
    } catch (err) {
      setError('Failed to load patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            All Patients
          </h2>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Assigned Doctor</th>
                </tr>
              </thead>
              <tbody>
                {patients && patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient._id}>
                      <td>{patient.userId?.fullName || 'N/A'}</td>
                      <td>{patient.userId?.email || 'N/A'}</td>
                      <td>{patient.userId?.phone || 'N/A'}</td>
                      <td>
                        <span className={`badge badge-${patient.status?.toLowerCase()}`}>
                          {patient.status || 'N/A'}
                        </span>
                      </td>
                      <td>{patient.assignedDoctor?.fullName || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
                      No patients found
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
