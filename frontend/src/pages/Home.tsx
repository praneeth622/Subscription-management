// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">My App</h1>
              </div>
              <div className="ml-auto">
                <button
                  onClick={handleSignIn}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h2 className="text-2xl font-bold text-center mt-20">Hero Section</h2>
              <p className="text-center mt-4 text-gray-700">
                This is an amazing app that helps you achieve great things!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
