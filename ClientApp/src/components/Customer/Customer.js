import React from 'react';
import { DeleteCustomer } from './DeleteCustomer';
import { AddCustomer } from './AddCustomer';
import { EditCustomer } from './EditCustomer';
import { Button } from 'semantic-ui-react';
export class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { custId: 0, custName: "", custAddress: "", currentPage: 1, customersPerPage: 5, customers: [], isDeleteModalOpen: false, isAddModalOpen: false, isEditModalOpen: false }
        this.handleDeleteOpenModal = this.handleDeleteOpenModal.bind(this);
        this.handleDeleteCloseModal = this.handleDeleteCloseModal.bind(this);
        this.handleAddOpenModal = this.handleAddOpenModal.bind(this);
        this.handleAddCloseModal = this.handleAddCloseModal.bind(this);
        this.handleEditOpenModal = this.handleEditOpenModal.bind(this);
        this.handleEditCloseModal = this.handleEditCloseModal.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }
    componentDidMount() {
        this.refreshList();
    }
    componentDidUpdate() {
        this.refreshList();
    }
    refreshList() {
        fetch('/api/Customers').then(response => response.json())
            .then(data => {
                this.setState({ customers: data });
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
        const { customers, custId, currentPage, customersPerPage } = this.state;
        const indexOfLastCustomer = currentPage * customersPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
        const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(customers.length / customersPerPage); i++) {
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
                <Button primary onClick={this.handleAddOpenModal}>Add Customer</Button>
                <AddCustomer
                    open={this.state.isAddModalOpen}
                    onClose={this.handleAddCloseModal}
                />
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //checking here if CustomerData is not empty then only map it.
                            currentCustomers && currentCustomers.map((c, index) => {
                                return <tr key={index}>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>
                                        <Button color='yellow' onClick={() => this.setState({ isEditModelOpen: true, custId: c.id, custName: c.name, custAddress: c.address })}>Edit</Button>
                                        <EditCustomer
                                            open={this.state.isEditModelOpen}
                                            onClose={this.handleEditCloseModal}
                                            id={this.state.custId}
                                            name={this.state.custName}
                                            address={this.state.custAddress}
                                        />
                                    </td>
                                    <td>
                                        <Button negative onClick={() => this.setState({ isDeleteModalOpen: true, custId: c.id })}>Delete</Button>
                                        <DeleteCustomer
                                            open={this.state.isDeleteModalOpen}
                                            onClose={this.handleDeleteCloseModal}
                                            id={custId}
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