import styles from "./StatusComponent.module.css";
import menuIcon from "../../assets/menuIcon.svg";
import arrDown from "../../assets/arrDown.svg";
import arrUp from "../../assets/arrUp.svg";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import BoardContext from "../../store/board-context";
import { deleteTask } from "../../services/task";

const TaskCard = ({priority,title,checkList,collapseAll,taskId}) => {
  const boardCtx=useContext(BoardContext)
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  console.log('taskcomponent','taskId',taskId,typeof taskId,collapseAll,priority)
 
  const toggleCollapseHandler = () => {
    setShowMore((prev) => !prev);
  };

  const toggleMenuHandler = () => {
    
    setShowMenu((prev) => !prev);
  };

  const onClickDeleteHandler=async(taskId)=>{
    const response=await deleteTask(taskId)
    console.log('deleteHandle in task comp',response)
    boardCtx?.removeTask(taskId)
  }

  const onClickEditHandler=()=>{

  }

  useEffect(()=>{
    setShowMore(false)
  },[collapseAll])

  
  return (
    <>
    
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.dotWrapper}>
          <p className={styles.greenDot}></p>
          <span>{priority?.toUpperCase()} PRIORITY</span>
        </div>
        <div className={styles.dotIconWrapper} onClick={toggleMenuHandler} onBlur={toggleMenuHandler}>
          <img src={menuIcon} alt="doticon"  />
          {showMenu && (
            <div className={styles.menuPopup}>
              <div className={styles.popupText} onClick={()=>onClickEditHandler(taskId)}>Edit</div>
              <div className={styles.popupText}>Share</div>
              <div className={styles.deletePopupText} onClick={()=>onClickDeleteHandler(taskId)}>Delete</div>
            </div>
          )}
        </div>
      </div>
      <p className={styles.cardTitle}>{title}</p>
      <div className={styles.checkListWrapper}>
        <div className={styles.checkListHeading}>Checklist (0/{checkList?.length})</div>
        <img
          src={showMore ? arrUp : arrDown}
          alt="arr icon"
          onClick={toggleCollapseHandler}
        />
      </div>
      {showMore && (
        <div className={styles.optionsContainer}>
          {
            checkList?.map((option)=>{
              return <div className={styles.singleOption} key={option.optionId}>
              <input type="checkbox" checked={option?.isTick} className={styles.checkInput} />
              <input type="text" value={option?.checkText} className={styles.input} />
            </div>
            })
          }
          
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
    </>
  );
};

TaskCard.propTypes = {
 
  collapseAll:PropTypes.bool,
  priority:PropTypes.string,
  title:PropTypes.string,
  checkList:PropTypes.array,
  taskId:PropTypes.string,

};

export default TaskCard;
