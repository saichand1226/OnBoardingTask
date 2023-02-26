import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DeleteStore } from './DeleteStore';
import { AddStore } from './AddStore';
import { EditStore } from './EditStore';
import { Table, Button, Modal } from 'semantic-ui-react';

export class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = { storeId: 0, storeName: "", storeAddress: "", currentPage: 1, storesPerPage: 5, stores: [], isDeleteModalOpen: false, isAddModalOpen: false, isEditModelOpen: false }
        this.handleDeleteOpenModal = this.handleDeleteOpenModal.bind(this);
        this.handleDeleteCloseModal = this.handleDeleteCloseModal.bind(this);
        this.handleAddOpenModal = this.handleAddOpenModal.bind(this);
        this.handleAddCloseModal = this.handleAddCloseModal.bind(this);
        this.handleEditOpenModal = this.handleEditOpenModal.bind(this);
        this.handleEditCloseModal = this.handleEditCloseModal.bind(this);

    }

    componentDidMount() {
        this.refreshList();
    }


    componentDidUpdate() {
        this.refreshList();
    }

    refreshList() {

        fetch('/api/Stores').then(response => response.json())
            .then(data => {
                this.setState({ stores: data });
            })


    }

    handleDeleteOpenModal() {
        this.setState({ isDeleteModalOpen: true });

    }

    handleDeleteCloseModal() {
        this.setState({ isDeleteModalOpen: false });
    }

    handleAddOpenModal() {
        this.setState({ isAddModalOpen: true });

    }

    handleAddCloseModal() {
        this.setState({ isAddModalOpen: false });
    }

    handleEditOpenModal() {
        this.setState({ isEditModelOpen: true });

    }

    handleEditCloseModal() {
        this.setState({ isEditModelOpen: false });
    }


    //another life cycle method
    render() {
        const { stores, storeId, storeName, currentPage, storesPerPage, storeAddress } = this.state;
        const indexOfLastStore = currentPage * storesPerPage; 
        const indexOfFirstStore = indexOfLastStore - storesPerPage;
        const currentStores = stores.slice(indexOfFirstStore, indexOfLastStore);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(stores.length / storesPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Button key={number} onClick={() => this.setState({ currentPage: number })}>
                    {number}
                </Button>
            );
        });
        return (

            <div className="float-sm-left">
                <Button primary onClick={this.handleAddOpenModal}>Add Store</Button>
                <AddStore
                    open={this.state.isAddModalOpen}
                    onClose={this.handleAddCloseModal}
                />


                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Store Name</th>
                            <th>Store Address</th>
                            <th>Actions</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            currentStores && currentStores.map((st, index) => {
                                return <tr key={index}>
                                    <td>{st.name}</td>
                                    <td>{st.address}</td>

                                    <td>
                                        <Button color='yellow' onClick={() => this.setState({ isEditModelOpen: true, storeId: st.id, storeName: st.name, storeAddress: st.address })}>Edit</Button>
                                        <EditStore
                                            open={this.state.isEditModelOpen}
                                            onClose={this.handleEditCloseModal}
                                            id={this.state.storeId}
                                            name={this.state.storeName}
                                            address={this.state.storeAddress}

                                        />
                                    </td>
                                    <td>
                                        <Button negative onClick={() => this.setState({ isDeleteModalOpen: true, storeId: st.id })}>Delete</Button>
                                        <DeleteStore
                                            open={this.state.isDeleteModalOpen}
                                            onClose={this.handleDeleteCloseModal}
                                            id={storeId}

                                        />


                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                <div className="pagination">
                    {renderPageNumbers}
                </div>
            </div>
        );
    }



}

//export default Customer