import React from "react";
import Task from "./task";
import { useDrop } from "react-dnd";

const TaskList = ({ title, tasks, moveTask, status,removeTask }) => {

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      // console.log("Dropped task with id:", item.id);
      // console.log("Current task status:", item.status);
      // console.log("Target status:", status);
      // Ensure tasks are not dropped back into "Open" unless it's already open
      if (status !== "open" || item.status !== "open") {
        moveTask(item.id, status);  // Call moveTask to update the status
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  


  return (
    <div
    ref={drop}
    className={`border-2 p-4 lg:w-3xl sm:w-3xs rounded-md transition-all ${
      isOver ? "bg-blue-200 border-blue-500" : "border-gray-300"
    }`}
    style={{ minHeight: "200px" }}
  >
    {/* <div className={`p-4 rounded-md ${columnColors[title]} rounded-xs shadow-xl lg:w-3xl sm:w-3xs`}> */}
      <h2 className="underline decoration-green-500 text-xl font-white mb-3 text-center">{title}</h2>
      <div className="space-y-4">
      {tasks.length > 0 ? (
          tasks.map((task) => <Task key={task.id} task={task} moveTask={moveTask} removeTask= {removeTask} />)
        ) : (
          <p className="text-gray-400 text-center">No tasks</p>
        )}  
      </div>
    {/* </div> */}
    </div>
  );
};

export default TaskList;
