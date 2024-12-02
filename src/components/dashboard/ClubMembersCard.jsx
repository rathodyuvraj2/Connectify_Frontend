import React from 'react';

const ClubMembersCard = ({ members }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Club Members</h2>
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">{member.fullName}</h3>
              <p className="text-sm text-gray-500">{member.studentId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubMembersCard;
