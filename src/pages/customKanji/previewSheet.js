import classes from "./previewSheet.module.css";
import { useEffect, useRef } from "react";
import exportAsImage from "../../components/exportElementAsImage";
import { XIcon, DownloadIcon } from "@heroicons/react/solid";
import PreviewMainPage from "./preview/previewMainPage";
import { useState } from "react";

const PreviewSheet = ({ closingBtnHandler }) => {
  const exportRef = useRef();
  const [downloadButtonClicked, setDownloadButtonClicked] = useState(false);
  const [reRenderComplete, setReRenderComplete] = useState(false);

  const captureClicked = () => {
    setDownloadButtonClicked(true);
  };
  const rerenderCompleteHandler = () => {
    setReRenderComplete("x");
  };
  useEffect(() => {
    if (reRenderComplete === "x") {
      const targetElement = document.getElementById("pdfContainer");
      exportAsImage(targetElement, "test");
      closingBtnHandler();
    }
  }, [reRenderComplete]);

  return (
    <div className={classes.dragNdropPreviewContainer}>
      <button className={`${classes.downloadButton}`} onClick={captureClicked}>
        <DownloadIcon className={classes.closingIcon} />
      </button>
      <button
        className={`${classes.closingIconContainer}`}
        onClick={closingBtnHandler}
      >
        <XIcon className={classes.closingIcon} />
      </button>

      <div
        className={classes.dragndropSheetContainer}
        id="pdfContainer"
        ref={exportRef}
      >
        <PreviewMainPage
          downloadClicked={downloadButtonClicked}
          reRenderCompleteFunction={rerenderCompleteHandler}
        />
      </div>
    </div>
  );
};
export default PreviewSheet;
