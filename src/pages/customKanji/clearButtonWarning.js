import { useDispatch } from "react-redux";
import styled from "styled-components";
import { storeActions } from "../../store/store";
import gridData from "./dragNdropSection/gridData";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max(400px, 400px);
  height: max(300px, 300px);
  background-color: #221f1f;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 150px 100px;
  grid-template-columns: 400px;
  justify-content: center;
  align-items: center;
  z-index: 5;
  @media(max-width:430px){
    width: max(330px, 330px);
    height: max(300px, 300px);
    grid-template-rows: 50px 150px 100px;
    grid-template-columns: 300px;

    justify-items: center;
    align-items: center;
  }

`;
const Title = styled.h2`
  width: max(100%, 100%);
  height: max(50px, 50px);
  color: white;
  font-size: 36px;
  text-align: center;
  margin-top: 60px;
`;
const Dialog = styled.h3`
  width: max(90%, 90%);
  height: max(100%, 100%);
  font-size: 20px;
  color: white;
  text-align: center;
  margin-top: 120px;
  display: inline-block;
  margin-left: 5%;
  @media(max-width:430px){
    width: max(300px, 300px);
    height: max(100%, 100%);
  }

`;
const ButtonContainer = styled.div`
  width: max(100%, 100%);
  height: max(100%, 100%);
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: 70%;
  justify-content: space-evenly;
  align-items: center;
  @media(max-width:430px){
    grid-template-columns: 100px 100px;
    justify-content: space-between;
    width: max(300px,  300px);
   
  }
`;
const Button = styled.button`
  width: max(100%, 100%);
  height: max(100%, 100%);
  background-color: #e15e5e;
  border-radius: 10px;
  color: white;

  font-size: 26px;
  &:hover {
    background-color: #ec9898;
    color: black;
  }
`;
const ClearButtonWarning = ({ parentCancelButtonHandler }) => {
  const dispatch = useDispatch();
  const cancelButtonHandler = () => {
    parentCancelButtonHandler();
  };
  const okayButtonHandler = () => {
    dispatch(storeActions.setCustomKanjiGridData(gridData));
    dispatch(storeActions.setOkayClearButtonClicked(true));
    parentCancelButtonHandler();
  };
  return (
    <Container>
      <Title> Warning</Title>
      <Dialog>Clearing will delete all your entered data.</Dialog>
      <ButtonContainer>
        <Button onClick={okayButtonHandler}>Okay</Button>
        <Button onClick={cancelButtonHandler}>Cancel</Button>
      </ButtonContainer>
    </Container>
  );
};
export default ClearButtonWarning;
