import React from 'react';
import { render } from '@testing-library/react';
import DeleteModal from './components/deleteModal';
import CreateEditModal from './components/createEditModal';
import Container from './components/container';



test('should add Delete Modal in document', () => {
    const { getByTestId } = render(<DeleteModal isShowingDeleteModal={true}/>);
    const deleteModalComponent = getByTestId('delete-modal-component');
    expect(deleteModalComponent).toBeInTheDocument();
});

test('should add Create or Edit Modal in document', () => {
    const { getByTestId } = render(<CreateEditModal isShowingCreateEditModal={true}/>);
    const createModalComponent = getByTestId('create-modal-component');
    expect(createModalComponent).toBeInTheDocument();
});

test('should add Container component in document', () => {
    const { getByTestId } = render(<Container/>);
    const containerComponent = getByTestId('container-component');
    expect(containerComponent).toBeInTheDocument();
});

