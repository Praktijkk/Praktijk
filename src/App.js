import React, { useState, useEffect } from "react";
import StringFlasher from "./StringFlasher";

function App() {
  const [speed, setSpeed] = useState(1000); // Default: 1000ms (1 second)
  const [level, setLevel] = useState(1); // Default: Level 1
  const [pause, setPause] = useState(4000); // Default: 4000ms (4 seconds)
  const [isPaused, setIsPaused] = useState(false); // Add pause state

  useEffect(() => {
    // This effect will run whenever the pause state changes
  }, [pause]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Oefening</h1>
      <div>
        <label>
          Select Level:{" "}
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            style={{ fontSize: "1em", padding: "5px", margin: "10px" }}
          >
            <option value={1}>Level 1: Vowel</option>
            <option value={2}>Level 2: Vowel-Consonant</option>
            <option value={3}>Level 3: Consonant-Vowel</option>
            <option value={4}>Level 4: Consonant-Vowel-Consonant</option>
            <option value={5}>Level 5: Consonant-Consonant-Vowel-Consonant</option>
          </select>
        </label>
      </div>
      <StringFlasher key={pause} speed={speed} level={level} pause={pause} isPaused={isPaused} />
      <div style={{ marginTop: "20px" }}>
        <label>
          Speed (ms):{" "}
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            placeholder="Speed in ms"
            style={{ fontSize: "1em", padding: "5px", marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>
          Pause (ms):{" "}
          <input
            type="number"
            value={pause}
            onChange={(e) => setPause(Number(e.target.value))}
            placeholder="Pause in ms"
            style={{ fontSize: "1em", padding: "5px", marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setIsPaused(!isPaused)}
          style={{ fontSize: "1em", padding: "10px", marginTop: "10px" }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

export default App;
