import styles from "./StatusComponent.module.css";
import menuIcon from "../../assets/menuIcon.svg";
import arrDown from "../../assets/arrDown.svg";
import arrUp from "../../assets/arrUp.svg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TaskCard = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  // const ca=
  const toggleCollapseHandler = () => {
    setShowMore((prev) => !prev);
  };

  const toggleMenuHandler = () => {
    console.log('hey')
    setShowMenu((prev) => !prev);
  };

  useEffect(()=>{
    console.log('hey')
    setShowMore(false)
  },[props.collapseAll])

  console.log("running taskCard", showMore);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.dotWrapper}>
          <p className={styles.greenDot}></p>
          <span>HIGH PRIORITY</span>
        </div>
        <div className={styles.dotIconWrapper} onClick={toggleMenuHandler} onBlur={toggleMenuHandler}>
          <img src={menuIcon} alt="doticon"  />
          {showMenu && (
            <div className={styles.menuPopup}>
              <div className={styles.popupText}>Edit</div>
              <div className={styles.popupText}>Share</div>
              <div className={styles.deletePopupText}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <p className={styles.cardTitle}>Hero Section</p>
      <div className={styles.checkListWrapper}>
        <div className={styles.checkListHeading}>Checklist (0/3)</div>
        <img
          src={showMore ? arrUp : arrDown}
          alt="arr icon"
          onClick={toggleCollapseHandler}
        />
      </div>
      {showMore && (
        <div className={styles.optionsContainer}>
          <div className={styles.singleOption}>
            <input type="checkbox" className={styles.checkInput} />
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.singleOption}>
            <input type="checkbox" className={styles.checkInput} />
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.singleOption}>
            <input type="checkbox" className={styles.checkInput} />
            <input type="text" className={styles.input} />
          </div>
        </div>
      )}
      <div className={styles.cardFooter}>
        <p className={styles.dueDate}>Feb10th</p>
        <div className={styles.actionBtnWrapper}>
          <button className={styles.actionBtn}>PROGRESS</button>{" "}
          <button className={styles.actionBtn}>TO-DO</button>
          <button className={styles.actionBtn}>DONE</button>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
 
  collapseAll:PropTypes.bool
};

export default TaskCard;
