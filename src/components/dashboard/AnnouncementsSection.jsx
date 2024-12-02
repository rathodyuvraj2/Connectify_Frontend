import React from 'react';
import { Bell } from 'lucide-react';

const AnnouncementsSection = ({ announcements }) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Bell className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Announcements</h2>
      </div>
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-800">{announcement.text}</p>
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              <span>Posted by: {announcement.postedBy?.fullName || 'System'}</span>
              <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <p className="text-gray-600 text-center py-4">No announcements yet</p>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsSection;
