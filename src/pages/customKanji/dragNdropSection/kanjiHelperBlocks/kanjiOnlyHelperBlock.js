import styled from "styled-components";
import { TrashIcon } from "@heroicons/react/solid";
import classes from "./icon.module.css";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";

const KanjiContainer = styled.div`
  width: min(80px, 80px);
  height: min(80px, 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: auto !important;
  left: auto !important;
`;
const Kanji = styled.p`
  width: min(60px, 60px);
  height: min(60px, 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 56px;
`;

const TrachIconContainer = styled.button`
  width: min(15px, 15px);
  height: min(15px, 15px);
  position: absolute;
  top: 2.5px;
  right: 2.5px;
  &:hover {
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.p`
  font-size: 14px;
  text-align: center;
`;
const KanjiOnlyHelperBlock = ({ data, id }) => {
  let extractedData = data[0];
  const dispatch = useDispatch();

  const customKanjiGridData = useSelector((state) => state.customKanjiGridData);

  const trashIconHandler = () => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));

    // finding the coluumn where the object we want to delete is at
    for (let i = 1; i < tempArray.columnOrder.length; i++) {
      let columnId = "";
      if (i < 10) {
        columnId = `column-0${i}`;
      } else {
        columnId = `column-${i}`;
      }

      if (tempArray.columns[columnId].idContainer.includes(id)) {
        let indexOfId = tempArray.columns[columnId].idContainer.indexOf(id);
        tempArray.columns[columnId].idContainer.splice(indexOfId, 1);
      }
    }

    delete tempArray.contentContainer[id];

    dispatch(storeActions.setCustomKanjiGridData(tempArray));
    dispatch(storeActions.setCustomKanjiDeleteIconClicked(true));
  };

  return (
    <>
      <KanjiContainer>
        <Kanji>{extractedData.kanji}</Kanji>
        <Text>Strokes: {extractedData.strokes}</Text>
      </KanjiContainer>
      <TrachIconContainer onClick={trashIconHandler}>
        <TrashIcon className={classes.icon}></TrashIcon>
      </TrachIconContainer>
    </>
  );
};
export default KanjiOnlyHelperBlock;
