import React, { Component } from 'react';
import { Table, Button, Modal, Form, Header } from 'semantic-ui-react';
export class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            price: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handlePriceChange(event) {
        this.setState({
            price: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onClose();
        const { id, name, price } = this.state;
        if (name && price) {
        const newProduct = {
            id,
            name,
            price,
        };

        fetch('/api/Products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
                .then(response => response.json())
                .then(data => {
                    alert("New Product has been added!");
                    this.props.onClose();
                })
                .catch(error => console.error(error));
            this.setState({
                name: '',
                price: ''
            });
        } else {
            alert('Please enter values for both Name and Price fields.');
        }
    }

    render() {
        const { open, onClose } = this.props;
        return (

            <Modal open={open} onClose={onClose}>
                <Header content="Add Product" />
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.name} onChange={this.handleNameChange} required />
                            <label>Price:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={this.state.price} onChange={this.handlePriceChange} required />
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
