import { useContext, useState } from "react";
import Modal from "../../components/UI/Modal";
import styles from "./AddMember.module.css";
import PropTypes from "prop-types";
import { addMember } from "../../services/board";
import BoardContext from "../../store/board-context";
import { validateAddMemberForm } from "../../utility/validateForm";
import { notify } from "../../utility/notify";
import Loader from "../../components/loader/Loader";

const AddMember = (props) => {
  const [email, setEmail] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const boardCtx = useContext(BoardContext);
  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const onClickAddEmailHandler = async () => {
    try {
      setError(null);
      const isErr = validateAddMemberForm(email);
      if (isErr) {
        setError(isErr);
        return;
      }
      setLoading(true);
      const response = await addMember(email);
      setLoading(false);

      if (response?.status !== 201) {
        notify(response?.data?.message, "error");
        setError(response?.data?.message);
        return;
      }

      setUpdatedMessage(response?.data?.message);
      boardCtx?.updateMemberList(response?.data?.memberList);
      notify(response?.data?.message);
    } catch (err) {
      setError(err?.response?.data?.message);
      notify(err?.response?.data?.message, "error");
      setLoading(false);
    }
  };

  return (
    <Modal
      onToggleModal={props.onToggleAddMemberMode}
      onCustomModal={styles.customModal}
    >
      <div className={styles.addMemberContainer}>
        {updatedMessage ? (
          <>
            <h1 className={styles.heading}>{updatedMessage}</h1>
            <div className={styles.okWrapper}>
              <button
                className={styles.okBtn}
                onClick={props.onToggleAddMemberMode}
              >
                Okay, got it!
              </button>{" "}
            </div>
          </>
        ) : (
          <>
            {" "}
            <h1 className={styles.heading}>Add people to the board </h1>
            <div className={styles.errorInputWrapper}>
              <input
                type="text"
                placeholder="Enter the email"
                className={styles.input}
                name="memberEmail"
                onChange={onChangeEmailHandler}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
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
                disabled={loading}
              >
                {loading ? <Loader /> : "Add Email"}
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
