import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionSlice";
import { BASE_URL } from "../utils/constants";

const useConnections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnectedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data || [])); // Dispatch data to Redux
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError(err.message || "Failed to fetch connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  return { connections, loading, error };
};

export default useConnections;
