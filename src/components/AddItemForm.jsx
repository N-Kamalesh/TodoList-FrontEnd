import React, { useState } from "react";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

function AddItemForm({
  onAdd, //fetchtasks function to update list after addition/ updation of tasks
  isUpdating,
  setIsUpdating,
  taskToEdit, //Variable holding the name of the task to edit
  taskIdToEdit, //Variable holding the id of the task to edit
  setTaskToEdit,
}) {
  //State variable to keep track of the input the user is typing
  const [task, setTask] = useState("");

  // Alter the task as the user changes the input field
  function handleChange(event) {
    const newTask = event.target.value;
    if (isUpdating) setTaskToEdit(newTask);
    else setTask(newTask);
  }

  //Function to add the task to the database
  async function addTask() {
    if (task.trim().length === 0) return;
    //post request with the task user entered
    try {
      await axios.post(
        `${REACT_APP_BASE_URL}/todos/add`,
        {
          task,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTask("");
      await onAdd();
    }
  }

  //Function to update the task the user id
  async function updateTask() {
    if (taskToEdit.trim().length === 0) {
      setIsUpdating(false);
      return;
    }
    //patch request with the new edited task
    try {
      await axios.patch(
        `${REACT_APP_BASE_URL}/todos/${taskIdToEdit}`,
        {
          task: taskToEdit,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
      await onAdd();
    }
  }

  return (
    <div className="form">
      <input
        autoFocus
        type="text"
        placeholder="Enter new task"
        value={isUpdating ? taskToEdit : task}
        onChange={handleChange}
      />
      <button onClick={isUpdating ? updateTask : addTask}>
        {isUpdating ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default AddItemForm;
