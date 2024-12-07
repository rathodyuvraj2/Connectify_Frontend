// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BookOpen,
//   MessageCircle,
//   User,
//   LogOut,
//   Users,
//   Edit3,
//   Calendar,
//   Clock,
//   Book,
//   CheckCircle,
//   Upload,
//   Download,
//   Mail,
//   Phone,
//   MapPin,
//   FileSpreadsheet,
//   AlertCircle,
//   BarChart,
//   Megaphone,
//   ChevronRight,
//   X,
//   MessageSquare,
//   Trash2
// } from "lucide-react";
// import {
//   getFacultyDetails,
//   fetchUsers,
//   markAttendance,
//   addMarks,
//   uploadAttendanceSheet,
//   uploadMarksSheet,
//   getAnnouncements,
//   addRemark,
//   updateRemark,
//   deleteRemark
// } from "../services/api";
// import { Toaster, toast } from "react-hot-toast";
// import Swal from "sweetalert2";
// import * as XLSX from "xlsx";
// import { format } from "date-fns";

// const subjectsBySemester = {
//   1: ["Mathematics I", "Physics", "Chemistry", "Introduction to Programming"],
//   2: [
//     "Mathematics II",
//     "Electrical Engineering",
//     "Mechanical Engineering",
//     "Data Structures",
//   ],
//   3: ["Mathematics III", "Electronics", "Digital Logic Design", "Algorithms"],
//   4: [
//     "Mathematics IV",
//     "Computer Organization",
//     "Operating Systems",
//     "Database Systems",
//   ],
//   5: [
//     "Software Engineering",
//     "Computer Networks",
//     "Theory of Computation",
//     "Artificial Intelligence",
//   ],
//   6: [
//     "Compiler Design",
//     "Distributed Systems",
//     "Machine Learning",
//     "Web Technologies",
//   ],
//   7: [
//     "Cloud Computing",
//     "Big Data Analytics",
//     "Cyber Security",
//     "Mobile Computing",
//     "Software Testing",
//   ],
//   8: [
//     "Project Management",
//     "Entrepreneurship",
//     "Ethics in IT",
//     "Advanced Topics",
//   ],
// };

// const ProfessorDashboard = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [users, setUsers] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [attendanceData, setAttendanceData] = useState({
//     status: "",
//     date: new Date().toISOString().split("T")[0],
//     subject: "",
//     semester: "",
//   });
//   const [marksData, setMarksData] = useState({
//     subject: "",
//     internalExam1: "",
//     internalExam2: "",
//     semester: "",
//   });
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     totalSubjects: 0,
//     attendanceMarked: 0,
//     marksUploaded: 0,
//   });
//   const [announcements, setAnnouncements] = useState([]);
//   const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
//   const [remarks, setRemarks] = useState([]);
//   const [newRemark, setNewRemark] = useState("");
//   const [editRemark, setEditRemark] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [error, setError] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     fetchUserDetails();
//     fetchAllUsers();
//     if (selectedSemester) {
//       fetchStudentsBySemester(selectedSemester);
//     }
//   }, [selectedSemester,refreshKey]);

//   // Add this to your useEffect or create a new one
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await getAnnouncements();
//         setAnnouncements(response.data || []);
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };
//     fetchAnnouncements();
//   }, []);

//   const fetchAllUsers = async () => {
//     try {
//       const response = await fetchUsers();
//       setUsers(response.users || []);
//     } catch (error) {
//       setError("Failed to fetch users");
//     }
//   };
//     const handleAddRemark = async () => {
//       try {
//         // const userId = localStorage.getItem('UserId');
//         const user = localStorage.getItem("user");
//         const userResponse = JSON.parse(user);
//         const userId = userResponse.id;

//         const response = await addRemark({
//           studentId: selectedUser._id,
//           text: newRemark,
//           facultyId: userId,
//         });
//         if (response.success) {
//           setRemarks([...remarks, response.data]);
//           setNewRemark("");
//           setRefreshKey((oldKey) => oldKey + 1);
//         } else {
//           setError(response.message);
//         }
//       } catch (error) {
//         setError("Failed to add remark");
//       }
//     };

//     const handleEditRemark = async () => {
//       try {
//         const response = await updateRemark(editRemark._id, {
//           text: editRemark.text,
//         });
//         if (response.success) {
//           setRemarks(
//             remarks.map((remark) =>
//               remark._id === editRemark._id ? response.data : remark
//             )
//           );
//           setEditRemark(null);
//           setRefreshKey((oldKey) => oldKey + 1);
//         } else {
//           setError(response.message);
//         }
//       } catch (error) {
//         setError("Failed to update remark");
//       }
//     };

