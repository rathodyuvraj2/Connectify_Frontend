import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile, uploadStudentPhoto } from "../services/api";
import { toast } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Book,
  Award,
  Code,
  Activity,
  Upload,
  Camera
} from "lucide-react";
// Add to imports
// import { Upload } from "lucide-react";
// import { uploadImage, updateStudentProfilePhoto } from "../services/api";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    phoneNumber: "",
    address: "",
    skills: [],
    achievements: [],
    extracurricularActivities: [],
    projects: [],
  });
  // Add to your state declarations
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = localStorage.getItem("user");
      const userResponse = JSON.parse(user);
      const userId = userResponse.id;

      const response = await getUserDetails(userId);
      setUserData(response.data);
      setEditableData({
        phoneNumber: response.data.phoneNumber || "",
        address: response.data.address || "",
        skills: response.data.skills || [],
        achievements: response.data.achievements || [],
        extracurricularActivities:
          response.data.extracurricularActivities || [],
        projects: response.data.projects || [],
      });
    };
    fetchUserData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(editableData);
      toast.success("Profile updated successfully!");

      setTimeout(() => {
        navigate("/student-dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const result = await uploadStudentPhoto(file, userData._id);
      if (result.success) {
        setUserData({ ...userData, profilePicture: result.data.imageUrl });
        toast.success('Profile photo updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile photo');
    }
  };

  if (!userData) return null;

    // Add this handler
    // const handleImageUpload = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       setIsUploading(true);
    //       try {
    //         const result = await uploadImage(file);
    //         const response = await updateStudentProfilePhoto(result.secure_url);
    
    //         if (response.success) {
    //           setUserData({ ...userData, profilePicture: result.secure_url });
    //           toast.success("Profile photo updated successfully");
    //         }
    //       } catch (error) {
    //         toast.error("Failed to update profile photo");
    //       } finally {
    //         setIsUploading(false);
    //       }
    //     }
    //   };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <div className="flex items-center space-x-4">
              {/* <img
                                src={userData.profilePicture}
                                alt={userData.fullName}
                                className="w-20 h-20 rounded-full border-4 border-white"
                            /> */}
                            
{/* // Replace image section with: */}
<div className="relative group">
  <input
    type="file"
    id="profileImage"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />
  <label htmlFor="profileImage" className="cursor-pointer">
    <img
      src={userData.profilePicture}
      alt={userData.fullName}
      className="w-20 h-20 rounded-full border-4 border-white"
    />
    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
      <Camera className="w-6 h-6 text-white" />
    </div>
  </label>
</div>

              <div className="text-white">
                <h1 className="text-2xl font-bold">{userData.fullName}</h1>
                <p className="opacity-90">
                  {userData.studentId} • {userData.department}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Non-editable Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Academic Information
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Semester: {userData.semester}
                  </p>
                  <p className="text-sm text-gray-600">
                    Batch: {userData.batch}
                  </p>
                  <p className="text-sm text-gray-600">CGPA: {userData.cgpa}</p>
                  <p className="text-sm text-gray-600">
                    Department: {userData.department}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Email: {userData.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date of Birth:{" "}
                    {new Date(userData.dateOfBirth).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Gender: {userData.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Editable Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Editable Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editableData.phoneNumber}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={editableData.address}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        address: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={editableData.skills.join(", ")}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Achievements (comma-separated)
                </label>
                <textarea
                  value={editableData.achievements.join(", ")}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      achievements: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  rows="3"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Extracurricular Activities
                </label>
                <textarea
                  value={editableData.extracurricularActivities.join(", ")}
                  onChange={(e) =>
                    setEditableData({
                      ...editableData,
                      extracurricularActivities: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  rows="3"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/student-dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
