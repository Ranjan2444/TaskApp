import React from "react";
import { useDrag } from "react-dnd";
import { X } from "lucide-react"; // Import cross icon

const Task = ( {task, moveTask, removeTask} ) => {
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
      <div className="bg-yellow-200 rounded-lg py-4 relative">
        <X 
          className="absolute top-0 right-0 text-red-600 cursor-pointer hover:text-red-800 " 
          size={20} 
          onClick={() => removeTask(task.id)} 
        />
        <h3 className="flex justify-center m-2 font-semibold">{task.name}</h3>
        <p className="flex justify-center text-gray-500 m-2">Deadline : {task.deadline}</p>
        </div>
        </div>
    </div>
  );
};

export default Task;
