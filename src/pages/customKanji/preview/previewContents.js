import styled from "styled-components";
import kanjiStrokeDatabase from "../../../kanjiStrokeSVGs/kanjiStrokeDatabase";
import PreviewStrokeContainer from "./previewHelperBlocks/previewStrokeContainer";
import PreviewKanjiAndDefinitionBlock from "./previewHelperBlocks/previewKanjiAndDefBlock";
import PreviewKanjiOnlyBlock from "./previewHelperBlocks/previewKanjiOnlyBlock";
import PreviewBlankBox from "./previewHelperBlocks/previewBlankBox";

const BlankSpaceContainer = styled.div`
  border: 1px solid black;
  padding: 8px;
  border-radius: 2px;
  width: min(100px, 100px);
  height: min(100px, 100px);
  background-color: white;
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
  background-color: white;
`;
const KanjiContainer = styled.div`
  width: min(100px, 100px);
  height: min(100px, 100px);
  display: grid;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
  top: auto !important;
  left: auto !important;
  margin-right: 5px;
  background-color: white;
`;
const PreviewContents = ({
  content,
  index,
  dragId,
  type,
  stroke,
  downloadClicked,
}) => {
  let itemToRender = "";
  switch (type) {
    case "Kanji and Definition":
      itemToRender = (
        <KDContainer>
          <PreviewKanjiAndDefinitionBlock
            data={content}
            id={dragId}
            downloadClicked={downloadClicked}
          />
        </KDContainer>
      );

      break;
    case "Stroke Order":
      let kanjiStrokeData = kanjiStrokeDatabase[content[0].kanji[0]];
      itemToRender = (
        <KanjiContainer>
          <PreviewStrokeContainer
            strokeData={kanjiStrokeData}
            data={content}
            id={dragId}
            stroke={stroke}
          />
        </KanjiContainer>
      );
      break;
    case "Kanji Only":
      itemToRender = (
        <KanjiContainer>
          <PreviewKanjiOnlyBlock
            data={content}
            id={dragId}
            downloadClicked={downloadClicked}
          />
        </KanjiContainer>
      );
      break;
    case "Blank":
      itemToRender = (
        <BlankSpaceContainer>
          <PreviewBlankBox id={dragId} />
        </BlankSpaceContainer>
      );
      break;
    default:
      break;
  }

  return itemToRender;
};
export default PreviewContents;
