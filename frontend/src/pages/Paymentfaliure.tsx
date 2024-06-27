import { Link } from 'react-router-dom';

const PaymentFailure = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
        <p className="text-gray-700 mb-4">Unfortunately, your payment could not be processed at this time. Please try again later.</p>
        <Link to="/" className="text-blue-600 hover:underline">Go back to Home</Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
