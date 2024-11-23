import useRequests from "../hooks/useRequest";

const Requests = () => {
  const { requests, loading, error, handleRequestAction } = useRequests();

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">{error}</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Pending Requests</h2>
      {requests?.length === 0 ? (
        <div className="text-gray-500 text-lg">No pending requests.</div>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request._id}
              className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={
                  request.fromUserId?.photoUrl ||
                  "https://via.placeholder.com/100"
                }
                alt={`${request.fromUserId?.firstName} ${request.fromUserId?.lastName}`}
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {request.fromUserId?.about || "No details provided"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium"
                  onClick={() => handleRequestAction("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium"
                  onClick={() => handleRequestAction("rejected", request._id)}
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
