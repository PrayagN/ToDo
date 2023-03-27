import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";


const getLocalStorage = () => {
  let todDos = localStorage.getItem("toDos");
  if (todDos) {
    return JSON.parse(localStorage.getItem("toDos"));
  } else {
    return [];
  }
};

function App() {
  const [toDos, setToDos] = useState(getLocalStorage());
  const [toDo, setToDo] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setDay({ day: currentDay, date: `${day}/${month}/${year}` });
  }, []);

  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const checkInput = () => {
    if (!toDo) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "Please create a new todo...",
      });

      return;
    }

    setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    setToDo("");
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter((obj) => obj.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setToDos(
      toDos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status };
        }
        return obj;
      })
    );
  };

  return (
    <div className="app main">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2 style={{ paddingLeft: "1rem" }}> It's {day.day}</h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="New Todo"
        />
        <i onClick={checkInput} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => handleStatusChange(obj.id, e.target.checked)}
                  checked={obj.status}
                  type="checkbox"
                />
                <p className=''
                  style={{
                    textDecoration: obj.status ? "line-through" : "none",
                  }}
                >
                  <span style={{ color: obj.status ? "red" : "green",textDecorationColor:'red' }}>
                    {obj.text}
                  </span>
                </p>
              </div>
              <div className="right">
                <span style={{ paddingRight: "1rem" }}>{day.date}</span>
                <i 
                  className="fa fa-trash hi"
                  aria-hidden="true"
                  onClick={() => handleDelete(obj.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
