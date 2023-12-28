import React, { useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import axios from "axios";
import TodoList from "./TodoList";
import "./index.css";
const { REACT_APP_BASE_URL } = process.env;

function App() {
  //State variable to store all the tasks from the database
  const [tasks, setTasks] = useState([]);
  //boolean to keep track whether the app is in update mode or not
  const [isUpdating, setIsUpdating] = useState(false);
  //State variable to store the name of the task to edit
  const [taskToEdit, setTaskToEdit] = useState("");
  //State Variable to store the id of the task to edit
  const [taskIdToEdit, setTaskIdToEdit] = useState("");

  //Fuction to get all the tasks from the db and set it to 'tasks' variable
  async function fetchTasks() {
    const response = await axios.get(`${REACT_APP_BASE_URL}/todos`);
    setTasks(response.data);
  }

  //Function that tracks which task is opted by the user to edit and updates the variables
  function handleEdit(id) {
    setIsUpdating(true);
    setTaskIdToEdit(id);
    setTaskToEdit(tasks.find((task) => id === task.id).task);
  }

  //Calls fetchTasks() on mounting
  useEffect(function () {
    fetchTasks();
  }, []);

  return (
    <main className="container">
      <h1>To-Do List</h1>
      <AddItemForm
        onAdd={fetchTasks}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        taskToEdit={taskToEdit}
        taskIdToEdit={taskIdToEdit}
        setTaskToEdit={setTaskToEdit}
      />
      {tasks.length === 0 ? (
        <p>No Tasks</p>
      ) : (
        <TodoList tasks={tasks} onDelete={fetchTasks} onEdit={handleEdit} />
      )}
    </main>
  );
}

export default App;
