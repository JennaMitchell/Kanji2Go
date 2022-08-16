import styled from "styled-components";
import { TrashIcon } from "@heroicons/react/solid";
import classes from "./icon.module.css";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";
import blankImage from "../../../../img/BlankKanjiSquare.svg";

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
const BlankSquareImage = styled.image`
  width: min(100px, 100px);
  height: min(100px, 100px);
`;
const Container = styled.div`
  width: min(100px, 100px);
  height: min(100px, 100px);
  top: auto !important;
  left: auto !important;
`;
const BlankHelperBox = ({ id }) => {
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
    <Container>
      <BlankSquareImage src={blankImage}></BlankSquareImage>
      <TrachIconContainer onClick={trashIconHandler}>
        <TrashIcon className={classes.icon}></TrashIcon>
      </TrachIconContainer>
    </Container>
  );
};
export default BlankHelperBox;
