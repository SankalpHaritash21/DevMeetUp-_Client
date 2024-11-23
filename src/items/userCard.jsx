import { motion } from "framer-motion";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      // Swiped right
      handleSendRequest("interested", user?._id);
    } else if (info.offset.x < -100) {
      // Swiped left
      handleSendRequest("ignored", user?._id);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-full max-w-md relative"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="w-16 h-14 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
          {user?.about && (
            <p className="text-sm text-gray-400 italic">{user.about}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">Age: {user?.age}</p>
          <p className="text-sm text-gray-500 capitalize">
            Gender: {user?.gender}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-400 text-sm font-semibold">Skills:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(user?.skills) && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-400 text-blue-200 text-xs px-3 py-1 rounded-full shadow-md"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 italic">No skills listed</span>
          )}
        </div>
      </div>
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
    </motion.div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default UserCard;
