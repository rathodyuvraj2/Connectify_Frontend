import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Code, Award, BookOpen, Github, Globe, Calendar, 
  ExternalLink, Users, Search 
} from 'lucide-react';
import { getUserDetails, fetchUsers } from '../services/api';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUserData(userId);
    fetchAllUsers();
  }, [userId]);

  const fetchUserData = async (id) => {
    try {
      const response = await getUserDetails(id);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setAllUsers(response.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = allUsers.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={userData.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userData.fullName}</h1>
                <p className="text-blue-600 font-semibold">
                  {userData.studentId ? `${userData.studentId} • ${userData.semester}th Semester` : userData.employeeId}
                </p>
                <p className="text-gray-600">{userData.department}</p>
                {userData.role === 'student' && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      CGPA: {userData.cgpa}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                    </span>
                    {userData.isClubLead && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Club Lead
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Info for Students */}
        {userData.role === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Marks Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Academic Performance</h2>
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
                        <td className="text-center">{mark.internalExam1}/20</td>
                        <td className="text-center">{mark.internalExam2}/20</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Skills & Achievements */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Code className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Technical Skills</h2>
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
                  <h2 className="text-xl font-bold text-gray-800">Achievements</h2>
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
          </div>
        )}

        {/* Projects Section */}
        {userData.role === 'student' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.projects?.map((project) => (
                <div
                  key={project._id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{project.title}</h3>
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
                    {/* {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        View Code
                      </a>
                    )} */}
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
        )}

        {/* Certifications Section */}
        {userData.role === 'student' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Award className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.certifications?.map((cert) => (
                <div
                  key={cert._id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{cert.name}</h3>
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
        )}
      </div>

      {/* Users Sidebar */}
      {/* <div className="w-80 mt-8 mr-8 rounded-md bg-white border-l border-gray-200 p-4">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold">Users</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => fetchUserData(user._id)}
              className={`w-full text-left p-3 rounded-lg transition-colors
                ${user._id === userId ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
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
      </div> */}

              {/* Users Sidebar */}
              <div className="w-96 mr-8 mt-8 rounded-md bg-white border-l border-gray-200 p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
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
          <div className="space-y-2 walc(100vh-200px)]">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => fetchUserData(user._id)}
              className={`w-full text-left p-3 rounded-lg transition-colors
                ${user._id === userId ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
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
    </div>
  );
};

export default UserProfile;
