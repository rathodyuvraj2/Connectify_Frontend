// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users,
//   UserPlus,
//   Shield,
//   LogOut,
//   Search,
//   Edit3,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   BarChart,
//   UserCheck,
//   Group,
//   Bell,
// } from "lucide-react";
// import {
//   getAllFaculty,
//   addFaculty,
//   updateFaculty,
//   deleteFaculty,
//   nominateProctor,
//   getAdminStats,
//   getAllStudents,
//   getAllGroups,
//   getAllProctors,
// } from "../services/api";
// import { Toaster, toast } from "react-hot-toast";
// import Swal from "sweetalert2";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("faculty");
//   const [faculties, setFaculties] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [proctors, setProctors] = useState([]);
//   const [stats, setStats] = useState({
//     totalFaculty: 0,
//     totalStudents: 0,
//     totalProctors: 0,
//     totalGroups: 0,
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newFaculty, setNewFaculty] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     department: "",
//     employeeId: "",
//     phoneNumber: "",
//     designation: "",
//     officeLocation: "",
//     specialization: [],
//   });

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingFaculty, setEditingFaculty] = useState(null);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [activeTab]);

//   const fetchDashboardData = async () => {
//     try {
//       const [statsRes, facultyRes, studentsRes, groupsRes, proctorRes] =
//         await Promise.all([
//           getAdminStats(),
//           getAllFaculty(),
//           getAllStudents(),
//           getAllGroups(),
//           getAllProctors(),
//         ]);

//       console.log(statsRes);

//       if (statsRes.success) setStats(statsRes.data);
//       if (facultyRes.success) setFaculties(facultyRes.data);
//       if (studentsRes.success) setStudents(studentsRes.data);
//       if (groupsRes.success) setGroups(groupsRes.data);
//       console.log(proctorRes);
//       if (proctorRes.success) setProctors(proctorRes.data);
//     } catch (error) {
//       toast.error("Failed to fetch dashboard data");
//     }
//   };

//   const handleAddFaculty = async () => {
//     try {
//       const response = await addFaculty(newFaculty);
//       if (response.success) {
//         toast.success("Faculty added successfully");
//         setShowAddModal(false);
//         setNewFaculty({
//           fullName: "",
//           email: "",
//           password: "",
//           department: "",
//           employeeId: "",
//           phoneNumber: "",
//           designation: "",
//         });
//         fetchDashboardData();
//       }
//     } catch (error) {
//       toast.error("Failed to add faculty");
//     }
//   };

//   // Add this handler function
//   const handleEditFaculty = async () => {
//     try {
//       const response = await updateFaculty(editingFaculty._id, editingFaculty);
//       if (response.success) {
//         toast.success("Faculty updated successfully");
//         setShowEditModal(false);
//         setEditingFaculty(null);
//         fetchDashboardData();
//       }
//     } catch (error) {
//       toast.error("Failed to update faculty");
//     }
//   };

//   const handleDeleteFaculty = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         const response = await deleteFaculty(id);
//         if (response.success) {
//           toast.success("Faculty deleted successfully");
//           fetchDashboardData();
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to delete faculty");
//     }
//   };

//   const handleNominateProctor = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Nominate as Proctor?",
//         text: "This will grant proctor privileges to the faculty member",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, nominate!",
//       });

//       if (result.isConfirmed) {
//         const response = await nominateProctor(id);
//         if (response.success) {
//           toast.success("Faculty nominated as proctor successfully");
//           fetchDashboardData();
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to nominate proctor");
//     }
//   };

//   const filteredData = {
//     faculty: faculties.filter(
//       (f) =>
//         f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         f.email.toLowerCase().includes(searchQuery.toLowerCase())
//     ),
//     students: students.filter(
//       (s) =>
//         s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         s.email.toLowerCase().includes(searchQuery.toLowerCase())
//     ),
//     groups: groups.filter((g) =>
//       g.name.toLowerCase().includes(searchQuery.toLowerCase())
//     ),
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />

