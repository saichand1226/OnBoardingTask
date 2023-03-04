import React, { Component } from 'react';
import { Modal, Form, Header } from 'semantic-ui-react';
export class EditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event) {
        const onlyAlphabets = /^[A-Za-z\s]+$/;
        const inputValue = event.target.value;

        if (onlyAlphabets.test(inputValue) || inputValue === '') {
            this.setState({
                name: event.target.value,
            });
        }
        // set the value of address field to the current value in the state
    }
    handleAddressChange(event) {
        this.setState({
            address: event.target.value,
        });
        // set the value of name field to the current value in the state

    }
    handleSubmit(event, id) {
        event.preventDefault();
        const { name, address } = this.state;
        const newStore = {
            id,
            name: name || this.props.name,
            address: address || this.props.address,
        };
        this.props.onClose();
        fetch('/api/Stores/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStore)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
        alert("Customer details Updated Successfully!");
    }

    render() {
        const { open, onClose, id, name, address } = this.props;
        return (
            <Modal open={open} onClose={onClose}>
                <Header content="Edit Store" />
                <Modal.Content>
                    <Form onSubmit={(event) => this.handleSubmit(event, id)}>
                        <Form.Field>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input placeholder='Enter Name' defaultValue={name} onChange={this.handleNameChange} required />
                            <label>Address:<span style={{ color: 'red' }}>*</span></label>
                            <input placeholder='Enter Address' defaultValue={address} onChange={this.handleAddressChange} required />
                        </Form.Field>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Form.Button positive type="submit">Save</Form.Button>
                            <Form.Button negative onClick={onClose}>Cancel</Form.Button>

                        </div>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

