import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function App() {
  const [item, setItem] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  function newItem(event) {
    let todoItem = event.target.value;
    setItem(todoItem); 
  }

  function addItem() {
    setTodoItems(prevValue => [
      ...prevValue, item
    ]);
    setItem(""); 
  }

  function deleteItem(id) {
    console.log(id);
    
    setTodoItems((prevValue) => {
      return [...prevValue.filter((item, index) => index !== id)];
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={newItem} type="text" value={item} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todoItems.map((todoItem, index) => <ToDoItem key={index} id={index} text={todoItem} handleClick={deleteItem}/>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
