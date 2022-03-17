import classes from "./premadeKanjiMenu.module.css";

const PremadeKanjiFilterMenu = ({ menuButtonClicked }) => {
  return (
    <div
      className={`${classes.menuContainer} ${
        menuButtonClicked && classes.menuContainerMoveOut
      }`}
    ></div>
  );
};
export default PremadeKanjiFilterMenu;
