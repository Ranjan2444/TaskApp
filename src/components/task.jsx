import React from "react";

const Task = ( {task, moveTask} ) => {
  return (
    <div className="container mx-auto justify-between items-center px-4">
      <div className="bg-yellow-200 rounded-lg py-4">
        <h3 className="flex justify-center m-2 font-semibold">{task.name}</h3>
        <p className="flex justify-center text-gray-500 m-2">Deadline : {task.deadline}</p>
        <div className="flex justify-between">
        {task.status != "open" && (
        <button className="bg-gray-300 text-white-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition" onClick={() => moveTask(task.id,"backward")}>Back</button>
      ) }
      {task.status != "completed" && (
        <button className="bg-gray-300 text-white-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"onClick={() => moveTask(task.id,"forward")}>Next</button>
      )}
        </div>
        </div>
    </div>
  );
};

export default Task;
