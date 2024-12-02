import React from 'react';

const ClubEventsCard = ({ events }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Club Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800">{event.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubEventsCard;