//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Shield className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">
//                 Admin Dashboard
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowAddModal(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700
//                          transition-colors duration-200 flex items-center"
//               >
//                 <UserPlus className="h-5 w-5 mr-2" />
//                 Add Faculty
//               </button>
//               <button
//                 onClick={() => {
//                   localStorage.clear();
//                   navigate("/login");
//                 }}
//                 className="text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <LogOut className="h-6 w-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Faculty"
//             value={stats.totalFaculty}
//             icon={<Users className="h-8 w-8 text-blue-600" />}
//           />
//           <StatCard
//             title="Total Students"
//             value={stats.totalStudents}
//             icon={<UserCheck className="h-8 w-8 text-green-600" />}
//           />
//           <StatCard
//             title="Total Proctors"
//             value={stats.totalProctors}
//             icon={<Shield className="h-8 w-8 text-purple-600" />}
//           />
//           <StatCard
//             title="Total Groups"
//             value={stats.totalGroups}
//             icon={<Group className="h-8 w-8 text-orange-600" />}
//           />
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-xl shadow-lg mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6" aria-label="Tabs">
//               <TabButton
//                 active={activeTab === "faculty"}
//                 onClick={() => setActiveTab("faculty")}
//                 icon={<Users className="h-5 w-5" />}
//                 text="Faculty"
//               />
//               <TabButton
//                 active={activeTab === "students"}
//                 onClick={() => setActiveTab("students")}
//                 icon={<UserCheck className="h-5 w-5" />}
//                 text="Students"
//               />
//               <TabButton
//                 active={activeTab === "groups"}
//                 onClick={() => setActiveTab("groups")}
//                 icon={<Group className="h-5 w-5" />}
//                 text="Groups"
//               />
//             </nav>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                        focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Content Based on Active Tab */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {activeTab === "faculty" && (
//             <FacultyTable
//               faculties={filteredData.faculty}
//               onDelete={handleDeleteFaculty}
//               onNominate={handleNominateProctor}
//             />
//           )}
//           {activeTab === "students" && (
//             <StudentsTable students={filteredData.students} />
//           )}
//           {activeTab === "groups" && (
//             <GroupsTable groups={filteredData.groups} />
//           )}
//         </div>
//       </div>

//       {/* Add Faculty Modal */}
//       {showAddModal && (
//         <AddFacultyModal
//           newFaculty={newFaculty}
//           setNewFaculty={setNewFaculty}
//           onClose={() => setShowAddModal(false)}
//           onSubmit={handleAddFaculty}
//         />
//       )}

//       {/* // Add this to the main return statement, after the AddFacultyModal */}
//       {showEditModal && (
//         <EditFacultyModal
//           faculty={editingFaculty}
//           setFaculty={setEditingFaculty}
//           onClose={() => {
//             setShowEditModal(false);
//             setEditingFaculty(null);
//           }}
//           onSubmit={handleEditFaculty}
//         />
//       )}
//     </div>
//   );
// };

// // Helper Components
// const StatCard = ({ title, value, icon }) => (
//   <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-500">{title}</p>
//         <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
//       </div>
//       {icon}
//     </div>
//   </div>
// );

// const TabButton = ({ active, onClick, icon, text }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center px-3 py-4 text-sm font-medium border-b-2
//               ${
//                 active
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//   >
//     {icon}
//     <span className="ml-2">{text}</span>
//   </button>
// );

// // Continue with table components...
// const FacultyTable = ({ faculties, onDelete, onNominate }) => (
//   <div className="overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Email
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Department
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Status
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {faculties.map((faculty) => (
//           <tr key={faculty._id}>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                   <span className="text-blue-600 font-medium">
//                     {faculty.fullName.charAt(0)}
//                   </span>
//                 </div>
//                 <div className="ml-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {faculty.fullName}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {faculty.employeeId}
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">{faculty.email}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">{faculty.department}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span
//                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                 ${
//                   faculty.isProctor
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {faculty.isProctor ? "Proctor" : "Faculty"}
//               </span>
//             </td>
//             {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//               <div className="flex space-x-2">
//                 {!faculty.isProctor && (
//                   <button
//                     onClick={() => onNominate(faculty._id)}
//                     className="text-blue-600 hover:text-blue-900"
//                   >
//                     <Shield className="h-5 w-5" />
//                   </button>
//                 )}
//                 <button
//                   onClick={() => onDelete(faculty._id)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </td> */}
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => {
//                     setEditingFaculty(faculty);
//                     setShowEditModal(true);
//                   }}
//                   className="text-indigo-600 hover:text-indigo-900"
//                 >
//                   <Edit3 className="h-5 w-5" />
//                 </button>
//                 {!faculty.isProctor && (
//                   <button
//                     onClick={() => onNominate(faculty._id)}
//                     className="text-blue-600 hover:text-blue-900"
//                   >
//                     <Shield className="h-5 w-5" />
//                   </button>
//                 )}
//                 <button
//                   onClick={() => onDelete(faculty._id)}
//                   className="text-red-600 hover:text-red-900"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const StudentsTable = ({ students }) => (
//   <div className="overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Email
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Semester
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Department
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Status
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {students.map((student) => (
//           <tr key={student._id}>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
//                   <span className="text-green-600 font-medium">
//                     {student.fullName.charAt(0)}
//                   </span>
//                 </div>
//                 <div className="ml-4">
//                   <div className="text-sm font-medium text-gray-900">
//                     {student.fullName}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {student.studentId}
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">{student.email}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">
//                 Semester {student.semester}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">{student.department}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                 Active
//               </span>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const GroupsTable = ({ groups }) => (
//   <div className="overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Group Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Members
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Created At
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {groups.map((group) => (
//           <tr key={group._id}>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
//                   <Group className="h-5 w-5 text-purple-600" />
//                 </div>
//                 <div className="ml-4 text-sm font-medium text-gray-900">
//                   {group.name}
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">
//                 {group.members.length} members
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-900">
//                 {new Date(group.createdAt).toLocaleDateString()}
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
// const AddFacultyModal = ({ newFaculty, setNewFaculty, onClose, onSubmit }) => {
//   const departments = [
//     "Information Technology",
//     "Computer Engineering",
//     "Electronics Engineering",
//     "Mechanical Engineering",
//   ];

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//       <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">Add New Faculty</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500"
//           >
//             <XCircle className="h-6 w-6" />
//           </button>
//         </div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSubmit();
//           }}
//         >
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={newFaculty.fullName}
//                   onChange={(e) =>
//                     setNewFaculty({ ...newFaculty, fullName: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={newFaculty.email}
//                   onChange={(e) =>
//                     setNewFaculty({ ...newFaculty, email: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Employee ID
//                 </label>
//                 <input
//                   type="text"
//                   value={newFaculty.employeeId}
//                   onChange={(e) =>
//                     setNewFaculty({ ...newFaculty, employeeId: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={newFaculty.phoneNumber}
//                   onChange={(e) =>
//                     setNewFaculty({
//                       ...newFaculty,
//                       phoneNumber: e.target.value,
//                     })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Designation
//                 </label>
//                 <input
//                   type="text"
//                   value={newFaculty.designation}
//                   onChange={(e) =>
//                     setNewFaculty({
//                       ...newFaculty,
//                       designation: e.target.value,
//                     })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Department
//                 </label>
//                 <select
//                   value={newFaculty.department}
//                   onChange={(e) =>
//                     setNewFaculty({ ...newFaculty, department: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((dept) => (
//                     <option key={dept} value={dept}>
//                       {dept}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Office Location
//                 </label>
//                 <input
//                   type="text"
//                   value={newFaculty.officeLocation}
//                   onChange={(e) =>
//                     setNewFaculty({
//                       ...newFaculty,
//                       officeLocation: e.target.value,
//                     })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   placeholder="e.g., Room 306, CS Building"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Specialization
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Separate with commas"
//                   value={newFaculty.specialization}
//                   onChange={(e) =>
//                     setNewFaculty({
//                       ...newFaculty,
//                       specialization: e.target.value
//                         .split(",")
//                         .map((s) => s.trim()),
//                     })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border text-gray-600 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Add Faculty
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Add the EditFacultyModal component
// const EditFacultyModal = ({ faculty, setFaculty, onClose, onSubmit }) => {
//   const departments = [
//     "Computer Science",
//     "Information Technology",
//     "Electronics",
//     "Mechanical",
//     "Civil",
//     "Electrical",
//   ];

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
//       <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-medium">Edit Faculty</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500"
//           >
//             <XCircle className="h-6 w-6" />
//           </button>
//         </div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSubmit();
//           }}
//         >
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={faculty.fullName}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, fullName: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={faculty.email}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, email: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={faculty.phoneNumber}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, phoneNumber: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Designation
//                 </label>
//                 <input
//                   type="text"
//                   value={faculty.designation}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, designation: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Department
//                 </label>
//                 <select
//                   value={faculty.department}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, department: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   required
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map((dept) => (
//                     <option key={dept} value={dept}>
//                       {dept}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Office Location
//                 </label>
//                 <input
//                   type="text"
//                   value={faculty.officeLocation}
//                   onChange={(e) =>
//                     setFaculty({ ...faculty, officeLocation: e.target.value })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                   placeholder="e.g., Room 306, CS Building"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Specialization
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Separate with commas"
//                   value={faculty.specialization?.join(", ")}
//                   onChange={(e) =>
//                     setFaculty({
//                       ...faculty,
//                       specialization: e.target.value
//                         .split(",")
//                         .map((s) => s.trim()),
//                     })
//                   }
//                   className="mt-1 w-full px-3 py-2 border rounded-md"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border text-gray-600 rounded-md hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Update Faculty
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// -------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  Shield,
  LogOut,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  BarChart,
  UserCheck,
  Group,
  Bell,
} from "lucide-react";
import {
  getAllFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  nominateProctor,
  getAdminStats,
  getAllStudents,
  getAllGroups,
  getAllProctors,
} from "../services/api";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("faculty");
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [proctors, setProctors] = useState([]);
  const [stats, setStats] = useState({
    totalFaculty: 0,
    totalStudents: 0,
    totalProctors: 0,
    totalGroups: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [newFaculty, setNewFaculty] = useState({
    fullName: "",
    email: "",
    department: "",
    employeeId: "",
    phoneNumber: "",
    designation: "",
    officeLocation: "",
    specialization: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, facultyRes, studentsRes, groupsRes, proctorRes] =
        await Promise.all([
          getAdminStats(),
          getAllFaculty(),
          getAllStudents(),
          getAllGroups(),
          getAllProctors(),
        ]);

      if (statsRes.success) setStats(statsRes.data);
      if (facultyRes.success) setFaculties(facultyRes.data);
      if (studentsRes.success) setStudents(studentsRes.data);
      if (groupsRes.success) setGroups(groupsRes.data);
      if (proctorRes.success) setProctors(proctorRes.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  const handleAddFaculty = async () => {
    try {
      const facultyData = {
        ...newFaculty,
        password: newFaculty.employeeId,
      };
      const response = await addFaculty(facultyData);
      if (response.success) {
        toast.success("Faculty added successfully");
        setShowAddModal(false);
        setNewFaculty({
          fullName: "",
          email: "",
          department: "",
          employeeId: "",
          phoneNumber: "",
          designation: "",
          officeLocation: "",
          specialization: [],
        });
        fetchDashboardData();
      }
    } catch (error) {
      toast.error("Failed to add faculty");
    }
  };

  const handleEditFaculty = async () => {
    try {
      const response = await updateFaculty(editingFaculty._id, editingFaculty);
      if (response.success) {
        toast.success("Faculty updated successfully");
        setShowEditModal(false);
        setEditingFaculty(null);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error("Failed to update faculty");
    }
  };

  const handleDeleteFaculty = async (id) => {
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
        const response = await deleteFaculty(id);
        if (response.success) {
          toast.success("Faculty deleted successfully");
          fetchDashboardData();
        }
      }
    } catch (error) {
      toast.error("Failed to delete faculty");
    }
  };

  // const handleNominateProctor = async (id) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: "Nominate as Proctor?",
  //       text: "This will grant proctor privileges to the faculty member",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, nominate!",
  //     });

  //     if (result.isConfirmed) {
  //       const response = await nominateProctor(id);
  //       if (response.success) {
  //         toast.success("Faculty nominated as proctor successfully");
  //         fetchDashboardData();
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Failed to nominate proctor");
  //   }
  // };

  const handleNominateProctor = async (id, isCurrentlyProctor) => {
    try {
      const result = await Swal.fire({
        title: isCurrentlyProctor
          ? "Demote from Proctor?"
          : "Nominate as Proctor?",
        text: isCurrentlyProctor
          ? "This will remove proctor privileges from the faculty member"
          : "This will grant proctor privileges to the faculty member",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: isCurrentlyProctor
          ? "Yes, demote!"
          : "Yes, nominate!",
      });

      if (result.isConfirmed) {
        const response = await nominateProctor(id);
        if (response.success) {
          toast.success(
            isCurrentlyProctor
              ? "Faculty demoted from proctor successfully"
              : "Faculty nominated as proctor successfully"
          );
          fetchDashboardData();
        }
      }
    } catch (error) {
      toast.error(
        isCurrentlyProctor
          ? "Failed to demote proctor"
          : "Failed to nominate proctor"
      );
    }
  };

  const filteredData = {
    faculty: faculties.filter(
      (f) =>
        f.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    students: students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    groups: groups.filter((g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                         transition-colors duration-200 flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Faculty
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Faculty"
            value={stats.totalFaculty}
            icon={<Users className="h-8 w-8 text-blue-600" />}
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<UserCheck className="h-8 w-8 text-green-600" />}
          />
          <StatCard
            title="Total Proctors"
            value={stats.totalProctors}
            icon={<Shield className="h-8 w-8 text-purple-600" />}
          />
          <StatCard
            title="Total Groups"
            value={stats.totalGroups}
            icon={<Group className="h-8 w-8 text-orange-600" />}
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <TabButton
                active={activeTab === "faculty"}
                onClick={() => setActiveTab("faculty")}
                icon={<Users className="h-5 w-5" />}
                text="Faculty"
              />
              <TabButton
                active={activeTab === "students"}
                onClick={() => setActiveTab("students")}
                icon={<UserCheck className="h-5 w-5" />}
                text="Students"
              />
              <TabButton
                active={activeTab === "groups"}
                onClick={() => setActiveTab("groups")}
                icon={<Group className="h-5 w-5" />}
                text="Groups"
              />
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content Based on Active Tab */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === "faculty" && (
            <FacultyTable
              faculties={filteredData.faculty}
              onDelete={handleDeleteFaculty}
              onNominate={handleNominateProctor}
              onEdit={(faculty) => {
                setEditingFaculty(faculty);
                setShowEditModal(true);
              }}
            />
          )}
          {activeTab === "students" && (
            <StudentsTable students={filteredData.students} />
          )}
          {activeTab === "groups" && (
            <GroupsTable groups={filteredData.groups} />
          )}
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <AddFacultyModal
          newFaculty={newFaculty}
          setNewFaculty={setNewFaculty}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddFaculty}
        />
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && (
        <EditFacultyModal
          faculty={editingFaculty}
          setFaculty={setEditingFaculty}
          onClose={() => {
            setShowEditModal(false);
            setEditingFaculty(null);
          }}
          onSubmit={handleEditFaculty}
        />
      )}
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      {icon}
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, text }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 
              ${
                active
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

// Table Components
const FacultyTable = ({ faculties, onDelete, onNominate, onEdit }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Department
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {faculties.map((faculty) => (
          <tr key={faculty._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {faculty.fullName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {faculty.fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {faculty.employeeId}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{faculty.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{faculty.department}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  faculty.isProctor
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {faculty.isProctor ? "Proctor" : "Faculty"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(faculty)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit3 className="h-5 w-5" />
                </button>
                {/* {!faculty.isProctor && (
                  // <button
                  //   onClick={() => onNominate(faculty._id)}
                  //   className="text-blue-600 hover:text-blue-900"
                  // >
                  //   <Shield className="h-5 w-5" />
                  // </button> */}
                  <button
                    onClick={() => onNominate(faculty._id, faculty.isProctor)}
                    className={`${
                      faculty.isProctor
                        ? "text-orange-600 hover:text-orange-900"
                        : "text-blue-600 hover:text-blue-900"
                    }`}
                    title={
                      faculty.isProctor
                        ? "Demote from Proctor"
                        : "Promote to Proctor"
                    }
                  >
                    <Shield className="h-5 w-5" />
                  </button>
                {/* )} */}
                <button
                  onClick={() => onDelete(faculty._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StudentsTable = ({ students }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Semester
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Department
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <tr key={student._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-medium">
                    {student.fullName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {student.fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {student.studentId}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{student.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                Semester {student.semester}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{student.department}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GroupsTable = ({ groups }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Group Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Members
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created At
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {groups.map((group) => (
          <tr key={group._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Group className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4 text-sm font-medium text-gray-900">
                  {group.name}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {group.members.length} members
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {new Date(group.createdAt).toLocaleDateString()}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AddFacultyModal = ({ newFaculty, setNewFaculty, onClose, onSubmit }) => {
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add New Faculty</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newFaculty.fullName}
                  onChange={(e) =>
                    setNewFaculty({ ...newFaculty, fullName: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newFaculty.email}
                  onChange={(e) =>
                    setNewFaculty({ ...newFaculty, email: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={newFaculty.employeeId}
                  onChange={(e) =>
                    setNewFaculty({ ...newFaculty, employeeId: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newFaculty.phoneNumber}
                  onChange={(e) =>
                    setNewFaculty({
                      ...newFaculty,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  value={newFaculty.designation}
                  onChange={(e) =>
                    setNewFaculty({
                      ...newFaculty,
                      designation: e.target.value,
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  value={newFaculty.department}
                  onChange={(e) =>
                    setNewFaculty({ ...newFaculty, department: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Office Location
                </label>
                <input
                  type="text"
                  value={newFaculty.officeLocation}
                  onChange={(e) =>
                    setNewFaculty({
                      ...newFaculty,
                      officeLocation: e.target.value,
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., Room 306, CS Building"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="Separate with commas"
                  value={newFaculty.specialization.join(", ")}
                  onChange={(e) =>
                    setNewFaculty({
                      ...newFaculty,
                      specialization: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-gray-600 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditFacultyModal = ({ faculty, setFaculty, onClose, onSubmit }) => {
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
  ];
  console.log("faculty details: ", faculty);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Edit Faculty</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={faculty.fullName}
                  onChange={(e) =>
                    setFaculty({ ...faculty, fullName: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={faculty.email}
                  onChange={(e) =>
                    setFaculty({ ...faculty, email: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={faculty.phoneNumber}
                  onChange={(e) =>
                    setFaculty({ ...faculty, phoneNumber: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  value={faculty.designation}
                  onChange={(e) =>
                    setFaculty({ ...faculty, designation: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  value={faculty.department}
                  onChange={(e) =>
                    setFaculty({ ...faculty, department: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Office Location
                </label>
                <input
                  type="text"
                  value={faculty.officeLocation}
                  onChange={(e) =>
                    setFaculty({ ...faculty, officeLocation: e.target.value })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., Room 306, CS Building"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="Separate with commas"
                  value={faculty.specialization?.join(", ")}
                  onChange={(e) =>
                    setFaculty({
                      ...faculty,
                      specialization: e.target.value
                        .split(",")
                        .map((s) => s.trim()),
                    })
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-gray-600 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
