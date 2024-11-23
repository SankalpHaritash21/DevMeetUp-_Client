import { useEffect } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "../items/userCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { feed, loading, error } = useFeed();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl font-bold text-blue-400">Loading...</p>
      </div>
    );
  }

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
