import classes from "./previewSheet.module.css";
import { useRef } from "react";
import DragNDropContainer from "./dragNdropSection/dragNdropContainer";
import exportAsImage from "../../components/exportElementAsImage";
import { XIcon } from "@heroicons/react/solid";

const PreviewSheet = ({ closingBtnHandler }) => {
  const exportRef = useRef();
  const captureClicked = () => {
    console.log(exportRef.current);
    exportAsImage(exportRef.current, "test");
  };

  return (
    <div className={classes.dragNdropPreviewContainer} ref={exportRef}>
      <button className={`${classes.downloadButton}`} onClick={captureClicked}>
        Download
      </button>
      <button
        className={`${classes.closingIconContainer}`}
        onClick={closingBtnHandler}
      >
        <XIcon className={classes.closingIcon} />
      </button>

      <DragNDropContainer />
    </div>
  );
};
export default PreviewSheet;
