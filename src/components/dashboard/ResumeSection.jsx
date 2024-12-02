import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Download, Edit, Trash } from 'lucide-react';

const ResumeSection = ({ resumes }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your Resumes</h2>
        <Link
          to="/resume"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Resume
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <div key={resume._id} className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-gray-800">{resume.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{resume.description}</p>
            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                <Download className="h-4 w-4" />
              </button>
              <Link to={`/resume/edit/${resume._id}`} className="p-2 text-green-600 hover:bg-green-50 rounded">
                <Edit className="h-4 w-4" />
              </Link>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeSection;
