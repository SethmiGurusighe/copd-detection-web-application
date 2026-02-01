// Main App - React Router Setup
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AssistantLogin from './pages/AssistantLogin';
import AssistantRegister from './pages/AssistantRegister';
import AssistantDashboard from './pages/AssistantDashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant/login" element={<AssistantLogin />} />
        <Route path="/assistant/register" element={<AssistantRegister />} />
        <Route path="/assistant/dashboard" element={<AssistantDashboard />} />
        <Route path="/assistant/appointments" element={<Appointments />} />
        <Route path="/assistant/patients" element={<Patients />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
