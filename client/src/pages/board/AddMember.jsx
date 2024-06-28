import { useState } from "react";
import Modal from "../../components/UI/Modal";
import styles from "./AddMember.module.css";
import PropTypes from "prop-types";
import { addMember } from "../../services/board";

const AddMember = (props) => {
  const [email, setEmail] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onClickAddEmailHandler = async () => {
    const response = await addMember(email);
    setUpdatedMessage(response.data.message);
    console.log("addMember", response);
  };

  return (
    <Modal
      onToggleModal={props.onToggleAddMemberMode}
      onCustomModal={styles.customModal}
    >
      <div className={styles.addMemberContainer}>
        {updatedMessage ? (
          <>
            <h1 className={styles.heading}>
              {updatedMessage}
            </h1>
            <button className={styles.okBtn} onClick={props.onToggleAddMemberMode}>Okay, got it!</button>{" "}
          </>
        ) : (
          <>
            {" "}
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
              <button
                className={styles.primaryBtn}
                onClick={onClickAddEmailHandler}
              >
                Add Email
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

AddMember.propTypes = {
  onToggleAddMemberMode: PropTypes.func,
  editId: PropTypes.string,
};

export default AddMember;
