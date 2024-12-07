// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getFacultyDetails, updateFacultyProfile } from "../services/api";
// import { Phone, Mail, MapPin, Calendar, Clock, Award, GraduationCap } from 'lucide-react';

// const EditFacultyProfile = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
// //   const [editableData, setEditableData] = useState({
// //     phoneNumber: "",
// //     officeLocation: "",
// //     officeHours: "",
// //     specialization: [],
// //     qualifications: []
// //   });

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       const user = localStorage.getItem("user");
// //       const userResponse = JSON.parse(user);
// //       const userId = userResponse.id;

// //       const response = await getFacultyDetails(userId);
// //       setUserData(response.data);
// //       setEditableData({
// //         phoneNumber: response.data.phoneNumber || "",
// //         officeLocation: response.data.officeLocation || "",
// //         officeHours: response.data.officeHours || "",
// //         specialization: response.data.specialization || [],
// //         qualifications: response.data.qualifications || []
// //       });
// //     };
// //     fetchUserData();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await updateFacultyProfile(editableData);
// //       navigate("/proctor-dashboard");
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   if (!userData) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-4xl mx-auto">
// //         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //           <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
// //             <div className="flex items-center space-x-4">
// //               <img
// //                 src={userData.profileImage}
// //                 alt={userData.fullName}
// //                 className="w-20 h-20 rounded-full border-4 border-white"
// //               />
// //               <div className="text-white">
// //                 <h1 className="text-2xl font-bold">{userData.fullName}</h1>
// //                 <p className="opacity-90">
// //                   {userData.employeeId} • {userData.department}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <form onSubmit={handleSubmit} className="p-8">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Phone Number</label>
// //                   <input
// //                     type="text"
// //                     value={editableData.phoneNumber}
// //                     onChange={(e) => setEditableData({...editableData, phoneNumber: e.target.value})}
// //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Office Location</label>
// //                   <input
// //                     type="text"
// //                     value={editableData.officeLocation}
// //                     onChange={(e) => setEditableData({...editableData, officeLocation: e.target.value})}
// //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Office Hours</label>
// //                   <input
// //                     type="text"
// //                     value={editableData.officeHours}
// //                     onChange={(e) => setEditableData({...editableData, officeHours: e.target.value})}
// //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 <h2 className="text-lg font-semibold text-gray-900">Professional Details</h2>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700">Specialization (comma-separated)</label>
// //                   <input
// //                     type="text"
// //                     value={editableData.specialization.join(", ")}
// //                     onChange={(e) => setEditableData({
// //                       ...editableData,
// //                       specialization: e.target.value.split(",").map(s => s.trim())
// //                     })}
// //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-8 flex justify-end space-x-4">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate("/proctor-dashboard")}
// //                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const [editableData, setEditableData] = useState({
//     phoneNumber: "",
//     officeLocation: "",
//     officeHours: "",
//     specialization: [],
//     qualifications: [],
//     designation: "",
//     department: ""
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = localStorage.getItem("user");
//       const userResponse = JSON.parse(user);
//       const userId = userResponse.id;

//       const response = await getFacultyDetails(userId);
//       const facultyData = response.data;

