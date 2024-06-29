import PropTypes from "prop-types";
import Modal from "../../components/UI/Modal";
import styles from "./AddEditTask.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import dropDownIcon from "../../assets/dropDownIcon.svg";
import { useContext, useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../../services/task";

// import { useNavigate } from "react-router-dom";
import BoardContext from "../../store/board-context";

const initialTask = {
  title: "",
  priority: "",
  status: "todo",
  checkList: [],
  dueDate: "",
  tickCount: 0,
  assignTo: "",
};

const AddEditTask = (props) => {
  const [task, setTask] = useState(initialTask);
  const [showDropdown, setShowDropdown] = useState(false);
  const boardCtx = useContext(BoardContext);
  // const navigate=useNavigate()
  // const dateRef=useRef()
  // console.log("editIt", props.editId);
  // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", boardCtx);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const priorityClickHandler = (selectedPriority) => {
    setTask({ ...task, priority: selectedPriority });
  };

  const onClickAssignHandler = (assignee) => {
    setTask({ ...task, assignTo: assignee });
    toggleDropdown();
  };
  console.log("assssssssssssssingeeeeeeee task", task);

  const addCheckListOptionHandler = () => {
    setTask({
      ...task,
      checkList: [
        ...task.checkList,
        {
          optionId: new Date().getTime().toString(),
          checkText: "",
          isTick: false,
        },
      ],
    });
  };

  const removeCheckListOptionHandler = (optionId) => {
    const updatedCheckList = task?.checkList?.filter((currentOption) => {
      return currentOption.optionId !== optionId;
    });

    setTask({ ...task, checkList: updatedCheckList });
  };

  const onChangeTitleHandler = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const onChangeOptionHandler = (e, optionId) => {
    const { value } = e.target;
    const updatedCheckList = task?.checkList.map((currentOption) => {
      if (currentOption.optionId === optionId) {
        return { ...currentOption, checkText: value };
      } else {
        return currentOption;
      }
    });
    setTask({ ...task, checkList: updatedCheckList });
    // console.log(value,'changeoption','target',e)
  };

  const onChangeTickHandler = (e, optionId) => {
    const { checked } = e.target;
    const updatedCheckList = task?.checkList.map((currentOption) => {
      if (currentOption.optionId === optionId) {
        return { ...currentOption, isTick: checked };
      } else {
        return currentOption;
      }
    });

    if (checked) {
      setTask({
        ...task,
        tickCount: task.tickCount + 1,
        checkList: updatedCheckList,
      });
    } else {
      setTask({
        ...task,
        tickCount: task.tickCount - 1,
        checkList: updatedCheckList,
      });
    }

    // console.log(checked,'changetick','target',e)
  };

  const dateClickHandler = () => {
    console.log("dateClick handler with ref");
  };

  const onChangeDateHandler = (e) => {
    // console.log("dateonchange", e);
    setTask({ ...task, dueDate: e.target.value });
  };

  const submitHandler = async () => {
    if (props.editId) {
      const response = await updateTask(task);
      // console.log("Inside edit mode rrrrrrrrrrrresponse", response);
      boardCtx.editTask(response?.data?.data);
      return;
    }

    const response = await createTask(task);
    console.log("createTasklllllll", response);
    boardCtx?.addTask(response?.data?.data);
    props.onToggleModal();
  };

  const fetchTask = async (editId) => {
    const response = await getTask(editId);
    setTask(response?.data?.data);
    // console.log("useEff Res single task", response);
  };

  useEffect(() => {
    if (props.editId) {
      fetchTask(props.editId);
      // console.log("useRunning in ADDEDIT", "ppppp", props.editId);
    }
  }, []);

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
              name="title"
              className={styles.titleInput}
              placeholder="Enter Task Title"
              value={task.title}
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
              <p className={styles.high}></p>
              <span>HIGH PRIORITY</span>
            </button>
            <button
              className={`${styles.priorityBtn} ${
                task.priority === "moderate" ? styles.active : ""
              }`}
              onClick={() => priorityClickHandler("moderate")}
            >
              <p className={styles.moderate}></p>
              <span>MODERATE PRIORITY</span>
            </button>
            <button
              className={`${styles.priorityBtn} ${
                task.priority === "low" ? styles.active : ""
              }`}
              onClick={() => priorityClickHandler("low")}
            >
              <p className={styles.low}></p>
              <span>LOW PRIORITY</span>
            </button>
          </div>

          <div className={styles.assignField}>
            <label className={styles.titleText}>Assign to</label>
            <div className={styles.selectWrapper}>
              <div className={styles.inputIconWrapper} onClick={toggleDropdown}>
                <input
                  type="text"
                  placeholder="Enter assignee"
                  className={styles.assignInput}
                  value={task?.assignTo}
                  readOnly
                ></input>
                <img src={dropDownIcon} />
              </div>
              {showDropdown && (
                <div className={styles.customDropDown}>
                  {boardCtx?.allMember.map((memberEmail) => {
                    return (
                      <div key={memberEmail} className={styles.optionWrapper}>
                        <div className={styles.avatar}>
                          {memberEmail?.substring(0, 2)?.toUpperCase()}
                        </div>
                        <p className={styles.emailText}>{memberEmail}</p>
                        <button
                          className={`${styles.assignBtn} ${
                            memberEmail === task?.assignTo ? styles.active : ""
                          }`}
                          onClick={() => onClickAssignHandler(memberEmail)}
                        >
                          Assign
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
            Checklist ({task?.tickCount}/{task?.checkList?.length})
            <span className={styles.star}>*</span>
          </label>
          <div className={styles.optionsContainer}>
            {task?.checkList?.length > 0 &&
              task?.checkList.map((currentOption) => {
                return (
                  <div
                    key={currentOption.optionId}
                    className={styles.singleOptionWrapper}
                  >
                    <input
                      checked={currentOption.isTick}
                      type="checkbox"
                      onChange={(e) =>
                        onChangeTickHandler(e, currentOption.optionId)
                      }
                      className={styles.inputCheck}
                    />
                    <input
                      type="text"
                      className={styles.inputText}
                      value={currentOption.checkText}
                      onChange={(e) =>
                        onChangeOptionHandler(e, currentOption.optionId)
                      }
                    />
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      onClick={() =>
                        removeCheckListOptionHandler(currentOption.optionId)
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
          <input
            type="date"
            name="dueDate"
            onClick={dateClickHandler}
            onChange={onChangeDateHandler}
          />
          <div className={styles.actionBtnsWrapper}>
            <button className={styles.secondaryBtn}>Cancel</button>
            <button className={styles.primaryBtn} onClick={submitHandler}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AddEditTask.propTypes = {
  onToggleModal: PropTypes.func,
  editId: PropTypes.string,
};

export default AddEditTask;
