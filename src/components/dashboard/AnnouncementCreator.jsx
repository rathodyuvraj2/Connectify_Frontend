import React, { useState } from 'react';
import { createAnnouncement } from '../../services/api';

const AnnouncementCreator = () => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({ text });
      setText('');
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="Write your announcement..."
          rows="4"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementCreator;
