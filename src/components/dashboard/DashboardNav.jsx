import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MessageCircle, LogOut } from 'lucide-react';

const DashboardNav = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/chat')}>
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
