import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";
import { BASE_URL } from "../utils/constants";

const useRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data || []));
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setError(err.message || "Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(userId)); // Update the Redux state
    } catch (err) {
      console.error("Error handling request action:", err);
      setError(err.message || "Failed to process request.");
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return { requests, loading, error, handleRequestAction };
};

export default useRequests;
