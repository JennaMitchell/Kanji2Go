import classes from "./definitionSelectorBlock.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";

const DefinitionSelectorBlock = ({ stateReturnFunction }) => {
  const [definitionOnlyClicked, setDefinitionOnlyClicked] = useState(false);
  const [strokeOrderOnlyClicked, setStrokeOrderOnlyClicked] = useState(false);
  const [strokeOrderAndDefinitionClicked, setStrokeOrderAndDefinitionClicked] =
    useState(false);
  const [kanjiOnlyClicked, setKanjiOnlyClicked] = useState(false);

  const definitionOnlyHandler = () => {
    if (!definitionOnlyClicked) {
      setDefinitionOnlyClicked(true);
      setStrokeOrderOnlyClicked(false);
      setStrokeOrderAndDefinitionClicked(false);
      setKanjiOnlyClicked(false);
      stateReturnFunction("Definition Only");
    } else {
      setDefinitionOnlyClicked(false);
    }
  };
  const strokeOrderOnlyHandler = () => {
    if (!strokeOrderOnlyClicked) {
      setStrokeOrderOnlyClicked(true);
      setDefinitionOnlyClicked(false);
      setStrokeOrderAndDefinitionClicked(false);
      setKanjiOnlyClicked(false);
      stateReturnFunction("Stroke Order Only");
    } else {
      setStrokeOrderOnlyClicked(false);
    }
  };
  const strokeOrderAndDefinitionHandler = () => {
    if (!strokeOrderAndDefinitionClicked) {
      setStrokeOrderAndDefinitionClicked(true);
      setStrokeOrderOnlyClicked(false);
      setDefinitionOnlyClicked(false);
      setKanjiOnlyClicked(false);
      stateReturnFunction("Stroke Order and Definitions");
    } else {
      setStrokeOrderAndDefinitionClicked(false);
    }
  };
  const kanjiOnlyClickedHandler = () => {
    if (!kanjiOnlyClicked) {
      setKanjiOnlyClicked(true);
      setStrokeOrderAndDefinitionClicked(false);
      setStrokeOrderOnlyClicked(false);
      setDefinitionOnlyClicked(false);
      stateReturnFunction("Kanji Only");
    } else {
      setKanjiOnlyClicked(false);
    }
  };

  return (
    <div className={classes.mainContainer}>
      <h2 className={classes.headerTitle}>
        &nbsp; Select a Helper Block &nbsp;
      </h2>
      <div className={classes.selector}>
        <h3 className={classes.selectorTitle}> Kanji and Definition</h3>
        <button className={classes.selectorBtn} onClick={definitionOnlyHandler}>
          {definitionOnlyClicked && <CheckIcon className={classes.icon} />}
        </button>
      </div>
      <div className={classes.selector}>
        <h3 className={classes.selectorTitle}>Kanji and Stroke Order</h3>
        <button
          className={classes.selectorBtn}
          onClick={strokeOrderOnlyHandler}
        >
          {strokeOrderOnlyClicked && <CheckIcon className={classes.icon} />}
        </button>
      </div>
      <div className={classes.selector}>
        <h3 className={classes.selectorTitle}>
          Kanji, Definition and Stroke Order
        </h3>
        <button
          className={classes.selectorBtn}
          onClick={strokeOrderAndDefinitionHandler}
        >
          {strokeOrderAndDefinitionClicked && (
            <CheckIcon className={classes.icon} />
          )}
        </button>
      </div>
      <div className={classes.selector}>
        <h3 className={classes.selectorTitle}>Kanji Only</h3>
        <button
          className={classes.selectorBtn}
          onClick={kanjiOnlyClickedHandler}
        >
          {kanjiOnlyClicked && <CheckIcon className={classes.icon} />}
        </button>
      </div>
    </div>
  );
};
export default DefinitionSelectorBlock;
