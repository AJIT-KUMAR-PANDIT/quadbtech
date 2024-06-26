import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ToDoList = ({ taskId, onDelete, initialTask, initialChecked }) => {
  const [task, setTask] = React.useState(initialTask || "");
  const [isChecked, setIsChecked] = React.useState(initialChecked || false);

  const handleTextFieldChange = (event) => {
    const newTask = event.target.value;
    setTask(newTask);
    saveDataToLocalStorage(newTask, isChecked);
  };

  const handleCheckboxChange = (event) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    saveDataToLocalStorage(task, newChecked);
  };

  const handleDeleteTask = () => {
    onDelete(taskId);

    // Remove the task from localStorage
    localStorage.removeItem(`task-${taskId}`);

    // Clear task and isChecked states
    setTask("");
    setIsChecked(false);
  };

  const saveDataToLocalStorage = (task, isChecked) => {
    const data = { task, isChecked };
    localStorage.setItem(`task-${taskId}`, JSON.stringify(data));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          margin: "auto",
          padding: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <Checkbox
          {...label}
          checked={isChecked}
          color="success"
          onChange={handleCheckboxChange}
          sx={{ mr: 1 }}
        />
        <TextField
          id={`task-${taskId}`}
          label="Task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={handleTextFieldChange}
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <DeleteIcon
          style={{ color: "crimson", cursor: "pointer" }}
          onClick={handleDeleteTask}
        />
      </Box>
    </div>
  );
};

export default ToDoList;
