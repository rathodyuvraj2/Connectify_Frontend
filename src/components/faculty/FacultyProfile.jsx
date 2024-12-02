import React from 'react';
import { Mail, Phone, MapPin, Clock, GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const FacultyProfile = ({ currentUser, navigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-6">
          <img
            src={currentUser?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser?.fullName}
            </h1>
            <p className="text-blue-600 font-semibold">
              {currentUser?.employeeId} • {currentUser?.designation}
            </p>
            <p className="text-gray-600">{currentUser?.department}</p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/edit-faculty-profile")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Edit Profile
        </button>
      </div>
      {/* Rest of the profile content */}
    </div>
  );
};
