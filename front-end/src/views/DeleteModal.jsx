import { useState } from "react";
import CustomModal from "../common/components/CustomModal";
import Button from "../common/components/Button"
import "./DeleteModal.css";
import warning from "../assets/warning.png";
import { propTypes } from "react-bootstrap/esm/Image";

function DeleteModal({showModal, onCloseModal, deleteResponse, type}) {
    console.log("showModal", showModal);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function modalResponse(confirmation){
        setConfirmDelete(confirmation);
        deleteResponse(confirmation);
    }

    return(
        <CustomModal showModal={showModal} onCloseModal={onCloseModal}>
            <div>
                <div className="delete-header">
                    <div className="delete-title">Delete Confirmation</div>
                    <img src={warning} width="30px" height="30px"/>
                </div>
                <div className="delete-borders">
                <div className="delete-question"> Are you sure you want to delete this {type}? You can't undo this change!</div>
                </div>
                <div className="delete-modal-button-group">
                    <button className="cancel-btn" onClick={() => modalResponse(false)}>
                        Cancel
                    </button>
                    <button className="delete-btn" onClick={() => modalResponse(true)}>
                        Delete
                    </button>
                </div>
            </div>
        </CustomModal>
    )
}

export default DeleteModal;