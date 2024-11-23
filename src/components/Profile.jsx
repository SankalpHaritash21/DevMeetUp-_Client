import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { BsPencil } from "react-icons/bs"; // Pencil icon

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [uploading, setUploading] = useState(false);
  const [image, setImg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle file upload
  const onFileChange = async (e) => {
    const file = e.target.files[0]; // Get selected file
    if (!file) return;

    try {
      setUploading(true);

      // Create FormData to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);

      // Send the image file to your backend
      const backendResponse = await axios.post(
        `${BASE_URL}/profile/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set proper headers
          },
          withCredentials: true, // Ensure cookies are sent for authentication
        }
      );

      const updatedUser = backendResponse.data;
      console.log("Backend response:", updatedUser);

      // Update local state
      setImg(updatedUser.photoUrl); // Update the image in local state
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-10 sm:px-6 md:px-8">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center relative">
          {/* Profile Image with hover zoom effect */}
          <img
            src={image || user?.photoUrl || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-blue-500 shadow-md mb-4 transform transition-all duration-300 ease-in-out hover:scale-110"
          />

          {/* Pencil icon at the top right corner of the image */}
          <BsPencil
            className="absolute top-0 right-0 text-white bg-blue-500 p-2 rounded-full cursor-pointer"
            onClick={openModal} // Opens modal on click
          />

          {/* Modal for uploading new image */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-80 sm:w-96 shadow-lg transform scale-95 hover:scale-100">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
                  Upload New Profile Picture
                </h2>

                {/* File input */}
                <input
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={onFileChange} // Call onFileChange when a file is selected
                  className="block w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-700 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {uploading && (
                  <p className="text-blue-400 mt-2 animate-pulse text-center">
                    Uploading...
                  </p>
                )}

                {/* Buttons */}
                <div className="flex justify-center">
                  <button
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                    onClick={closeModal} // Close modal on button click
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <h1 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center">
            {`${user?.firstName} ${user?.lastName}`}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1 italic text-center">
            {user?.about}
          </p>
        </div>

        {/* User Details Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-xs sm:text-sm font-medium">
              Email
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">
              {user?.emailId}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-xs sm:text-sm font-medium">
              Age
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">
              {user?.age}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-700 py-2">
            <span className="text-gray-400 text-xs sm:text-sm font-medium">
              Gender
            </span>
            <span className="text-gray-300 text-xs sm:text-sm capitalize">
              {user?.gender}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400 text-xs sm:text-sm font-medium">
              Member Since
            </span>
            <span className="text-gray-300 text-xs sm:text-sm">
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
