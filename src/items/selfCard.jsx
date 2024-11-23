import PropTypes from "prop-types";

const SelfCard = ({ user }) => {
  // Destructure user safely with default values
  const {
    firstName = "",
    lastName = "",
    age = "N/A",
    gender = "N/A",
    about = "No description provided.",
    skills = [],
    photoUrl = "",
  } = user || {};

  return (
    <div className="bg-gray-500 rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="w-full flex items-center justify-center">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-64 h-72 rounded-xl border-2 border-blue-500 bg-transparent"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {firstName} {lastName}
      </h2>
      <p className="text-gray-600 mb-2">
        <strong>Age:</strong> {age}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Gender:</strong> {gender}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>About:</strong> {about}
      </p>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-600 py-1 px-3 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

SelfCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default SelfCard;
