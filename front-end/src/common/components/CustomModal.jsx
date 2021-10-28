import { Modal } from "react-bootstrap";
import "./CustomModal.css";

function CustomModal({ showModal, onCloseModal, children }) {
  return (
    <Modal show={showModal} onHide={onCloseModal} dialogClassName="CustomModal">
      <div className="CustomModal__content">{children}</div>
    </Modal>
  );
}

export default CustomModal;
