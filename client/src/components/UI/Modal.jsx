import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Backdrop = (props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        props.onToggleModal();
      }}
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${props.onCustomModal}`}>
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onToggleModal={props.onToggleModal} />,
        document.getElementById("new-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onCustomModal={props.onCustomModal}>
          {props.children}
        </ModalOverlay>,
        document.getElementById("new-root")
      )}
    </>
  );
};

Backdrop.propTypes = {
  onToggleModal: PropTypes.func,
};

ModalOverlay.propTypes = {
  children: PropTypes.element,
  onCustomModal: PropTypes.elementType,
};

Modal.propTypes = {
  onToggleModal: PropTypes.func,
  children: PropTypes.element,
  onCustomModal: PropTypes.elementType,
};

export default Modal;
