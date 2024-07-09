import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import SubscriptionStatus from './SubscriptionStatus';
import { IoIosArrowDropright } from "react-icons/io";
import { useState } from 'react';

const Sidebar = () => {
  const { user } = useUser();

  const [open, SetOpen] = useState(true);

  return (
    <div className="h-screen w-64 bg-white shadow-lg border-r border-gray-200">
      
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 px-4 py-4">
        <IoIosArrowDropright className='text-3xl'/>
          <Link to="/dashboard" className="text-xl font-bold">
            Arty
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-start px-4 py-4 space-y-4">
        <Link to="/guide" className="text-xl font-bold">
            My Guide
          </Link>
          <div>
            <SubscriptionStatus />
          </div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.fullName}</span>
                <UserButton />
              </div>
            )}
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
