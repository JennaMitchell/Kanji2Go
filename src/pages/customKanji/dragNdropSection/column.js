import styled from "styled-components";
// import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import Contents from "./contents";
const Container = styled.div`
  border: 2px solid black;
  border-radius: 2px;
  width: max(1175px, 1175px);

  height: 120px;
  @media (max-width: 1200px) {
    width: max(90vw, 90vw);
    overflow-x: scroll;
    overflow-y: hidden;

    background-color: transparent;
    position: relative;
  }
`;

const KanjiContainer = styled.div`
  padding: 8px;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  transition: background-color 0.2s ease;
  height: 120px;
  width: max(1175px, 1175px);
  display: flex;
  align-items: center;
  top: auto !important;
  left: auto !important;
  @media (max-width: 1200px) {
    width: max(1175px, 1175px);
  }
`;

const Column = ({ column, container, strokeNum }) => {
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
                stroke={index - 1}
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
