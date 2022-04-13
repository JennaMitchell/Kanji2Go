import styled from "styled-components";
// import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import Contents from "./contents";
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 1150px;
  justify-content: center;
  background-color: white;
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
  width: 1150px;
  display: flex;
  top: auto !important;
  left: auto !important;
`;

const Column = ({ column, container, index }) => {
  // console.log(container);
  return (
    <Container>
      <Droppable droppableId={column.id} direction="horizontal">
        {(provided, snapshot) => (
          <KanjiContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            direction="horizontal"
          >
            {container.map((contents, index) => (
              <Contents
                key={contents.id}
                content={contents.content}
                index={index}
                dragId={contents.id}
                type={contents.type}
              />
            ))}
            {provided.placeholder}
          </KanjiContainer>
        )}
      </Droppable>
    </Container>
  );
};
export default Column;
