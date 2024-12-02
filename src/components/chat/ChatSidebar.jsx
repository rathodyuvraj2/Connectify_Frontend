import React from 'react';
import { Search, UserPlus, Users } from 'lucide-react';

const ChatSidebar = ({ 
  isClubLead, 
  searchQuery, 
  setSearchQuery, 
  setShowCreateGroup,
  filteredChats,
  setSelectedChat,
  setChatType,
  selectedChat,
  onlineUsers,
  getInitials 
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          {isClubLead && (
            <button
              onClick={() => setShowCreateGroup(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <UserPlus size={20} />
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const isGroup = 'name' in chat;
          return (
            <div
              key={chat._id}
              onClick={() => {
                setSelectedChat(chat);
                setChatType(isGroup ? 'group' : 'direct');
              }}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors
                ${selectedChat?._id === chat._id ? 'bg-blue-50' : ''}`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                  ${isGroup ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}>
                  {isGroup ? <Users size={20} /> : getInitials(chat.fullName)}
                </div>
                {!isGroup && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${onlineUsers.has(chat._id) ? 'bg-green-500' : 'bg-gray-400'}`} />
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    {isGroup ? chat.name : chat.fullName}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {isGroup ? `${chat.members?.length || 0} members` : 'Click to chat'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
