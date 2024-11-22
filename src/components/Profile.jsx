import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-10">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photoUrl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h1 className="mt-4 text-2xl font-bold text-white">
            {`${user?.firstName} ${user?.lastName}`}
          </h1>
          <p className="text-gray-400 text-sm mt-1 italic">{user?.about}</p>
        </div>

        {/* User Details Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-sm font-medium">Email</span>
            <span className="text-gray-300">{user?.emailId}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-sm font-medium">Age</span>
            <span className="text-gray-300">{user?.age}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-sm font-medium">Gender</span>
            <span className="text-gray-300 capitalize">{user?.gender}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400 text-sm font-medium">
              Member Since
            </span>
            <span className="text-gray-300">
              {new Date(user?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-gray-400 text-sm font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {user?.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-700 text-blue-200 text-xs font-medium px-3 py-1 rounded-full shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
