import styles from "./StatusComponent.module.css";
import collapseIcon from "../../assets/collapseIcon.svg";

import addIcon from "../../assets/addIcon.svg";

import { useState } from "react";
import AddEditTask from "../../pages/add-edit-task/AddEditTask";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const StatusComponent = (props) => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [collapseAll,setCollapseAll]=useState(true)
  
  const triggerCollapse=()=>{
    setCollapseAll(prev=>!prev)
  }
  const toggleModal = () => {
    setIsModalShow((prev) => !prev);
  };
  // console.log('render')
  return (
    <div className={styles.singleStatusContainer}>
      {isModalShow && <AddEditTask onToggleModal={toggleModal} />}
      <div className={styles.statusIconWrapper}>
        <div className={styles.statusHeading}>{props.status}</div>
        <div className={styles.addCollapseIconWrapper}>
          {props.status === "To do" && (
            <img src={addIcon} alt="add icon" onClick={toggleModal} />
          )}
          <img src={collapseIcon} alt="collapse icon" onClick={triggerCollapse}/>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {/* <TaskCard/> */}
        <TaskCard collapseAll={collapseAll}/>
        <TaskCard collapseAll={collapseAll}/>
      </div>
    </div>
  );
};

StatusComponent.propTypes = {
  status: PropTypes.string,
};

export default StatusComponent;
