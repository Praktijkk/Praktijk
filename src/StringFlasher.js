import React, { useState, useEffect } from "react";

const StringFlasher = ({ speed, level }) => {
  const [currentString, setCurrentString] = useState(
    generateStringForLevel(level)
  );
  const [counter, setCounter] = useState(0); // Tracks the number of flashed words
  const [isPaused, setIsPaused] = useState(false); // Tracks if the component is in the pause state
  const [countdown, setCountdown] = useState(4); // Countdown for the break in seconds

  useEffect(() => {
    if (isPaused) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            setIsPaused(false); // End pause when countdown reaches 0
            return 4; // Reset countdown
          }
          return prevCountdown - 1;
        });
      }, 1000); // Countdown updates every second

      return () => clearInterval(timer); // Cleanup timer
    }

    const interval = setInterval(() => {
      setCurrentString(generateStringForLevel(level));
      setCounter((prevCounter) => prevCounter + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [speed, level, isPaused]);

  useEffect(() => {
    if (counter > 0 && counter % 10 === 0) {
      setIsPaused(true); // Pause after every 10 words
    }
  }, [counter]);

  return (
    <div style={{ fontSize: "2em", textAlign: "center", marginTop: "20px" }}>
      {isPaused ? `Taking a break... ${countdown}s` : currentString}
    </div>
  );
};

const getRandomVowel = () => {
  const vowels = "AEIOU".split("");
  return vowels[Math.floor(Math.random() * vowels.length)];
};

const getRandomConsonant = () => {
  const consonants = "BCDFGHJKLMNPQRSTVWXYZ".split("");
  return consonants[Math.floor(Math.random() * consonants.length)];
};

const generateStringForLevel = (level) => {
  switch (level) {
    case 1:
      return getRandomVowel();
    case 2:
      return getRandomVowel() + getRandomConsonant();
    case 3:
      return getRandomConsonant() + getRandomVowel();
    case 4:
      return getRandomConsonant() + getRandomConsonant() + getRandomVowel();
    case 5:
      return getRandomConsonant() + getRandomVowel() + getRandomConsonant();
    default:
      return "";
  }
};

export default StringFlasher;




