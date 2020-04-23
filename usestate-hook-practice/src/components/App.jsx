import React, {useState} from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  function setCurrentTime() {
    setTime(new Date().toLocaleTimeString());
  }
  setInterval(setCurrentTime, 1000);


  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={setCurrentTime}>Get Time</button>
    </div>
  );
}

export default App;
