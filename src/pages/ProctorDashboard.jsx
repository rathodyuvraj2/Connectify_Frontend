// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FacultyNavigation, RemarksSection } from '../components/faculty/CommonFacultyFeatures';
// import ProfileComponent from '../components/ProfileComponent';
// import { fetchUsers, createAnnouncement, nominateClubLead, addRemark, updateRemark, getFacultyDetails, updateFacultyProfile,getAnnouncements } from '../services/api';
// import { Bell, Users, MessageSquare, Shield, ChevronRight, Edit3, X } from 'lucide-react';

// const ProctorDashboard = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [announcementText, setAnnouncementText] = useState('');
//   const [remarks, setRemarks] = useState([]);
//   const [newRemark, setNewRemark] = useState('');
//   const [editRemark, setEditRemark] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [showProfile, setShowProfile] = useState(false);
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     fetchUserDetails();
//     fetchAllUsers();
//   }, [refreshKey]);

//   const fetchUserDetails = async () => {
//     try {
//       // const userId = localStorage.getItem('UserId');
//       const user = localStorage.getItem("user");
//       const userResponse = JSON.parse(user);
//       const userId = userResponse.id;

//       const response = await getFacultyDetails(userId);
//       if (response.success) {
//         setCurrentUser(response.data);
//         setRemarks(response.data.remarks || []);
//       }
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const response = await fetchUsers();
//       setUsers(response.users || []);
//     } catch (error) {
//       setError('Failed to fetch users');
//     }
//   };

// // Add this useEffect to fetch announcements
// useEffect(() => {
//   const fetchAnnouncements = async () => {
//     try {
//       const response = await getAnnouncements(); // Add this API call to your services
//       setAnnouncements(response.data || []);
//     } catch (error) {
//       console.error('Error fetching announcements:', error);
//     }
//   };
//   fetchAnnouncements();
// }, [refreshKey]);

// const handleLogout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   localStorage.removeItem('role');
//   navigate('/login');
// };

// const handleNominateClubLead = async () => {
//   try {
//     const response = await nominateClubLead(selectedUser._id);
//     if (response.success) {
//       setSuccess('User nominated as Club Lead successfully');
//       setRefreshKey(oldKey => oldKey + 1);
//     } else {
//       setError(response.message);
//     }
//   } catch (error) {
//     setError('Failed to nominate Club Lead');
//   }
// };

// const handleCreateAnnouncement = async () => {
//   try {
//     // const userId = localStorage.getItem('UserId');
//     const user = localStorage.getItem("user");
//     const userResponse = JSON.parse(user);
//     const userId = userResponse.id;

//     const response = await createAnnouncement({ facultyId: userId, text: announcementText });
//     if (response.success) {
//       setSuccess('Announcement created successfully');
//       setAnnouncementText('');
//     } else {
//       setError(response.message);
//     }
//   } catch (error) {
//     setError('Failed to create announcement');
//   }
// };

// const handleAddRemark = async () => {
//   try {
//     // const userId = localStorage.getItem('UserId');
//     const user = localStorage.getItem("user");
//     const userResponse = JSON.parse(user);
//     const userId = userResponse.id;

//     const response = await addRemark({
//       studentId: selectedUser._id,
//       text: newRemark,
//       facultyId: userId
//     });
//     if (response.success) {
//       setRemarks([...remarks, response.data]);
//       setNewRemark('');
//       setRefreshKey(oldKey => oldKey + 1);
//     } else {
//       setError(response.message);
//     }
//   } catch (error) {
//     setError('Failed to add remark');
//   }
// };

// const handleEditRemark = async () => {
//   try {
//     const response = await updateRemark(editRemark._id, { text: editRemark.text });
//     if (response.success) {
//       setRemarks(remarks.map(remark =>
//         remark._id === editRemark._id ? response.data : remark
//       ));
//       setEditRemark(null);
//       setRefreshKey(oldKey => oldKey + 1);
//     } else {
//       setError(response.message);
//     }
//   } catch (error) {
//     setError('Failed to update remark');
//   }
// };

// const handleUpdateProfile = async (updatedData) => {
//   try {
//     const response = await updateFacultyProfile(updatedData);
//     if (response.success) {
//       setSuccess('Profile updated successfully');
//       setRefreshKey(oldKey => oldKey + 1);
//     } else {
//       setError(response.message);
//     }
//   } catch (error) {
//     setError('Failed to update profile');
//   }
// };

// const filteredUsers = users.filter(user =>
//   user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
// );

