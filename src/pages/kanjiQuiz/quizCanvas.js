import { useRef, useEffect, useState } from "react";
import classes from "./quizCanvas.module.css";

const QuizCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [clearButtonClicked, setClearButtonClicked] = useState(false);
  const [eraseButtonClicked, setEraseButtonClicked] = useState(false);

  // refs can be used for not only accessing elemetns but also stroing infomration on elemtns that you need
  // contextRef is used to store info on the canvas ref
  const [isDrawing, setIsDrawing] = useState(false);
  const [firstTimeRendered, setFirstTimeRendered] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 600;
    // styling canvas below
    canvas.style.width = `600px`;
    canvas.style.height = `600px`;

    const context = canvas.getContext("2d");
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    // color of stroke input
    context.lineWidth = 5;
    // width of the stroke
    // used to accomided the increaed screen density
    contextRef.current = context;
    setFirstTimeRendered(true);
  }, []);
  if (clearButtonClicked && firstTimeRendered) {
    let canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setClearButtonClicked(false);
  }

  if (eraseButtonClicked && firstTimeRendered) {
    const canvas = canvasRef.current.getContext("2d");
    canvas.strokeStyle = "white";
  } else if (firstTimeRendered) {
    const canvas = canvasRef.current.getContext("2d");
    canvas.strokeStyle = "black";
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const clearButtonHandler = () => {
    setClearButtonClicked(!clearButtonClicked);
  };
  const eraseButtonHandler = () => {
    setEraseButtonClicked(!eraseButtonClicked);
  };

  return (
    <>
      <canvas
        id="kanjiCanvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      >
        Please use an updated web browser to use this feature.
      </canvas>
      <button className={`${classes.clearButton}`} onClick={clearButtonHandler}>
        Clear
      </button>
      <button
        className={
          eraseButtonClicked
            ? `${classes.eraseButtonActive} ${classes.eraseButton}`
            : `${classes.eraseButton}`
        }
        onClick={eraseButtonHandler}
      >
        Erase
      </button>
      <button
        className={`${classes.submitButton}`}
        onClick={clearButtonHandler}
      >
        Submit
      </button>
    </>
  );
};
export default QuizCanvas;
