import PropTypes from "prop-types";
import Modal from "../../components/UI/Modal";
import styles from "./AddEditTask.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";
import dropDownIcon from "../../assets/dropDownIcon.svg";
import { useContext, useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../../services/task";

import BoardContext from "../../store/board-context";
import { getUserInfo } from "../../services/localStoage";
import { validateTaskForm } from "../../utility/validateForm";
import { dateShow } from "../../utility/formatDate";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const boardCtx = useContext(BoardContext);
  const { userId } = getUserInfo();

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
    let tickUpdated = false;
    const updatedCheckList = task?.checkList?.filter((currentOption) => {
      if (currentOption.optionId === optionId) {
        if (currentOption.isTick) {
          tickUpdated = true;
        }
      }
      return currentOption.optionId !== optionId;
    });

    setTask({
      ...task,
      tickCount: tickUpdated ? task.tickCount - 1 : task.tickCount,
      checkList: updatedCheckList,
    });
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
  };

  const onChangeDateHandler = (e) => {
    setTask({ ...task, dueDate: e.target.value });
  };

  const submitHandler = async () => {
    try {
      setError(null);
      const errObj = validateTaskForm(task);
      if (errObj) {
        setError(errObj);
        return;
      }
      setLoading(true);
      if (props.editId) {
        const response = await updateTask(task);
        setLoading(false);
        
        if (response?.status !== 200) {
          
          notify(response?.data?.message, "error");
          return;
        }

        boardCtx.editTask(response?.data?.data);
        notify(response?.data?.message);
        props.onToggleModal();
        return;
      }

      const response = await createTask(task);
      setLoading(false);

      if (response?.status !== 201) {
        notify(response?.data?.message, "error");
        return;
      }

      boardCtx?.addTask(response?.data?.data);
      notify(response?.data?.message);
      props.onToggleModal();
    } catch (err) {
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  };

  const fetchTask = async (editId) => {
    try {
      setLoading(true);

      const response = await getTask(editId);
      setLoading(false);

      if (response?.status !== 200) {
        notify(response?.data?.message, "error");
        return;
      }
      setTask(response?.data?.data);
    } catch (err) {
      notify(err?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.editId) {
      fetchTask(props.editId);
    }
  }, []);

  const adminEditMode =
    props?.editId && task?.userId?.toString() === userId?.toString();
  const assigneeEditMode =
    props?.editId &&
    task._id &&
    task?.userId?.toString() !== userId?.toString();

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
            {error && <p className={styles.error}>{error?.title}</p>}
          </div>

          <div className={styles.errorFieldWrapper}>
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
            {error && <p className={styles.error}>{error?.priority}</p>}
          </div>

          <div className={styles.assignField}>
            <label className={styles.titleText}>Assign to</label>
            <div className={styles.selectWrapper}>
              <div className={styles.inputIconWrapper} onClick={toggleDropdown}>
                <input
                  type="text"
                  placeholder="Add a assignee"
                  className={styles.assignInput}
                  value={task?.assignTo}
                  readOnly
                ></input>
                <img src={dropDownIcon} />
              </div>
              {showDropdown && (
                <div className={styles.customDropDown}>
                  {assigneeEditMode && (
                    <p className={styles.emailText}>
                      only task creator can re-assign
                    </p>
                  )}
                  {adminEditMode &&
                    boardCtx?.allMember.map((memberEmail) => {
                      return (
                        <div key={memberEmail} className={styles.optionWrapper}>
                          <div className={styles.avatar}>
                            {memberEmail?.substring(0, 2)?.toUpperCase()}
                          </div>
                          <p className={styles.emailText}>{memberEmail}</p>
                          <button
                            className={`${styles.assignBtn} ${
                              memberEmail === task?.assignTo
                                ? styles.active
                                : ""
                            }`}
                            onClick={() => onClickAssignHandler(memberEmail)}
                          >
                            Assign
                          </button>
                        </div>
                      );
                    })}
                  {!props?.editId &&
                  !task?._id &&
                  boardCtx?.allMember?.length > 0 ? (
                    boardCtx?.allMember.map((memberEmail) => {
                      return (
                        <div key={memberEmail} className={styles.optionWrapper}>
                          <div className={styles.avatar}>
                            {memberEmail?.substring(0, 2)?.toUpperCase()}
                          </div>
                          <p className={styles.emailText}>{memberEmail}</p>
                          <button
                            className={`${styles.assignBtn} ${
                              memberEmail === task?.assignTo
                                ? styles.active
                                : ""
                            }`}
                            onClick={() => onClickAssignHandler(memberEmail)}
                          >
                            Assign
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p className={styles.emailText}></p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.bodyWrapper}>
          <div className={styles.createBody}>
            <label className={styles.titleText}>
              Checklist ({task?.tickCount}/{task?.checkList?.length})
              <span className={styles.star}>*</span>
            </label>
            {error && <p className={styles.error}>{error?.checkList}</p>}
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
                        style={{cursor:"pointer"}}
                        onClick={() =>
                          removeCheckListOptionHandler(currentOption.optionId)
                        }
                      />
                    </div>
                  );
                })}
            </div>
            <button
              className={styles.addBtn}
              onClick={addCheckListOptionHandler}
            >
              <img src={plusIcon} alt="add icon" />
              <span>Add New</span>
            </button>
          </div>
        </div>
        <div className={styles.createFooter}>
          <input
            type="date"
            name="dueDate"
            className={styles.dueDateBtn}
            value={task?.dueDate && dateShow(task?.dueDate)}
            onChange={onChangeDateHandler}
          />

          <div className={styles.actionBtnsWrapper}>
            <button
              className={styles.secondaryBtn}
              onClick={() => props.onToggleModal()}
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className={styles.primaryBtn}
              onClick={submitHandler}
            >
              {loading ? <Loader /> : "Save"}
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
