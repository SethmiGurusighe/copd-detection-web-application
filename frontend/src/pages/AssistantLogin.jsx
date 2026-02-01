// Assistant Login Page
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import '../styles/forms.css';

export default function AssistantLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    staffId: '',
    password: '',
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

    try {
      const response = await authAPI.login({
        staffId: formData.staffId,
        password: formData.password,
        role: 'assistant',
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/assistant/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
            Access the COPD early detection dashboard through advanced deep learning technology
          </div>
        </div>
      </div>

      <div className="auth-form">
        <div className="form-container">
          <h1 className="form-title">Assistant Login</h1>
          <p className="form-subtitle">Please enter your credentials to continue.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Staff ID</label>
              <input
                type="text"
                name="staffId"
                className="form-input"
                placeholder="Enter Staff ID"
                value={formData.staffId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          <div className="form-link">
            <span>Not Registered? </span>
            <a onClick={() => navigate('/assistant/register')}>Register here</a>
          </div>

          <div className="form-link mt-3">
            <a onClick={() => navigate('/')}>← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
