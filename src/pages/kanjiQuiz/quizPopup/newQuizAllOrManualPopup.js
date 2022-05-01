import classes from "./newQuizAllOrManualPopup.module.css";
import { useRef } from "react";
import { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";

const NewQuizAllOrManualPopup = ({
  newTestPageOpen,
  onCloseFunction,
  retrieveQuizType,
}) => {
  const preventAutoClose = (e) => e.stopPropagation();
  // prevents the window from closing when the use clicks on the dialog box
  const ref = useRef(null);
  const manualButtonHandler = () => {
    retrieveQuizType("Manual");
    onCloseFunction();
  };
  const jlptButtonHandler = () => {
    retrieveQuizType("JLPT Test");
    onCloseFunction();
  };

  useEffect(() => {
    if (newTestPageOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [newTestPageOpen]);

  return (
    <dialog className={classes.dialogContainer} ref={ref}>
      <div className={classes.mainContainer} onClick={preventAutoClose}>
        <div className={classes.closingIconContainer} onClick={onCloseFunction}>
          <XIcon className={classes.icon} />
        </div>

        <h2 className={classes.firstTitle}>Manually Select Kanji</h2>
        <p className={classes.orDivider}>-or-</p>
        <h2 className={classes.secondTitle}>All Kanji from a JLPT Test</h2>
        <div className={classes.btnContainer}>
          <button
            className={classes.selectionBtn}
            onClick={manualButtonHandler}
          >
            Manual
          </button>
          <button className={classes.selectionBtn} onClick={jlptButtonHandler}>
            JLPT Test
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default NewQuizAllOrManualPopup;
