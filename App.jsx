import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./compunent/Todo";
import { getTodo, addTodo ,updataTodo ,deleteTodo } from "./Utils/HandelApi";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isupdateing, setIsUpdateing] = useState(false);
  const [todoid, settodoid] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch todos on component mount and every 5 seconds
  useEffect(() => {
     getTodo(setTodo, setLoading)}
     , []);

  const handelEdit = (_id, text) => {
    setIsUpdateing(true);
    setText(text);
    settodoid(_id);
  };

  const handelDelete = (id) => {
    deleteTodo(id, setTodo, setLoading); // Pass setLoading to delete
  };

  return (
    <div className="app">
      <div className="container">
        <h1>TODO LIST</h1>

        {/* Input section */}
        <div className="top">
          <input
            type="text"
            placeholder="Enter your task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add">
            <button
              onClick={isupdateing
                ? () => updataTodo(todoid, text, setText, setTodo, setIsUpdateing, setLoading)
                : () => addTodo(text, setText, setTodo, setLoading)
              }
            >
              {isupdateing ? "Update" : "ADD"}
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="list">
          {loading ? (
            <p className="loader"></p> // Show loader
          ) : (
            <div className="list">
              {Array.isArray(todo) && todo.length > 0 ? (
                todo.map((e) => (
                  <Todo
                    text={e.text}
                    key={e._id}
                    handelEdit={() => handelEdit(e._id, e.text)}
                    isupdateing={isupdateing}
                    handelDelete={() => handelDelete(e._id)}
                  />
                ))
              ) : (
                <p>No todos found</p> // Fallback message
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
