// import React, { useState, useEffect } from 'react';
// import { fetchUsers, addUser, deleteUser, updateUser } from '../services/api';
// import { PlusCircle, Edit, Trash2, X, Search, Filter, UserPlus, Users, GraduationCap } from 'lucide-react';
// import { Toaster, toast } from 'react-hot-toast';

// const DEPARTMENTS = [
//   'Information Technology',
//   'Computer Engineering',
//   'Electronics Engineering',
//   'Mechanical Engineering'
// ];

// const getBatchOptions = (semester) => {
//   if (!semester) return [];
//   return [`${semester}A1`, `${semester}A2`, `${semester}A3`, `${semester}A4`];
// };

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [newUser, setNewUser] = useState({
//     fullName: '',
//     email: '',
//     studentId: '',
//     semester: '',
//     department: '',
//     batch: '',
//     phoneNumber: '',
//     gender: '',
//     enrollmentDate: ''
//   });

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   const fetchAllUsers = async () => {
//     try {
//       const response = await fetchUsers();
//       setUsers(response.users.filter(user => user.role === 'student'));
//     } catch (error) {
//       toast.error('Failed to fetch users');
//     }
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSemester = selectedSemester === 'all' || user.semester === selectedSemester;
//     const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          user.studentId.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesSemester && matchesSearch;
//   });

//   const handleAddUser = async () => {
//     try {
//       toast.promise(
//         addUser({
//           ...newUser,
//           role: 'student',
//           password: newUser.studentId
//         }),
//         {
//           loading: 'Adding student...',
//           success: 'Student added successfully! 🎉',
//           error: 'Failed to add student'
//         }
//       );
//       await fetchAllUsers();
//       setShowAddPopup(false);
//       resetForm();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateUser = async () => {
//     try {
//       toast.promise(
//         updateUser(editingUser._id, newUser),
//         {
//           loading: 'Updating student...',
//           success: 'Student updated successfully! 👍',
//           error: 'Failed to update student'
//         }
//       );
//       await fetchAllUsers();
//       setShowAddPopup(false);
//       setEditingUser(null);
//       resetForm();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this student?')) {
//       try {
//         toast.promise(
//           deleteUser(userId),
//           {
//             loading: 'Deleting student...',
//             success: 'Student deleted successfully! ✨',
//             error: 'Failed to delete student'
//           }
//         );
//         await fetchAllUsers();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <Toaster position="top-right" />
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 font-poppins">
//               Student Management
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Manage and organize student information efficiently
//             </p>
//           </div>
//           <button
//             onClick={() => setShowAddPopup(true)}
//             className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
//                      transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
//           >
//             <UserPlus className="w-5 h-5 mr-2" />
//             Add Student
//           </button>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search students by name or ID..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 
//                            focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//             </div>
//             <div className="w-64">
//               <select
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 
//                          focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               >
//                 <option value="all">All Semesters</option>
//                 {[...Array(8)].map((_, i) => (
//                   <option key={i + 1} value={String(i + 1)}>
//                     Semester {i + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Students Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredUsers.map((user) => (
//             <div key={user._id} 
//                  className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-200 
//                           border border-gray-100 hover:border-blue-100">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
//                     <GraduationCap className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-900">{user.fullName}</h3>
//                     <p className="text-gray-600">{user.studentId}</p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEditUser(user)}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg 
//                              transition-colors duration-200"
//                   >
//                     <Edit className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDeleteUser(user._id)}
//                     className="p-2 text-red-600 hover:bg-red-50 rounded-lg 
//                              transition-colors duration-200"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-4 space-y-2">
//                 <p className="text-sm text-gray-600 flex items-center">
//                   <span className="font-medium mr-2">Semester:</span> {user.semester}
//                 </p>
//                 <p className="text-sm text-gray-600 flex items-center">
//                   <span className="font-medium mr-2">Batch:</span> {user.batch}
//                 </p>
//                 <p className="text-sm text-gray-600 flex items-center">
//                   <span className="font-medium mr-2">Department:</span> {user.department}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add/Edit Modal */}
//         {showAddPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-full max-w-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">
//                   {editingUser ? 'Edit Student' : 'Add New Student'}
//                 </h2>
//                 <button 
//                   onClick={() => {
//                     setShowAddPopup(false);
//                     setEditingUser(null);
//                     setNewUser({
//                       fullName: '',
//                       email: '',
//                       studentId: '',
//                       semester: '',
//                       department: '',
//                       batch: '',
//                       phoneNumber: '',
//                       gender: '',
//                       enrollmentDate: ''
//                     });
//                   }}
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={newUser.fullName}
//                   onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={newUser.email}
//                   onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Student ID"
//                   value={newUser.studentId}
//                   onChange={(e) => setNewUser({ ...newUser, studentId: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//                 <select
//                   value={newUser.semester}
//                   onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select Semester</option>
//                   {[...Array(8)].map((_, i) => (
//                     <option key={i + 1} value={String(i + 1)}>Semester {i + 1}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={newUser.department}
//                   onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select Department</option>
//                   {DEPARTMENTS.map((dept) => (
//                     <option key={dept} value={dept}>{dept}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={newUser.batch}
//                   onChange={(e) => setNewUser({ ...newUser, batch: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                   disabled={!newUser.semester}
//                 >
//                   <option value="">Select Batch</option>
//                   {getBatchOptions(newUser.semester).map((batch) => (
//                     <option key={batch} value={batch}>{batch}</option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={newUser.phoneNumber}
//                   onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//                 <select
//                   value={newUser.gender}
//                   onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//                 <input
//                   type="date"
//                   placeholder="Enrollment Date"
//                   value={newUser.enrollmentDate}
//                   onChange={(e) => setNewUser({ ...newUser, enrollmentDate: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg"
//                 />
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowAddPopup(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={editingUser ? handleUpdateUser : handleAddUser}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {editingUser ? 'Update Student' : 'Add Student'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

// ------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, deleteUser, updateUser } from '../services/api';
import { PlusCircle, Edit, Trash2, X, Search, Filter, UserPlus, Users, GraduationCap } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

const DEPARTMENTS = [
  'Information Technology',
  'Computer Engineering',
  'Electronics Engineering',
  'Mechanical Engineering'
];

const getBatchOptions = (semester) => {
  if (!semester) return [];
  return [`${semester}A1`, `${semester}A2`, `${semester}A3`, `${semester}A4`];
};

const initialUserState = {
  fullName: '',
  email: '',
  studentId: '',
  semester: '',
  department: '',
  batch: '',
  phoneNumber: '',
  gender: '',
  enrollmentDate: ''
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState(initialUserState);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.users.filter(user => user.role === 'student'));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to fetch users',
        text: 'Please try again later'
      });
    }
  };

  const validateUserData = () => {
    const requiredFields = ['fullName', 'email', 'studentId', 'semester', 'department', 'batch'];
    const missingFields = requiredFields.filter(field => !newUser[field]);
    
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Required Fields',
        text: `Please fill in: ${missingFields.join(', ')}`
      });
      return false;
    }
    return true;
  };

  const handleAddUser = async () => {
    if (!validateUserData()) return;

    try {
      const result = await Swal.fire({
        title: 'Add New Student',
        text: 'Are you sure you want to add this student?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add student'
      });

      if (result.isConfirmed) {
        const response = await addUser({
          ...newUser,
          role: 'student',
          password: newUser.studentId
        });

        if (response.success) {
          await fetchAllUsers();
          setShowAddPopup(false);
          setNewUser(initialUserState);
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: 'Student has been added successfully.',
            timer: 1500
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add student'
      });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      fullName: user.fullName,
      email: user.email,
      studentId: user.studentId,
      semester: user.semester,
      department: user.department,
      batch: user.batch,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      enrollmentDate: user.enrollmentDate?.split('T')[0] || ''
    });
    setShowAddPopup(true);
  };

  const handleUpdateUser = async () => {
    if (!validateUserData()) return;

    try {
      const result = await Swal.fire({
        title: 'Update Student',
        text: 'Are you sure you want to update this student\'s information?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update'
      });

      if (result.isConfirmed) {
        const response = await updateUser(editingUser._id, newUser);
        if (response.success) {
          await fetchAllUsers();
          setShowAddPopup(false);
          setEditingUser(null);
          setNewUser(initialUserState);
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Student information has been updated.',
            timer: 1500
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update student information'
      });
    }
  };

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     const result = await Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#d33',
  //       cancelButtonColor: '#3085d6',
  //       confirmButtonText: 'Yes, delete it!'
  //     });

  //     if (result.isConfirmed) {
  //       const response = await deleteUser(userId);
  //       if (response.success) {
  //         await fetchAllUsers();
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Deleted!',
  //           text: 'Student has been deleted.',
  //           timer: 1500
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Failed to delete student'
  //     });
  //   }
  // };

  const handleDeleteUser = async (userId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      const response = await deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(user => user._id !== userId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Student has been deleted successfully.',
          timer: 1500
        });
      } else {
        throw new Error(response.message);
      }
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Failed to delete student'
    });
  }
};


  const filteredUsers = users.filter(user => {
    const matchesSemester = selectedSemester === 'all' || user.semester === selectedSemester;
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-poppins">
              Student Management
            </h1>
            <p className="text-gray-600 mt-1">
              Total Students: {filteredUsers.length}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingUser(null);
              setNewUser(initialUserState);
              setShowAddPopup(true);
            }}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add Student
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <div className="w-64">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Semesters</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user._id} 
                 className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-200 
                          border border-gray-100 hover:border-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{user.fullName}</h3>
                    <p className="text-gray-600">{user.studentId}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                             transition-colors duration-200"
                    title="Edit Student"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg 
                             transition-colors duration-200"
                    title="Delete Student"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Semester:</span> {user.semester}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Batch:</span> {user.batch}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Department:</span> {user.department}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showAddPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingUser ? 'Edit Student' : 'Add New Student'}
                </h2>
                <button onClick={() => {
                  setShowAddPopup(false);
                  setEditingUser(null);
                  setNewUser(initialUserState);
                }}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Student ID"
                  value={newUser.studentId}
                  onChange={(e) => setNewUser({ ...newUser, studentId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newUser.semester}
                  onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>Semester {i + 1}</option>
                  ))}
                </select>
                <select
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={newUser.batch}
                  onChange={(e) => setNewUser({ ...newUser, batch: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                  disabled={!newUser.semester}
                >
                  <option value="">Select Batch</option>
                  {getBatchOptions(newUser.semester).map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newUser.gender}
                  onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="date"
                  value={newUser.enrollmentDate}
                  onChange={(e) => setNewUser({ ...newUser, enrollmentDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAddPopup(false);
                    setEditingUser(null);
                    setNewUser(initialUserState);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingUser ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;