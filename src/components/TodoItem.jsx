import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TodoItem({ task, id, onDelete, onEdit }) {
  return (
    <li className="task">
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{task}</label>
      <div className="buttons">
        <button
          className="btn-edit"
          onClick={() => {
            onEdit(id); //Calling handleEdit() by passing the id of the task to edit
          }}
        >
          <EditIcon />
        </button>
        <button
          className="btn-delete"
          onClick={() => {
            onDelete(id); //Calling deleteTask() by passing the id of the task to delete
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
