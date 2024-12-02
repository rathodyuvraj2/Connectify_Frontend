import React from 'react';
import { MessageCircle, User, LogOut, Users } from 'lucide-react';

export const FacultyNavigation = ({ user, handleLogout, setShowProfile, navigate }) => (
  <nav className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold text-gray-800">
            {user.role === 'proctor' ? 'Proctor Dashboard' : 'Professor Dashboard'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/chat')}>
            <MessageCircle className="h-6 w-6" />
          </button>
          <button onClick={() => navigate('/manage-students')}>
            <Users className="h-6 w-6" />
          </button>
          <button onClick={handleLogout}>
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export const RemarksSection = ({ selectedUser, users, newRemark, setNewRemark, handleAddRemark }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-semibold mb-4">Add Remark</h2>
    <select
      className="w-full px-3 py-2 border rounded-md mb-4"
      onChange={(e) => setSelectedUser(users.find(user => user._id === e.target.value))}
    >
      <option value="">Select a student</option>
      {users.map(user => (
        <option key={user._id} value={user._id}>{user.fullName}</option>
      ))}
    </select>
    <textarea
      className="w-full px-3 py-2 border rounded-md mb-4"
      value={newRemark}
      onChange={(e) => setNewRemark(e.target.value)}
      placeholder="Add a remark"
    />
    <button
      onClick={handleAddRemark}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Add Remark
    </button>
  </div>
);
