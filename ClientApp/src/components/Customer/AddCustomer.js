import React, { Component } from 'react';
import { Table, Button, Modal, Form, Header } from 'semantic-ui-react';
export class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            address: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event) {
       
        const onlyAlphabets = /^[A-Za-z]+$/;
        const inputValue = event.target.value;

        if (onlyAlphabets.test(inputValue) || inputValue === '') {
            this.setState({
                name: inputValue,
            });
        }
    }
    handleAddressChange(event) {
        this.setState({
            address: event.target.value,
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const { name, address } = this.state;
        if (name && address) {
            const newCustomer = {
                name,
                address,
            };
            fetch('/api/Customers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCustomer)
            })
                .then(response => response.json())
                .then(data => {
                    alert("New Customer has been added!");
                    this.props.onClose();
                })
                .catch(error => console.error(error));
            this.setState({
                name: '',
                address: ''
            });
        } else {
            alert('Please enter values for both Name and Address fields.');
        }
    }

    render() {
        const { open, onClose } = this.props;
        return (
            <Modal open={open} onClose={onClose}>
                <Header content="Add Customer" />
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} required />
                            <label>Address:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.address} onChange={this.handleAddressChange} required />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={(event) => this.handleSubmit(event)}>
                        Submit
                    </Button>
                    <Button color='black' onClick={this.props.onClose}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}