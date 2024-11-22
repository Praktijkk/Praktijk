import React, { useState } from "react";
import StringFlasher from "./StringFlasher";

function App() {
  const [speed, setSpeed] = useState(1000); // Default: 1000ms (1 second)
  const [level, setLevel] = useState(1); // Default: Level 1

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Flashing Strings</h1>
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
            <option value={4}>Level 4: Consonant-Consonant-Vowel</option>
            <option value={5}>Level 5: Consonant-Vowel-Consonant</option>
          </select>
        </label>
      </div>
      <StringFlasher speed={speed} level={level} />
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
    </div>
  );
}

export default App;
