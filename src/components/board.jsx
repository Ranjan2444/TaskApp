import React, { useState, useEffect } from "react";
import TaskList from "./tasklist";
import { useNavigate } from "react-router-dom";
``
const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [removedTasks, setRemovedTasks] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user"))); // Retrieve user from localStorage

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDate = String(date).padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDate}`;
  }

  const todayDate = getDate();

  // Load tasks and removed tasks from localStorage when the component mounts
  useEffect(() => {
    if (user) {
      const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user.username}`)) || [];
      setTasks(storedTasks);
  
      const storedRemovedTasks = JSON.parse(localStorage.getItem(`removedTasks_${user.username}`)) || [];
      setRemovedTasks(storedRemovedTasks);
    }
  }, [user]);
  

 // Remove tasks older than 7 days
useEffect(() => {
  if (user) {
    const now = Date.now();
    
    // Load removed tasks from localStorage
    const storedRemovedTasks = JSON.parse(localStorage.getItem(`removedTasks_${user.username}`)) || [];
    
    // Filter out tasks that were removed more than 7 days ago
    const filteredTasks = storedRemovedTasks.filter(task => now - task.removedAt < 1 * 1 * 1 * 60 * 1000);
    
    // Set the filtered removed tasks in the state
    setRemovedTasks(filteredTasks);

    // Update localStorage with the filtered removed tasks
    localStorage.setItem(`removedTasks_${user.username}`, JSON.stringify(filteredTasks));
  }
}, [user]); // Only re-run when user changes

  

  const addTask = () => {
    if (taskName.trim() === "" || taskDeadline.trim() === "") 
      return alert("Both Task and Deadline are needed"); 
    
    if (taskDeadline < todayDate) 
      return alert("Deadline cannot be before today"); 

    const newTask = {
      id: Date.now(),
      name: taskName,
      deadline: taskDeadline,
      status: "open"
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    if (user) {
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    }

    setTaskName("");
    setTaskDeadline("");
  };

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      if (user) {
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
      }

      return updatedTasks;
    });
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => {
      const removedTask = prevTasks.find((task) => task.id === taskId);
      if (!removedTask) return prevTasks;
  
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
  
      if (user) {
        // Only update the removed tasks array if the task wasn't removed before
        const storedRemovedTasks = JSON.parse(localStorage.getItem(`removedTasks_${user.username}`)) || [];
        // Check if the task is already in removed tasks, if not, add it
        const taskAlreadyRemoved = storedRemovedTasks.some(task => task.id === removedTask.id);
  
        if (!taskAlreadyRemoved) {
          const newRemovedTask = { ...removedTask, removedAt: Date.now() };
          const updatedRemovedTasks = [...storedRemovedTasks, newRemovedTask];
  
          // Update the removed tasks in localStorage only once
          localStorage.setItem(`removedTasks_${user.username}`, JSON.stringify(updatedRemovedTasks));
          setRemovedTasks(updatedRemovedTasks); // Update the state with the new removed tasks list
        }
        
        // Update tasks in localStorage
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
      }
  
      return updatedTasks;
    });
  };
  
  

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-3">
      {/* Add Task section */}
      <div className="flex flex-col sm:flex-row justify-center mt-2 gap-1 h-10 sm:h-auto">
        <input
          type="text"
          className="sm:mt-1 border max-h-10 p-2 w-full sm:w-1/3 rounded-md hover:border-green-600"
          placeholder="Enter a new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <div className="flex justify-center gap-2 mt-2 sm:mt-1 md:mt-1">
          <input
            type="date"
            className="border p-2 w-1/3 rounded-md max-w-3xs min-w-36 h-10 hover:border-green-600"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            className="min-w-25 min-h-10 text-green-700 hover:text-white border hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-green-600 flex justify-center text-2xl font-bold">Task Status Board</h1>
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full mt-2">
          <TaskList title="Open" tasks={tasks.filter(task => task.status === "open")} status = "open"moveTask={moveTask} removeTask={removeTask} />
          <TaskList title="Inprogress" tasks={tasks.filter(task => task.status === "inProgress")} status ="inProgress" moveTask={moveTask} removeTask={removeTask} />
          <TaskList title="Review" tasks={tasks.filter(task => task.status === "review")} status = "review" moveTask={moveTask} removeTask={removeTask} />
          <TaskList title="Completed" tasks={tasks.filter(task => task.status === "completed")} status="completed" moveTask={moveTask} removeTask={removeTask} />
        </div>
      </div>

      {/* Removed Tasks Section */}
      <div className="mt-8 p-4 bg-gray-200 rounded-lg">
        <h2 className="text-xl font-bold text-red-600">Removed Tasks</h2>
        {removedTasks.length > 0 ? (
          <ul className="list-disc pl-5">
            {removedTasks.map(task => (
              <li key={task.id} className="text-gray-700">
                <span className="font-semibold">{task.name}</span> (was in <span className="italic">{task.status}</span>)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks removed</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          className="mt-4 min-w-25 min-h-10 text-green-700 hover:text-white border hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Board;
