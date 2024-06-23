import React from 'react';

const SubscriptionStatus = () => {
  // Mock subscription status
  const isSubscribed = false; // Change this value to simulate subscription status

  return (
    <div className=" mx-3 px-3 border border-red-500">
      {/* <h2 className="text-xl font-bold">Subscription Status</h2> */}
      {isSubscribed ? (
        <p className="text-green-600">You are subscribed!</p>
      ) : (
        <p className="text-red-600">You are not subscribed.</p>
      )}
    </div>
  );
};

export default SubscriptionStatus;
