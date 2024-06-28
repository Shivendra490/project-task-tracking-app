import { useState } from "react";
import Modal from "../../components/UI/Modal";
import styles from "./AddMember.module.css";
import PropTypes from "prop-types";

const AddMember = (props) => {
    const [email,setEmail]=useState("")
    const onChangeEmailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const onClickAddEmailHandler=()=>{
        
    }
    
  return (
    <Modal
      onToggleModal={props.onToggleAddMemberMode}
      onCustomModal={styles.customModal}
    >
      <div className={styles.addMemberContainer}>
        <h1 className={styles.heading}>Add people to the board </h1>
        <input
          type="text"
          placeholder="Enter the email"
          className={styles.input}
          name="memberEmail"
          onChange={onChangeEmailHandler}
        />
        <div className={styles.btnWrapper}>
          <button
            className={styles.secondaryBtn}
            onClick={props?.onToggleAddMemberMode}
          >
            Cancel
          </button>
          <button className={styles.primaryBtn} onClick={onClickAddEmailHandler}>Add Email</button>
        </div>
        {/* <h1 className={styles.heading}>Akashgupta@gmail.com added to board</h1>
        <button className={styles.okBtn}>Okay, got it!</button> */}
      </div>
    </Modal>
  );
};

AddMember.propTypes = {
  onToggleAddMemberMode: PropTypes.func,
  editId: PropTypes.string,
};

export default AddMember;
