import gridData from "./gridData";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import Column from "./column";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../store/store";
import PageBreakColumn from "./pageBreakColumn";

const StylizedContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: repeat(10, 120px);
  column-gap: 0;
  color: black;
`;

const DragNDropContainer = () => {
  const [data, setData] = useState(gridData);
  const [mappedData, setMappedData] = useState();
  const customKanjiBoxData = useSelector((state) => state.customKanjiBoxData);
  const customKanjiGridData = useSelector((state) => state.customKanjiGridData);
  const blankSquaresArray = useSelector((state) => state.blankSquaresArray);
  const databaseLoaded = useSelector((state) => state.databaseLoaded);
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(0);
  const customKanjiDeleteIconClicked = useSelector(
    (state) => state.customKanjiDeleteIconClicked
  );
  const [addStrokeOrder, setAddStrokeOrder] = useState(false);
  const newPageClicked = useSelector((state) => state.newPageClicked);
  const [currentKanjiId, setCurrentKanjiId] = useState("");

  const calculateSpotsInUse = (columnId) => {
    let numberOfSlotsInUse = 0;
    let activeIds = customKanjiGridData.columns[columnId].idContainer;

    for (let q = 0; q < activeIds.length; q++) {
      let columnContent = customKanjiGridData.contentContainer[activeIds[q]];
      console.log(columnContent);
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
        default:
          break;
      }
    }

    return numberOfSlotsInUse;
  };
  const addStrokeOrderText = (
    tempArray,
    type,
    currentColumnId,
    numberOfItems,
    strokeNum,
    numberOfStrokesToAdd
  ) => {
    for (let i = 0; i < numberOfStrokesToAdd; i++) {
      let extractableStrokeNum = "";
      if (i < 10) {
        extractableStrokeNum = `0${i}`;
      } else {
        extractableStrokeNum = `${i}`;
      }

      tempArray.contentContainer[
        `${customKanjiBoxData.data.kanji} ${
          currentNumber + i
        } ${extractableStrokeNum}`
      ] = {
        id: `${[customKanjiBoxData.data.kanji]} ${
          currentNumber + i
        } ${extractableStrokeNum}`,
        content: [customKanjiBoxData.data],
        type: type,
        strokeNum: i,
      };
      tempArray.columns[currentColumnId].idContainer.push(
        `${customKanjiBoxData.data.kanji} ${
          currentNumber + i
        } ${extractableStrokeNum}`
      );
      tempArray.columns[currentColumnId].numberOfItems =
        tempArray.columns[currentColumnId].numberOfItems + numberOfItems;
    }
    console.log(tempArray);
    setCurrentKanjiId(
      `${customKanjiBoxData.data.kanji} ${
        currentNumber + numberOfStrokesToAdd - 1
      }`
    );
    dispatch(storeActions.setCustomKanjiGridData(tempArray));
    setData(tempArray);
    setCurrentNumber(currentNumber + 1);
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
    let numberOfStorkesToAdd = customKanjiBoxData.data.strokes[0];
    //  console.log(customKanjiBoxData.data.strokes[0]);

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
        let spotsInUse = calculateSpotsInUse(currentColumnId);
        if (spotsInUse !== 11) {
          // 11 is the max number of blank/kanji boxs one row can hold
          switch (type) {
            case "Kanji and Definition":
              if (spotsInUse !== 7) {
                // 7 is 11 - 4  - 4 comes from the number of spaces the definition block takes
                addKanji(tempArray, type, currentColumnId, numberOfSlots);
                dispatch(storeActions.setCustomKanjiGridData(tempArray));
                setData(tempArray);
                setCurrentNumber(currentNumber + 1);
                contentAdded = true;
              }
              break;
            case "Stroke Order":
              addStrokeOrderText(
                tempArray,
                type,
                currentColumnId,
                numberOfSlots,
                strokeNum,
                numberOfStorkesToAdd
              );
              contentAdded = true;

              break;
            case "Kanji Only":
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

  // useEffect helps with blankSquares
  useEffect(() => {
    if (blankSquaresArray.length !== 0) {
      let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
      let tempNumber = currentNumber;
      for (let i = 0; i < blankSquaresArray.length; i++) {
        // <KanjiAndDefinitionHelperBlock data={customKanjiBoxData.data} />;
        let idString = `blank-${tempNumber}`;

        tempArray.contentContainer[idString] = {
          id: `blank-${tempNumber}`,
          content: [customKanjiBoxData.data],
          type: "Blank",
        };

        tempArray.columns["column-1"].idContainer.push(`blank-${tempNumber}`);
        // need to update this
        tempNumber++;
      }

      dispatch(storeActions.setCustomKanjiGridData(tempArray));
      dispatch(storeActions.setBlankSquaresArray(""));
      setData(tempArray);
      setCurrentNumber(tempNumber);
    }
  }, [blankSquaresArray]);

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
    // need to fix issue where this is running twice;
    if (typeof customKanjiGridData.columnOrder !== "undefined") {
      updateRenderedGridData();
      console.log("208");
    }
  }, [data, databaseLoaded]);
  const updateRenderedGridData = () => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
    console.log(tempArray);

    let pageBreakAdded = false;
    let tempMappedData = [];
    let strokeNum = "";

    let numberOfBreaks = tempArray.columnOrder.length / 10 - 1;
    let newArrayLength = tempArray.columnOrder.length + numberOfBreaks;
    let columnIdIndex = 0;
    let pageBreakIndex = 1;

    for (let index = 0; index < newArrayLength; index++) {
      let columnId = tempArray.columnOrder[columnIdIndex];
      let currentColumnIdNumber = +columnId.slice(-2);
      // console.log(`current Column Id = ${currentColumnIdNumber}`);
      // console.log(`index = ${index}`);
      const column = tempArray.columns[columnId];
      console.log(column);
      let container = column.idContainer.map(
        (id) => tempArray.contentContainer[id]
      );
      console.log(container);

      if (
        currentColumnIdNumber % 11 === 0 &&
        currentColumnIdNumber !== data.columnOrder.length + 10 &&
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
      } else {
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

    if (start === finish) {
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
      return;
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <StylizedContainer>{mappedData}</StylizedContainer>
      </DragDropContext>
    </>
  );
};
export default DragNDropContainer;
