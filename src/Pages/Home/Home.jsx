import React, { useState } from "react";
import TopNavBar from "../../Components/TopNavBar/TopNavBar";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ToDoList from "../../Components/ToDoList/ToDoList";

const Home = () => {
  const [buttonNo, setbuttonNo] = useState(0);

  const handleBottomButtonClick = () => {
    setbuttonNo(buttonNo + 1);
  };

  const handleDelete = (taskId) => {
      console.log("delete task", taskId);
  }
  
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
  
  
  const localStorageData = getDataFromLocalStorage();

  console.log(localStorageData);
  return (
    <>
      <div>
        <div style={{position: "fixed", width: "100vw", top:"0px"}}> 
          <TopNavBar />
        </div>
        <div style={{ display: "flex", justifyContent: "center" , flexDirection: "column" , marginTop: "71px" }}>
          {Array.from({ length: buttonNo || localStorageData }, (_, index) => (
            <ToDoList taskId={index} onDelete={handleDelete} />
          ))}
        </div>
        <div onClick={handleBottomButtonClick}>
          <BottomButton  />
        </div>
      </div>
    </>
  );
};

export default Home;
