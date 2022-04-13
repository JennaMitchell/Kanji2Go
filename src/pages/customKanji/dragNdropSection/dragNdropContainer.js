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
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(0);
  const customKanjiDeleteIconClicked = useSelector(
    (state) => state.customKanjiDeleteIconClicked
  );
  const newPageClicked = useSelector((state) => state.newPageClicked);
  const addKanji = (tempArray, type, currentColumnId) => {
    tempArray.contentContainer[
      `${customKanjiBoxData.data.kanji} ${currentNumber}`
    ] = {
      id: `${[customKanjiBoxData.data.kanji]} ${currentNumber}`,
      content: [customKanjiBoxData.data],
      type: type,
    };
    tempArray.columns[currentColumnId].idContainer.push(
      `${customKanjiBoxData.data.kanji} ${currentNumber}`
    );
  };
  const addKanjiHelperBlock = (type, numberOfSlots) => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
    let tempNumberHolder = 0;

    // <KanjiAndDefinitionHelperBlock data={customKanjiBoxData.data} />;
    for (let index = 1; index < 11; index++) {
      let currentColumnId = `column-${index}`;
      tempNumberHolder =
        tempArray.columns[currentColumnId].numberOfItems + numberOfSlots;

      if (tempNumberHolder > 11) {
        if (type === "Kanji and Stroke Order") {
          //&& type !=="Kanji, Stroke Order and Definitions")
          let numberOfOpenSlots =
            11 - tempArray.columns[currentColumnId].numberOfItem;
          if (numberOfOpenSlots === 1) {
            addKanji(tempArray, type, currentColumnId);
          } else {
            addKanji(tempArray);
          }
        }
      } else {
        addKanji(tempArray, type, currentColumnId);
      }
    }
    // need to update this

    console.log(tempArray);
    dispatch(storeActions.setCustomKanjiGridData(tempArray));
    setData(tempArray);
    setCurrentNumber(currentNumber + 1);
  };
  // useEffect helps with blankSquares
  useEffect(() => {
    if (blankSquaresArray.length !== 0) {
      let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
      let tempNumber = currentNumber;
      for (let i = 0; i < blankSquaresArray.length; i++) {
        // <KanjiAndDefinitionHelperBlock data={customKanjiBoxData.data} />;
        let idString = `blank-${tempNumber}`;
        console.log(idString);

        tempArray.contentContainer[idString] = {
          id: `blank-${tempNumber}`,
          content: [customKanjiBoxData.data],
          type: "Blank",
        };

        tempArray.columns["column-1"].idContainer.push(`blank-${tempNumber}`);
        // need to update this
        tempNumber++;
      }

      console.log(tempArray);
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
          break;
        case "Kanji and Stroke Order":
          addKanjiHelperBlock(
            "Kanji and Stroke Order",
            customKanjiBoxData.data.strokes[0] + 1
          );
          break;
        case "Kanji, Stroke Order and Definitions":
          addKanjiHelperBlock(
            "Kanji, Stroke Order and Definitions",
            customKanjiBoxData.data.strokes[0] + 5
          );
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
    let tempMappedData = data.columnOrder.map((columnId, index) => {
      let currentColumnIdNumber = +columnId.slice(-2);
      const column = data.columns[columnId];
      const container = column.idContainer.map(
        (id) => data.contentContainer[id]
      );
      if (
        currentColumnIdNumber % 10 === 0 &&
        index !== data.columnOrder.length - 1
      ) {
        return (
          <>
            <PageBreakColumn />
            <Column
              key={column.id}
              column={column}
              container={container}
              index={index}
            />
          </>
        );
      } else {
        return (
          <Column
            key={column.id}
            column={column}
            container={container}
            index={index}
          />
        );
      }
    });

    setMappedData(tempMappedData);
  }, [data]);
  const updateRenderedGridData = () => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));
    let pageBreakAdded = false;
    let tempMappedData = [];

    let numberOfBreaks = tempArray.columnOrder.length / 10 - 1;
    let newArrayLength = tempArray.columnOrder.length + numberOfBreaks;
    let columnIdIndex = 0;
    let pageBreakIndex = 1;

    for (let index = 0; index < newArrayLength; index++) {
      let columnId = tempArray.columnOrder[columnIdIndex];
      let currentColumnIdNumber = +columnId.slice(-2);
      console.log(`current Column Id = ${currentColumnIdNumber}`);
      console.log(`index = ${index}`);
      const column = tempArray.columns[columnId];
      let container = column.idContainer.map(
        (id) => tempArray.contentContainer[id]
      );

      if (
        currentColumnIdNumber % 11 === 0 &&
        currentColumnIdNumber !== data.columnOrder.length + 10 &&
        !pageBreakAdded
      ) {
        console.log(data.columnOrder.length);
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
      return;
    }
    // below handles if drag and drop columns are not equal
    if (start !== finish) {
      const startContainerIds = Array.from(start.idContainer);
      console.log(startContainerIds);
      startContainerIds.splice(source.index, 1);
      const newStart = {
        ...start,
        idContainer: startContainerIds,
      };
      const finishContainerIds = Array.from(finish.idContainer);
      console.log(finishContainerIds);
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
