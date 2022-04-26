import classes from "./customKanjiHomePage.module.css";
import { Container, Heading } from "@chakra-ui/react";
import NavBar from "../../nav/navBar";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";

import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import AddComponentMenu from "./addComponentMenu";
import AddKanjiPopup from "./AddKanjiPopUp/AddKanjiPopup";
import BlankSquareAdder from "./blankSquareAdder";

import DragNDropContainer from "./dragNdropSection/dragNdropContainer";
import Footer from "../../components/footer";
import PreviewSheet from "./previewSheet";
import ClearButtonWarning from "./clearButtonWarning";

const CustomKanjiHomePage = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const newPageClicked = useSelector((state) => state.newPageClicked);
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);

  const exportRef = useRef();
  // use this to create a reference to teh DOM element and pass it to the exportAsImage function
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [clearButtonClicked, setClearButtonClicked] = useState(false);
  const addButtonHandler = () => {
    setAddButtonClicked(!addButtonClicked);
  };
  const addKanjiMenu = useSelector((state) => state.addKanjiMenu);
  const blankSquareMenu = useSelector((state) => state.blankSquareMenu);
  const [previewButtonClicked, setPreviewButtonClicked] = useState();

  const previewButtonHandler = () => {
    setPreviewButtonClicked(!previewButtonClicked);
  };
  useEffect(() => {
    if (newPageClicked) {
      setAddButtonClicked(false);
    }
  }, [newPageClicked]);
  const clearButtonHandler = () => {
    console.log("hello");
    setClearButtonClicked(!clearButtonClicked);
  };

  return (
    <>
      {loginButtonClicked && <div className={classes.blurBackground}></div>}
      {addKanjiMenu && <div className={classes.blurBackground}></div>}
      {addKanjiMenu && <AddKanjiPopup />}
      {blankSquareMenu && <BlankSquareAdder />}
      {blankSquareMenu && <div className={classes.blurBackground}></div>}
      {previewButtonClicked && <div className={classes.blurBackground}></div>}
      {previewButtonClicked && (
        <PreviewSheet closingBtnHandler={previewButtonHandler} />
      )}
      {clearButtonClicked && (
        <ClearButtonWarning
          parentCancelButtonHandler={clearButtonHandler}
        ></ClearButtonWarning>
      )}
      {clearButtonClicked && <div className={classes.blurBackground}></div>}

      <div
        className={`${loginButtonClicked && classes.loginClickedHomepage} ${
          clearButtonClicked && classes.loginClickedHomepage
        } ${addKanjiMenu && classes.loginClickedHomepage} ${
          previewButtonClicked && classes.loginClickedHomepage
        } ${classes.mainContainer}`}
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
          {pageButtonClicked ? <PageMenu /> : ""}
          {shopNavButtonClicked ? <ShopMenu /> : ""}
          {loginButtonClicked ? <LoginPopup /> : ""}
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
          w="100%"
          h="1300px"
          pos="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          transition="1s"
          bgColor="brand.900"
          borderBottom="1px solid white"
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
          <div className={classes.imageButtonMenu}>
            <button
              className={classes.previewButton}
              onClick={previewButtonHandler}
            >
              Preview
            </button>
            <button
              className={classes.clearButton}
              onClick={clearButtonHandler}
            >
              Clear
            </button>
          </div>

          <div className={`${classes.dragNdropContainer}`} ref={exportRef}>
            <DragNDropContainer />
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};
export default CustomKanjiHomePage;