//       setUserData(facultyData);
//       setEditableData({
//         phoneNumber: facultyData.phoneNumber || "",
//         officeLocation: facultyData.officeLocation || "",
//         officeHours: facultyData.officeHours || "",
//         specialization: facultyData.specialization || [],
//         qualifications: facultyData.qualifications || [],
//         designation: facultyData.designation || "",
//         department: facultyData.department || ""
//       });
//     };
//     fetchUserData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateFacultyProfile(editableData);
//       navigate("/proctor-dashboard");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (!userData) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={userData?.profileImage}
//                 alt={userData?.fullName}
//                 className="w-20 h-20 rounded-full border-4 border-white"
//               />
//               <div className="text-white">
//                 <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
//                 <p className="opacity-90">
//                   {userData?.employeeId} • {userData?.designation}
//                 </p>
//                 <p className="opacity-80">{userData?.department}</p>
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Basic Information */}
//               <div className="space-y-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Designation</label>
//                   <input
//                     type="text"
//                     value={editableData.designation}
//                     onChange={(e) => setEditableData({...editableData, designation: e.target.value})}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Department</label>
//                   <input
//                     type="text"
//                     value={editableData.department}
//                     onChange={(e) => setEditableData({...editableData, department: e.target.value})}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div className="space-y-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                   <input
//                     type="text"
//                     value={editableData.phoneNumber}
//                     onChange={(e) => setEditableData({...editableData, phoneNumber: e.target.value})}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Office Location</label>
//                   <input
//                     type="text"
//                     value={editableData.officeLocation}
//                     onChange={(e) => setEditableData({...editableData, officeLocation: e.target.value})}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Office Hours</label>
//                   <input
//                     type="text"
//                     value={editableData.officeHours}
//                     onChange={(e) => setEditableData({...editableData, officeHours: e.target.value})}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 </div>
//               </div>

//               {/* Specialization */}
//               <div className="space-y-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Specialization</h2>
//                 {editableData.specialization.map((spec, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     value={spec}
//                     onChange={(e) => {
//                       const newSpec = [...editableData.specialization];
//                       newSpec[index] = e.target.value;
//                       setEditableData({...editableData, specialization: newSpec});
//                     }}
//                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                   />
//                 ))}
//               </div>

//               {/* Qualifications */}
//               <div className="space-y-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Qualifications</h2>
//                 {editableData.qualifications.map((qual, index) => (
//                   <div key={index} className="space-y-2">
//                     <input
//                       type="text"
//                       value={qual.degree}
//                       onChange={(e) => {
//                         const newQual = [...editableData.qualifications];
//                         newQual[index] = {...newQual[index], degree: e.target.value};
//                         setEditableData({...editableData, qualifications: newQual});
//                       }}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                       placeholder="Degree"
//                     />
//                     <input
//                       type="text"
//                       value={qual.institution}
//                       onChange={(e) => {
//                         const newQual = [...editableData.qualifications];
//                         newQual[index] = {...newQual[index], institution: e.target.value};
//                         setEditableData({...editableData, qualifications: newQual});
//                       }}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                       placeholder="Institution"
//                     />
//                     <input
//                       type="number"
//                       value={qual.year}
//                       onChange={(e) => {
//                         const newQual = [...editableData.qualifications];
//                         newQual[index] = {...newQual[index], year: parseInt(e.target.value)};
//                         setEditableData({...editableData, qualifications: newQual});
//                       }}
//                       className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                       placeholder="Year"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-8 flex justify-end space-x-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/proctor-dashboard")}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditFacultyProfile;

// ---------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getFacultyDetails, updateFacultyProfile } from "../services/api";
// import { Plus, Trash2, GraduationCap } from 'lucide-react';
// import toast from 'react-hot-toast';

// const EditFacultyProfile = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     console.log(userData);
//     const [specializationInput, setSpecializationInput] = useState('');

//     const [editableData, setEditableData] = useState({
//         phoneNumber: "",
//         officeLocation: "",
//         officeHours: "",
//         specialization: [],
//         qualifications: []
//     });

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const user = localStorage.getItem("user");
//             const userResponse = JSON.parse(user);
//             const userId = userResponse.id;

//             const response = await getFacultyDetails(userId);
//             console.log("faculty featails: ",response);
//             const facultyData = response.data;

//             setUserData(facultyData);
//             setEditableData({
//                 phoneNumber: facultyData.phoneNumber || "",
//                 officeLocation: facultyData.officeLocation || "",
//                 officeHours: facultyData.officeHours || "",
//                 specialization: facultyData.specialization || [],
//                 qualifications: facultyData.qualifications || []
//             });
//         };
//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         if (userData?.specialization) {
//             setSpecializationInput(userData.specialization.join(', '));
//         }
//     }, [userData]);

