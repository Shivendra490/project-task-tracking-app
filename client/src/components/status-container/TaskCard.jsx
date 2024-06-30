import styles from "./StatusComponent.module.css";
import menuIcon from "../../assets/menuIcon.svg";
import arrDown from "../../assets/arrDown.svg";
import arrUp from "../../assets/arrUp.svg";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import BoardContext from "../../store/board-context";
import { deleteTask, updateTask } from "../../services/task";
import Confirmation from "../UI/Confirmation";
import { dueDatePassed, formatDate } from "../../utility/formatDate";

// const buttons = [
//   { label: "BACKLOG", status: "backlog" },
//   { label: "TO-DO", status: "todo" },
//   { label: "PROGRESS", status: "progress" },
//   { label: "DONE", status: "done" }
// ];
const TaskCard = ({
  priority,
  status,
  title,
  checkList,
  collapseAll,
  taskId,
  onToggleModal,
  tickCount,
  assignTo,
  dueDate,
}) => {
  const boardCtx = useContext(BoardContext);
  const [showMore, setShowMore] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const jsDueDate = dueDate && new Date(dueDate);
  // console.log("JSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",dueDate,jsDueDate)

  const isDueDatePassed = jsDueDate && dueDatePassed(jsDueDate);
  console.log("REEEEEEEEEEEEEEEEEEEESUUUUUUUUULTTTTTTTT", isDueDatePassed);

  console.log(
    "taskcomponent",
    "taskId",
    taskId,
    typeof taskId,
    collapseAll,
    priority,
    checkList
  );

  const toggleCollapseHandler = () => {
    setShowMore((prev) => !prev);
  };

  const toggleMenuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleConfirmModal = () => {
    setToggleConfirm((prev) => !prev);
  };

  const onClickChangeStatusHandler = async (taskId, moveTo) => {
    console.log("moveto", moveTo, taskId);
    const response = await updateTask({ _id: taskId, status: moveTo });
    boardCtx.editTask(response?.data?.data);
  };

  const onChangeCheckHandler = async (e, optionId, taskId) => {
    console.log("event", taskId, optionId, e.target.checked);
    const response = await updateTask({
      _id: taskId,
      optionId: optionId,
      isCheck: e.target.checked,
    });
    boardCtx.editTask(response?.data?.data);
    // console.log('onChangeCheckHandler',response)
  };

  const onClickDeleteHandler = async () => {
    const response = await deleteTask(taskId);
    console.log("deleteHandle in task comp", response);
    boardCtx?.removeTask(taskId);
  };

  const onClickEditHandler = (taskId) => {
    onToggleModal(taskId);
  };

  useEffect(() => {
    setShowMore(false);
  }, [collapseAll]);

  return (
    <>
      <div className={styles.card}>
        {toggleConfirm && (
          <Confirmation
            onToggleConfirmModal={toggleConfirmModal}
            action="Delete"
            actionHandler={onClickDeleteHandler}
          />
        )}
        <div className={styles.cardHeader}>
          <div className={styles.dotWrapper}>
            <p className={styles[priority]}></p>
            <span>{priority?.toUpperCase()} PRIORITY</span>
            {assignTo && (
              <div className={styles.avatar} title={assignTo}>
                {assignTo?.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div
            className={styles.dotIconWrapper}
            onClick={toggleMenuHandler}
            onBlur={toggleMenuHandler}
          >
            <img src={menuIcon} alt="doticon" />
            {showMenu && (
              <div className={styles.menuPopup}>
                <div
                  className={styles.popupText}
                  onClick={() => onClickEditHandler(taskId)}
                >
                  Edit
                </div>
                <div className={styles.popupText}>Share</div>
                <div
                  className={styles.deletePopupText}
                  onClick={() => toggleConfirmModal()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <p className={styles.cardTitle}>{title}</p>
        <div className={styles.checkListWrapper}>
          <div className={styles.checkListHeading}>
            Checklist ({tickCount}/{checkList?.length})
          </div>
          <img
            src={showMore ? arrUp : arrDown}
            alt="arr icon"
            onClick={toggleCollapseHandler}
          />
        </div>
        {showMore && (
          <div className={styles.optionsContainer}>
            {checkList?.map((option) => {
              return (
                <div className={styles.singleOption} key={option.optionId}>
                  <input
                    type="checkbox"
                    checked={option?.isTick}
                    onChange={(e) =>
                      onChangeCheckHandler(e, option.optionId, taskId)
                    }
                    className={styles.checkInput}
                  />
                  <input
                    type="text"
                    value={option?.checkText}
                    className={styles.input}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.cardFooter}>
          {jsDueDate ? (
            <p
              className={`${styles.dueDate} ${
                isDueDatePassed ? styles.red : ""
              } ${status === "done" ? styles.green : ""}
              `}
            >
              {formatDate(jsDueDate)}
            </p>
          ) : (
            <span>&nbsp;</span>
          )}
          <div className={styles.actionBtnWrapper}>
            {status !== "backlog" && (
              <button
                className={styles.actionBtn}
                onClick={() => onClickChangeStatusHandler(taskId, "backlog")}
              >
                BACKLOG
              </button>
            )}
            {status !== "todo" && (
              <button
                className={styles.actionBtn}
                onClick={() => onClickChangeStatusHandler(taskId, "todo")}
              >
                TO-DO
              </button>
            )}
            {status !== "progress" && (
              <button
                className={styles.actionBtn}
                onClick={() => onClickChangeStatusHandler(taskId, "progress")}
              >
                PROGRESS
              </button>
            )}
            {status !== "done" && (
              <button
                className={styles.actionBtn}
                onClick={() => onClickChangeStatusHandler(taskId, "done")}
              >
                DONE
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

TaskCard.propTypes = {
  collapseAll: PropTypes.bool,
  priority: PropTypes.string,
  title: PropTypes.string,
  checkList: PropTypes.array,
  taskId: PropTypes.string,
  onToggleModal: PropTypes.func,
  tickCount: PropTypes.number,
  status: PropTypes.string,
  assignTo: PropTypes.string,
  dueDate:PropTypes.string
};

export default TaskCard;
