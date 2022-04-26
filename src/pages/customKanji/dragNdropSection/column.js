import styled from "styled-components";
// import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import Contents from "./contents";
const Container = styled.div`
  border: 2px solid black;
  border-radius: 2px;
  width: max(1190px, 1190px);
  justify-content: center;
  background-color: white;
  height: 120px;
`;

const KanjiContainer = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  transition: background-color 0.2s ease;
  height: 118px;
  width: max(1190px, 1190px);
  display: flex;
  top: auto !important;
  left: auto !important;
`;

const Column = ({ column, container, strokeNum }) => {
  // container.map((contents, i) => {
  //   console.log(contents.id);
  //   return "";
  // })
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
