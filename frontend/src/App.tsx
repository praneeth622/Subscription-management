import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import subscribe from './pages/subscribe';
import ProtectedRoute from '../src/ProtectedRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path="/subscribe" element={<subscribe />} />
      </Routes>
    </Router>
  );
};

export default App;
