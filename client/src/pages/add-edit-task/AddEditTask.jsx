import PropTypes from "prop-types";
import Modal from "../../components/UI/Modal";
import styles from "./AddEditTask.module.css";
import deleteIcon from "../../assets/deleteIcon.svg";
import plusIcon from "../../assets/plusIcon.svg";

const AddEditTask = (props) => {
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
              className={styles.titleInput}
              placeholder="Enter Task Title"
            />
          </div>

          <div className={styles.priorityField}>
            <label className={styles.titleText}>
              Select Priority<span className={styles.star}>*</span>
            </label>
            <button className={styles.priorityBtn}>
              <p className={styles.greenDot}></p>
              <span>HIGH PRIORITY</span>
            </button>
            <button className={styles.priorityBtn}>
              <p className={styles.greenDot}></p>
              <span>MODERATE PRIORITY</span>
            </button>
            <button className={styles.priorityBtn}>
              <p className={styles.greenDot}></p>
              <span>LOW PRIORITY</span>
            </button>
          </div>

          <div className={styles.assignField}>
            <label className={styles.titleText}>Assign to</label>
            <select className={styles.select}>
              <option>abc@gmail.com</option>
            </select>
          </div>
        </div>
        <div className={styles.createBody}>
          <label className={styles.titleText}>
            Checklist (1/3)<span className={styles.star}>*</span>
          </label>
          <div className={styles.optionsContainer}>
            <div className={styles.singleOptionWrapper}>
              <input type="checkbox" className={styles.inputCheck} />
              <input type="text" className={styles.inputText} />
              <img src={deleteIcon} alt="delete icon" />
            </div>

            <div className={styles.singleOptionWrapper}>
              <input type="checkbox" className={styles.inputCheck} />
              <input type="text" className={styles.inputText} />
              <img src={deleteIcon} alt="delete icon" />
            </div>

            <div className={styles.singleOptionWrapper}>
              <input type="checkbox" className={styles.inputCheck} />
              <input type="text" className={styles.inputText} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
            <div className={styles.singleOptionWrapper}>
              <input type="checkbox" className={styles.inputCheck} />
              <input type="text" className={styles.inputText} />
              <img src={deleteIcon} alt="delete icon" />
            </div>
          </div>
          <button className={styles.addBtn}>
            <img src={plusIcon} alt="add icon" />
            <span>Add New</span>
          </button>
        </div>
        <div className={styles.createFooter}>
          <button className={styles.dueDateBtn}>
            Due Date
          </button>
          {/* <input type="date"/> */}
          <div className={styles.actionBtnsWrapper}>
            <button className={styles.secondaryBtn}>Cancel</button>
            <button className={styles.primaryBtn}>Save</button>
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
