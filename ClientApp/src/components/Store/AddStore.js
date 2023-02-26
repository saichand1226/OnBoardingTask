import React, { Component } from 'react';
import { Table, Button, Modal, Form, Header } from 'semantic-ui-react';
export class AddStore extends Component {

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
        this.setState({
            name: event.target.value,
        });
    }

    handleAddressChange(event) {
        this.setState({
            address: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { id, name, address } = this.state;
        if (name && address) {
        const newStore = {
            id,
            name,
            address,
        };

        fetch('/api/Stores/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStore)
        })
                 .then(response => response.json())
                .then(data => {
                    alert("New Store has been added!");
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
                <Header content="Add Store" />
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} required />
                            <label>Address:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.address} onChange={this.handleAddressChange} required />
                        </Form.Field>
                        {/*<Form.Button positive type="submit">Submit</Form.Button>*/}
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
