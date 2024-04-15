import React, { useState, useEffect } from "react";
import TopNavBar from "../../Components/TopNavBar/TopNavBar";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ToDoList from "../../Components/ToDoList/ToDoList";

const Home = () => {
  const [buttonNo, setButtonNo] = useState(0);
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    const data = getDataFromLocalStorage();
    setLocalStorageData(data);
    setButtonNo(Object.keys(data).length);
  }, []);

  const handleBottomButtonClick = () => {
    const newTaskId = buttonNo;
    setButtonNo(buttonNo + 1);

    const newTask = { task: "", isChecked: false };

    localStorage.setItem(`task-${newTaskId}`, JSON.stringify(newTask));

    setLocalStorageData({
      ...localStorageData,
      [newTaskId]: newTask,
    });
  };

  const handleDelete = (taskId) => {
    localStorage.removeItem(`task-${taskId}`);

    const updatedData = { ...localStorageData };
    delete updatedData[taskId];
    setLocalStorageData(updatedData);
  };

  const getDataFromLocalStorage = () => {
    const data = {};
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        if (key.startsWith("task-")) {
          const value = localStorage.getItem(key);
          if (value) {
            const parsedValue = JSON.parse(value);
            const taskId = key.split("-")[1];
            data[taskId] = { task: parsedValue.task, isChecked: parsedValue.isChecked };
          }
        }
      }
    }
    return data;
  };

  return (
    <>
      <div>
        <div style={{ position: "fixed", width: "100vw", top: "0px" }}>
          <TopNavBar />
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginTop: "71px" }}>
          {Object.keys(localStorageData).map((taskId) => (
            <ToDoList
              key={taskId}
              taskId={taskId}
              onDelete={handleDelete}
              initialTask={localStorageData[taskId]?.task}
              initialChecked={localStorageData[taskId]?.isChecked}
            />
          ))}
        </div>
        <div onClick={handleBottomButtonClick}>
          <BottomButton />
        </div>
      </div>
    </>
  );
};

export default Home;
