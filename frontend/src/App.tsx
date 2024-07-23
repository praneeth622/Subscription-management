import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from '../src/ProtectedRoute';
import Subscribe from './pages/Subscribe';
import PaymentFailure from './pages/Paymentfaliure';
import SignIn from './pages/auth/signin/SignIn';
import Signup from './pages/auth/signup/Signup';
import Create from './pages/create';
import Guide from './pages/guide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
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
