import React, { Component } from 'react';
import { Table, Button, Modal, Dropdown, Header, Form } from 'semantic-ui-react';
export class EditSale extends Component {

    constructor(props) {
        super(props);
        this.state = {

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

    handleSubmit(event, id) {



        const { CustomerId, ProductId, StoreId, DateSold } = this.state;

        const updatedSale = {
            id,
            ProductId,
            CustomerId,
            StoreId,
            DateSold
        };
        console.log(updatedSale)
        fetch('/api/Sales/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSale)
        })
            .then(response => response.json())
            .then(data => alert("Store details has been Updated"))
            .catch(error => console.error(error));


        this.props.onClose();
    }

    render() {
        const { open, onClose, id } = this.props;

        const dropdownStyle = { margin: '20px' };
        const buttonStyle = { margin: '20px' };

        return (

            <Modal open={open} onClose={onClose}>
                <Header content="Edit Sale" />
                <Modal.Content>


                    <Form>
                        <Form.Field>
                            <label>Select a Customer</label>
                            <Dropdown
                                placeholder={this.props.cname}
                                fluid
                                selection
                                options={this.state.customers}
                                onChange={this.handleCustomerChange}
                                defaultValue={this.props.cname}
                                style={dropdownStyle}
                                onClick={this.fetchCustomers}
                            />
                        </Form.Field>


                        <Form.Field>
                            <label>Select a Product</label>
                            <Dropdown
                                placeholder={this.props.pname}
                                fluid
                                selection
                                options={this.state.products}
                                onChange={this.handleProductChange}
                                defaultValue={this.props.pname}
                                style={dropdownStyle}
                                onClick={this.fetchProducts}
                            />
                        </Form.Field>


                        <Form.Field>
                            <label>Select a Store</label>
                            <Dropdown
                                placeholder={this.props.sname}
                                fluid
                                selection
                                options={this.state.stores}
                                onChange={this.handleStoreChange}
                                defaultValue={this.props.sname}
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
                        </Form.Field>
                    </Form>

                    <Button color='yellow' style={buttonStyle} onClick={(event) => this.handleSubmit(event, id)}>Submit</Button>
                    <Button color='black' style={buttonStyle} onClick={this.props.onClose}>Cancel</Button>
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
