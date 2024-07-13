"use client";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";

const Taskheader = () => {
  const [Working, SetWorking] = useState(true);
  const [Break, SetBreak] = useState(false);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: Working && !Break });

  const StartedWorking = () => {
    SetWorking(false);
    reset();
  };

  const CallItDay = () => {
    SetWorking(true);
  };

  const TakingBreak = () => {
    if (Break === true) {
      SetBreak(false);
      start();
    } else {
      SetBreak(true);
      pause();
    }
  };

  return (
    <div className="mt-8 flex justify-between justify-items-center pb-8">
      <div>
        <h1 className="text-xl font-bold">Manage Tasks</h1>
      </div>
      <div className="font-semibold text-xl flex items-center text-center">
        <button
          className={`${
            !Working
              ? "hidden"
              : "mr-3 border-2 border-[#3d91fb] pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#3d91fb] "
          }`}
          onClick={StartedWorking}
        >
          Start Working
        </button>
        <div>
          <div
            className={`${
              !Working ? "w-fit mr-5 flex items-center" : "hidden"
            } `}
          >
            <div className="flex pr-3">
              <p className={`${Break ? "pr-2" : "hidden"}`}>On Break: </p>
              <p className={`${Break ? "hidden" : "pr-2"}`}>Working For: </p>
              <p className={`${hours > 0 ? "" : "hidden"} `}>{hours} hrs : </p>
              <p className={`${minutes > 0 ? "" : "hidden"} `}>
                {minutes} mins :{" "}
              </p>
              <p className={`${hours > 0 ? "hidden" : ""} `}>
                {seconds} seconds
              </p>
            </div>
            <button
              className={`${
                !Break
                  ? "flex mr-3 border-2 border-[#ffea2d] pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#ffea2d94]"
                  : "hidden"
              }`}
              onClick={TakingBreak}
            >
              Take A Break
            </button>
            <button
              className={`${
                Break
                  ? "flex mr-3 border-2 border-[#52ff6f] pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#52ff6fcc]"
                  : "hidden"
              } `}
              onClick={TakingBreak}
            >
              Continue
            </button>
            <button
              className={`${
                !Working
                  ? "flex mr-3 border-2 border-[#c5416d] pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#c5416d]"
                  : "hidden"
              } `}
              onClick={CallItDay}
            >
              Call It A Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskheader;
