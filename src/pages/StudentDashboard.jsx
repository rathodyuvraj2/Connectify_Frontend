// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Code,
//   Award,
//   BookOpen,
//   Github,
//   Globe,
//   Calendar,
//   Edit,
//   Trash,
//   Plus,
//   ExternalLink,
//   Clock
// } from "lucide-react";
// import DashboardNav from "../components/dashboard/DashboardNav";
// import ProjectModal from "../components/dashboard/ProjectModal";
// import CertificationModal from "../components/dashboard/CertificationModal";
// import {
//   getUserDetails,
//   deleteProject,
//   deleteCertification,
// } from "../services/api";

// const ClubLeadDashboard = () => {
//   const [userData, setUserData] = useState({
//     projects: [],
//     certifications: [],
//     skills: [],
//     achievements: [],
//   });
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [showCertModal, setShowCertModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       //   const userId = localStorage.getItem('UserId');
//       const user = localStorage.getItem("user");
//       const userResponse = JSON.parse(user);
//       const userId = userResponse.id;

//       const response = await getUserDetails(userId);
//       console.log("userDetails : ", response);
//       setUserData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleProjectAction = (project = null) => {
//     setEditingItem(project);
//     setShowProjectModal(true);
//   };

//   const handleCertificationAction = (cert = null) => {
//     setEditingItem(cert);
//     setShowCertModal(true);
//   };

//   const handleDeleteProject = async (projectId) => {
//     if (window.confirm("Are you sure you want to delete this project?")) {
//       try {
//         await deleteProject(projectId);
//         fetchUserData();
//       } catch (error) {
//         console.error("Error deleting project:", error);
//       }
//     }
//   };

//   const handleDeleteCertification = async (certId) => {
//     if (window.confirm("Are you sure you want to delete this certification?")) {
//       try {
//         await deleteCertification(certId);
//         fetchUserData();
//       } catch (error) {
//         console.error("Error deleting certification:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <DashboardNav title="Student Dashboard" />

//       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {/* Profile Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center space-x-6">
//               <img
//                 src={userData.profilePicture || "default-avatar.png"}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   {userData.fullName}
//                 </h1>
//                 <p className="text-blue-600 font-semibold">
//                   {userData.studentId} • {userData.semester}th Semester
//                 </p>
//                 <p className="text-gray-600">{userData.department}</p>
//                 <div className="mt-2 flex items-center space-x-2">
//                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                     CGPA: {userData.cgpa}
//                   </span>
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     Student
//                   </span>
//                   <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//                     {userData.isClubLead ? "Club Lead" : ""}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => navigate("/edit-profile")}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Edit className="w-4 h-4 mr-2" />
//               Edit Profile
//             </button>
//           </div>
//         </div>

//         {/* Academic Performance Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           {/* Marks Section */}
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
//               <h2 className="text-xl font-bold text-gray-800">
//                 Academic Performance
//               </h2>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="min-w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-2">Subject</th>
//                     <th className="text-center py-2">Internal 1</th>
//                     <th className="text-center py-2">Internal 2</th>
//                     <th className="text-center py-2">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userData.marks?.map((mark) => (
//                     <tr key={mark._id} className="border-b">
//                       <td className="py-2">{mark.subject}</td>
//                       <td className="text-center">{mark.internalExam1}/20</td>
//                       <td className="text-center">{mark.internalExam2}/20</td>
//                       <td className="text-center font-semibold">
//                         {mark.internalExam1 + mark.internalExam2}/40
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Attendance Section */}
//   <div className="bg-white rounded-xl shadow-lg p-6">
//     <div className="flex items-center mb-4">
//       <Clock className="w-6 h-6 text-blue-600 mr-2" />
//       <h2 className="text-xl font-bold text-gray-800">
//         Attendance Overview
//       </h2>
//     </div>
//     <div className="space-y-4">
//       {(() => {
//         const totalDays = 200;
//         const presentDays =
//           userData.attendance?.filter((a) => a.status === "present")
//             .length || 0;
//         const attendancePercentage = (presentDays / totalDays) * 100;

