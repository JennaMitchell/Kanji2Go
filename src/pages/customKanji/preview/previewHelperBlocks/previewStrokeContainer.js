import styled from "styled-components";

const KanjiContainer = styled.div`
  width: min(80px, 80px);
  height: min(80px, 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 56px;
`;
// const Kanji = styled.p`
//   width: min(60px, 60px);
//   height: min(60px, 60px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-size: 56px;
// `;

const PreviewStrokeContainer = ({ id, strokeData }) => {
  let extractedStroke = +id.slice(-2);

  let strokeToRender = strokeData[extractedStroke];

  return (
    <>
      <KanjiContainer>{strokeToRender}</KanjiContainer>
    </>
  );
};
export default PreviewStrokeContainer;
