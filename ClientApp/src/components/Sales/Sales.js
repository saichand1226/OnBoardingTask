import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DeleteSale } from './DeleteSale';
import { AddSale } from './AddSale';
import { EditSale } from './EditSale';
import { Table, Button, Modal } from 'semantic-ui-react';


export class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = { saleId: 0, saleName: "", custName: "", prodName: "", storeName: "", currentPage: 1, salesPerPage: 5, sales: [], allCustomerNames: [], allProductNames: [], allStoreNames: [], isDeleteModalOpen: false, isAddModalOpen: false, isEditModalOpen: false }
        this.handleDeleteOpenModal = this.handleDeleteOpenModal.bind(this);
        this.handleDeleteCloseModal = this.handleDeleteCloseModal.bind(this);
        this.handleAddOpenModal = this.handleAddOpenModal.bind(this);
        this.handleAddCloseModal = this.handleAddCloseModal.bind(this);
        this.refreshList = this.refreshList.bind(this);
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

        fetch('/api/Sales').then(response => response.json())
            .then(data => {
                this.setState({ sales: data });

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
        this.setState({ isEditModalOpen: true });

    }

    handleEditCloseModal() {
        this.setState({ isEditModalOpen: false });
    }


    //another life cycle method
    render() {
        const { saleId, saleName, currentPage, salesPerPage, sales, custName, prodName, storeName } = this.state;
        const indexOfLastSales = currentPage * salesPerPage;
        const indexOfFirstSales = indexOfLastSales - salesPerPage;
        const currentSales = sales.slice(indexOfFirstSales, indexOfLastSales);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(sales.length / salesPerPage); i++) {
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
                <Button primary onClick={this.handleAddOpenModal}>Add Sale</Button>
                <AddSale
                    open={this.state.isAddModalOpen}
                    onClose={this.handleAddCloseModal}
                    allCustomerNames={this.state.allCustomerNames}
                    allProductNames={this.state.allProductNames}
                    allStoreNames={this.state.allStoreNames}
                />


                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Product </th>
                            <th>Store</th>
                            <th>Date</th>
                            <th>Actions</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            currentSales && currentSales.map((s, index) => {
                                return <tr key={index}>
                                    <td>{s.customerName}</td>
                                    <td>{s.productName}</td>
                                    <td>{s.storeName}</td>
                                    <td>{s.dateSold}</td>

                                    <td>
                                        <Button color='yellow' onClick={() => this.setState({ isEditModalOpen: true, saleId: s.saleId, custName: s.customerName, prodName: s.productName, storeName: s.storeName })} >Edit</Button>
                                        <EditSale
                                            open={this.state.isEditModalOpen}
                                            onClose={this.handleEditCloseModal}
                                            id={this.state.saleId}
                                            cname={this.state.custName}
                                            pname={this.state.prodName}
                                            sname={this.state.storeName}

                                        />
                                    </td>
                                    <td>
                                        <Button negative onClick={() => this.setState({ isDeleteModalOpen: true, saleId: s.saleId })}>Delete</Button>
                                        <DeleteSale
                                            open={this.state.isDeleteModalOpen}
                                            onClose={this.handleDeleteCloseModal}
                                            id={saleId}
                                            sales={this.sales}
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
