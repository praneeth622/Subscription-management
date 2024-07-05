import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from '../src/ProtectedRoute';
import Subscribe from './pages/Subscribe';
import PaymentFailure from './pages/Paymentfaliure';
import SignIn from './pages/auth/signin/SignIn';
import Signup from './pages/auth/signup/Signup';


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
        <Route path="/subscribe" element={<ProtectedRoute>
          <Subscribe />
        </ProtectedRoute>}/>
        <Route path="/payment-failure" element={<ProtectedRoute>
          <PaymentFailure />
        </ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
