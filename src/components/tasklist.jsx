import React from "react";
import Task from "./task";

const TaskList = ({ title, tasks, moveTask }) => {

  const columnColors = {
    // Open : "bg-yellow-200",
    // Inprogress : "bg-yellow-200",
    // Review : "bg-yellow-200",
    // Completed : "bg-green-400",
  };


  return (
    <div className={`p-4 rounded-md ${columnColors[title]} rounded-xs shadow-xl lg:w-3xl sm:w-3xs`}>
      <h2 className="underline decoration-green-500 text-xl font-white mb-3 text-center">{title}</h2>
      <div className="space-y-4">
      {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} moveTask={moveTask} />)
        ) : (
          <p className="text-gray-400 text-center">No tasks</p>
        )}  
      </div>
    </div>
  );
};

export default TaskList;