// // Add this component for stats cards
// const StatCard = ({ icon, title, value, description }) => (
//   <div className="bg-white rounded-xl shadow-soft p-6">
//     <div className="flex items-center">
//       <div className="p-3 rounded-lg bg-gray-50">{icon}</div>
//       <div className="ml-4">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//         <p className="text-3xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-gray-500">{description}</p>
//       </div>
//     </div>
//   </div>
// );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//       <FacultyNavigation
//         user={currentUser || {}}
//         handleLogout={handleLogout}
//         setShowProfile={setShowProfile}
//         navigate={navigate}
//       />

//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             icon={<Bell className="h-8 w-8 text-blue-500" />}
//             title="Announcements"
//             value={announcements?.length || 0}
//             description="Total Announcements"
//           />
//           <StatCard
//             icon={<Users className="h-8 w-8 text-green-500" />}
//             title="Students"
//             value={users.filter(u => u.role === 'student').length}
//             description="Under Supervision"
//           />
//           <StatCard
//             icon={<MessageSquare className="h-8 w-8 text-purple-500" />}
//             title="Remarks"
//             value={remarks.length}
//             description="Total Remarks Made"
//           />
//           <StatCard
//             icon={<Shield className="h-8 w-8 text-indigo-500" />}
//             title="Club Leads"
//             value={users.filter(u => u.isClubLead).length}
//             description="Active Club Leads"
//           />
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Announcements Section */}
//           <div className="bg-white rounded-xl shadow-soft p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold text-gray-800">Global Announcements</h2>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                 View All <ChevronRight className="inline h-4 w-4" />
//               </button>
//             </div>
//             <textarea
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
//               rows="4"
//               value={announcementText}
//               onChange={(e) => setAnnouncementText(e.target.value)}
//               placeholder="Write your announcement here..."
//             />
//             <button
//               onClick={handleCreateAnnouncement}
//               className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
//             >
//               Create Announcement
//             </button>
//           </div>

//           {/* Club Lead Nomination Section */}
//           <div className="bg-white rounded-xl shadow-soft p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Nominate Club Lead</h2>
//             <select
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
//               onChange={(e) => setSelectedUser(users.find(user => user._id === e.target.value))}
//             >
//               <option value="">Select a student to nominate</option>
//               {users.filter(user => user.role === 'student' && !user.isClubLead).map(user => (
//                 <option key={user._id} value={user._id}>{user.fullName}</option>
//               ))}
//             </select>
//             <button
//               onClick={handleNominateClubLead}
//               className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg px-4 py-3 font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200"
//             >
//               Nominate Club Lead
//             </button>
//           </div>

//           {/* Remarks Section with enhanced UI */}
//           <div className="bg-white rounded-xl shadow-soft p-6 lg:col-span-2">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Student Remarks</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <RemarksSection
//                 selectedUser={selectedUser}
//                 users={users}
//                 newRemark={newRemark}
//                 setNewRemark={setNewRemark}
//                 handleAddRemark={handleAddRemark}
//               />

//               <div className="bg-gray-50 rounded-lg p-6">
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-4"
//                   placeholder="Search students..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <div className="space-y-4 max-h-96 overflow-y-auto">
//                   {filteredUsers.map(user => (
//                     <div key={user._id} className="bg-white rounded-lg p-4 shadow-sm">
//                       <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
//                       {remarks
//                         .filter(remark => remark.student._id === user._id)
//                         .map((remark, index) => (
//                           <div key={index} className="mt-2 flex justify-between items-center">
//                             <p className="text-gray-600">{remark.text}</p>
//                             <button
//                               onClick={() => setEditRemark(remark)}
//                               className="text-blue-500 hover:text-blue-700"
//                             >
//                               <Edit3 className="h-4 w-4" />
//                             </button>
//                           </div>
//                         ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProctorDashboard;

// ---------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FacultyNavigation,
  RemarksSection,
} from "../components/faculty/CommonFacultyFeatures";
import {
  Bell,
  Users,
  MessageSquare,
  Shield,
  ChevronRight,
  Edit3,
  X,
  Calendar,
  Megaphone,
  Mail,
  Phone,
  MapPin,
  Clock,
  Edit,
  GraduationCap,
  Trash2
} from "lucide-react";
import {
  fetchUsers,
  createAnnouncement,
  nominateClubLead,
  addRemark,
  updateRemark,
  getFacultyDetails,
  updateFacultyProfile,
  getAnnouncements,
  deleteRemark,
} from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import Swal from "sweetalert2";

const ProctorDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [announcementText, setAnnouncementText] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const [editRemark, setEditRemark] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(true);
  const [userData, setUserData] = useState({
    projects: [],
    certifications: [],
    skills: [],
    achievements: [],
  });

  // Add this state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({
    phoneNumber: currentUser?.phoneNumber || "",
    officeHours: currentUser?.officeHours || "",
    officeLocation: currentUser?.officeLocation || "",
    specialization: currentUser?.specialization || [],
  });

  useEffect(() => {
    fetchUserDetails();
    fetchAllUsers();
    fetchAnnouncements();
  }, [refreshKey]);

  // Add this to your useEffect for fetching user details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const userResponse = JSON.parse(user);
        const userId = userResponse.id;

        const response = await getFacultyDetails(userId);
        console.log("Faculty Detail: ", response);
        if (response.success) {
          setCurrentUser(response.data);
          setRemarks(response.data.remarks || []);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, [refreshKey]);

  const fetchUserDetails = async () => {
    try {
      const user = localStorage.getItem("user");
      const userResponse = JSON.parse(user);
      const userId = userResponse.id;

      const response = await getFacultyDetails(userId);
      console.log("Faculty Detail: ", response);
      if (response.success) {
        setCurrentUser(response.data);
        setRemarks(response.data.remarks || []);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.users || []);
    } catch (error) {
      setError("Failed to fetch users");
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      setAnnouncements(response.data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleCreateAnnouncement = async () => {
    try {
      const user = localStorage.getItem("user");
      const userResponse = JSON.parse(user);
      const userId = userResponse.id;

      const response = await createAnnouncement({
        facultyId: userId,
        text: announcementText,
      });
      if (response.success) {
        toast.success("Announcement created successfully!", {
          icon: "🎉",
          duration: 4000,
          position: "top-center",
          style: {
            background: "#4CAF50",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
            borderRadius: "12px",
          },
        });
        setAnnouncementText("");
        fetchAnnouncements();
      }
    } catch (error) {
      toast.error("Failed to create announcement", {
        style: {
          background: "#ef4444",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          borderRadius: "12px",
        },
      });
    }
  };

  const handleNominateClubLead = async () => {
    try {
      const response = await nominateClubLead(selectedUser._id);
      if (response.success) {
        toast.success("Club Lead nominated successfully!", {
          icon: "👑",
          duration: 4000,
        });
        setRefreshKey((oldKey) => oldKey + 1);
      }
    } catch (error) {
      toast.error("Failed to nominate Club Lead");
    }
  };

  // Add this useEffect to fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements(); // Add this API call to your services
        setAnnouncements(response.data || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, [refreshKey]);

  const handleAddRemark = async () => {
    try {
      // const userId = localStorage.getItem('UserId');
      const user = localStorage.getItem("user");
      const userResponse = JSON.parse(user);
      const userId = userResponse.id;

      const response = await addRemark({
        studentId: selectedUser._id,
        text: newRemark,
        facultyId: userId,
      });
      if (response.success) {
        setRemarks([...remarks, response.data]);
        setNewRemark("");
        setRefreshKey((oldKey) => oldKey + 1);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to add remark");
    }
  };

  const handleEditRemark = async () => {
    try {
      const response = await updateRemark(editRemark._id, {
        text: editRemark.text,
      });
      if (response.success) {
        setRemarks(
          remarks.map((remark) =>
            remark._id === editRemark._id ? response.data : remark
          )
        );
        setEditRemark(null);
        setRefreshKey((oldKey) => oldKey + 1);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to update remark");
    }
  };

  const handleDeleteRemark = async (remarkId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteRemark(remarkId);
        if (response.success) {
          setRemarks(remarks.filter((remark) => remark._id !== remarkId));
          setRefreshKey((oldKey) => oldKey + 1);
          Swal.fire("Deleted!", "Remark has been deleted.", "success");
        } else {
          setError(response.message);
        }
      }
    } catch (error) {
      setError("Failed to delete remark");
      Swal.fire("Error!", "Failed to delete remark.", "error");
    }
  };

  // Add this handler for form submission
  const handleProfileUpdate = async () => {
    try {
      const response = await updateFacultyProfile({
        ...editableFields,
        facultyId: currentUser?._id,
      });

      if (response.success) {
        toast.success("Profile updated successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        });
        setIsEditing(false);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add this helper function at the top of your component
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  const AnnouncementsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Megaphone className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800 font-display">
                Announcement History
              </h2>
            </div>
            <button
              onClick={() => setShowAllAnnouncements(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)] bg-gray-50">
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div
                key={announcement._id}
                className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-lg text-gray-800 font-medium mb-2">
                      {announcement.text}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(
                          new Date(announcement.timestamp),
                          "MMM dd, yyyy • h:mm a"
                        )}
                      </span>
                      <span className="text-blue-600 font-medium">
                        • {announcement.authorName}
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {format(new Date(announcement.timestamp), "MMM dd")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ icon, title, value, description, color }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster />
      <FacultyNavigation
        user={currentUser || {}}
        handleLogout={handleLogout}
        setShowProfile={setShowProfile}
        navigate={navigate}
      />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Bell className="h-8 w-8 text-blue-500" />}
            title="Announcements"
            value={announcements.length}
            description="Total Announcements"
            color="bg-blue-50"
          />
          <StatCard
            icon={<Users className="h-8 w-8 text-green-500" />}
            title="Students"
            value={users.filter((u) => u.role === "student").length}
            description="Under Supervision"
            color="bg-green-50"
          />
          <StatCard
            icon={<MessageSquare className="h-8 w-8 text-purple-500" />}
            title="Remarks"
            value={remarks.length}
            description="Total Remarks Made"
            color="bg-purple-50"
          />
          <StatCard
            icon={<Shield className="h-8 w-8 text-indigo-500" />}
            title="Club Leads"
            value={users.filter((u) => u.isClubLead).length}
            description="Active Club Leads"
            color="bg-indigo-50"
          />
        </div>

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
                    {currentUser?.role?.charAt(0).toUpperCase() +
                      currentUser?.role?.slice(1)}
                  </span>
                  {currentUser?.isProctor && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Proctor
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-faculty-profile")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Contact Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {currentUser?.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {currentUser?.phoneNumber}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {currentUser?.officeLocation}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Office Hours
                </h3>
                <p className="text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {currentUser?.officeHours}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Specialization
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser?.specialization?.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Qualifications
                </h3>
                <div className="space-y-2">
                  {currentUser?.qualifications?.map((qual, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-600"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>
                        {qual.degree} from {qual.institution} ({qual.year})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Additional Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined: {formatDate(currentUser?.joiningDate)}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Last Active:{" "}
                    {currentUser?.lastLogin
                      ? format(
                          new Date(currentUser.lastLogin),
                          "MMM dd, yyyy HH:mm"
                        )
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Announcements Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <Megaphone className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Announcements
                </h2>
              </div>
              <button
                onClick={() => setShowAllAnnouncements(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View All <ChevronRight className="inline h-4 w-4 ml-1" />
              </button>
            </div>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 font-sans"
              rows="4"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Write your announcement here..."
            />
            <button
              onClick={handleCreateAnnouncement}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Announcement
            </button>
          </div>

          {/* Club Lead Nomination Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Nominate Club Lead
              </h2>
            </div>
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4 font-sans"
              onChange={(e) =>
                setSelectedUser(
                  users.find((user) => user._id === e.target.value)
                )
              }
            >
              <option value="">Select a student to nominate</option>
              {users
                .filter((user) => user.role === "student" && !user.isClubLead)
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
            <button
              onClick={handleNominateClubLead}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg px-4 py-3 font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Nominate Club Lead
            </button>
          </div>

          {/* Remarks Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Student Remarks
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                  onChange={(e) =>
                    setSelectedUser(
                      users.find((user) => user._id === e.target.value)
                    )
                  }
                >
                  <option value="">Select a student</option>
                  {users
                    .filter((user) => user.role === "student")
                    .map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))}
                </select>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
                  rows="4"
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Add a remark about the student..."
                />
                <button
                  onClick={handleAddRemark}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-3 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Add Remark
                </button>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {/* {remarks.map((remark, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 mb-2">{remark.text}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{format(new Date(remark.timestamp), 'MMM dd, yyyy')}</span>
                      <button
                        onClick={() => setEditRemark(remark)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))} */}
                {remarks.map((remark, index) => (
                  <div key={remark._id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 mb-2">{remark.text}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>
                        <p className="font-medium text-purple-600">
                          {remark.student.fullName}
                        </p>
                        <span>
                          {remark.createdAt
                            ? format(new Date(remark.createdAt), "MMM dd, yyyy")
                            : "Date not available"}
                        </span>
                      </div>
                      <div className="flex gap-5">
                        <button
                          onClick={() => setEditRemark(remark)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRemark(remark._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAllAnnouncements && <AnnouncementsModal />}

      {editRemark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Remark</h2>
              <button onClick={() => setEditRemark(null)}>
                <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <textarea
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
              rows="4"
              value={editRemark.text}
              onChange={(e) =>
                setEditRemark({ ...editRemark, text: e.target.value })
              }
            />
            <button
              onClick={handleEditRemark}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-3 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Update Remark
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProctorDashboard;
