import PropTypes from "prop-types";
import Modal from "./Modal";
import styles from "./Confirmation.module.css";



const Confirmation = (props) => {


  const confirmHandler = () => {
    props.actionHandler()
    
  };
  return (
    <Modal
      onToggleModal={props.onToggleConfirmModal}
      onCustomModal={styles.customModal}
    >
      <div className={styles.confirmLogoutContainer}>
        <h2 className={styles.question}>Are you sure you want to {props?.action}</h2>
        <button className={styles.primaryBtn} onClick={confirmHandler}>
          Yes, {props?.action}
        </button>
        <button
          className={styles.secondaryBtn}
          onClick={() => props.onToggleConfirmModal()}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

Confirmation.propTypes = {
  onToggleConfirmModal: PropTypes.func,
  actionHandler:PropTypes.func,
  action:PropTypes.string
};

export default Confirmation;
