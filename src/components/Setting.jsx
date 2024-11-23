import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/userSlice";
import SelfCard from "../items/selfCard";
import Loading from "../items/Loading";

const Setting = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    age: "",
    gender: "male",
    about: "",
    skills: [],
    newSkill: "",
  });

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // If user is not available in Redux, check localStorage
    if (!user) {
      const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage) {
        dispatch(addUser(userFromLocalStorage));
        setUserData({
          firstName: userFromLocalStorage.firstName,
          lastName: userFromLocalStorage.lastName,
          photoUrl: userFromLocalStorage.photoUrl,
          age: userFromLocalStorage.age,
          gender: userFromLocalStorage.gender,
          about: userFromLocalStorage.about,
          skills: userFromLocalStorage.skills,
          newSkill: "",
        });
      }
    } else {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        age: user.age,
        gender: user.gender,
        about: user.about,
        skills: user.skills,
        newSkill: "",
      });
    }
  }, [user, dispatch]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle skill deletion (update local state only)
  const handleDeleteSkill = (index) => {
    setUserData((prevData) => {
      const newSkills = [...prevData.skills];
      newSkills.splice(index, 1);
      return { ...prevData, skills: newSkills };
    });
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    const { newSkill, skills } = userData;
    if (!newSkill.trim()) return;

    setUserData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, newSkill.trim()],
      newSkill: "", // Clear the input after adding the skill
    }));
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/edit`,
        {
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          photoUrl: userData.photoUrl || "",
          age: userData.age || "",
          gender: userData.gender || "",
          about: userData.about || "",
          skills: userData.skills || [],
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data.data)); // Update the Redux store
      localStorage.setItem("user", JSON.stringify(response.data.data)); // Update localStorage
      setShowToast(true); // Show toast
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save changes.");
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-8">
      {/* User Card */}
      <SelfCard user={userData} />

      {/* Profile Edit Form */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Edit Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photoUrl"
              name="photoUrl"
              value={userData.photoUrl}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* About */}
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              About
            </label>
            <textarea
              id="about"
              name="about"
              value={userData.about}
              onChange={handleChange}
              rows="4"
              className="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Skills
            </label>

            <div className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                id="newSkill"
                name="newSkill"
                value={userData.newSkill || ""}
                onChange={(e) =>
                  setUserData({ ...userData, newSkill: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md"
              >
                Add Skill
              </button>
            </div>

            {/* Display Skills */}
            <div className="flex gap-x-5">
              {userData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-300 px-4 py-2 rounded-xl gap-x-5"
                >
                  <span className="text-gray-700">{skill}</span>
                  <FaTimes
                    onClick={() => handleDeleteSkill(index)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Error and Toast */}
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          {showToast && (
            <div className="text-green-600 text-center text-sm">
              Profile updated successfully!
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;
