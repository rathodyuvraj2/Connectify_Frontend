import React from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({
  isClubLead,
  chatType,
  newMessage,
  setNewMessage,
  sendMessage
}) => {
  return (
    <div className="h-24 border-t border-gray-200 px-4 py-3 bg-white">
      <form onSubmit={sendMessage} className="h-full flex flex-col">
        {(isClubLead && chatType === "group") || (chatType === "direct") ? (
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!newMessage.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Only ClubLead can send Messages</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
