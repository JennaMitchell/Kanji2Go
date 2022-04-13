import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import KanjiAndDefinitionHelperBlock from "./kanjiHelperBlocks/kanjiAndDefinitionHelperBlock";
import KanjiOnlyHelperBlock from "./kanjiHelperBlocks/kanjiOnlyHelperBlock";
import BlankHelperBox from "./kanjiHelperBlocks/blankHelperBox";

const BlankSpaceContainer = styled.div`
  border: 1px solid black;
  padding: 8px;

  border-radius: 2px;
  width: min(100px, 100px);
  height: min(100px, 100px);
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
  top: auto !important;
  left: auto !important;
  position: relative;
  margin-right: 5px;
`;
const KDContainer = styled.div`
  width: min(420px, 420px);
  height: min(100px, 100px);
  display: grid;
  grid-template-columns: repeat(4, 85px);
  grid-template-rows: 100px;
  border: 2px solid black;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  margin-right: 5px;

  top: auto !important;
  left: auto !important;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;
const KanjiContainer = styled.div`
  width: min(120px, 120px);
  height: min(100px, 100px);
  display: grid;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
  top: auto !important;
  left: auto !important;
  margin-right: 5px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

const Contents = ({ content, index, dragId, type }) => {
  console.log(dragId);
  let itemToRender = "";
  switch (type) {
    case "Kanji and Definition":
      itemToRender = (
        <Draggable draggableId={dragId} index={index}>
          {(provided, snapshot) => (
            <KDContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <KanjiAndDefinitionHelperBlock data={content} id={dragId} />
            </KDContainer>
          )}
        </Draggable>
      );
      break;
    case "Kanji and Stroke Order":
      break;
    case "Kanji, Stroke Order and Definitions":
      break;
    case "Kanji Only":
      itemToRender = (
        <Draggable draggableId={dragId} index={index}>
          {(provided, snapshot) => (
            <KanjiContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <KanjiOnlyHelperBlock data={content} id={dragId} />
            </KanjiContainer>
          )}
        </Draggable>
      );
      break;
    case "Blank":
      itemToRender = (
        <Draggable draggableId={dragId} index={index}>
          {(provided, snapshot) => (
            <BlankSpaceContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <BlankHelperBox id={dragId} />
            </BlankSpaceContainer>
          )}
        </Draggable>
      );
      break;
    default:
      break;
  }

  return itemToRender;
};
export default Contents;
