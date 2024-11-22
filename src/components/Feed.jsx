import axios from "axios";
import UserCard from "../items/userCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addFeed } from "../store/feedSlice";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed.length > 0) return;
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {
      setError("Failed to fetch feed data. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-center text-4xl font-extrabold mb-8 text-blue-400">
        User Feed
      </h1>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mb-6 text-lg font-medium">
          {error}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-8">
        {feed.length > 0 ? (
          feed.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 rounded-xl shadow-xl w-full max-w-xs p-6 space-y-4 hover:bg-gray-700 transition-all duration-300"
            >
              <UserCard key={user._id} user={user} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-xl text-center mt-8">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