//     const handleDeleteRemark = async (remarkId) => {
//       try {
//         const result = await Swal.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!'
//         });

//         if (result.isConfirmed) {
//           const response = await deleteRemark(remarkId);
//           if (response.success) {
//             setRemarks(remarks.filter(remark => remark._id !== remarkId));
//             setRefreshKey((oldKey) => oldKey + 1);
//             Swal.fire(
//               'Deleted!',
//               'Remark has been deleted.',
//               'success'
//             );
//           } else {
//             setError(response.message);
//           }
//         }
//       } catch (error) {
//         setError("Failed to delete remark");
//         Swal.fire(
//           'Error!',
//           'Failed to delete remark.',
//           'error'
//         );
//       }
//     };

//   // Add this component for the announcements modal
//   const AnnouncementsModal = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden">
//         <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <Megaphone className="h-8 w-8 text-blue-600" />
//               <h2 className="text-2xl font-bold text-gray-800 font-display">
//                 Announcement History
//               </h2>
//             </div>
//             <button
//               onClick={() => setShowAllAnnouncements(false)}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//         <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)] bg-gray-50">
//           <div className="space-y-4">
//             {announcements.map((announcement) => (
//               <div
//                 key={announcement._id}
//                 className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <p className="text-lg text-gray-800 font-medium mb-2">
//                       {announcement.text}
//                     </p>
//                     <div className="flex items-center space-x-2 text-sm text-gray-500">
//                       <Calendar className="h-4 w-4" />
//                       <span>
//                         {format(
//                           new Date(announcement.timestamp),
//                           "MMM dd, yyyy • h:mm a"
//                         )}
//                       </span>
//                       <span className="text-blue-600 font-medium">
//                         • {announcement.authorName}
//                       </span>
//                     </div>
//                   </div>
//                   <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                     {format(new Date(announcement.timestamp), "MMM dd")}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const fetchUserDetails = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const response = await getFacultyDetails(user.id);
//       if (response.success) {
//         setCurrentUser(response.data);
//         setRemarks(response.data.remarks || []);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch professor details");
//     }
//   };

//   const fetchStudentsBySemester = async (semester) => {
//     try {
//       const response = await fetchUsers();
//       const filteredUsers = response.users.filter(
//         (user) => user.role === "student" && user.semester === semester
//       );
//       setUsers(filteredUsers);
//       setStats((prev) => ({ ...prev, totalStudents: filteredUsers.length }));
//     } catch (error) {
//       toast.error("Failed to fetch students");
//     }
//   };

//   const handleExcelUpload = async (event, type) => {
//     const file = event.target.files[0];
//     if (!file || !selectedSemester) {
//       toast.error("Please select a semester and file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("semester", selectedSemester);
//     formData.append("professorId", currentUser._id);

//     try {
//       const result = await Swal.fire({
//         title: `Upload ${type} Sheet`,
//         text: `Are you sure you want to upload ${type.toLowerCase()} for semester ${selectedSemester}?`,
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//       });

//       if (result.isConfirmed) {
//         const response = await (type === "Attendance"
//           ? uploadAttendanceSheet(formData)
//           : uploadMarksSheet(formData));

//         if (response.success) {
//           toast.success(`${type} uploaded successfully`);
//           addActivity(
//             `Uploaded ${type.toLowerCase()} sheet for semester ${selectedSemester}`
//           );
//           updateStats(type);
//         } else {
//           throw new Error(response.message);
//         }
//       }
//     } catch (error) {
//       toast.error(`Failed to upload ${type.toLowerCase()}`);
//     }
//   };

//   // const handleMarkAttendance = async () => {
//   //   try {
//   //     if (
//   //       !selectedStudent ||
//   //       !attendanceData.status ||
//   //       !attendanceData.subject
//   //     ) {
//   //       toast.error("Please fill all attendance details");
//   //       return;
//   //     }

//   //     const result = await Swal.fire({
//   //       title: "Mark Attendance",
//   //       text: `Mark ${selectedStudent.fullName} as ${attendanceData.status}?`,
//   //       icon: "question",
//   //       showCancelButton: true,
//   //       confirmButtonColor: "#3085d6",
//   //       cancelButtonColor: "#d33",
//   //     });

//   //     if (result.isConfirmed) {
//   //       const response = await markAttendance({
//   //         studentId: selectedStudent._id,
//   //         ...attendanceData,
//   //         professorId: currentUser._id,
//   //       });

