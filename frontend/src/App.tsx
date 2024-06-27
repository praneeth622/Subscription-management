import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from '../src/ProtectedRoute';
import Subscribe from './pages/Subscribe';
import PaymentFailure from './pages/Paymentfaliure';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
      </Routes>
    </Router>
  );
};

export default App;
