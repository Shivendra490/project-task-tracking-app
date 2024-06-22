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
  console.log('pp',props)
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
        <ModalOverlay onCustomModal={props.onCustomModal}>{props.children}</ModalOverlay>,
        document.getElementById("new-root")
      )}
    </>
  );
};

Backdrop.propTypes = {
  onToggleModal: PropTypes.bool,
};

ModalOverlay.propTypes = {
  children: PropTypes.element,
  onCustomModal:PropTypes.element
};

Modal.propTypes = {
  onToggleModal: PropTypes.bool,
  children: PropTypes.element,
  onCustomModal:PropTypes.element
};

export default Modal;
