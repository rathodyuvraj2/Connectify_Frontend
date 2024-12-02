import React, { useState } from 'react';
import { Edit2, Save } from 'lucide-react';

const ProfileComponent = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  console.log("usER DATA: ",userData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    await onUpdateProfile(editedData);
    console.log("Edited Data: ",editedData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Faculty Profile</h2>
        <button 
          onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isEditing ? (
            <>
              <Save size={20} />
              Save
            </>
          ) : (
            <>
              <Edit2 size={20} />
              Edit
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{userData.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                name="phoneNumber"
                value={editedData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{userData.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <p className="mt-1 text-gray-900">{userData.department}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <p className="mt-1 text-gray-900">{userData.designation}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <p className="mt-1 text-gray-900">{userData.employeeId}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Office Hours</label>
            {isEditing ? (
              <input
                type="text"
                name="officeHours"
                value={editedData.officeHours}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{userData.officeHours}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Office Location</label>
            {isEditing ? (
              <input
                type="text"
                name="officeLocation"
                value={editedData.officeLocation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{userData.officeLocation}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Specializations</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {userData.specialization.map((spec, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <p className="mt-1 text-gray-900">
              {new Date(userData.joiningDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