//   //       if (response.success) {
//   //         toast.success("Attendance marked successfully");
//   //         addActivity(`Marked attendance for ${selectedStudent.fullName}`);
//   //         updateStats("Attendance");
//   //         setAttendanceData({
//   //           status: "",
//   //           date: new Date().toISOString().split("T")[0],
//   //           subject: "",
//   //           semester: selectedSemester,
//   //         });
//   //         setSelectedStudent(null);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     toast.error("Failed to mark attendance");
//   //   }
//   // };

//   const handleMarkAttendance = async () => {
//     try {
//       if (!selectedStudent || !attendanceData.status || !attendanceData.subject || !selectedSemester) {
//         toast.error("Please fill all attendance details including semester");
//         return;
//       }

//       const result = await Swal.fire({
//         title: "Mark Attendance",
//         text: `Mark ${selectedStudent.fullName} as ${attendanceData.status}?`,
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, mark it!",
//       });

//       if (result.isConfirmed) {
//         const attendancePayload = {
//           studentId: selectedStudent._id,
//           ...attendanceData,
//           semester: selectedSemester,  // Include semester in the payload
//           professorId: currentUser._id,
//         };

//         const response = await markAttendance(attendancePayload);

//         if (response.success) {
//           toast.success("Attendance marked successfully");
//           addActivity(`Marked attendance for ${selectedStudent.fullName}`);
//           updateStats("Attendance");
//           setAttendanceData({
//             status: "",
//             date: new Date().toISOString().split("T")[0],
//             subject: "",
//             semester: selectedSemester,
//           });
//           setSelectedStudent(null);
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to mark attendance");
//       console.error(error);
//     }
//   };

//   const handleAddMarks = async () => {
//     try {
//       if (
//         !selectedStudent ||
//         !marksData.subject ||
//         !marksData.internalExam1 ||
//         !marksData.internalExam2
//       ) {
//         toast.error("Please fill all marks details");
//         return;
//       }

//       const result = await Swal.fire({
//         title: "Add Marks",
//         text: `Add marks for ${selectedStudent.fullName}?`,
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//       });

//       if (result.isConfirmed) {
//         const response = await addMarks({
//           studentId: selectedStudent._id,
//           ...marksData,
//           professorId: currentUser._id,
//         });

//         if (response.success) {
//           toast.success("Marks added successfully");
//           addActivity(`Added marks for ${selectedStudent.fullName}`);
//           updateStats("Marks");
//           setMarksData({
//             subject: "",
//             internalExam1: "",
//             internalExam2: "",
//             semester: selectedSemester,
//           });
//           setSelectedStudent(null);
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to add marks");
//     }
//   };

//   const addActivity = (activity) => {
//     setRecentActivities((prev) =>
//       [
//         {
//           text: activity,
//           timestamp: new Date(),
//         },
//         ...prev,
//       ].slice(0, 5)
//     );
//   };

//   const updateStats = (type) => {
//     setStats((prev) => ({
//       ...prev,
//       [`${type.toLowerCase()}Marked`]: prev[`${type.toLowerCase()}Marked`] + 1,
//     }));
//   };

//   const downloadTemplate = (type) => {
//     const template =
//       // type === "attendance"
//       //   ? [["Enrollment No", "Student Name", "Status", "Date"]]
//       //   : [["Enrollment No", "Student Name", "Internal 1", "Internal 2"]];
//       type === "attendance"
//           ? [["Enrollment No", "Date","Subject", "Status"]]
//           : [["Enrollment No", "Subject", "Internal 1", "Internal 2"]];

//     const ws = XLSX.utils.aoa_to_sheet(template);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, `${type}_template.xlsx`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Toaster position="top-right" />

//       {/* Navigation */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <BookOpen className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">
//                 Professor Dashboard
//               </span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate("/chat")}
//                 className="text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <MessageCircle className="h-6 w-6" />
//               </button>
//               {/* <button
//                 onClick={() => navigate("/edit-profile")}
//                 className="text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <User className="h-6 w-6" />
//               </button> */}
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

