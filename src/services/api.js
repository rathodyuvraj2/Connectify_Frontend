const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log("response: ",response);
  return response.json();
};

export const getUserDetails = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

// API service (frontend/src/services/resumeService.js)
export const createResume = async (resumeData) => {
  const response = await fetch(`${API_URL}/resumes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(resumeData)
  });
  return response.json();
};

export const getUserResumes = async () => {
  const response = await fetch(`${API_URL}/resumes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message || 'Error fetching resumes');
  }
};

export const getResumeById = async (id) => {
  const response = await fetch(`${API_URL}/resumes/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const updateResume = async (id, resumeData) => {
  const response = await fetch(`${API_URL}/resumes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(resumeData)
  });
  return response.json();
};

export const deleteResume = async (id) => {
  const response = await fetch(`${API_URL}/resumes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getAnnouncements = async () => {
  const response = await fetch(`${API_URL}/announcements`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};


export const createAnnouncement = async (announcementData) => {
  const response = await fetch(`${API_URL}/announcements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(announcementData)
  });
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  console.log("api response: ", data);
  return data;
};

export const nominateClubLead = async (userId) => {
  const response = await fetch(`${API_URL}/faculty/nominateClubLead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ userId })
  });
  return response.json();
};

export const createGroup = async (groupData) => {
  const response = await fetch(`${API_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(groupData)
  });
  return response.json();
};


export const createGroupMessage = async (messageData) => {
  const response = await fetch(`${API_URL}/groups/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(messageData)
  });
  return response.json();
};

export const fetchGroups = async() =>{
  const response = await fetch(`${API_URL}/groups`);
  console.log("api groups: ",response);
  return response.json();
}

export const addUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// export const deleteUser = async (userId) => {
//   const response = await fetch(`${API_URL}/users/${userId}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.json();
// };
export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data;
};


export const updateUser = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};



export const getResumeForEdit = async (resumeId) => {
  try {
    const response = await fetch(`${API_URL}/resumes/${resumeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch resume data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
};

// Add these new API endpoints
export const getStudents = async () => {
  const response = await fetch(`${API_URL}/faculty/students`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};


export const addMarks = async (data) => {
  const response = await fetch(`${API_URL}/faculty/marks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const updateMarksById = async (markId, data) => {
  const response = await fetch(`${API_URL}/faculty/marks/${markId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getAllMarks = async () => {
  const response = await fetch(`${API_URL}/faculty/marks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};


export const addRemark = async (data) => {
  console.log("remark data: ",data);
  const response = await fetch(`${API_URL}/faculty/remarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getRemarks = async (studentId) => {
  const response = await fetch(`${API_URL}/faculty/remarks/${studentId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const updateRemark = async (remarkId, data) => {
  const response = await fetch(`${API_URL}/faculty/remarks/${remarkId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const deleteRemark = async (remarkId) => {
  const response = await fetch(`${API_URL}/faculty/remarks/${remarkId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getAttendanceHistory = async (studentId) => {
  const response = await fetch(`${API_URL}/professor/attendance/${studentId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const markAttendance = async (data) => {
  console.log("Attendence Data: ",data);
  const response = await fetch(`${API_URL}/faculty/attendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const updateAttendance = async (attendanceId, data) => {
  const response = await fetch(`${API_URL}/faculty/attendance/${attendanceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const getAllAttendance = async () => {
  const response = await fetch(`${API_URL}/faculty/attendance`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};


export const getFacultyDetails = async (facultyId) => {
  const response = await fetch(`${API_URL}/faculty/${facultyId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.json()
}

export const updateFacultyProfile = async (userData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/faculty/profile/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};


export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/users/profile/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const fetchUserById = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const nominateProctor = async (facultyId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/admin/nominate-proctor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ facultyId }),
  });
  return response.json();
};

export const getAllFaculty = async () => {
  const response = await fetch(`${API_URL}/admin/faculty`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getAllProctors = async () => {
  const response = await fetch(`${API_URL}/admin/proctors`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log("Proctors response : ",response);
  return response.json();
};

export const getAllAnnouncements = async () => {
  const response = await fetch(`${API_URL}/admin/announcements`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const updateFaculty = async (facultyId, facultyData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/admin/faculty/${facultyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(facultyData),
  });
  return response.json();
};

export const deleteFaculty = async (facultyId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/admin/faculty/${facultyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const getAdminDashboardData = async () => {
  const response = await fetch(`${API_URL}/admin-dashboard`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const addFaculty = async (facultyData) => {
  console.log("Faculty data before adding in db: ",facultyData);
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/admin/faculty`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(facultyData),
  })
  return response.json()
}

export const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const updateProject = async (projectId, projectData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const createCertification = async (certificationData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/certifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(certificationData),
  });
  return response.json();
};

export const updateCertification = async (certId, certificationData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/certifications/${certId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(certificationData),
  });
  return response.json();
};

export const deleteCertification = async (certId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/users/certifications/${certId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

// Add these functions to api.js
export const uploadAttendanceSheet = async (formData) => {
  const response = await fetch(`${API_URL}/faculty/attendance/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return response.json();
};

export const uploadMarksSheet = async (formData) => {
  const response = await fetch(`${API_URL}/faculty/marks/bulk`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return response.json();
};

// Admin API endpoints
export const getAdminStats = async () => {
  const response = await fetch(`${API_URL}/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getAllStudents = async () => {
  const response = await fetch(`${API_URL}/admin/students`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

export const getAllGroups = async () => {
  const response = await fetch(`${API_URL}/admin/groups`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.json();
};

// export const addFaculty = async (facultyData) => {
//   const response = await fetch(`${API_URL}/admin/faculty`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify(facultyData)
//   });
//   return response.json();
// };

// export const updateFaculty = async (facultyId, facultyData) => {
//   const response = await fetch(`${API_URL}/admin/faculty/${facultyId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     body: JSON.stringify(facultyData)
//   });
//   return response.json();
// };

// export const deleteFaculty = async (facultyId) => {
//   const response = await fetch(`${API_URL}/admin/faculty/${facultyId}`, {
//     method: 'DELETE',
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.json();
// };

// export const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'your_cloudinary_upload_preset');

//   const response = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, {
//     method: 'POST',
//     body: formData
//   });
//   return response.json();
// };

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });
  return response.json();
};

export const updateStudentProfilePhoto = async (imageUrl) => {
  const response = await fetch(`${API_URL}/users/update-profile-photo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ imageUrl })
  });
  return response.json();
};

export const updateProfilePhoto = async (imageUrl, userId, isStudent = true) => {
  const endpoint = isStudent ? '/users/update-profile-photo' : '/faculty/update-profile-photo';
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ imageUrl, userId })
  });
  return response.json();
};

export const uploadFacultyPhoto = async (imageFile, facultyId) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('facultyId', facultyId);

  const response = await fetch(`${API_URL}/faculty/upload-profile-photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return response.json();
};

export const uploadStudentPhoto = async (imageFile, userId) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('userId', userId);

  const response = await fetch(`${API_URL}/users/upload-profile-photo`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });
  return response.json();
};
