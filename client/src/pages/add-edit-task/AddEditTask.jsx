import PropTypes from "prop-types";
import Modal from "../../components/UI/Modal";
import styles from "./AddEditTask.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import {  useState } from "react";

const initialTask = {
  taskTitle: "",
  priority: "",
  taskStatus: "todo",
  checkList: [],
  dueDate:"",
  tickCount:0
};

const AddEditTask = (props) => {
  const [task, setTask] = useState(initialTask);
  // const dateRef=useRef()

  const priorityClickHandler = (selectedPriority) => {
    setTask({ ...task, priority: selectedPriority });
  };

  const addCheckListOptionHandler = () => {
    setTask({
      ...task,
      checkList: [
        ...task.checkList,
        { oid: new Date().getTime().toString(), checkText: "", isTick: false },
      ],
    });
  };

  const removeCheckListOptionHandler = (oid) => {
    const updatedCheckList = task?.checkList?.filter((currentOption) => {
      return currentOption.oid !== oid;
    });

    setTask({ ...task, checkList: updatedCheckList });
  };

  const onChangeTitleHandler=(e)=>{
    const {name,value}=e.target 
    setTask({...task,[name]:value})
  }

  const onChangeOptionHandler=(e,oid)=>{
    const {value}=e.target
    const updatedCheckList=task?.checkList.map(currentOption=>{
      if(currentOption.oid===oid){
        return {...currentOption,checkText:value}
      }else{
        return currentOption
      }
    })
    setTask({...task,checkList:updatedCheckList})
    // console.log(value,'changeoption','target',e)
    
    

  }

  const onChangeTickHandler=(e,oid)=>{
  
    const {checked}=e.target
    const updatedCheckList=task?.checkList.map(currentOption=>{
      
      if(currentOption.oid===oid){
        return {...currentOption,isTick:checked}
      }else{
        return currentOption
      }
    })
    
    if(checked){
      setTask({...task,tickCount:task.tickCount+1,checkList:updatedCheckList})
    }else{
      setTask({...task,tickCount:task.tickCount-1,checkList:updatedCheckList})
    }
    
    // console.log(checked,'changetick','target',e)
  }

  const dateClickHandler=()=>{
    console.log('dateClick handler with ref')
    
  }

  const onChangeDateHandler=(e)=>{
    console.log('dateonchange',e)
    setTask({...task,dueDate:e.target.value})
  }


  const submitHandler=()=>{
    console.log('task for submit',task)
  }

 
  return (
    <Modal
      onToggleModal={props.onToggleModal}
      onCustomModal={styles.customModal}
    >
      <div className={styles.createContainer}>
        <div className={styles.createHeader}>
          <div className={styles.titleField}>
            <label className={styles.titleText}>
              Title<span className={styles.star}>*</span>
            </label>
            <input
              type="text"
              name="taskTitle"
              className={styles.titleInput}
              placeholder="Enter Task Title"
              value={task.taskTitle}
              onChange={onChangeTitleHandler}
            />
          </div>

          <div className={styles.priorityField}>
            <label className={styles.titleText}>
              Select Priority<span className={styles.star}>*</span>
            </label>
            <button
              className={`${styles.priorityBtn} ${
                task.priority === "high" ? styles.active : ""
              }`}
              onClick={() => priorityClickHandler("high")}
            >
              <p className={styles.greenDot}></p>
              <span>HIGH PRIORITY</span>
            </button>
            <button
              className={`${styles.priorityBtn} ${
                task.priority === "moderate" ? styles.active : ""
              }`}
              onClick={() => priorityClickHandler("moderate")}
            >
              <p className={styles.greenDot}></p>
              <span>MODERATE PRIORITY</span>
            </button>
            <button
              className={`${styles.priorityBtn} ${
                task.priority === "low" ? styles.active : ""
              }`}
              onClick={() => priorityClickHandler("low")}
            >
              <p className={styles.greenDot}></p>
              <span>LOW PRIORITY</span>
            </button>
          </div>

          {/* <div className={styles.assignField}>
            <label className={styles.titleText}>Assign to</label>
            <select className={styles.select}>
              <option>abc@gmail.com</option>
            </select>
          </div> */}
        </div>
        <div className={styles.createBody}>
          <label className={styles.titleText}>
            Checklist ({task?.tickCount}/{task?.checkList?.length})<span className={styles.star}>*</span>
          </label>
          <div className={styles.optionsContainer}>
            {task?.checkList?.length > 0 &&
              task?.checkList.map((currentOption) => {
                return (
                  <div
                    key={currentOption.oid}
                    className={styles.singleOptionWrapper}
                  >
                    <input
                      checked={currentOption.isTick}
                      type="checkbox"
                      onChange={(e)=>onChangeTickHandler(e,currentOption.oid)}
                      className={styles.inputCheck}
                    />
                    <input type="text" className={styles.inputText} value={currentOption.checkText} onChange={(e)=>onChangeOptionHandler(e,currentOption.oid)}/>
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      onClick={() =>
                        removeCheckListOptionHandler(currentOption.oid)
                      }
                    />
                  </div>
                );
              })}
          </div>
          <button className={styles.addBtn} onClick={addCheckListOptionHandler}>
            <img src={plusIcon} alt="add icon" />
            <span>Add New</span>
          </button>
        </div>
        <div className={styles.createFooter}>
          {/* <button className={styles.dueDateBtn} onClick={dateClickHandler}>Due Date</button> */}
          <input type="date"  name="dueDate" onClick={dateClickHandler} onChange={onChangeDateHandler}/>
          <div className={styles.actionBtnsWrapper}>
            <button className={styles.secondaryBtn}>Cancel</button>
            <button className={styles.primaryBtn} onClick={submitHandler}>Save</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AddEditTask.propTypes = {
  onToggleModal: PropTypes.bool,
};

export default AddEditTask;
