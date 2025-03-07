
import './App.css'
import Board from './components/board'
import Task from './components/task'
import TaskList from './components/tasklist'

function App() {
  

  return (
    <div>
      <header className="bg-green-600 py-2 text-white shadow-md ">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Task App</h1>
      </div>
      </header>
      <Board/>
    </div>
  )
}

export default App

