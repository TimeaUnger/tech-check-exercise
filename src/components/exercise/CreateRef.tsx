import { createRef, useState } from "react";

const CreateRef = () => {
  const myInput = createRef<HTMLInputElement>();
  const [counter, setCounter] = useState(0);

  const handleFocus = () => {
    console.log(myInput.current);
    myInput.current?.focus();
  };

  return (
    <>
      <input ref={myInput} type="text"></input>
      <button onClick={handleFocus}>Focus input</button>
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Counter: {counter}
      </button>
    </>
  );
};

export default CreateRef;