//       {/* Profile Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex space-x-8">
//           {/* Profile Section */}
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div className="flex items-center space-x-6">
//                 <div
//                   className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600
//                               flex items-center justify-center text-white text-3xl font-bold"
//                 >
//                   {currentUser?.fullName?.charAt(0)}
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {currentUser?.fullName}
//                   </h1>
//                   <p className="text-blue-600 font-semibold">
//                     Professor • {currentUser?.department}
//                   </p>
//                   <div className="mt-2 space-y-1">
//                     <div className="flex items-center text-gray-600">
//                       <Mail className="w-4 h-4 mr-2" />
//                       <span>{currentUser?.email}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span>{currentUser?.phoneNumber || "Not provided"}</span>
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       <span>{currentUser?.department}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => navigate("/edit-faculty-profile")}
//                 className="text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <User className="h-6 w-6" />
//               </button>
//             </div>
//           </div>

//           {/* Announcements Section */}
//           <div className="flex-1 border-l pl-8">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center">
//                 <Megaphone className="w-5 h-5 text-blue-500 mr-2" />
//                 <h2 className="text-lg font-semibold">Recent Announcements</h2>
//               </div>
//               <button
//                 onClick={() => setShowAllAnnouncements(true)}
//                 className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
//               >
//                 View All <ChevronRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {announcements.slice(0, 3).map((announcement) => (
//                 <div
//                   key={announcement._id}
//                   className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
//                 >
//                   <p className="text-sm text-gray-800 mb-2">
//                     {announcement.text}
//                   </p>
//                   <div className="flex items-center text-xs text-gray-500">
//                     <Calendar className="h-3 w-3 mr-1" />
//                     <span>
//                       {format(new Date(announcement.timestamp), "MMM dd, yyyy")}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Add the modal at the end of your component */}
//           {showAllAnnouncements && <AnnouncementsModal />}
//         </div>

//         {/* Statistics Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           {" "}
//           <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500">Total Students</p>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {stats.totalStudents}
//                 </h3>
//               </div>
//               <Users className="h-10 w-10 text-blue-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500">Subjects</p>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {subjectsBySemester[selectedSemester]?.length || 0}
//                 </h3>
//               </div>
//               <Book className="h-10 w-10 text-green-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500">Attendance Marked</p>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {stats.attendanceMarked}
//                 </h3>
//               </div>
//               <CheckCircle className="h-10 w-10 text-purple-600" />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500">Marks Uploaded</p>
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   {stats.marksUploaded}
//                 </h3>
//               </div>
//               <BarChart className="h-10 w-10 text-orange-600" />
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Semester Selection */}
//             <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Calendar className="w-5 h-5 mr-2 text-blue-600" />
//                 Select Semester
//               </h2>
//               <select
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                          focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="">Choose Semester</option>
//                 {[...Array(8)].map((_, i) => (
//                   <option key={i + 1} value={String(i + 1)}>
//                     Semester {i + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {selectedSemester && (
//               <>
//                 {/* Student Selection */}
//                 <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Users className="w-5 h-5 mr-2 text-blue-600" />
//                     Select Student
//                   </h2>
//                   <select
//                     value={selectedStudent?._id || ""}
//                     onChange={(e) =>
//                       setSelectedStudent(
//                         users.find((u) => u._id === e.target.value)
//                       )
//                     }
//                     className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                              focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   >
//                     <option value="">Choose Student</option>
//                     {users.map((user) => (
//                       <option key={user._id} value={user._id}>
//                         {user.fullName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Manual Entry Forms */}
//                 {selectedStudent && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Attendance Form */}
//                     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//                       <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                         <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
//                         Mark Attendance
//                       </h2>
//                       <div className="space-y-4">
//                         <select
//                           value={attendanceData.subject}
//                           onChange={(e) =>
//                             setAttendanceData({
//                               ...attendanceData,
//                               subject: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select Subject</option>
//                           {subjectsBySemester[selectedSemester]?.map(
//                             (subject) => (
//                               <option key={subject} value={subject}>
//                                 {subject}
//                               </option>
//                             )
//                           )}
//                         </select>

//                         <select
//                           value={attendanceData.status}
//                           onChange={(e) =>
//                             setAttendanceData({
//                               ...attendanceData,
//                               status: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select Status</option>
//                           <option value="present">Present</option>
//                           <option value="absent">Absent</option>
//                         </select>

//                         <input
//                           type="date"
//                           value={attendanceData.date}
//                           onChange={(e) =>
//                             setAttendanceData({
//                               ...attendanceData,
//                               date: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         />

//                         <button
//                           onClick={handleMarkAttendance}
//                           className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
//                                    transition-colors duration-200"
//                         >
//                           Mark Attendance
//                         </button>
//                       </div>
//                     </div>

