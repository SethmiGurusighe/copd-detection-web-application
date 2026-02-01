// Assistant Register Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import '../styles/forms.css';

export default function AssistantRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staffId: '',
    fullName: '',
    email: '',
    phone: '',
    nic: '',
    placeOfWork: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        ...formData,
        role: 'assistant',
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/assistant/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="auth-image-placeholder">
          <div className="auth-image-text">Clinical Support Portal</div>
          <div className="auth-image-subtitle">
            Join our team of professionals in delivering high-precision COPD detection
          </div>
        </div>
      </div>

      <div className="auth-form">
        <div className="form-container">
          <h1 className="form-title">Assistant Registration</h1>
          <p className="form-subtitle">Please provide your professional credentials to create your healthcare assistant account.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', marginTop: '16px', color: '#1e1e2e' }}>
                PROFESSIONAL PROFILE
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Staff ID</label>
                  <input
                    type="text"
                    name="staffId"
                    className="form-input"
                    placeholder="S001"
                    value={formData.staffId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="U.W. Gurusinghe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    className="form-input"
                    placeholder="Enter NIC Number"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Place of Work</label>
                  <input
                    type="text"
                    name="placeOfWork"
                    className="form-input"
                    placeholder="Clinic or Hospital Name"
                    value={formData.placeOfWork}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', marginTop: '16px', color: '#1e1e2e' }}>
                CONTACT INFORMATION
              </h3>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Upul123@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="07XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', marginTop: '16px', color: '#1e1e2e' }}>
                ACCOUNT SECURITY
              </h3>

              <div className="form-group">
                <label className="form-label">Create Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="••••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
                  <input type="checkbox" required />
                  <span>I confirm that all provided information is accurate and I agree to the policies.</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '24px' }} disabled={loading}>
              {loading ? 'Registering...' : 'REGISTER ASSISTANT ACCOUNT'}
            </button>
          </form>

          <div className="form-link mt-2">
            <span>Already registered? </span>
            <a onClick={() => navigate('/assistant/login')}>Login here</a>
          </div>

          <div className="form-link mt-2">
            <a onClick={() => navigate('/')}>← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