//         return (
//           <>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Total Working Days</span>
//               <span className="font-semibold">{totalDays}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600">Days Present</span>
//               <span className="font-semibold">{presentDays}</span>
//             </div>
//             <div className="relative pt-1">
//               <div className="flex mb-2 items-center justify-between">
//                 <div>
//                   <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
//                     Attendance
//                   </span>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-xs font-semibold inline-block text-blue-600">
//                     {attendancePercentage.toFixed(1)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
//                 <div
//                   style={{ width: `${attendancePercentage}%` }}
//                   className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
//                 ></div>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h3 className="font-semibold mb-2">
//                 Subject-wise Attendance
//               </h3>
//               {Object.entries(
//                 userData.attendance?.reduce((acc, curr) => {
//                   acc[curr.subject] = acc[curr.subject] || {
//                     present: 0,
//                     total: 0,
//                   };
//                   if (curr.status === "present")
//                     acc[curr.subject].present++;
//                   acc[curr.subject].total++;
//                   return acc;
//                 }, {}) || {}
//               ).map(([subject, data]) => (
//                 <div
//                   key={subject}
//                   className="flex justify-between items-center py-1"
//                 >
//                   <span className="text-sm text-gray-600">
//                     {subject}
//                   </span>
//                   <span className="text-sm font-medium">
//                     {((data.present / data.total) * 100).toFixed(1)}%
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       })()}
//     </div>
//   </div>
// </div>
//         {/* Skills & Achievements */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <Code className="w-6 h-6 text-blue-600 mr-2" />
//               <h2 className="text-xl font-bold text-gray-800">
//                 Technical Skills
//               </h2>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {userData.skills?.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center mb-4">
//               <Award className="w-6 h-6 text-blue-600 mr-2" />
//               <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
//             </div>
//             <ul className="space-y-3">
//               {userData.achievements?.map((achievement, index) => (
//                 <li key={index} className="flex items-center text-gray-700">
//                   <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
//                   {achievement}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         {/* Projects Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <Globe className="w-6 h-6 text-blue-600 mr-2" />
//               <h2 className="text-xl font-bold text-gray-800">Projects</h2>
//             </div>
//             <button
//               onClick={() => handleProjectAction()}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Project
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {userData.projects?.map((project) => (
//               <div
//                 key={project._id}
//                 className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-bold text-lg text-gray-800">
//                     {project.title}
//                   </h3>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleProjectAction(project)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteProject(project._id)}
//                       className="p-1 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-3">{project.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {project.technologies?.map((tech, index) => (
//                     <span
//                       key={index}
//                       className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex justify-between items-center text-sm text-gray-500">
//                   <span className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {new Date(project.startDate).toLocaleDateString()}
//                   </span>
//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center text-blue-600 hover:text-blue-800"
//                     >
//                       <Github className="w-4 h-4 mr-1" />
//                       View Code
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Certifications Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <Award className="w-6 h-6 text-blue-600 mr-2" />
//               <h2 className="text-xl font-bold text-gray-800">
//                 Certifications
//               </h2>
//             </div>
//             <button
//               onClick={() => handleCertificationAction()}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Certification
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {userData.certifications?.map((cert) => (
//               <div
//                 key={cert._id}
//                 className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="font-bold text-lg text-gray-800">
//                     {cert.name}
//                   </h3>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleCertificationAction(cert)}
//                       className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteCertification(cert._id)}
//                       className="p-1 text-red-600 hover:bg-red-50 rounded"
//                     >
//                       <Trash className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-gray-600">Issued by {cert.issuer}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-sm text-gray-500">
//                     {new Date(cert.issueDate).toLocaleDateString()}
//                   </span>
//                   {cert.credentialUrl && (
//                     <a
//                       href={cert.credentialUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center text-blue-600 hover:text-blue-800"
//                     >
//                       <ExternalLink className="w-4 h-4 mr-1" />
//                       View Certificate
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Modals */}
//         {showProjectModal && (
//           <ProjectModal
//             project={editingItem}
//             onClose={() => {
//               setShowProjectModal(false);
//               setEditingItem(null);
//             }}
//             onSave={() => {
//               setShowProjectModal(false);
//               setEditingItem(null);
//               fetchUserData();
//             }}
//           />
//         )}
//         {showCertModal && (
//           <CertificationModal
//             certification={editingItem}
//             onClose={() => {
//               setShowCertModal(false);
//               setEditingItem(null);
//             }}
//             onSave={() => {
//               setShowCertModal(false);
//               setEditingItem(null);
//               fetchUserData();
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClubLeadDashboard;

// ----------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Award,
  BookOpen,
  Github,
  Globe,
  Calendar,
  Edit,
  Trash,
  Plus,
  ExternalLink,
  Clock,
  Users,
  Search,
  Megaphone,
  ChevronRight,
  X,
} from "lucide-react";
import DashboardNav from "../components/dashboard/DashboardNav";
import ProjectModal from "../components/dashboard/ProjectModal";
import CertificationModal from "../components/dashboard/CertificationModal";
import {
  getUserDetails,
  deleteProject,
  deleteCertification,
  fetchUsers,
  getAnnouncements,
} from "../services/api";
import { format } from "date-fns";

const StudentDashboard = () => {
  const [userData, setUserData] = useState({
    projects: [],
    certifications: [],
    skills: [],
    achievements: [],
    marks: [],
    attendance: [],
  });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  // Add this to your useEffect or create a new one
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.data || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = localStorage.getItem("user");
      const userResponse = JSON.parse(user);
      const userId = userResponse.id;

      const [userDetailsResponse, usersResponse] = await Promise.all([
        getUserDetails(userId),
        fetchUsers(),
      ]);

      setUserData(userDetailsResponse.data);
      setAllUsers(usersResponse.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProjectAction = (project = null) => {
    setEditingItem(project);
    setShowProjectModal(true);
  };

  const handleCertificationAction = (cert = null) => {
    setEditingItem(cert);
    setShowCertModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        fetchUserData();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleDeleteCertification = async (certId) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await deleteCertification(certId);
        fetchUserData();
      } catch (error) {
        console.error("Error deleting certification:", error);
      }
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add this component for the announcements modal
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
            {announcements.map((announcement) => (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardNav title="Student Dashboard" />
      <div className="flex">
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <img
                    src={userData.profilePicture || "default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData.fullName}
                    </h1>
                    <p className="text-blue-600 font-semibold">
                      {userData.studentId} • {userData.semester}th Semester
                    </p>
                    <p className="text-gray-600">{userData.department}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        CGPA: {userData.cgpa || "N/A"}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Student
                      </span>
                      {userData.isClubLead && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          Club Lead
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Academic Performance Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Marks Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Academic Performance
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Subject</th>
                        <th className="text-center py-2">Internal 1</th>
                        <th className="text-center py-2">Internal 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.marks?.map((mark, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{mark.subject}</td>
                          <td className="text-center">
                            {mark.internalExam1}/20
                          </td>
                          <td className="text-center">
                            {mark.internalExam2}/20
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Attendance Section */}
              {/* <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Attendance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Subject</th>
                      <th className="text-center py-2">Present</th>
                      <th className="text-center py-2">Total</th>
                      <th className="text-center py-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.attendance?.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{item.subject}</td>
                        <td className="text-center">{item.present}</td>
                        <td className="text-center">{item.total}</td>
                        <td className="text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs
                            ${
                              (item.present / item.total) * 100 >= 75
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {((item.present / item.total) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Attendance Overview
                  </h2>
                </div>
                <div className="space-y-4">
                  {(() => {
                    const totalDays = 200;
                    const presentDays =
                      userData.attendance?.filter((a) => a.status === "present")
                        .length || 0;
                    const attendancePercentage =
                      (presentDays / totalDays) * 100;

                    return (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            Total Working Days
                          </span>
                          <span className="font-semibold">{totalDays}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Days Present</span>
                          <span className="font-semibold">{presentDays}</span>
                        </div>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                Attendance
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                {attendancePercentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: `${attendancePercentage}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">
                            Subject-wise Attendance
                          </h3>
                          {Object.entries(
                            userData.attendance?.reduce((acc, curr) => {
                              acc[curr.subject] = acc[curr.subject] || {
                                present: 0,
                                total: 0,
                              };
                              if (curr.status === "present")
                                acc[curr.subject].present++;
                              acc[curr.subject].total++;
                              return acc;
                            }, {}) || {}
                          ).map(([subject, data]) => (
                            <div
                              key={subject}
                              className="flex justify-between items-center py-1"
                            >
                              <span className="text-sm text-gray-600">
                                {subject}
                              </span>
                              <span className="text-sm font-medium">
                                {((data.present / data.total) * 100).toFixed(1)}
                                %
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            {/* Skills & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Code className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Technical Skills
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userData.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Achievements
                  </h2>
                </div>
                <ul className="space-y-2">
                  {userData.achievements?.map((achievement, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Globe className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                </div>
                <button
                  onClick={() => handleProjectAction()}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.projects?.map((project) => (
                  <div
                    key={project._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleProjectAction(project)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                      {project.githubUrl && project.liveUrl && (
                        <div className="flex gap-5">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Github className="w-4 h-4 mr-1" />
                            View Code
                          </a>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Live Demo
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Certifications Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Certifications
                  </h2>
                </div>
                <button
                  onClick={() => handleCertificationAction()}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.certifications?.map((cert) => (
                  <div
                    key={cert._id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">
                        {cert.name}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCertificationAction(cert)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertification(cert._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600">Issued by {cert.issuer}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modals */}
          {showProjectModal && (
            <ProjectModal
              project={editingItem}
              onClose={() => {
                setShowProjectModal(false);
                setEditingItem(null);
              }}
              onSave={() => {
                setShowProjectModal(false);
                setEditingItem(null);
                fetchUserData();
              }}
            />
          )}
          {showCertModal && (
            <CertificationModal
              certification={editingItem}
              onClose={() => {
                setShowCertModal(false);
                setEditingItem(null);
              }}
              onSave={() => {
                setShowCertModal(false);
                setEditingItem(null);
                fetchUserData();
              }}
            />
          )}
        </div>

        {/* Users Sidebar */}
        <div
          className="w-96 mr-8 mt-8 rounded-md border-gray-200 p-4"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {/* Announcements Section */}
          <section className="mb-8">
            <div className="mb-8 bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Megaphone className="w-5 h-5 text-blue-500 mr-2" />
                  <h2 className="text-lg font-semibold">
                    Recent Announcements
                  </h2>
                </div>
                <button
                  onClick={() => setShowAllAnnouncements(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-3">
                {announcements.slice(0, 3).map((announcement) => (
                  <div
                    key={announcement._id}
                    className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-sm text-gray-800 mb-2">
                      {announcement.text}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {format(
                          new Date(announcement.timestamp),
                          "MMM dd, yyyy"
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {showAllAnnouncements && <AnnouncementsModal />}
          </section>

          {/* Users Section */}
          <section className="mt-8 overflow-y-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-gray-500 mr-2" />
                  <h2 className="text-lg font-semibold">Users</h2>
                </div>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => navigate(`/user-profile/${user._id}`)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">
                          {user.fullName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
