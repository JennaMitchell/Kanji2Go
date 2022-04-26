import { TrashIcon } from "@heroicons/react/solid";
import styled from "styled-components";
import classes from "./pageBreakColumn.module.css";
// import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import Contents from "./contents";
const Container = styled.div`
  border-radius: 2px;
  width: 1300px;
  justify-content: center;
  background-color: black
  height: 120px;
  top: auto !important;
  left: auto !important;
`;

const KanjiContainer = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  transition: background-color 0.2s ease;
  height: 120px;
  width: 1300px;
  display: flex;
  top: auto !important;
  left: auto !important;
`;

const PageBreakColumn = ({ column, container, index }) => {
 
  return (
    <Container>
      <Droppable
        droppableId={column.id}
        direction="horizontal"
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <KanjiContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            direction="horizontal"
          ></KanjiContainer>
        )}
      </Droppable>
    </Container>
  );
};
export default PageBreakColumn;
