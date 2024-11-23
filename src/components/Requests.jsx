import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../store/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const requests = useSelector((store) => store.request) || []; // Default to an empty array

  const fetchPendingRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log("API Response:", res.data.data); // Debugging
      if (res) {
        dispatch(addRequest(res.data.data || [])); // Dispatch data
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      //      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Pending Requests</h2>
      {requests?.length === 0 ? (
        <div className="text-gray-500 text-lg">No pending requests.</div>
      ) : (
        <ul className="space-y-4">
          {requests?.map((request) => (
            <li
              key={request?._id || Math.random()}
              className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={
                  request?.fromUserId?.photoUrl ||
                  "https://via.placeholder.com/100"
                }
                alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {request?.fromUserId?.firstName}{" "}
                  {request?.fromUserId?.lastName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {request?.fromUserId?.about || "No details provided"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
                  onClick={() => handleSendRequest("accepted", request?._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
                  onClick={() => handleSendRequest("rejected", request?._id)}
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;
