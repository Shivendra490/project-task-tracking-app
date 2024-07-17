import styles from "./StatusComponent.module.css";
import collapseIcon from "../../assets/collapseIcon.svg";

import addIcon from "../../assets/addIcon.svg";

import { useContext, useState } from "react";
import AddEditTask from "../../pages/add-edit-task/AddEditTask";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";
import { updateTask } from "../../services/task";
import { notify } from "../../utility/notify";
import BoardContext from "../../store/board-context";

const StatusComponent = (props) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [collapseAll, setCollapseAll] = useState(true);
  const [editId, setEditId] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);
  const boardCtx = useContext(BoardContext);

  const triggerCollapse = () => {
    setCollapseAll((prev) => !prev);
  };
  const toggleModal = (editId = null) => {
    setEditId(editId);
    setIsModalShow((prev) => !prev);
  };

  const handleDrop = async (e, moveTo) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const currentStatus = e.dataTransfer.getData("currentStatus");

    try {
      if (currentStatus === moveTo) {
        return;
      }

      const response = await updateTask({ _id: taskId, status: moveTo });

      if (response?.status !== 200) {
        notify(response?.data?.message, "error");

        return;
      }
      boardCtx.editTask(response?.data?.data);
      notify(response?.data?.message);
    } catch (err) {
      notify(err?.response?.data?.message, "error");
    }

    // console.log("hello from handleDrop",taskId,status)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    
    setDropIndicator(e.currentTarget.id);
    setTimeout(() => {
      setDropIndicator(null);
    }, 500);
  };

  return (
    <div className={styles.singleStatusContainer}>
      {isModalShow && (
        <AddEditTask editId={editId} onToggleModal={toggleModal} />
      )}
      <div className={styles.statusIconWrapper}>
        <div className={styles.statusHeading}>{props.container}</div>
        <div className={styles.addCollapseIconWrapper}>
          {props.container === "To do" && (
            <img src={addIcon} alt="add icon" onClick={() => toggleModal()} />
          )}
          <img
            src={collapseIcon}
            alt="collapse icon"
            onClick={triggerCollapse}
          />
        </div>
      </div>
      <div
        className={styles.cardsContainer}
        style={{
          backgroundColor: dropIndicator === props.id ? "rgb(235 235 235)" : "",
        }}
        id={props.id}
        onDrop={(e) => handleDrop(e, props.id)}
        onDragOver={handleDragOver}
      >
        {props?.taskList?.map((task) => {
          return (
            <TaskCard
              priority={task?.priority}
              checkList={task?.checkList}
              title={task?.title}
              collapseAll={collapseAll}
              key={task?._id}
              onToggleModal={toggleModal}
              tickCount={task?.tickCount}
              taskId={task?._id}
              status={task?.status}
              assignTo={task?.assignTo}
              dueDate={task?.dueDate}
            />
          );
        })}
      </div>
    </div>
  );
};

StatusComponent.propTypes = {
  container: PropTypes.string,
  taskList: PropTypes.array,
  id: PropTypes.string,
};

export default StatusComponent;
