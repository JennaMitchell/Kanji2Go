import { CheckIcon } from "@heroicons/react/solid";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../store/store";
import classes from "./quizCanvas.module.css";

const QuizCanvas = ({ numberOfQuestions }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const dispatch = useDispatch();
  const [clearButtonClicked, setClearButtonClicked] = useState(false);
  const [eraseButtonClicked, setEraseButtonClicked] = useState(false);

  // refs can be used for not only accessing elemetns but also stroing infomration on elemtns that you need
  // contextRef is used to store info on the canvas ref
  const [isDrawing, setIsDrawing] = useState(false);
  const [firstTimeRendered, setFirstTimeRendered] = useState(false);

  const activeQuizQuestionNumber = useSelector(
    (state) => state.activeQuizQuestionNumber
  );

  const savedQuizImageArray = useSelector((state) => state.savedQuizImageArray);
  useEffect(() => {
    const canvas = canvasRef.current;

    const windowSize = window.matchMedia("(max-width: 920px)");
    if (windowSize.matches) {
      canvas.width = 400;
      canvas.height = 400;
      canvas.style.width = `400px`;
      canvas.style.height = `400px`;
    } else {
      canvas.width = 600;
      canvas.height = 600;
      // styling canvas below
      canvas.style.width = `600px`;
      canvas.style.height = `600px`;
    }

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
  let copyOfSavedQuizImageArray = savedQuizImageArray.slice();
  const submitButtonHandler = () => {
    let canvas = canvasRef.current;

    copyOfSavedQuizImageArray[activeQuizQuestionNumber - 1] =
      canvas.toDataURL();
    let numberOfAnsweredQuestions = 0;
    for (let j = 0; j < copyOfSavedQuizImageArray.length; j++) {
      if (copyOfSavedQuizImageArray[j] !== undefined) {
        numberOfAnsweredQuestions++;
      }
    }
    if (numberOfAnsweredQuestions === numberOfQuestions) {
      dispatch(storeActions.setAllQuizQuestionsAnswered(true));
    }

    dispatch(storeActions.setSavedQuizImageArray(copyOfSavedQuizImageArray));
    setClearButtonClicked(true);
  };
  //setSavedImageArray
  let imageSubmitted = false;

  if (copyOfSavedQuizImageArray[activeQuizQuestionNumber - 1] !== undefined) {
    imageSubmitted = true;
  }
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
        onClick={submitButtonHandler}
      >
        Submit
      </button>
      <button
        className={
          imageSubmitted
            ? `${classes.submitCheckMark} ${classes.submitCheckMarkActive}`
            : `${classes.submitCheckMark}`
        }
      >
        <CheckIcon className={classes.icon} />
      </button>
      {imageSubmitted && (
        <div className={classes.prevStrokeContainer}>
          <h3 className={classes.prevStrokeTitle}>
            &nbsp;Previous Stroke&nbsp;
          </h3>
          <img
            src={copyOfSavedQuizImageArray[activeQuizQuestionNumber - 1]}
            alt="Past Kanji Stroke"
            className={classes.prevStroke}
          />
        </div>
      )}
    </>
  );
};
export default QuizCanvas;
//    <img className={classes.testImage} alt="delete" src={submitImage}></img>
