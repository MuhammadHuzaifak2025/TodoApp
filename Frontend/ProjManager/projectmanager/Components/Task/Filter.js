import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import CreateTask from "./CreateTask";

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
  const [createtask, setcreatetask] = useState(false);
  const [Submit, setSubmit] = useState(false);
  
  const fnSubmit = () => {
    setSubmit(true);
  };

  useEffect(() => {
    if (selectedOption === "Create A Task" ) {
      setcreatetask(true);
      console.log("Create A Task");
    }
  }, [selectedOption]);

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

  const closePopup = () => {
    setcreatetask(false);
    setSelectedOption(defaultOption); // Reset the selected option after closing
  };

  return (
    <>
      <Popup open={createtask} onClose={closePopup} modal closeOnDocumentClick>
        <CreateTask onTaskCreated={closePopup} />
      </Popup>
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
      </div>
    </>
  );
};

export default Filter;
