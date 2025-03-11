import React, { useState } from "react";
import TaskList from "./tasklist";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = () => {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const statusOrder = ["open", "inProgress", "review", "completed"];
  const[taskDeadline, setTaskDeadline] = useState("");


  const addTask = () => {
    if (taskName.trim() === "") return; 
    const newTask = {
      id: Date.now(),
      name: taskName,
      deadline: taskDeadline,
      status: "open"
    }
    setTasks([...tasks,newTask]);
    setTaskName("");
    setTaskDeadline("");
  }

  const moveTask = (taskId, newStatus) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) => {
      // Prevent moving tasks back to "Open"
      if (task.id === taskId && newStatus === "open" && task.status !== "open") {
        return task;  // Don't update if trying to move to "Open"
      }

      return task.id === taskId ? { ...task, status: newStatus } : task;
    })
  );
};

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Task section */}
      <div className="flex justify-center mb-4 gap-1">
        <input
          type="text"
          className="border p-2 w-1/3 rounded-md"
          placeholder="Enter a new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-1/3 rounded-md max-w-3xs"
          placeholder="Enter Deadline"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
        />
        <button className="ml-2 bg-green-600 text-white px-4 py-2 rounded-md "
         onClick={addTask}>
          Add Task
        </button>
      </div>
      <div>
      <h1 className="text-green-600 flex justify-center text-2xl font-bold">Task Status Board</h1>
      
      {/* Task list */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
        <TaskList title="Open" tasks={tasks.filter(task => task.status == "open")} moveTask= {moveTask} status= "open"/>
        <TaskList title="Inprogress" tasks={tasks.filter(task => task.status == "inProgress")} moveTask= {moveTask} status= "inProgress"/>
        <TaskList title="Review" tasks={tasks.filter(task => task.status == "review")} moveTask= {moveTask} status= "review"/>
        <TaskList title="Completed" tasks={tasks.filter(task => task.status == "completed")} moveTask= {moveTask} status= "completed"/>
      </div>
      </div>
      
    </div>
  );
};

export default Board;
