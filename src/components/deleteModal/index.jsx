import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import Spinner, { useSpinner } from '../spinner';
import  api  from "../../services/employee"

import './styles.css'


const DeleteModal = ({ isShowingDeleteModal, toggleDeleteModal, children }) => { 
  useEffect(() => {
    const listner = function (e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        isShowingDeleteModal && toggleDeleteModal();
      }
    }

    window.addEventListener('keyup', listner)

    return (() => {
      window.removeEventListener('keyup', listner)
    })

  }, [isShowingDeleteModal, toggleDeleteModal])

  return (
    isShowingDeleteModal ? ReactDom.createPortal(
      <div className="modal-delete-overlay">
        <div className="modal-delete-wrapper">
          <div data-testid="delete-modal-component" className="modal-delete">
            {children}
          </div>
        </div>
      </div>, document.body
    ) : null
  )
}



export const DeleteModalHeader = () => (
    <div className="modal-delete-header">
      <h3>
        Are you sure you want to delete ?
      </h3>
    </div>
)

export const DeleteModalBody = ({ toggleDeleteModal, employeeId, listFunction, handleLastEmployeeId }) => {
  const { isShowingSpinner, toggleSpinner } = useSpinner();
  const handleSaveEmployee = async (event) => {
    try {
      
      if(employeeId){
        toggleSpinner(true);
        const response = await api.delete('/employees/'+ employeeId);
        handleLastEmployeeId(null);
      }
      listFunction();
      toggleSpinner(false);
      toggleDeleteModal();

    }catch(error) {
      window.alert('Delete Error');
      toggleSpinner(false);
      toggleDeleteModal();
    }

  }
  
  return(
    <>
    
      <div className="modal-delete-body">
          <button className="btn-success" onClick={handleSaveEmployee}>
            Yes
          </button>
          <button className="btn-delete" onClick={toggleDeleteModal}>
            Cancel
          </button>
      </div>
      <Spinner {...{isShowingSpinner, toggleSpinner}} ></Spinner>
    </>
)}



export const useDeleteModal = () => {
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false);

  function toggleDeleteModal() {
    setIsShowingDeleteModal(!isShowingDeleteModal);
  }

  return {
    isShowingDeleteModal,
    toggleDeleteModal,
  }
}

export default DeleteModal;