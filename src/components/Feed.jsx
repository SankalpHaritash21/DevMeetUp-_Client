import { useEffect } from "react";
import useFeed from "../hooks/useFeed";
import UserCard from "../items/userCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const { feed, loading, error } = useFeed();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!user && !storedUser) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.p
          className="text-xl font-bold text-blue-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  // Animation variants for staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Show cards one by one
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <motion.h1
        className="text-center text-4xl font-extrabold mb-8 text-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Feed
      </motion.h1>

      {/* Error Message */}
      {error && (
        <motion.p
          className="text-red-500 text-center mb-6 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {feed.length > 0 ? (
            feed.map((user) => (
              <motion.div
                key={user._id}
                className="bg-gray-800 rounded-xl shadow-xl w-full max-w-xs p-6 space-y-4 hover:bg-gray-700 transition-all duration-300"
                variants={cardVariants}
                exit="exit"
              >
                <UserCard key={user._id} user={user} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-400 text-xl text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No users found.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Feed;
