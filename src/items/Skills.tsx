import React from "react";
import { IoMdClose } from "react-icons/io";

const Skills = ({ skills, onAddSkill, onRemoveSkill }) => {
  // Local function to handle the addition of a new skill
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      onAddSkill(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="block text-white text-sm font-bold mb-2">Skills</label>
      {/* Input Field for Adding Skills */}
      <div className="flex items-center border border-gray-300 rounded px-2 py-2">
        <input
          type="text"
          onKeyDown={handleAddSkill}
          placeholder="Press Enter to add skills"
          className="flex-grow focus:outline-none"
        />
      </div>

      {/* Tags Displayed Below the Input Field */}
      <div className="flex flex-wrap mt-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-2 flex items-center"
          >
            {skill}
            <button
              type="button"
              className="ml-1 text-white font-bold"
              onClick={() => onRemoveSkill(skill)}
            >
              <IoMdClose />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
