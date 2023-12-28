import React from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

function TodoList({ tasks, onDelete, onEdit }) {
  //Function to delete a task from the user
  async function deleteTask(id) {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/todos/${id}`);
      await onDelete();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            task={task.task}
            onDelete={deleteTask}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
