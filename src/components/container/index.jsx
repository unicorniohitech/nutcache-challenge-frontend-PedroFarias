import React, { Fragment, useEffect, useState } from 'react';
import styles from './styles.css';
import Table from '../table/';
import CreateEditModal, {
    CreateEditModalHeader, 
    CreateEditModalBody, 
    useCreateEditModal
} from '../createEditModal';

import DeleteModal, {
    DeleteModalHeader, 
    DeleteModalBody, 
    useDeleteModal
} from '../deleteModal';

import Spinner, { useSpinner } from '../spinner';

import api from '../../services/employee'

const Container = () => {
    const { isShowingCreateEditModal, toggleCreateEditModal } = useCreateEditModal();
    const { isShowingDeleteModal, toggleDeleteModal } = useDeleteModal();
    const { isShowingSpinner, toggleSpinner } = useSpinner();
    
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeId, setEmployeeId] = useState('');

    const [lastEmployeeIdSaved, setLastEmployeeIdSaved] = useState('');


    const getData = async () => {
        try {
            toggleSpinner(true);
            const response = await api.get('/employees');
            toggleSpinner(false);
            setEmployeeList(response.data);
        }catch(error) {
            toggleSpinner(false);
            window.alert('Requisition Error');
        }
    };

    
    useEffect(() => {
        getData();
        
      }, [setEmployeeList]);
    return (
            <div data-testid="container-component" className="container">
                <div className="crud-container">
                    <button className="btn-info" onClick={() => {toggleCreateEditModal(); setEmployeeId('') }}>Create Employee</button>
                    { lastEmployeeIdSaved && 
                    <Fragment>
                        <button className="btn-info" onClick={() => {toggleCreateEditModal(); setEmployeeId(lastEmployeeIdSaved) }} >Update last Employee</button>
                        <button className="btn-delete" onClick={() => {toggleDeleteModal(); setEmployeeId(lastEmployeeIdSaved); }} >Delete last Employee</button>

                    </Fragment>
                    }
                </div>
                
                <CreateEditModal {...{isShowingCreateEditModal, toggleCreateEditModal}}>
                    <CreateEditModalHeader {...{toggleCreateEditModal}}/>
                    <CreateEditModalBody {...{toggleCreateEditModal}} listFunction={getData} employeeId={employeeId} handleLastEmployeeId={setLastEmployeeIdSaved}>
                        <button className="btn-delete" onClick={toggleCreateEditModal}>
                            Cancel
                        </button>
                    </CreateEditModalBody>
                </CreateEditModal>
                
                <DeleteModal {...{isShowingDeleteModal, toggleDeleteModal}}>
                    <DeleteModalHeader {...{toggleDeleteModal}}/>
                    <DeleteModalBody {...{toggleDeleteModal}} listFunction={getData} employeeId={employeeId} handleLastEmployeeId={setLastEmployeeIdSaved}/>
                        
                    
                </DeleteModal>

                <Table employees={employeeList} toggleCreateEditModal={toggleCreateEditModal} setEmployeeId={setEmployeeId} toggleDeleteModal={toggleDeleteModal} />
                <Spinner {...{isShowingSpinner, toggleSpinner}} ></Spinner>
            </div>
    )
}

export default Container;