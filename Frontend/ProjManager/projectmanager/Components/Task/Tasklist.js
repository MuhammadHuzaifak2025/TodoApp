"use client";
import React, { useState, useEffect } from "react";
import Details from "./Details";

const Tasklist = ({
  setTaskUpdated,
  taskid,
  TaskName,
  Status,
  Description,
  setlistSpread,
  listSpread,
  Due_Date,
  EstimationDate
}) => {
  const [randomColor, setRandomColor] = useState("#");

  useEffect(() => {
    const generateRandomColor = () => {
      let color = "#";
      color += Math.floor(Math.random() * 16777215).toString(16);
      return color;
    };
    setRandomColor(generateRandomColor());
  }, []);

  const [TempView, SetTemView] = useState(listSpread);
  const Spread = () => {
    setlistSpread(false);
    SetTemView(false);
  };

  const isHidden = Serial && TaskName && Status;
  if (TaskName) {
    var element = "";
    const Original_name = TaskName; // Original Task Name Var to Reuse Later

    if (TaskName.length > 15) {
      for (let index = 0; index < 15; index++) {
        element += TaskName[index];
      }
      element += "...";
    } else {
      element = Original_name;
    }
  }

  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

  return (
    <>
      <div
        className={`${!listSpread ? "hidden" : "mb-3 w-full"} ${
          isGrabbing ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div
          className={`w-full border-4 space-x-14 rounded-xl mt`}
          style={{ borderColor: randomColor }}
        >
          <div
            className={`${
              !listSpread
                ? "h-full font-bold text-center"
                : "flex h-10 items-center ml-4 font-bold text-center justify-between"
            }`}
          >
            <h1 className={`${!listSpread ? "hidden" : "flex"}`}>
              Task Name : {element}
            </h1>
            <div>
              <button
                onClick={Spread}
                className={`${!listSpread ? "hidden" : "mr-5"}`}
              >
                Show Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${TempView ? "hidden" : "block"}`}>
        <Details
          TaskName={TaskName}
          Status={Status}
          Serial={taskid}
          Description={Description}
          setlistSpread={SetTemView}
          listSpread={TempView}
          AllViewHandler={setlistSpread}
          Color={randomColor}
          setTaskUpdated={setTaskUpdated}
        />
      </div>
    </>
  );
};

export default Tasklist;
