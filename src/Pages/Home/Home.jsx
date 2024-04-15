import React, { useState } from "react";
import TopNavBar from "../../Components/TopNavBar/TopNavBar";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ToDoList from "../../Components/ToDoList/ToDoList";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handleBottomButtonClick = () => {
    setCounter(counter + 1);
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    const newTask = { id: counter + 1 };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <>
      <div>
        <div style={{ position: "fixed", width: "100vw", top: "0px" }}>
          <TopNavBar />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "71px",
          }}
        >
          {tasks.map((task) => (
            <ToDoList key={task.id} taskId={task.id} onDelete={handleDelete} />
          ))}
        </div>
        <div onClick={addTask}>
          <BottomButton />
        </div>
      </div>
    </>
  );
};

export default Home;
