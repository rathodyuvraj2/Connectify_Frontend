import React from 'react';
import { Phone, Video, Search, MoreVertical, Users } from 'lucide-react';

const ChatHeader = ({ 
  chatType, 
  selectedChat, 
  onlineUsers,
  getInitials 
}) => {
  return (
    <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
          ${chatType === 'group' ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}>
          {chatType === 'group' ?
            <Users size={20} /> :
            getInitials(selectedChat.fullName)}
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-gray-900">
            {chatType === 'group' ? selectedChat.name : selectedChat.fullName}
          </h3>
          {chatType === 'direct' && (
            <span className={`text-sm ${onlineUsers.has(selectedChat._id) ? 'text-green-500' : 'text-gray-500'}`}>
              {onlineUsers.has(selectedChat._id) ? 'Online' : 'Offline'}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {chatType === 'direct' && (
          <>
            <button className="text-gray-600 hover:text-gray-800">
              <Phone size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <Video size={20} />
            </button>
          </>
        )}
        <button className="text-gray-600 hover:text-gray-800">
          <Search size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
