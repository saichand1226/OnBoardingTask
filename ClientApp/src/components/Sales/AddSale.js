import React, { Component } from 'react';
import { Table, Button, Modal, Dropdown, Header, Form } from 'semantic-ui-react';
export class AddSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            CustomerId: '',
            ProductId: '',
            StoreId: '',
            DateSold: '',
            customers: [],
            products: [],
            stores: [],

        };
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchCustomers = this.fetchCustomers.bind(this);
        this.fetchStores = this.fetchStores.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);

    }

    handleCustomerChange = (e, { value }) => {
        this.setState({ CustomerId: value });
    };

    handleProductChange = (e, { value }) => {
        this.setState({ ProductId: value });
    };

    handleStoreChange = (e, { value }) => {
        this.setState({ StoreId: value });
    };

    handleTextChange = (e, { value }) => {
        this.setState({ DateSold: value });
    };

    fetchCustomers() {
        fetch('/api/Customers').then(response => response.json())
            .then(data => {
                this.state.customers = data.map((c) => ({
                    key: c.id,
                    value: c.id,
                    text: c.name,
                    text: `${c.id} - ${c.name}`,
                }));
                this.setState(this.state.customers);
            })

    }


    fetchStores() {
        fetch('/api/Stores').then(response => response.json())
            .then(data => {
                this.state.stores = data.map((s) => ({
                    key: s.id,
                    value: s.id,
                    text: `${s.id} - ${s.name}`,

                }));
                this.setState(this.state.stores);

            })

    }


    fetchProducts() {
        fetch('/api/Products').then(response => response.json())
            .then(data => {
                this.state.products = data.map((p) => ({
                    key: p.id,
                    value: p.id,
                    text: `${p.id} - ${p.name}`,
                }));
                this.setState(this.state.products);
            })

    }

    handleSubmit(event) {


        //console.log(this.state.CustomerId);
        //console.log(this.state.ProductId)
        const { id, CustomerId, ProductId, StoreId, DateSold } = this.state;

        const newSale = {

            ProductId,
            CustomerId,
            StoreId,
            DateSold
        };
        console.log(newSale);
        fetch('/api/Sales/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSale)
        })

            .catch(error => console.error(error));

        //window.location.reload(false);
        this.props.onClose();
    }

    render() {
        const { open, onClose } = this.props;

        const dropdownStyle = { margin: '20px' };
        const buttonStyle = { margin: '20px' };
        return (

            <Modal open={open} onClose={onClose}>
                <Header content="Add Sale" />
                <Modal.Content>

                    <Form>
                        <Form.Field>
                            <label>Select a Customer</label>
                            <Dropdown
                                placeholder='Select a Customer'
                                fluid
                                selection
                                options={this.state.customers}
                                onChange={this.handleCustomerChange}
                                value={this.props.value}
                                style={dropdownStyle}
                                onClick={this.fetchCustomers}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Select a Product</label>
                            <Dropdown
                                placeholder='Select a Product'
                                fluid
                                selection
                                options={this.state.products}
                                onChange={this.handleProductChange}
                                value={this.props.value}
                                style={dropdownStyle}
                                onClick={this.fetchProducts}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Select a Store</label>
                            <Dropdown
                                placeholder='Select a Store'
                                fluid
                                selection
                                options={this.state.stores}
                                onChange={this.handleStoreChange}
                                value={this.props.value}
                                style={dropdownStyle}
                                onClick={this.fetchStores}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Enter the date</label>
                            <Form.Input
                                placeholder='Enter Date...'
                                type="date"
                                value={this.state.textValue}
                                onChange={this.handleTextChange}
                            />
                            <label>Please enter the date in format DD/MM/YYYY</label>
                        </Form.Field>
                    </Form>
                    <Button color='blue' style={buttonStyle} onClick={this.handleSubmit}>Submit</Button>
                    <Button color='black' style={buttonStyle} onClick={this.props.onClose}>cancel</Button>
                </Modal.Content>
                {/*<Modal.Actions>*/}
                {/*    <Button color='black' onClick={this.props.onClose}>*/}
                {/*        Cancel*/}
                {/*    </Button>*/}

                {/*</Modal.Actions>*/}

            </Modal>

        );
    }
}
