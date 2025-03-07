import React, { useState } from "react";
import TaskList from "./tasklist";

const Board = () => {

  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const statusOrder = ["open", "inProgress", "review", "completed"];


  const addTask = () => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      status: "open"
    }
    setTasks([...tasks,newTask]);
  }

  const moveTask = (taskId, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = statusOrder.indexOf(task.status);
          let newIndex = currentIndex;
  
          if (direction === "forward" && currentIndex < statusOrder.length - 1) {
            newIndex++;
          } 
        
          else if (direction === "backward" && currentIndex > 0) {
            newIndex--;
          }
  
          if (newIndex === currentIndex) return task;

          const updatedTask = { ...task, status: statusOrder[newIndex] };
  
          console.log(`Task "${updatedTask.name}" moved to: ${updatedTask.status}`);
  
          return updatedTask;
        }
        return task;
      })
    );
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Add Task section */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border p-2 w-1/3 rounded-md"
          placeholder="Enter a new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
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
        <TaskList title="Open" tasks={tasks.filter(task => task.status == "open")} moveTask= {moveTask} />
        <TaskList title="Inprogress" tasks={tasks.filter(task => task.status == "inProgress")} moveTask= {moveTask}/>
        <TaskList title="Review" tasks={tasks.filter(task => task.status == "review")} moveTask= {moveTask}/>
        <TaskList title="Completed" tasks={tasks.filter(task => task.status == "completed")} moveTask= {moveTask} />
      </div>
      </div>
    </div>
  );
};

export default Board;
