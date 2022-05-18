import styled from "styled-components";
// import Task from "./task";
import PreviewContents from "./previewContents";
const Container = styled.div`
  width: max(1190px, 1190px);
  justify-content: center;
  background-color: white;
  height: 120px;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const KanjiContainer = styled.div`
  padding: 8px;
  background-color: inherit;
  transition: background-color 0.2s ease;
  height: min(120px, 120px);
  width: max(1190px, 1190px);
  display: flex;
  justify-items: center;
  align-items: center;
`;

const PreviewColumn = ({ column, container, strokeNum, downloadClicked }) => {
  return (
    <Container>
      <KanjiContainer>
        {container.map((contents, index) => (
          <PreviewContents
            key={contents.id}
            content={contents.content}
            index={index}
            dragId={contents.id}
            type={contents.type}
            stroke={index - 1}
            downloadClicked={downloadClicked}
          />
        ))}
      </KanjiContainer>
    </Container>
  );
};
export default PreviewColumn;
