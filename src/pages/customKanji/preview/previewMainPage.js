import { useSelector } from "react-redux";
import { useEffect } from "react";
import PreviewPageBreak from "./previewPageBreak";
import PreviewColumn from "./previewColumns";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: repeat(14, 120px);
  column-gap: 0;
  color: black;
`;

const PreviewMainPage = ({ downloadClicked, reRenderCompleteFunction }) => {
  const customKanjiGridData = useSelector((state) => state.customKanjiGridData);
  const [mappedData, setMappedData] = useState([]);
  const updateRenderedGridData = () => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));

    let pageBreakAdded = false;
    let tempMappedData = [];
    let strokeNum = "";

    let numberOfBreaks = tempArray.columnOrder.length / 14 - 1;
    let newArrayLength = tempArray.columnOrder.length + numberOfBreaks;
    let columnIdIndex = 0;
    let pageBreakIndex = 0;
    let pageBreakNumbers = [];
    // handling pagebreaks
    if (numberOfBreaks > 0) {
      for (let t = 0; t < numberOfBreaks; t++) {
        pageBreakNumbers[t] = 14 + 14 * t + 1;
      }
    }

    for (let index = 0; index < newArrayLength - numberOfBreaks; index++) {
      let columnId = tempArray.columnOrder[columnIdIndex];
      let indexOfDash = columnId.indexOf("-");
      let currentColumnIdNumber = +columnId.slice(indexOfDash);
      const column = tempArray.columns[columnId];

      let container = column.idContainer.map(
        (id) => tempArray.contentContainer[id]
      );

      if (
        currentColumnIdNumber % pageBreakNumbers[pageBreakIndex] === 0 &&
        currentColumnIdNumber !== customKanjiGridData.columnOrder.length + 14 &&
        !pageBreakAdded
      ) {
        pageBreakAdded = true;
        tempMappedData.push(
          <PreviewPageBreak
            key={pageBreakIndex}
            column={column}
            container={container}
            index={index}
            downloadClicked={downloadClicked}
          />
        );
        pageBreakIndex++;
      }
      pageBreakAdded = false;
      tempMappedData.push(
        <PreviewColumn
          key={column.id}
          column={column}
          container={container}
          index={index}
          strokeNum={strokeNum}
          downloadClicked={downloadClicked}
        />
      );
      columnIdIndex++;
    }
    setMappedData(tempMappedData);
    if (downloadClicked) {
      reRenderCompleteFunction();
    }
  };
  useEffect(() => {
    updateRenderedGridData();
  }, [downloadClicked]);
  return <>{mappedData.length !== 0 && <Container>{mappedData}</Container>}</>;
};
export default PreviewMainPage;
