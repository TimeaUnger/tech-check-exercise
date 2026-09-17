import { useState } from "react";
import { flushSync } from "react-dom";

const FlushSync = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setCounter((prev) => {
        return prev + 1;
      });
    });

    console.log(document.getElementById("counter")?.innerText);
  };

  return (
    <>
      <p id="counter">{counter}</p>
      <button onClick={handleClick}>Increase</button>
    </>
  );
};

export default FlushSync;
