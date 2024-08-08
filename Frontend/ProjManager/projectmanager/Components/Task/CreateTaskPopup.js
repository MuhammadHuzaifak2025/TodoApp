"use client";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import CreateTask from "./CreateTask";

const CreateTaskPopup = ({ onTaskCreated }) => {
  return (
    <Popup
      trigger={
        <button className="items-center text-2xl font-bold hover:underline decoration-wavy text-[#3d91fb] decoration-[#ffffff] hover:decoration-[#3d91fb] hover:text-[#ffffff]">
          Create A Task
        </button>
      }
      modal
      closeOnDocumentClick
    >
      <CreateTask
        onTaskCreated={onTaskCreated}
        
      />
    </Popup>
  );
};

export default CreateTaskPopup;
