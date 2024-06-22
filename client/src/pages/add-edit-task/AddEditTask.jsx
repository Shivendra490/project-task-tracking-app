import PropTypes from 'prop-types';
import Modal from "../../components/UI/Modal";
import styles from "./AddEditTask.module.css"

const AddEditTask = (props) => {
  return (
    <Modal onToggleModal={props.onToggleModal} onCustomModal={styles.customModal}>
      <div>hello</div>
    </Modal>
  );
};

AddEditTask.propTypes={
  onToggleModal:PropTypes.bool
}

export default AddEditTask;
