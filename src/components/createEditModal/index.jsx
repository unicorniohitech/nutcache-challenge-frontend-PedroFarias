import React, { useState, useEffect } from 'react'

import ReactDom from 'react-dom'
import Spinner, { useSpinner } from '../spinner';
import  api  from "../../services/employee"

import './styles.css'


const CreateEditModal = ({ isShowingCreateEditModal, toggleCreateEditModal, children }) => { 
  useEffect(() => {
    const listner = function (e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        isShowingCreateEditModal && toggleCreateEditModal();
      }
    }

    window.addEventListener('keyup', listner)

    return (() => {
      window.removeEventListener('keyup', listner)
    })

  }, [isShowingCreateEditModal, toggleCreateEditModal])

  return (
    isShowingCreateEditModal ? ReactDom.createPortal(
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div data-testid="create-modal-component" className="modal">
            {children}
          </div>
        </div>
      </div>, document.body
    ) : null
  )
}



export const CreateEditModalHeader = () => (
    <div className="modal-header">
        <h3>Employee</h3>
    </div>
)

export const CreateEditModalBody = ({ children, listFunction, employeeId, toggleCreateEditModal, handleLastEmployeeId }) => {
  const { isShowingSpinner, toggleSpinner } = useSpinner();
  const [employee, setEmployee] = useState({
    "name": "",
    "birthDate": "",
    "email": "",
    "cpf": "",
    "startDate": "",
    "team": "Mobile",
    "gender": "Male"
  });

  const handleSetValue = (event) => {
    setEmployee({...employee, [event.target.name]: event.target.value});
  }



  const handleSaveEmployee = async (event) => {
    try {
      event.preventDefault();
      
      if(employee && employee.id){
        toggleSpinner(true);
        var idToUpdate = employee.id;
        const response = await api.put('/employees/'+idToUpdate, employee);
      }else if (employee) {
        toggleSpinner(true);
        const response = await api.post('/employees', employee);
        handleLastEmployeeId(response.data.id);
      }
      listFunction();
      toggleSpinner(false);
      toggleCreateEditModal();

    }catch(error) {
      window.alert('Save Fail');
      toggleSpinner(false);
      toggleCreateEditModal();
    }

  }

  useEffect(() => {
    
    const getEmployee = async () => {
      if(employeeId) {
        try {
          toggleSpinner(true);
          const response = await api.get('/employees/'+ employeeId);
          toggleSpinner(false);
          setEmployee(response.data);
        }catch(error) {
          toggleSpinner(false);
          window.alert('Read Employee Error');
        }
      }
      
    };
    getEmployee();

  }, [employeeId,setEmployee]);

  return (
      <div>
        <form className="modal-body" onSubmit={handleSaveEmployee}>
          <div className="body-inputs">
            <label htmlFor="name">Name *</label>
            <input className="input" required value={employee.name} onChange={handleSetValue}  name="name" id="name" type="text"/>

            <label htmlFor="birthDate">Birth Date *</label>
            <input className="input" required value={employee.birthDate} onChange={handleSetValue}  name="birthDate" id="birthDate" type="date"/>

            <label htmlFor="email">E-mail *</label>
            <input className="input" required value={employee.email}  onChange={handleSetValue}  name="email" id="email" type="mail"/>

            <label htmlFor="cpf">CPF *</label>
            <input className="input" required value={employee.cpf}  onChange={handleSetValue}  name="cpf" id="cpf" type="text"/>
            </div>

            <div className="body-inputs">

              <label htmlFor="startDate">Start Date *</label>
              <input className="input" required value={employee.startDate}  onChange={handleSetValue}  name="startDate"  id="startDate" type="month"/>

              <label htmlFor="team">Team </label>
              <select className="input" value={employee.team} onChange={handleSetValue} name="team">
                <option value=""></option>
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
                <option value="Mobile" >Mobile</option>
              </select>
            
              <label htmlFor="gender">Gender *</label>
              <select className="input" value={employee.gender} onChange={handleSetValue} name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Binary">Not Binary</option>
              </select>
              <div className="modal-footer">
                <button className="btn-success" type="submit" onClick={() => false}>
                  Save
                </button>
                {children}
              </div>
            </div>
          
          
          
        </form>
        <Spinner {...{isShowingSpinner, toggleSpinner}} ></Spinner>
      </div>
  )
}


export const useCreateEditModal = () => {
  const [isShowingCreateEditModal, setIsShowingCreateEditModal] = useState(false);
  
  function toggleCreateEditModal() {
    setIsShowingCreateEditModal(!isShowingCreateEditModal);
  }

  return {
    isShowingCreateEditModal,
    toggleCreateEditModal,
  }
}

export default CreateEditModal;