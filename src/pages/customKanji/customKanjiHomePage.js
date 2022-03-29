import classes from "./customKanjiHomePage.module.css";
import { Container, Heading } from "@chakra-ui/react";
import NavBar from "../../nav/navBar";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
/// DragDropContext cannot be nested and enables the ability for drag and droping
// Droppable  used to create a droppable area, meaning it will allow us to provide a specfic area where our items can be moved around inside
// Draggable  will include a function where we can pass props to our list item components
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import AddComponentMenu from "./addComponentMenu";
import AddKanjiPopup from "./AddKanjiPopUp/AddKanjiPopup";
import BlankSquareAdder from "./blankSquareAdder";

const CustomKanjiHomePage = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  // const captureClicked = () => {
  //   console.log(exportRef.current);
  //   exportAsImage(exportRef.current, "test");
  // };
  const [listUpdated, setListUpdated] = useState([
    ".boxOne",
    ".boxTwo",
    ".boxThree",
  ]);
  const handleOnDragEnd = (result) => {
    const items = Array.from(listUpdated);
    // createes a new copy of the listUpdated array
    const [reorderedItems] = items.splice(result.source.index, 1);
    // the source.index value is used to find out item from our new array and remove it using the splice method.
    // the results is then destructured, to create a new object of reorderedItems
    items.splice(result.destination.index, 0, reorderedItems);
    // destination.index is used to add that item back into th array but at its new location again using splice
    setListUpdated(items);
  };
  const exportRef = useRef();
  // use this to create a reference to teh DOM element and pass it to the exportAsImage function
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const addButtonHandler = () => {
    setAddButtonClicked(!addButtonClicked);
  };
  const addKanjiMenu = useSelector((state) => state.addKanjiMenu);
  const blankSquareMenu = useSelector((state) => state.blankSquareMenu);
  return (
    <>
      {pageButtonClicked ? <PageMenu /> : ""}
      {shopNavButtonClicked ? <ShopMenu /> : ""}
      {loginButtonClicked ? <LoginPopup /> : ""}
      {loginButtonClicked && <div className={classes.blurBackground}></div>}
      {addKanjiMenu && <div className={classes.blurBackground}></div>}
      {addKanjiMenu && <AddKanjiPopup />}
      {blankSquareMenu && <BlankSquareAdder />}
      {blankSquareMenu && <div className={classes.blurBackground}></div>}

      <div
        className={`${loginButtonClicked && classes.loginClickedHomepage} ${
          addKanjiMenu && classes.loginClickedHomepage
        }`}
      >
        <NavBar />
        <Container
          maxW="100%"
          h="150px"
          p="0"
          bgColor="#dc5357"
          m="0"
          pos="relative"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            w="max-content"
            textAlign="center"
            h="max-content"
            fontSize="64px"
            color="brand.900"
            borderBottom="2px"
          >
            Custom Kanji Sheets
          </Heading>
        </Container>
        <Container
          maxW="100%"
          h="1000px"
          pos="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          transition="1s"
          bgColor="brand.900"
        >
          <div
            className={`${
              addButtonClicked
                ? classes.addMenuContainerClicked
                : classes.addMenuContainer
            }`}
            onClick={addButtonHandler}
          >
            {addButtonClicked ? (
              <MinusIcon
                className={`${
                  addButtonClicked ? classes.addIconClicked : classes.addIcon
                }`}
              />
            ) : (
              <PlusIcon className={classes.addIcon} />
            )}
            {addButtonClicked && <AddComponentMenu />}
          </div>
          {/* <button className={classes.exportButton} onClick={captureClicked}>
            Capture the Paragraph
          </button>
          <div ref={exportRef}>
            <p className={classes.hello}>Hello Jenna!</p>
          </div> */}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div
                  className={classes.kanjiSheet}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {listUpdated.map((boxName, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={`${classes.box}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{boxName}</p>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      </div>
    </>
  );
};
export default CustomKanjiHomePage;
// droppableId is used to allow us to track which isntances are interacting between interactions
// the provided functio ncan take two argumetns including a snapshot argumenbt
// however it currenly is being used to include info and refs to code that the library need s to work properly

//ref={provided.innerRef}
// creates a referencefor the libary tro access the elements inside.
//  {...provided.droppableProps}
//  (provided.droppableProps) that allows the library to keep track of movements and positioning.0
