import React, { useState, useRef, useEffect } from "react";

const options = [
  "Select Action",
  "Highest Priority",
  "Lowest Priority",
  "Create A Task",
  "Delete All Task",
];
const defaultOption = options[0];

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex pt-4 items-center">
      <h1 className="pr-8 font-bold text-xl">Actions</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="bg-black text-white p-2 rounded-md border"
        >
          {selectedOption}
        </button>
        {isOpen && (
          <ul className="absolute bottom-full mb-2 bg-black text-white rounded-md w-full">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-2 hover:bg-gray-700 cursor-pointer w-fit"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className=" ml-3 border-2 border-[#3d91fb] pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#3d91fb]">
        Submit
      </button>
    </div>
  );
};

export default Filter;
