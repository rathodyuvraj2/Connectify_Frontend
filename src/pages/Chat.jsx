import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageInput from '../components/chat/MessageInput';
import { getInitials, getMessageDate, groupMessagesByDate } from '../utils/chatUtils';
import {fetchUsers, fetchGroups, getAnnouncements} from '../services/api';
import { Bell } from 'react-feather';
import { X } from 'lucide-react';

const Chat = () => {
  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const isClubLead = storedUser?.isClubLead || false;
  const userId = storedUser?.id;
  const isProctor = storedUser?.role === 'professor' && storedUser?.isProctor;

  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [chatType, setChatType] = useState('direct');
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getAllAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    getAllAnnouncements();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getConversationId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('-');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetchUsers();
        const usersData = await usersResponse;
        setAllUsers(usersData.users);
        setUsers(usersData.users.filter((u) => u._id !== userId));

        const groupsResponse = await fetchGroups();
        const groupsData = await groupsResponse;
        setGroups(groupsData.groups);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_API_URL}`);
    socketRef.current.emit('join', { userId });

    socketRef.current.on('onlineUsers', (users) => {
      setOnlineUsers(new Set(users));
    });

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => {
        const conversationId = getConversationId(message.senderId, message.receiverId);
        return {
          ...prevMessages,
          [conversationId]: [...(prevMessages[conversationId] || []), message],
        };
      });
      scrollToBottom();
    });

    socketRef.current.on('groupMessage', (message) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.groupId]: [...(prevMessages[message.groupId] || []), message],
      }));
      scrollToBottom();
    });

    socketRef.current.on('previousMessages', ({ conversationId, messages: prevMessages }) => {
      setMessages((prev) => ({
        ...prev,
        [conversationId]: prevMessages,
      }));
      scrollToBottom();
    });

    socketRef.current.on('previousGroupMessages', ({ groupId, messages: prevMessages }) => {
      setMessages((prev) => ({
        ...prev,
        [groupId]: prevMessages,
      }));
      scrollToBottom();
    });

    socketRef.current.on('groupCreated', (newGroup) => {
      setGroups((prevGroups) => [...prevGroups, newGroup]);
    });

    return () => socketRef.current.disconnect();
  }, [userId]);

  useEffect(() => {
    if (selectedChat) {
      if (chatType === 'direct') {
        const conversationId = getConversationId(userId, selectedChat._id);
        socketRef.current.emit('joinConversation', { conversationId });
        socketRef.current.emit('fetchMessages', { conversationId });
      } else {
        socketRef.current.emit('joinGroup', { groupId: selectedChat._id });
        socketRef.current.emit('fetchGroupMessages', { groupId: selectedChat._id });
      }
    }
  }, [selectedChat, chatType, userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      if (chatType === 'group' && !isClubLead) {
        alert('Only club leads can send messages in groups');
        return;
      }

      if (chatType === 'direct') {
        const conversationId = getConversationId(userId, selectedChat._id);
        const messageData = {
          senderId: userId,
          receiverId: selectedChat._id,
          text: newMessage,
          conversationId,
          timestamp: new Date(),
        };
        socketRef.current.emit('sendMessage', messageData);
      } else {
        const messageData = {
          senderId: userId,
          groupId: selectedChat._id,
          text: newMessage,
          timestamp: new Date(),
        };
        socketRef.current.emit('sendGroupMessage', messageData);
      }
      setNewMessage('');
    }
  };

  const createGroup = async () => {
    if (newGroupName.trim() && selectedMembers.length > 0) {
      socketRef.current.emit('createGroup', {
        groupName: newGroupName,
        userId: userId,
        members: [...selectedMembers, userId],
      });
      setShowCreateGroup(false);
      setNewGroupName('');
      setSelectedMembers([]);
    }
  };

  const getCurrentMessages = () => {
    if (!selectedChat) return [];
    const id = chatType === 'direct'
      ? getConversationId(userId, selectedChat._id)
      : selectedChat._id;
    return messages[id] || [];
  };

  const filteredChats = [
    ...users,
    ...groups.filter(group => group.members.includes(userId))
  ].filter(chat =>
    chat.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar 
        isClubLead={isClubLead}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowCreateGroup={setShowCreateGroup}
        filteredChats={filteredChats}
        setSelectedChat={setSelectedChat}
        setChatType={setChatType}
        selectedChat={selectedChat}
        onlineUsers={onlineUsers}
        getInitials={getInitials}
      />

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader 
              chatType={chatType}
              selectedChat={selectedChat}
              onlineUsers={onlineUsers}
              getInitials={getInitials}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4">
              {Object.entries(groupMessagesByDate(getCurrentMessages())).map(([date, dateMessages]) => (
                <div key={date}>
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                      {date}
                    </div>
                  </div>
                  {dateMessages.map((message, index) => {
                    const isOwnMessage = message.senderId._id 
                      ? message.senderId._id === userId 
                      : message.senderId === userId;

                    const sender = allUsers.find(u => 
                      u._id === (message.senderId._id || message.senderId)
                    );

                    return (
                      <div
                        key={message._id || index}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`relative px-4 py-2 rounded-lg shadow-sm
                              ${isOwnMessage 
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-white text-gray-800 rounded-bl-none'}`}
                          >
                            {chatType === 'group' && !isOwnMessage && (
                              <p className="text-xs font-medium mb-1 text-gray-500">
                                {sender?.fullName || 'Unknown User'}
                              </p>
                            )}
                            <p className="text-sm">{message.text}</p>
                            <span className={`text-xs mt-1 block
                              ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                              {format(new Date(message.timestamp.$date || message.timestamp), 'h:mm a')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <MessageInput 
              isClubLead={isClubLead}
              chatType={chatType}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
            />
          </>
        ) : (
          // Empty state when no chat is selected
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Create New Group</h2>
              <button
                onClick={() => setShowCreateGroup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select members:</h3>
              <div className="max-h-48 overflow-y-auto">
                {users.map((user) => (
                  <label key={user._id} className="flex items-center p-2 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(user._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, user._id]);
                        } else {
                          setSelectedMembers(selectedMembers.filter(id => id !== user._id));
                        }
                      }}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <span className="ml-2">{user.fullName}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createGroup}
                disabled={!newGroupName.trim() || selectedMembers.length === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;