import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Skills from "../items/Skills"; // Import the Skills component

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState([]); // Skills array
  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("Test@1234");
  const [emailId, setEmail] = useState("Test1@gmail.com");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateName = (name) =>
    name.trim().length >= 2 &&
    name.trim().length <= 50 &&
    /^[a-zA-Z\s-]+$/.test(name);
  const validatePassword = (password) => password.length >= 6;

  const handleSignUp = async () => {
    try {
      if (!firstName || !lastName || !emailId || !password || !gender) {
        setError("Please fill in all fields.");
        return;
      }

      if (!validateEmail(emailId)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!validateName(firstName) || !validateName(lastName)) {
        setError(
          "First and last names must be between 2-50 characters and contain only alphabetic characters, spaces, or hyphens."
        );
        return;
      }

      if (!validatePassword(password)) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (skills.length === 0) {
        setError("Please add at least one skill.");
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
          age: parseInt(age, 10),
          gender,
          skills,
        },
        { withCredentials: true }
      );
      setSuccess(true);
      console.log(res.data);
      dispatch(addUser(res.data));
      clearFields();
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Sign Up failed.");
    }
  };

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(emailId)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      setSuccess(true);
      clearFields();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAge(0);
    setGender("");
    setSkills([]); // Clear skills
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleLogin();
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
    clearFields();
  };

  const handleAddSkill = (newSkill) => {
    if (!skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-96 p-6 shadow-lg bg-gray-800 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            {isSignUp ? "Sign Up successful!" : "Login successful!"}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-gray-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block text-gray-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="age" className="block text-gray-400 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  placeholder="Enter your age"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-400 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Skills Component */}
              <div className="mb-4">
                <Skills
                  skills={skills}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-11 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-400 hover:underline"
          >
            {isSignUp
              ? "Already have an account? Login here"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
