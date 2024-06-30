// components/UserProfile.js
import React from 'react';
import { useSelector } from 'react-redux';

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <div className="text-center text-gray-500 mt-10">No user data available</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
      <div className="flex flex-col items-center">
        <div className="mb-2 w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          {/* Placeholder for user avatar */}
          <span className="text-4xl">{user.username.charAt(0).toUpperCase()}</span>
        </div>
        <p className="text-lg mb-1"><span className="font-semibold">Username:</span> {user.username}</p>
        <p className="text-lg mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
