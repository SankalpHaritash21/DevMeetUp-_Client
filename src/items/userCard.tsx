import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      // dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-full max-w-md relative group">
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-14 rounded-full border-2 border-blue-500"
        />
        {/* User Info */}
        <div className="relative">
          <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-sm text-gray-400 italic">{user.about}</p>
          <p className="text-sm text-gray-500 mt-1">Age: {user.age}</p>
          <p className="text-sm text-gray-500 capitalize">
            Gender: {user.gender}
          </p>

          {/* User Name on Hover */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center h-5 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-60 rounded-lg">
            <span className="text-white text-xs font-bold">{`${user.firstName} ${user.lastName}`}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <h3 className="text-gray-400 text-sm font-semibold">Skills:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-400 text-blue-200 text-xs px-3 py-1 rounded-full shadow-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          className="btn btn-primary"
          onClick={() => handleSendRequest("ignored", user?._id)}
        >
          Ignore
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleSendRequest("interested", user?._id)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
