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
  const [editId,setEditId]=useState(null)

  console.log('Status Comp tasklist prop',props.taskList)

  const triggerCollapse = () => {
    setCollapseAll((prev) => !prev);
  };
  const toggleModal = (editId=null) => {
    console.log('togglemodal',editId)
    setEditId(editId)
    setIsModalShow((prev) => !prev);
  };

  

  return (
    <div className={styles.singleStatusContainer}>
      {isModalShow && <AddEditTask editId={editId} onToggleModal={toggleModal} />}
      <div className={styles.statusIconWrapper}>
        <div className={styles.statusHeading}>{props.status}</div>
        <div className={styles.addCollapseIconWrapper}>
          {props.status === "To do" && (
            <img src={addIcon} alt="add icon" onClick={()=>toggleModal()} />
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
          console.log('status comp map,task',task)
          return (
            <TaskCard
              priority={task?.priority}
              checkList={task?.checkList}
              title={task?.title}
              collapseAll={collapseAll}
              key={task._id}
              onToggleModal={toggleModal}
              tickCount={task?.tickCount}
              taskId={task._id}
            />
          );
        })}
      </div>
    </div>
  );
};

StatusComponent.propTypes = {
  status: PropTypes.string,
  taskList: PropTypes.array,
};

export default StatusComponent;
