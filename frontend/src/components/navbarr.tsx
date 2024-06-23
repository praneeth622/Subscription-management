// Navbar.js
import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import SubscriptionStatus from './SubscriptionStatus'

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">
                My App
              </Link>
            </div>
            <div className="ml-auto flex items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
