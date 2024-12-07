import React, { useState, useEffect } from "react";
import StringFlasher from "./StringFlasher";

function App() {
  const [speed, setSpeed] = useState(1000); // Default: 1000ms (1 second)
  const [level, setLevel] = useState(1); // Default: Level 1
  const [isPaused, setIsPaused] = useState(false); // Add pause state
  const [sequenceKey, setSequenceKey] = useState(0); // Key to reset the sequence
  const [currentTimer, setCurrentTimer] = useState(0); // Timer for the current sequence

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setCurrentTimer((prevTime) => {
          if (prevTime >= speed * 2) {
            handleSequenceEnd(); // Reset the sequence if the total timer reaches 2x the speed timer
            return 0;
          }
          return prevTime + 100; // Increment by 100ms
        });
      }, 100); // Update every 100ms
    }
    return () => clearInterval(timer);
  }, [isPaused, sequenceKey, speed]);

  const handleSequenceEnd = () => {
    setSequenceKey(prevKey => prevKey + 1); // Increment the key to reset the sequence
    setCurrentTimer(0); // Reset the current timer
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
    handleSequenceEnd(); // Reset the sequence when speed is changed
  };

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
      <StringFlasher key={sequenceKey} speed={speed} level={level} totalTimer={speed * 2} isPaused={isPaused} onSequenceEnd={handleSequenceEnd} />
      <div style={{ marginTop: "20px" }}>
        <label>
          Speed (ms):{" "}
          <input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            placeholder="Speed in ms"
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
      <div style={{ position: "fixed", bottom: "10px", left: "10px", fontSize: "1em" }}>
        Current Timer: {currentTimer}ms
      </div>
    </div>
  );
}

export default App;
