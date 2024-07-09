import React from 'react';
import Sidebar from '../components/navbarr';

const Guide = () => {
  return (
    <div className='flex'>
        <Sidebar />
    <div className=" flex items-center justify-center lg:h-screen">
    <div className="container  p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {/* Replace this with your grid items */}
        <div className="bg-white rounded-lg border p-4 w-[250px] space-x-2">
          <img src="https://placehold.co/300x200/d1d4ff/352cb5.png" alt="Placeholder Image" className="w-full h-46 rounded-md object-cover" />
          <div className="px-1 py-4">
            <div className="text-xl mb-2">Date</div>
            <p className="text-gray-700 text-base">
              Guide Name
            </p>
          </div>
          <div className="px-1 py-4">
            <a href="#" className="text-blue-500 hover:underline">Workspace</a>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4 w-[250px]">
          <img src="https://placehold.co/300x200/d1d4ff/352cb5.png" alt="Placeholder Image" className="w-full h-46 rounded-md object-cover" />
          <div className="px-1 py-4">
            <div className="text-xl mb-2">Date</div>
            <p className="text-gray-700 text-base">
              Guide Name
            </p>
          </div>
          <div className="px-1 py-4">
            <a href="#" className="text-blue-500 hover:underline">Workspace</a>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4 w-[250px]">
          <img src="https://placehold.co/300x200/d1d4ff/352cb5.png" alt="Placeholder Image" className="w-full h-46 rounded-md object-cover" />
          <div className="px-1 py-4">
            <div className="text-xl mb-2">Date</div>
            <p className="text-gray-700 text-base">
              Guide Name
            </p>
          </div>
          <div className="px-1 py-4">
            <a href="#" className="text-blue-500 hover:underline">Workspace</a>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4 w-[250px]">
          <img src="https://placehold.co/300x200/d1d4ff/352cb5.png" alt="Placeholder Image" className="w-full h-46 rounded-md object-cover" />
          <div className="px-1 py-4">
            <div className="text-xl mb-2">Date</div>
            <p className="text-gray-700 text-base">
              Guide Name
            </p>
          </div>
          <div className="px-1 py-4">
            <a href="#" className="text-blue-500 hover:underline">Workspace</a>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  </div>
);
}
 

export default Guide;