//     // Update the specialization state handling
//     const handleSpecializationChange = (e) => {
//         const inputValue = e.target.value;
//         setSpecializationInput(inputValue);

//         const specs = inputValue.split(',').map(s => s.trim()).filter(s => s !== '');
//         setEditableData({
//             ...editableData,
//             specialization: specs
//         });
//     };

//     const addQualification = () => {
//         setEditableData({
//             ...editableData,
//             qualifications: [
//                 ...editableData.qualifications,
//                 { degree: '', institution: '', year: '' }
//             ]
//         });
//     };

//     const removeQualification = (index) => {
//         const newQualifications = editableData.qualifications.filter((_, i) => i !== index);
//         setEditableData({ ...editableData, qualifications: newQualifications });
//     };

//     const updateQualification = (index, field, value) => {
//         const newQualifications = [...editableData.qualifications];
//         newQualifications[index] = {
//             ...newQualifications[index],
//             [field]: field === 'year' ? parseInt(value) || '' : value
//         };
//         setEditableData({ ...editableData, qualifications: newQualifications });
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     try {
//     //         const response = await updateFacultyProfile({
//     //             ...editableData,
//     //             facultyId: userData._id
//     //         });

//     //         if (response.success) {
//     //             toast.success('Profile updated successfully!');
//     //             navigate("/proctor-dashboard");
//     //         }
//     //     } catch (error) {
//     //         toast.error('Failed to update profile');
//     //     }
//     // };

//     // In the handleSubmit function, update the navigation:
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const response = await updateFacultyProfile({
//         ...editableData,
//         facultyId: userData._id
//       });

//       if (response.success) {
//         toast.success('Profile updated successfully!');
//         // Redirect based on role
//         if (user.isProctor) {
//           navigate('/proctor-dashboard');
//         } else {
//           navigate('/professor-dashboard');
//         }
//       }
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                     {/* Profile Header */}
//                     <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
//                         <div className="flex items-center space-x-4">
//                             <img
//                                 src={userData?.profileImage}
//                                 alt={userData?.fullName}
//                                 className="w-20 h-20 rounded-full border-4 border-white"
//                             />
//                             <div className="text-white">
//                                 <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
//                                 <p className="opacity-90">{userData?.employeeId} • {userData?.designation}</p>
//                                 <p className="opacity-80">{userData?.department}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-8 space-y-8">
//                         {/* Basic Information */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 flex items-center">
//                                     <GraduationCap className="mr-2" />
//                                     Contact Information
//                                 </h2>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                                     <input
//                                         type="text"
//                                         value={editableData.phoneNumber}
//                                         onChange={(e) => setEditableData({ ...editableData, phoneNumber: e.target.value })}
//                                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Office Location</label>
//                                     <input
//                                         type="text"
//                                         value={editableData.officeLocation}
//                                         onChange={(e) => setEditableData({ ...editableData, officeLocation: e.target.value })}
//                                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Office Hours</label>
//                                     <input
//                                         type="text"
//                                         value={editableData.officeHours}
//                                         onChange={(e) => setEditableData({ ...editableData, officeHours: e.target.value })}
//                                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900">Specialization</h2>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Areas of Expertise (comma-separated)
//                                     </label>
//                                     <textarea
//                                         value={specializationInput}
//                                         onChange={handleSpecializationChange}
//                                         className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                         rows="3"
//                                         placeholder="e.g., Artificial Intelligence, Machine Learning, Data Science"
//                                     />
//                                     <div className="mt-2 flex flex-wrap gap-2">
//                                         {editableData.specialization.map((skill, index) => (
//                                             <span
//                                                 key={index}
//                                                 className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                                             >
//                                                 {skill}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Qualifications Section */}
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-xl font-semibold text-gray-900">Qualifications</h2>
//                                 <button
//                                     type="button"
//                                     onClick={addQualification}
//                                     className="flex items-center text-blue-600 hover:text-blue-700"
//                                 >
//                                     <Plus className="w-5 h-5 mr-1" />
//                                     Add Qualification
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 {editableData.qualifications.map((qual, index) => (
//                                     <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
//                                         <button
//                                             type="button"
//                                             onClick={() => removeQualification(index)}
//                                             className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                                         >
//                                             <Trash2 className="w-5 h-5" />
//                                         </button>
//                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700">Degree</label>
//                                                 <input
//                                                     type="text"
//                                                     value={qual.degree}
//                                                     onChange={(e) => updateQualification(index, 'degree', e.target.value)}
//                                                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700">Institution</label>
//                                                 <input
//                                                     type="text"
//                                                     value={qual.institution}
//                                                     onChange={(e) => updateQualification(index, 'institution', e.target.value)}
//                                                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700">Year</label>
//                                                 <input
//                                                     type="number"
//                                                     value={qual.year}
//                                                     onChange={(e) => updateQualification(index, 'year', e.target.value)}
//                                                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="flex justify-end space-x-4 pt-6">
//                             <button
//                                 type="button"
//                                 // onClick={() => navigate("/proctor-dashboard")}
//                                 onClick={() => navigate(userData.isProctor ? '/proctor-dashboard' : '/professor-dashboard')}
//                                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 Save Changes
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditFacultyProfile;

// ---------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFacultyDetails, updateFacultyProfile,uploadFacultyPhoto } from "../services/api";
import {
  Plus,
  Trash2,
  GraduationCap,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building,
  Camera
} from "lucide-react";
import toast from "react-hot-toast";

const EditFacultyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    phoneNumber: "",
    officeLocation: "",
    officeHours: "",
    specialization: [],
    qualifications: [],
    designation: "",
    department: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("user");
        const userResponse = JSON.parse(user);
        const userId = userResponse.id;

        const response = await getFacultyDetails(userId);
        const facultyData = response.data;

        setUserData(facultyData);
        setEditableData({
          phoneNumber: facultyData.phoneNumber || "",
          officeLocation: facultyData.officeLocation || "",
          officeHours: facultyData.officeHours || "",
          specialization: facultyData.specialization || [],
          qualifications: facultyData.qualifications || [],
          designation: facultyData.designation || "",
          department: facultyData.department || "",
        });
      } catch (error) {
        toast.error("Failed to fetch faculty details");
      }
    };
    fetchUserData();
  }, []);

  const handleSpecializationChange = (value) => {
    const specs = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setEditableData({
      ...editableData,
      specialization: specs,
    });
  };

  const addQualification = () => {
    setEditableData({
      ...editableData,
      qualifications: [
        ...editableData.qualifications,
        { degree: "", institution: "", year: "" },
      ],
    });
  };

  const removeQualification = (index) => {
    const newQualifications = editableData.qualifications.filter(
      (_, i) => i !== index
    );
    setEditableData({ ...editableData, qualifications: newQualifications });
  };

  const updateQualification = (index, field, value) => {
    const newQualifications = [...editableData.qualifications];
    newQualifications[index] = {
      ...newQualifications[index],
      [field]: field === "year" ? parseInt(value) || "" : value,
    };
    setEditableData({ ...editableData, qualifications: newQualifications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateFacultyProfile({
        ...editableData,
        facultyId: userData._id,
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        navigate(
          userData?.isProctor ? "/proctor-dashboard" : "/professor-dashboard"
        );
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadFacultyPhoto(file, userData._id);
      if (result.success) {
        setUserData({ ...userData, profileImage: result.data.imageUrl });
        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile photo");
    }
  };

  if (!userData) return <div>Loading...</div>;

  //   return (
  //     <div className="min-h-screen bg-gray-50 py-8">
  //       <div className="max-w-4xl mx-auto">
  //         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
  //           {/* Profile Header */}
  //           <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
  //             <div className="flex items-center space-x-4">
  //               <img
  //                 src={userData.profileImage}
  //                 alt={userData.fullName}
  //                 className="w-20 h-20 rounded-full border-4 border-white"
  //               />
  //               <div className="text-white">
  //                 <h1 className="text-2xl font-bold">{userData.fullName}</h1>
  //                 <p className="opacity-90">{userData.employeeId} • {userData.designation}</p>
  //                 <p className="opacity-80">{userData.department}</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Edit Form */}
  //           <form onSubmit={handleSubmit} className="p-8 space-y-8">
  //             {/* Basic Information */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               <div className="space-y-4">
  //                 <h2 className="text-xl font-semibold text-gray-900 flex items-center">
  //                   <Building className="mr-2" />
  //                   Basic Information
  //                 </h2>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700">Designation</label>
  //                   <input
  //                     type="text"
  //                     value={editableData.designation}
  //                     onChange={(e) => setEditableData({ ...editableData, designation: e.target.value })}
  //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700">Department</label>
  //                   <input
  //                     type="text"
  //                     value={editableData.department}
  //                     onChange={(e) => setEditableData({ ...editableData, department: e.target.value })}
  //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700">Phone Number</label>
  //                   <input
  //                     type="tel"
  //                     value={editableData.phoneNumber}
  //                     onChange={(e) => setEditableData({ ...editableData, phoneNumber: e.target.value })}
  //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   />
  //                 </div>
  //               </div>

  //               <div className="space-y-4">
  //                 <h2 className="text-xl font-semibold text-gray-900 flex items-center">
  //                   <MapPin className="mr-2" />
  //                   Office Details
  //                 </h2>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700">Office Location</label>
  //                   <input
  //                     type="text"
  //                     value={editableData.officeLocation}
  //                     onChange={(e) => setEditableData({ ...editableData, officeLocation: e.target.value })}
  //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   />
  //                 </div>

  //                 <div>
  //                   <label className="block text-sm font-medium text-gray-700">Office Hours</label>
  //                   <input
  //                     type="text"
  //                     value={editableData.officeHours}
  //                     onChange={(e) => setEditableData({ ...editableData, officeHours: e.target.value })}
  //                     className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Specialization */}
  //             <div className="space-y-4">
  //               <h2 className="text-xl font-semibold text-gray-900">Specialization</h2>
  //               <div>
  //                 <label className="block text-sm font-medium text-gray-700">
  //                   Areas of Expertise (comma-separated)
  //                 </label>
  //                 <textarea
  //                   value={editableData.specialization.join(', ')}
  //                   onChange={(e) => handleSpecializationChange(e.target.value)}
  //                   className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                   rows="3"
  //                   placeholder="e.g., Artificial Intelligence, Machine Learning, Data Science"
  //                 />
  //               </div>
  //             </div>

  //             {/* Qualifications */}
  //             <div className="space-y-4">
  //               <div className="flex justify-between items-center">
  //                 <h2 className="text-xl font-semibold text-gray-900">Qualifications</h2>
  //                 <button
  //                   type="button"
  //                   onClick={addQualification}
  //                   className="flex items-center text-blue-600 hover:text-blue-700"
  //                 >
  //                   <Plus className="w-5 h-5 mr-1" />
  //                   Add Qualification
  //                 </button>
  //               </div>

  //               <div className="space-y-4">
  //                 {editableData.qualifications.map((qual, index) => (
  //                   <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
  //                     <button
  //                       type="button"
  //                       onClick={() => removeQualification(index)}
  //                       className="absolute top-2 right-2 text-red-500 hover:text-red-700"
  //                     >
  //                       <Trash2 className="w-5 h-5" />
  //                     </button>
  //                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //                       <div>
  //                         <label className="block text-sm font-medium text-gray-700">Degree</label>
  //                         <input
  //                           type="text"
  //                           value={qual.degree}
  //                           onChange={(e) => updateQualification(index, 'degree', e.target.value)}
  //                           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                         />
  //                       </div>
  //                       <div>
  //                         <label className="block text-sm font-medium text-gray-700">Institution</label>
  //                         <input
  //                           type="text"
  //                           value={qual.institution}
  //                           onChange={(e) => updateQualification(index, 'institution', e.target.value)}
  //                           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                         />
  //                       </div>
  //                       <div>
  //                         <label className="block text-sm font-medium text-gray-700">Year</label>
  //                         <input
  //                           type="number"
  //                           value={qual.year}
  //                           onChange={(e) => updateQualification(index, 'year', e.target.value)}
  //                           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
  //                         />
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* Form Actions */}
  //             <div className="flex justify-end space-x-4 pt-6">
  //               <button
  //                 type="button"
  //                 onClick={() => navigate(userData?.isProctor ? '/proctor-dashboard' : '/professor-dashboard')}
  //                 className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
  //               >
  //                 Cancel
  //               </button>
  //               <button
  //                 type="submit"
  //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //               >
  //                 Save Changes
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <div className="flex items-center space-x-4">
              {/* <img
              src={userData.profileImage}
              alt={userData.fullName}
              className="w-20 h-20 rounded-full border-4 border-white"
            /> */}
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
                    src={userData.profileImage || "default-avatar.png"}
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
                <div className="flex items-center space-x-2">
                  <span className="opacity-90">{userData.employeeId}</span>
                  <span className="px-2 py-1 bg-blue-500 rounded-full text-xs">
                    {userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)}
                  </span>
                  {userData.isProctor && (
                    <span className="px-2 py-1 bg-green-500 rounded-full text-xs">
                      Proctor
                    </span>
                  )}
                </div>
                <p className="opacity-80">
                  Joined {new Date(userData.joiningDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Building className="mr-2" />
                  Basic Information
                </h2>

                {/* Static Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={userData.designation}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    value={userData.department}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
                  />
                </div>

                {/* Editable Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editableData.phoneNumber}
                    onChange={(e) =>
                      setEditableData({
                        ...editableData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <MapPin className="mr-2" />
                  Office Details
                </h2>

                {/* Static Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Office Location
                  </label>
                  <input
                    type="text"
                    value={userData.officeLocation}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Office Hours
                  </label>
                  <input
                    type="text"
                    value={userData.officeHours}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Specialization */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Specialization
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Areas of Expertise
                </label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md">
                  {editableData.specialization.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 px-2 py-1 rounded-md flex items-center"
                    >
                      {spec}
                      <button
                        onClick={() => {
                          const newSpec = [...editableData.specialization];
                          newSpec.splice(index, 1);
                          setEditableData({
                            ...editableData,
                            specialization: newSpec,
                          });
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const value = e.target.value.trim();
                        if (value) {
                          setEditableData({
                            ...editableData,
                            specialization: [
                              ...editableData.specialization,
                              value,
                            ],
                          });
                          e.target.value = "";
                        }
                      }
                    }}
                    className="outline-none border-none flex-grow min-w-[200px]"
                    placeholder="Type and press Enter or Comma to add"
                  />
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Qualifications
                </h2>
                <button
                  type="button"
                  onClick={addQualification}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Add Qualification
                </button>
              </div>

              <div className="space-y-4">
                {editableData.qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeQualification(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={qual.degree}
                          onChange={(e) =>
                            updateQualification(index, "degree", e.target.value)
                          }
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={qual.institution}
                          onChange={(e) =>
                            updateQualification(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Year
                        </label>
                        <input
                          type="number"
                          value={qual.year}
                          onChange={(e) =>
                            updateQualification(index, "year", e.target.value)
                          }
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    userData?.isProctor
                      ? "/proctor-dashboard"
                      : "/professor-dashboard"
                  )
                }
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

export default EditFacultyProfile;
