import styled from "styled-components";

import kanjiStrokeData from "../../../../kanjiStrokeSVGs/kanjiStrokeDatabase";

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

const PreviewStrokeContainer = ({ id, strokeData }) => {
  let extractedStroke = +id.slice(-2);
  let extractedKanji = id.slice(0, 1);

  let masterString = `${extractedKanji}Strokes`;
  let finalSvg = kanjiStrokeData[masterString][extractedStroke];

  return (
    <>
      <KanjiContainer>
        <img src={finalSvg} alt="" />
      </KanjiContainer>
    </>
  );
};
export default PreviewStrokeContainer;
