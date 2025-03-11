import React from "react";
import { useDrag } from "react-dnd";

const Task = ( {task, moveTask} ) => {
    console.log(task.status)
    const [{ isDragging }, drag] = useDrag({
      type: "TASK", // This is the identifier for the draggable item
      item: { id: task.id, status: task.status }, // Data we pass when dragging
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
  return (
    <div className="container mx-auto justify-between items-center px-4">
      <div
      ref={drag} // Enable dragging
      className={`container mx-auto justify-between items-center px-4 cursor-grab${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="bg-yellow-200 rounded-lg py-4">
        <h3 className="flex justify-center m-2 font-semibold">{task.name}</h3>
        <p className="flex justify-center text-gray-500 m-2">Deadline : {task.deadline}</p>
        {/* <div className="flex justify-between">
        {task.status != "open" && (
        <button className="bg-gray-300 text-white-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition" onClick={() => moveTask(task.id,"backward")}>Back</button>
      ) }
      {task.status != "completed" && (
        <button className="bg-gray-300 text-white-600 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"onClick={() => moveTask(task.id,"forward")}>Next</button>
      )}
        </div> */}
        </div>
        </div>
    </div>
  );
};

export default Task;
