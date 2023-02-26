import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DeleteProduct } from './DeleteProduct';
import { AddProduct } from './AddProduct';
import { EditProduct } from './EditProduct';
import { Table, Button, Modal } from 'semantic-ui-react';

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { prodId: 0, prodName: "", prodPrice: "", currentPage: 1, productsPerPage: 5, products: [], isDeleteModalOpen: false, isAddModalOpen: false, isEditModelOpen: false }
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

        fetch('/api/Products').then(response => response.json())
            .then(data => {
                this.setState({ products: data });
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
        const { products, prodId, prodName, prodPrice, currentPage, productsPerPage } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
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
                <Button primary onClick={this.handleAddOpenModal}>Add Product</Button>
                <AddProduct
                    open={this.state.isAddModalOpen}
                    onClose={this.handleAddCloseModal}
                />


                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Actions</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                           
                            currentProducts && currentProducts.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>

                                    <td>
                                        <Button color='yellow' onClick={() => this.setState({ isEditModelOpen: true, prodId: p.id, prodName: p.name, prodPrice: p.price })}>Edit</Button>
                                        <EditProduct
                                            open={this.state.isEditModelOpen}
                                            onClose={this.handleEditCloseModal}
                                            id={this.state.prodId}
                                            name={this.state.prodName}
                                            address={this.state.prodPrice}

                                        />
                                    </td>
                                    <td>
                                        <Button negative onClick={() => this.setState({ isDeleteModalOpen: true, prodId: p.id })}>Delete</Button>
                                        <DeleteProduct
                                            open={this.state.isDeleteModalOpen}
                                            onClose={this.handleDeleteCloseModal}
                                            id={prodId}

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