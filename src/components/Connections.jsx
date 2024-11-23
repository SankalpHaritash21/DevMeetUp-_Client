import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConnectedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data); // Check structure of API response
      setConnections(
        Array.isArray(res.data) ? res.data : res.data.connections || []
      ); // Ensure array
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Connections</h2>
      {connections.length === 0 ? (
        <div className="text-gray-500">You have no connections yet.</div>
      ) : (
        <ul className="space-y-4">
          {connections.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow"
            >
              <img
                src={user.profilePicture || "https://via.placeholder.com/50"}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Connections;