//                     {/* Marks Form */}
//                     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//                       <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                         <Book className="w-5 h-5 mr-2 text-blue-600" />
//                         Add Marks
//                       </h2>
//                       <div className="space-y-4">
//                         <select
//                           value={marksData.subject}
//                           onChange={(e) =>
//                             setMarksData({
//                               ...marksData,
//                               subject: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">Select Subject</option>
//                           {subjectsBySemester[selectedSemester]?.map(
//                             (subject) => (
//                               <option key={subject} value={subject}>
//                                 {subject}
//                               </option>
//                             )
//                           )}
//                         </select>

//                         <input
//                           type="number"
//                           placeholder="Internal Exam 1 Marks"
//                           value={marksData.internalExam1}
//                           onChange={(e) =>
//                             setMarksData({
//                               ...marksData,
//                               internalExam1: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         />

//                         <input
//                           type="number"
//                           placeholder="Internal Exam 2 Marks"
//                           value={marksData.internalExam2}
//                           onChange={(e) =>
//                             setMarksData({
//                               ...marksData,
//                               internalExam2: e.target.value,
//                             })
//                           }
//                           className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2
//                                    focus:ring-blue-500 focus:border-transparent"
//                         />

//                         <button
//                           onClick={handleAddMarks}
//                           className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
//                                    transition-colors duration-200"
//                         >
//                           Add Marks
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             {/* Excel Upload Section */}
//             {selectedSemester && (
//               <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                   <FileSpreadsheet className="w-5 h-5 mr-2 text-blue-600" />
//                   Bulk Upload
//                 </h2>
//                 <div className="space-y-6">
//                   {/* Attendance Upload */}
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         Attendance Sheet
//                       </label>
//                       <button
//                         onClick={() => downloadTemplate("attendance")}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                       >
//                         <Download className="w-4 h-4 mr-1" />
//                         Template
//                       </button>
//                     </div>
//                     <input
//                       type="file"
//                       accept=".xlsx,.xls"
//                       onChange={(e) => handleExcelUpload(e, "Attendance")}
//                       className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2
//                                focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Marks Upload */}
//                   <div>
//                     <div className="flex justify-between items-center mb-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         Marks Sheet
//                       </label>
//                       <button
//                         onClick={() => downloadTemplate("marks")}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
//                       >
//                         <Download className="w-4 h-4 mr-1" />
//                         Template
//                       </button>
//                     </div>
//                     <input
//                       type="file"
//                       accept=".xlsx,.xls"
//                       onChange={(e) => handleExcelUpload(e, "Marks")}
//                       className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2
//                                focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Recent Activities */}
//             <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                 <Clock className="w-5 h-5 mr-2 text-blue-600" />
//                 Recent Activities
//               </h2>
//               <div className="space-y-4">
//                 {recentActivities.map((activity, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center text-gray-600 border-b border-gray-100 pb-2"
//                   >
//                     <div className="w-2 h-2 rounded-full bg-blue-600 mr-3"></div>
//                     <div className="flex-1">
//                       <p className="text-sm">{activity.text}</p>
//                       <p className="text-xs text-gray-400">
//                         {new Date(activity.timestamp).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 {recentActivities.length === 0 && (
//                   <div className="text-center text-gray-500 py-4">
//                     <AlertCircle className="h-6 w-6 mx-auto mb-2" />
//                     <p>No recent activities</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {editRemark && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">Edit Remark</h2>
//                 <button onClick={() => setEditRemark(null)}>
//                   <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
//                 </button>
//               </div>
//               <textarea
//                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
//                 rows="4"
//                 value={editRemark.text}
//                 onChange={(e) =>
//                   setEditRemark({ ...editRemark, text: e.target.value })
//                 }
//               />
//               <button
//                 onClick={handleEditRemark}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-3 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
//               >
//                 Update Remark
//               </button>
//             </div>
//           </div>
//         )}
//         {/* Remarks Section */}
//         <div className="mt-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 lg:col-span-2">
//           <div className="flex items-center space-x-3 mb-6">
//             <MessageSquare className="h-6 w-6 text-purple-600" />
//             <h2 className="text-xl font-bold text-gray-800">Student Remarks</h2>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div>
//               <select
//                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
//                 onChange={(e) =>
//                   setSelectedUser(
//                     users.find((user) => user._id === e.target.value)
//                   )
//                 }
//               >
//                 <option value="">Select a student</option>
//                 {users
//                   .filter((user) => user.role === "student")
//                   .map((user) => (
//                     <option key={user._id} value={user._id}>
//                       {user.fullName}
//                     </option>
//                   ))}
//               </select>
//               <textarea
//                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none mb-4"
//                 rows="4"
//                 value={newRemark}
//                 onChange={(e) => setNewRemark(e.target.value)}
//                 placeholder="Add a remark about the student..."
//               />
//               <button
//                 onClick={handleAddRemark}
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-3 font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02]"
//               >
//                 Add Remark
//               </button>
//             </div>
//             <div className="space-y-4 max-h-[400px] overflow-y-auto">
//               {/* {remarks.map((remark, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-4">
//                     <p className="text-gray-800 mb-2">{remark.text}</p>
//                     <div className="flex justify-between items-center text-sm text-gray-500">
//                       <span>{format(new Date(remark.timestamp), 'MMM dd, yyyy')}</span>
//                       <button
//                         onClick={() => setEditRemark(remark)}
//                         className="text-purple-600 hover:text-purple-700"
//                       >
//                         <Edit3 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 ))} */}
//               {remarks.map((remark, index) => (
//                 <div key={remark._id} className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-gray-800 mb-2">{remark.text}</p>
//                   <div className="flex justify-between items-center text-sm text-gray-500">
//                     <div>
//                       <p className="font-medium text-purple-600">
//                         {remark.student.fullName}
//                       </p>
//                       <span>
//                         {remark.createdAt
//                           ? format(new Date(remark.createdAt), "MMM dd, yyyy")
//                           : "Date not available"}
//                       </span>
//                     </div>
//                     <div className="flex gap-5">
//                     <button
//                       onClick={() => setEditRemark(remark)}
//                       className="text-purple-600 hover:text-purple-700"
//                     >
//                       <Edit3 className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteRemark(remark._id)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     // </div>
//     // </div>
//   );
// };

