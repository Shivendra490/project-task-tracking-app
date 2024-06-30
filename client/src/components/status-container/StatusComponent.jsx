import styles from "./StatusComponent.module.css";
import collapseIcon from "../../assets/collapseIcon.svg";

import addIcon from "../../assets/addIcon.svg";

import { useState } from "react";
import AddEditTask from "../../pages/add-edit-task/AddEditTask";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const StatusComponent = (props) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [collapseAll, setCollapseAll] = useState(true);
  const [editId, setEditId] = useState(null);

  const triggerCollapse = () => {
    setCollapseAll((prev) => !prev);
  };
  const toggleModal = (editId = null) => {
    setEditId(editId);
    setIsModalShow((prev) => !prev);
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
      <div className={styles.cardsContainer}>
        {props?.taskList?.map((task) => {
          console.log("status comp map,task", task);
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
};

export default StatusComponent;
