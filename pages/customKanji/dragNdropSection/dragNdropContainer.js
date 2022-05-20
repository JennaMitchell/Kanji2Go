import gridData from "./gridData";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Column from "./column";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../store/store";
import PageBreakColumn from "./pageBreakColumn";
import classes from "./dragNdropContainer.module.css";
import { useBeforeunload } from "react-beforeunload";

const DragNDropContainer = () => {
  const [data, setData] = useState(gridData);
  const [mappedData, setMappedData] = useState();
  const customKanjiBoxData = useSelector((state) => state.customKanjiBoxData);
  const customKanjiGridData = useSelector((state) => state.customKanjiGridData);

  const blankSquaresArray = useSelector((state) => state.blankSquaresArray);
  const [renderBlankSquares, setRenderBlankSquares] = useState(false);
  const databaseLoaded = useSelector((state) => state.databaseLoaded);
  const fillButtonClicked = useSelector((state) => state.fillButtonClicked);
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(0);
  const customKanjiDeleteIconClicked = useSelector(
    (state) => state.customKanjiDeleteIconClicked
  );
  const [addStrokeOrder, setAddStrokeOrder] = useState(false);
  const newPageClicked = useSelector((state) => state.newPageClicked);
  const [currentKanjiId, setCurrentKanjiId] = useState("");
  const [renderDataUpdated, setRenderDataUpdated] = useState(false);
  const okayClearButtonClicked = useSelector(
    (state) => state.okayClearButtonClicked
  );
  let refreshed = JSON.parse(localStorage.getItem("refreshed"));
  useEffect(() => {
    if (refreshed) {
      setData(JSON.parse(localStorage.getItem("data")));
      dispatch(
        storeActions.setCustomKanjiGridData(
          JSON.parse(localStorage.getItem("customKanjiGridData"))
        )
      );
      localStorage.removeItem("refreshed");
      localStorage.removeItem("customKanjiGridData");
      localStorage.setItem("refreshed", "false");
    }
  }, [refreshed]);

  // The useBeforeUnload is called when the user refreshs the page
  useBeforeunload(() => {
    localStorage.setItem("data", JSON.stringify(customKanjiGridData));
    localStorage.setItem(
      "customKanjiGridData",
      JSON.stringify(customKanjiGridData)
    );
    localStorage.setItem("refreshed", "true");
  });

  const calculateSpotsInUse = (columnId, data) => {
    let numberOfSlotsInUse = 0;
    let activeIds = data.columns[columnId].idContainer;
    for (let q = 0; q < activeIds.length; q++) {
      let columnContent = data.contentContainer[activeIds[q]];
      switch (columnContent.type) {
        case "Kanji and Definition":
          numberOfSlotsInUse = numberOfSlotsInUse + 4;
          break;
        case "Stroke Order":
          numberOfSlotsInUse = numberOfSlotsInUse + 1;
          break;
        case "Kanji Only":
          numberOfSlotsInUse = numberOfSlotsInUse + 1;
          break;
        case "Blank":
          numberOfSlotsInUse = numberOfSlotsInUse + 1;
          break;
        default:
          break;
      }
    }

    return numberOfSlotsInUse;
  };

  const spacesAvailableCalculator = (array) => {
    let spacesAvailableArray = [];
    for (let w = 1; w < array.columnOrder.length + 1; w++) {
      let columnId = "";
      if (w < 10) {
        columnId = `column-0${w}`;
      } else {
        columnId = `column-${w}`;
      }
      let numberOfSpacesInUse = calculateSpotsInUse(columnId, array);
      let numberOfAvailableSpaces = 11 - numberOfSpacesInUse;
      if (numberOfAvailableSpaces < 0) {
        numberOfAvailableSpaces = 0;
      }
      spacesAvailableArray.push([numberOfAvailableSpaces, columnId]);
    }
    return spacesAvailableArray;
  };

  const strokeOrderHandler = (tempArray, type) => {
    let numberOfStrokesToAdd = customKanjiBoxData.data.strokes[0];
    let spacesAvailable = [];
    spacesAvailable = spacesAvailableCalculator(tempArray);

    for (let arr of spacesAvailable) {
      if (numberOfStrokesToAdd === 0) {
        break;
      }
      if (arr[0] !== 0) {
        if (numberOfStrokesToAdd > arr[0]) {
          arr[2] = arr[0];
          numberOfStrokesToAdd = numberOfStrokesToAdd - arr[0];
        } else if (numberOfStrokesToAdd < arr[0]) {
          arr[2] = numberOfStrokesToAdd;
          numberOfStrokesToAdd = 0;
        }
      } else {
        arr[2] = 0;
      }
    }
    let newStrokeNum = 0;
    let extractableStrokeNum = 0;
    for (let arr2 of spacesAvailable) {
      if (arr2[2] !== 0) {
        for (let r = 0; r < arr2[2]; r++) {
          if (newStrokeNum < 10) {
            extractableStrokeNum = `0${newStrokeNum}`;
          } else {
            extractableStrokeNum = newStrokeNum;
          }

          // adding content data.

          tempArray.contentContainer[
            `${customKanjiBoxData.data.kanji} ${
              currentNumber + newStrokeNum
            } ${extractableStrokeNum}`
          ] = {
            id: `${[customKanjiBoxData.data.kanji]} ${
              currentNumber + newStrokeNum
            } ${extractableStrokeNum}`,
            content: [customKanjiBoxData.data],
            type: type,
            strokeNum: newStrokeNum,
          };
          /// adding to empty columns
          tempArray.columns[arr2[1]].idContainer.push(
            `${customKanjiBoxData.data.kanji} ${
              currentNumber + newStrokeNum
            } ${extractableStrokeNum}`
          );
          newStrokeNum++;
        }
      }
    }
    setAddStrokeOrder(false);
  };

  const addKanji = (
    tempArray,
    type,
    currentColumnId,
    numberOfItems,
    strokeNum
  ) => {
    tempArray.contentContainer[
      `${customKanjiBoxData.data.kanji} ${currentNumber}`
    ] = {
      id: `${[customKanjiBoxData.data.kanji]} ${currentNumber}`,
      content: [customKanjiBoxData.data],
      type: type,
      strokeNum: strokeNum,
    };
    tempArray.columns[currentColumnId].idContainer.push(
      `${customKanjiBoxData.data.kanji} ${currentNumber}`
    );
    tempArray.columns[currentColumnId].numberOfItems =
      tempArray.columns[currentColumnId].numberOfItems + numberOfItems;
    setCurrentKanjiId(`${customKanjiBoxData.data.kanji} ${currentNumber}`);
  };

  const addKanjiHelperBlock = (
    type,
    numberOfSlots,
    strokeOrderEnabled = false,
    strokeNum
  ) => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
    let contentAdded = false;

    // <KanjiAndDefinitionHelperBlock data={customKanjiBoxData.data} />;
    for (let index = 1; index < tempArray.columnOrder.length; index++) {
      if (!contentAdded) {
        let currentColumnId = `column-${index}`;
        if (index < 10) {
          currentColumnId = `column-0${index}`;
        } else {
          currentColumnId = `column-${index}`;
        }
        if (strokeOrderEnabled) {
          setAddStrokeOrder(true);
        }
        // if (customKanjiGridData.columns[currentColumnId].numberOfItems > 11 ){}
        let spotsInUse = calculateSpotsInUse(currentColumnId, tempArray);
        if (spotsInUse < 11) {
          // 11 is the max number of blank/kanji boxs one row can hold
          switch (type) {
            case "Kanji and Definition":
              if (spotsInUse <= 7) {
                // 7 is 11 - 4  - 4 comes from the number of spaces the definition block takes
                addKanji(tempArray, type, currentColumnId, numberOfSlots);

                setRenderDataUpdated(false);
                dispatch(storeActions.setCustomKanjiGridData(tempArray));
                setData(tempArray);
                setCurrentNumber(currentNumber + 1);
                contentAdded = true;
              }
              break;
            case "Stroke Order":
              strokeOrderHandler(
                tempArray,
                type,
                currentColumnId,
                numberOfSlots,
                strokeNum
              );
              setRenderDataUpdated(false);

              setCurrentKanjiId(
                `${customKanjiBoxData.data.kanji} ${currentNumber}`
              );

              dispatch(storeActions.setCustomKanjiGridData(tempArray));
              setData(tempArray);
              setCurrentNumber(currentNumber + 1);

              contentAdded = true;

              break;
            case "Kanji Only":
              addKanji(tempArray, type, currentColumnId, numberOfSlots);
              setRenderDataUpdated(false);

              dispatch(storeActions.setCustomKanjiGridData(tempArray));
              setData(tempArray);
              setCurrentNumber(currentNumber + 1);
              contentAdded = true;
              break;
            default:
              break;
          }
        }
        if (
          spotsInUse === 11 &&
          !contentAdded &&
          index === tempArray.columnOrder.length - 1
        ) {
          // in this scenario no content can be added since all the spaces have been taken
          // In the case above we should create a new page for the added content to go onto

          const lastColumnIndex = tempArray.columnOrder.length;
          for (let i = 0; i < 14; i++) {
            tempArray.columnOrder[lastColumnIndex + i] = `column-${
              lastColumnIndex + i + 1
            }`;
            tempArray.columns[`column-${lastColumnIndex + i + 1}`] = {
              id: `column-${lastColumnIndex + i + 1}`,
              idContainer: [],
              numberOfItems: 0,
            };
          }
          currentColumnId = `column-${lastColumnIndex + 1}`;
          switch (type) {
            case "Kanji and Definition":
              addKanji(tempArray, type, currentColumnId, numberOfSlots);

              dispatch(storeActions.setCustomKanjiGridData(tempArray));
              setData(tempArray);
              setCurrentNumber(currentNumber + 1);
              setRenderDataUpdated(false);
              contentAdded = true;
              break;
            case "Stroke Order":
              strokeOrderHandler(
                tempArray,
                type,
                currentColumnId,
                numberOfSlots,
                strokeNum
              );

              setCurrentKanjiId(
                `${customKanjiBoxData.data.kanji} ${currentNumber}`
              );

              dispatch(storeActions.setCustomKanjiGridData(tempArray));
              setData(tempArray);
              setCurrentNumber(currentNumber + 1);
              setRenderDataUpdated(false);

              contentAdded = true;

              break;
            case "Kanji Only":
              setRenderDataUpdated(false);
              addKanji(tempArray, type, currentColumnId, numberOfSlots);

              dispatch(storeActions.setCustomKanjiGridData(tempArray));
              setData(tempArray);
              setCurrentNumber(currentNumber + 1);
              contentAdded = true;
              break;
            default:
              break;
          }
        }
      }
    }
  };

  const fillButtonHandler = () => {
    let openSpaceArray = spacesAvailableCalculator(customKanjiGridData);
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
    let tempNumber = currentNumber;
    for (let arr of openSpaceArray) {
      let numberOfOpenSpaces = arr[0];
      let columnId = arr[1];

      if (numberOfOpenSpaces > 0) {
        for (let u = 0; u < numberOfOpenSpaces; u++) {
          let idString = `blank-${tempNumber}`;
          tempArray.contentContainer[idString] = {
            id: `blank-${tempNumber}`,
            content: { contents: [] },
            type: "Blank",
          };
          tempArray.columns[columnId].idContainer.push(`blank-${tempNumber}`);
          tempNumber++;
        }
      }
    }
    setCurrentNumber(tempNumber);

    dispatch(storeActions.setCustomKanjiGridData(tempArray));
    setData(tempArray);
    setRenderDataUpdated(false);
  };
  useEffect(() => {
    if (fillButtonClicked) {
      fillButtonHandler();
      dispatch(storeActions.setFillButtonClicked(false));
    }
  }, [fillButtonClicked]);

  // useEffect helps with blankSquares
  useEffect(() => {
    if (blankSquaresArray.length !== 0) {
      let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
      let tempNumber = currentNumber;
      for (let i = 0; i < blankSquaresArray.length; i++) {
        // <KanjiAndDefinitionHelperBlock data={customKanjiBoxData.data} />;
        let idString = `blank-${tempNumber}`;
        let blankSpaceAdded = false;

        tempArray.contentContainer[idString] = {
          id: `blank-${tempNumber}`,
          content: { contents: [] },
          type: "Blank",
        };
        for (let q = 1; q < tempArray.columnOrder.length + 1; q++) {
          let columnId = "";
          if (q < 10) {
            columnId = `column-0${q}`;
          } else {
            columnId = `column-${q}`;
          }
          let numberOfSpotsInUse = calculateSpotsInUse(columnId, tempArray);
          if (numberOfSpotsInUse <= 10 && !blankSpaceAdded) {
            tempArray.columns[columnId].idContainer.push(`blank-${tempNumber}`);
            blankSpaceAdded = true;
          }
        }
        tempNumber++;
      }

      dispatch(storeActions.setCustomKanjiGridData(tempArray));
      dispatch(storeActions.setBlankSquaresArray(""));
      setData(tempArray);
      setCurrentNumber(tempNumber);
      setRenderBlankSquares(true);
    }
  }, [blankSquaresArray]);

  // rendering Blank Squares
  useEffect(() => {
    if (renderBlankSquares) {
      updateRenderedGridData();
      setRenderBlankSquares(false);
    }
  }, [renderBlankSquares]);

  useEffect(() => {
    if (typeof customKanjiBoxData.type !== "undefined") {
      switch (customKanjiBoxData.type[0]) {
        case "Kanji and Definition":
          addKanjiHelperBlock("Kanji and Definition", 4);
          // kanji BLock takes 1 space and defintion takes 3
          break;
        case "Kanji and Stroke Order":
          addKanjiHelperBlock("Kanji Only", 1, true);
          // type, numberOfStrokes, strokeOrderEnabled defualt false
          // we need to render the kanji and stroke order box as individual elements
          // so we start with the kanji only block
          break;
        case "Kanji, Stroke Order and Definitions":
          addKanjiHelperBlock("Kanji and Definition", 4, true);
          // type, numberOfStrokes, strokeOrderEnabled
          // we need to render the kanji and defintion block sepearte from the stroke order elements
          // so we simply run the kanji and definition block with stroke order enabled
          break;
        case "Kanji Only":
          addKanjiHelperBlock("Kanji Only", 1);
          break;
        default:
          break;
      }
    }
  }, [customKanjiBoxData]);
  //

  useEffect(() => {
    if (
      typeof customKanjiGridData.columnOrder !== "undefined" &&
      !renderDataUpdated
    ) {
      updateRenderedGridData();
      setRenderDataUpdated(true);
    }
  }, [data, databaseLoaded]);
  useEffect(() => {
    if (okayClearButtonClicked) {
      updateRenderedGridData();
      dispatch(storeActions.setOkayClearButtonClicked(false));
    }
  }, [okayClearButtonClicked]);

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
        currentColumnIdNumber !== tempArray.columnOrder.length + 15 &&
        !pageBreakAdded
      ) {
        pageBreakAdded = true;
        tempMappedData.push(
          <PageBreakColumn
            key={pageBreakIndex}
            column={column}
            container={container}
            index={index}
          />
        );
        pageBreakIndex++;
      }
      pageBreakAdded = false;
      tempMappedData.push(
        <Column
          key={column.id}
          column={column}
          container={container}
          index={index}
          strokeNum={strokeNum}
        />
      );
      columnIdIndex++;
    }

    setMappedData(tempMappedData);
  };
  useEffect(() => {
    if (customKanjiDeleteIconClicked) {
      updateRenderedGridData();
      dispatch(storeActions.setCustomKanjiDeleteIconClicked(false));
    }
  }, [customKanjiDeleteIconClicked]);
  // handling newPageCreation
  useEffect(() => {
    if (newPageClicked) {
      updateRenderedGridData();
      dispatch(storeActions.setNewPageClicked(false));
    }
  }, [newPageClicked]);
  // useEffect to handle Adding Stroke Orders
  useEffect(() => {
    if (addStrokeOrder) {
      addKanjiHelperBlock("Stroke Order", 1, false, 0);
    }
  }, [addStrokeOrder]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // returning if the dragged item is moved outside of the contianer

    if (!destination) {
      return;
    }
    if (typeof destination === "undefined") {
      return;
    }
    // the if statement below returns nothing when the user buts something back in

    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // since the columns are also draggable we need to check the type of what is being moved

    // user dropped into original position

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    // Before the drop event can occur we need to check if there is enough free space for the element to enter the column
    // Step 1. Calculating the number of open Spaces on the column the eleemnt is being dragged into
    const spotsInUseAtFinish = calculateSpotsInUse(
      finish.id,
      customKanjiGridData
    );
    // const activeDraggedElementId = result.draggableId;
    if (spotsInUseAtFinish >= 11) {
      return;
    }

    if (start === finish) {
      // if you place it in the same column
      const newContainerIds = Array.from(start.container);
      // best practice to create new object and not mutate source
      newContainerIds.splice(source.index, 1);
      // from source.index remove one item
      newContainerIds.splice(destination.index, 0, draggableId);
      //removving nothing then adding in the new container ids
      const newColumn = {
        ...start,
        idContainer: newContainerIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      setRenderDataUpdated(false);
      dispatch(storeActions.setCustomKanjiGridData(newState));

      return;
    }
    // below handles if drag and drop columns are not equal
    if (start !== finish) {
      const startContainerIds = Array.from(start.idContainer);

      startContainerIds.splice(source.index, 1);
      const newStart = {
        ...start,
        idContainer: startContainerIds,
      };
      const finishContainerIds = Array.from(finish.idContainer);

      finishContainerIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        idContainer: finishContainerIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      setData(newState);

      dispatch(storeActions.setCustomKanjiGridData(newState));
      setRenderDataUpdated(false);
      return;
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div onDragEnd={onDragEnd} className={classes.mainContainer}>
          {mappedData}
        </div>
      </DragDropContext>
    </>
  );
};
export default DragNDropContainer;