// export default ProfessorDashboard;

// --------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  MessageCircle,
  User,
  LogOut,
  Users,
  Edit3,
  Calendar,
  Clock,
  Book,
  CheckCircle,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  FileSpreadsheet,
  AlertCircle,
  BarChart,
  Megaphone,
  ChevronRight,
  X,
  MessageSquare,
  Trash2,
} from "lucide-react";
import {
  getFacultyDetails,
  fetchUsers,
  markAttendance,
  addMarks,
  uploadAttendanceSheet,
  uploadMarksSheet,
  getAnnouncements,
  addRemark,
  updateRemark,
  deleteRemark,
} from "../services/api";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { format } from "date-fns";

const subjectsBySemester = {
  1: [
    "MA101|Mathematics I",
    "PH101|Physics",
    "CH101|Chemistry",
    "CS101|Introduction to Programming",
  ],
  2: [
    "MA102|Mathematics II",
    "EE201|Electrical Engineering",
    "ME201|Mechanical Engineering",
    "CS102|Data Structures",
  ],
  3: [
    "MA103|Mathematics III",
    "EC201|Electronics",
    "CS201|Digital Logic Design",
    "CS202|Algorithms",
  ],
  4: [
    "MA104|Mathematics IV",
    "CS203|Computer Organization",
    "CS204|Operating Systems",
    "CS205|Database Systems",
  ],
  5: [
    "CS301|Software Engineering",
    "CS302|Computer Networks",
    "CS303|Theory of Computation",
    "CS304|Artificial Intelligence",
  ],
  6: [
    "CS305|Compiler Design",
    "CS306|Distributed Systems",
    "CS307|Machine Learning",
    "CS308|Web Technologies",
  ],
  7: [
    "CS401|Cloud Computing",
    "CS402|Big Data Analytics",
    "CS403|Cyber Security",
    "CS404|Mobile Computing",
    "CS405|Software Testing",
  ],
  8: [
    "CS406|Project Management",
    "CS407|Entrepreneurship",
    "CS408|Ethics in IT",
    "CS409|Advanced Topics",
  ],
};

const ProfessorDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState({
    status: "",
    date: new Date().toISOString().split("T")[0],
    subject: "",
    subjectCode: "",
    semester: "",
  });
  const [marksData, setMarksData] = useState({
    subject: "",
    subjectCode: "",
    internalExam1: "",
    internalExam2: "",
    semester: "",
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    attendanceMarked: 0,
    marksUploaded: 0,
  });
  const [announcements, setAnnouncements] = useState([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const [editRemark, setEditRemark] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
    fetchAllUsers();
    if (selectedSemester) {
      fetchStudentsBySemester(selectedSemester);
    }
  }, [selectedSemester, refreshKey]);

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

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.users || []);
    } catch (error) {
      setError("Failed to fetch users");
    }
  };
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

  const fetchUserDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getFacultyDetails(user.id);
      if (response.success) {
        setCurrentUser(response.data);
        setRemarks(response.data.remarks || []);
      }
    } catch (error) {
      toast.error("Failed to fetch professor details");
    }
  };

  const fetchStudentsBySemester = async (semester) => {
    try {
      const response = await fetchUsers();
      const filteredUsers = response.users.filter(
        (user) => user.role === "student" && user.semester === semester
      );
      setUsers(filteredUsers);
      setStats((prev) => ({ ...prev, totalStudents: filteredUsers.length }));
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const handleExcelUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file || !selectedSemester) {
      toast.error("Please select a semester and file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("semester", selectedSemester);
    formData.append("professorId", currentUser._id);

    try {
      const result = await Swal.fire({
        title: `Upload ${type} Sheet`,
        text: `Are you sure you want to upload ${type.toLowerCase()} for semester ${selectedSemester}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        const response = await (type === "Attendance"
          ? uploadAttendanceSheet(formData)
          : uploadMarksSheet(formData));

        if (response.success) {
          toast.success(`${type} uploaded successfully`);
          addActivity(
            `Uploaded ${type.toLowerCase()} sheet for semester ${selectedSemester}`
          );
          updateStats(type);
        } else {
          throw new Error(response.message);
        }
      }
    } catch (error) {
      toast.error(`Failed to upload ${type.toLowerCase()}`);
    }
  };

  const handleMarkAttendance = async () => {
    try {
      if (
        !selectedStudent ||
        !attendanceData.status ||
        !attendanceData.subject ||
        !selectedSemester
      ) {
        toast.error("Please fill all attendance details");
        return;
      }

      const result = await Swal.fire({
        title: "Mark Attendance",
        text: `Mark ${selectedStudent.fullName} as ${attendanceData.status}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      attendanceData.subjectCode = attendanceData.subject.split("|")[0];
      attendanceData.subject = attendanceData.subject.split("|")[1];
      attendanceData.semester = selectedSemester;
      console.log(attendanceData);
      if (result.isConfirmed) {
        const response = await markAttendance({
          studentId: selectedStudent._id,
          ...attendanceData,
          professorId: currentUser._id,
        });
        // {console.log(selectedSemester)}

        if (response.success) {
          toast.success("Attendance marked successfully");
          addActivity(`Marked attendance for ${selectedStudent.fullName}`);
          updateStats("Attendance");
          setAttendanceData({
            status: "",
            date: new Date().toISOString().split("T")[0],
            subject: "",
            semester: selectedSemester,
          });
          setSelectedStudent(null);
        }
      }
    } catch (error) {
      toast.error("Failed to mark attendance");
    }
  };

  const handleAddMarks = async () => {
    try {
      if (
        !selectedStudent ||
        !marksData.subject ||
        !marksData.internalExam1 ||
        !marksData.internalExam2
      ) {
        toast.error("Please fill all marks details");
        return;
      }

      const result = await Swal.fire({
        title: "Add Marks",
        text: `Add marks for ${selectedStudent.fullName}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      // console.log(marksData.subject);
      marksData.subjectCode = marksData.subject.split("|")[0];
      marksData.subject = marksData.subject.split("|")[1];
      marksData.semester = selectedSemester;

      if (result.isConfirmed) {
        const response = await addMarks({
          studentId: selectedStudent._id,
          ...marksData,
          professorId: currentUser._id,
        });

        if (response.success) {
          toast.success("Marks added successfully");
          addActivity(`Added marks for ${selectedStudent.fullName}`);
          updateStats("Marks");
          setMarksData({
            subject: "",
            internalExam1: "",
            internalExam2: "",
            semester: selectedSemester,
          });
          setSelectedStudent(null);
        }
      }
    } catch (error) {
      toast.error("Failed to add marks");
    }
  };

  const addActivity = (activity) => {
    setRecentActivities((prev) =>
      [
        {
          text: activity,
          timestamp: new Date(),
        },
        ...prev,
      ].slice(0, 5)
    );
  };

  const updateStats = (type) => {
    setStats((prev) => ({
      ...prev,
      [`${type.toLowerCase()}Marked`]: prev[`${type.toLowerCase()}Marked`] + 1,
    }));
  };

  const downloadTemplate = (type) => {
    const template =
      type === "attendance"
        ? [
            [
              "Enrollment No",
              "Date",
              "Subject",
              "SubjectCode",
              "semester",
              "Status",
            ],
          ]
        : [
            [
              "Enrollment No",
              "Subject",
              "SubjectCode",
              "semester",
              "Internal Exam 1",
              "Internal Exam 2",
            ],
          ];

    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${type}_template.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Professor Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/chat")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
              {/* <button
                onClick={() => navigate("/edit-profile")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User className="h-6 w-6" />
              </button> */}
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

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex space-x-8">
          {/* Profile Section */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={currentUser?.profileImage}
                    alt={currentUser?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentUser?.fullName}
                  </h1>
                  <p className="text-blue-600 font-semibold">
                    Professor • {currentUser?.department}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{currentUser?.phoneNumber || "Not provided"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{currentUser?.department}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/edit-faculty-profile")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Announcements Section */}
          <div className="flex-1 border-l pl-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Megaphone className="w-5 h-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-semibold">Recent Announcements</h2>
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
                      {format(new Date(announcement.timestamp), "MMM dd, yyyy")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add the modal at the end of your component */}
          {showAllAnnouncements && <AnnouncementsModal />}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {" "}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stats.totalStudents}
                </h3>
              </div>
              <Users className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Subjects</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {subjectsBySemester[selectedSemester]?.length || 0}
                </h3>
              </div>
              <Book className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Attendance Marked</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stats.attendanceMarked}
                </h3>
              </div>
              <CheckCircle className="h-10 w-10 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Marks Uploaded</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {stats.marksUploaded}
                </h3>
              </div>
              <BarChart className="h-10 w-10 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Semester Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Select Semester
              </h2>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Choose Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {selectedSemester && (
              <>
                {/* Student Selection */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Select Student
                  </h2>
                  <select
                    value={selectedStudent?._id || ""}
                    onChange={(e) =>
                      setSelectedStudent(
                        users.find((u) => u._id === e.target.value)
                      )
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choose Student</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Manual Entry Forms */}
                {selectedStudent && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attendance Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                        Mark Attendance
                      </h2>
                      <div className="space-y-4">
                        <select
                          value={attendanceData.subject}
                          onChange={(e) =>
                            setAttendanceData({
                              ...attendanceData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Subject</option>
                          {subjectsBySemester[selectedSemester]?.map(
                            (subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            )
                          )}
                        </select>

                        <select
                          value={attendanceData.status}
                          onChange={(e) =>
                            setAttendanceData({
                              ...attendanceData,
                              status: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Status</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>

                        <input
                          type="date"
                          value={attendanceData.date}
                          onChange={(e) =>
                            setAttendanceData({
                              ...attendanceData,
                              date: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        />

                        <button
                          onClick={handleMarkAttendance}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                   transition-colors duration-200"
                        >
                          Mark Attendance
                        </button>
                      </div>
                    </div>

                    {/* Marks Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Book className="w-5 h-5 mr-2 text-blue-600" />
                        Add Marks
                      </h2>
                      <div className="space-y-4">
                        <select
                          value={marksData.subject}
                          onChange={(e) =>
                            setMarksData({
                              ...marksData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Subject</option>
                          {subjectsBySemester[selectedSemester]?.map(
                            (subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            )
                          )}
                        </select>

                        <input
                          type="number"
                          placeholder="Internal Exam 1 Marks"
                          value={marksData.internalExam1}
                          onChange={(e) =>
                            setMarksData({
                              ...marksData,
                              internalExam1: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        />

                        <input
                          type="number"
                          placeholder="Internal Exam 2 Marks"
                          value={marksData.internalExam2}
                          onChange={(e) =>
                            setMarksData({
                              ...marksData,
                              internalExam2: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                                   focus:ring-blue-500 focus:border-transparent"
                        />

                        <button
                          onClick={handleAddMarks}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                   transition-colors duration-200"
                        >
                          Add Marks
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Excel Upload Section */}
            {selectedSemester && (
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileSpreadsheet className="w-5 h-5 mr-2 text-blue-600" />
                  Bulk Upload
                </h2>
                <div className="space-y-6">
                  {/* Attendance Upload */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Attendance Sheet
                      </label>
                      <button
                        onClick={() => downloadTemplate("attendance")}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Template
                      </button>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => handleExcelUpload(e, "Attendance")}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Marks Upload */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Marks Sheet
                      </label>
                      <button
                        onClick={() => downloadTemplate("marks")}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Template
                      </button>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => handleExcelUpload(e, "Marks")}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center text-gray-600 border-b border-gray-100 pb-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentActivities.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                    <p>No recent activities</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
        {/* Remarks Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 lg:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Student Remarks</h2>
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

    // </div>
    // </div>
  );
};

export default ProfessorDashboard;
