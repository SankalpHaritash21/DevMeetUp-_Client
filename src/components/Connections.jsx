import useConnections from "../hooks/useConnections";

const Connections = () => {
  const { connections, loading, error } = useConnections();

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Connections</h2>
      {connections.length === 0 ? (
        <div className="text-gray-500 text-lg text-center">
          You have no connections yet.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((user) => (
            <li
              key={user._id} // Assuming `_id` is the unique identifier
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* User Profile Picture */}
              <img
                src={user.photoUrl || "https://via.placeholder.com/100"}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mb-4"
              />

              {/* User Info */}
              <h3 className="text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{user.about}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {user.skills?.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {user.skills?.length > 4 && (
                  <span className="text-sm text-gray-500">+ more</span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg">
                  Message
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg">
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
