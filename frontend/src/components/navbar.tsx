import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center flex-wrap">
    <div className="flex justify-between items-center w-full md:w-auto">
      <button className="text-blue-500 font-semibold" onClick={() => navigate('/dashboard')}>Back</button>
    
      <button className="md:hidden text-blue-500 font-semibold">Menu</button>
    </div>
    <div className="hidden md:flex space-x-4 mt-4 md:mt-0">
      <button className="text-blue-500 font-semibold">Edit</button>
      <button className="text-blue-500 font-semibold">Share</button>
    </div>
  </nav>
  );
}

export default Navbar;
