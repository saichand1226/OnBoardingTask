import React, { Component } from 'react';
import { Table, Button, Modal, Form, Header } from 'semantic-ui-react';
export class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        const regex = /^\d*\.?\d*$/; // Regular expression to allow only numeric and decimal values
        if (regex.test(event.target.value)) {
            this.setState({
                price: event.target.value,
            });
        }
    }

    handleSubmit(event, id) {
        event.preventDefault();
        const { name, price } = this.state;
        if (name && price) {
        const newProduct = {
            id,
            name,
            price,
        };
        this.props.onClose();
        console.log(newProduct);
        fetch('/api/Products/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    //if (data.success) {
                    //    alert("Product details Updated Successfully!");
                    //}
                })
            alert("Product details Updated Successfully!");
        } else {
            alert('Please enter values for both Product Name and Price fields.');
        }
    }
    render() {
        const { open, onClose, id, name, price } = this.props;
        return (

            <Modal open={open} onClose={onClose}>
                <Header content="Edit Product" />
                <Modal.Content>
                    <Form onSubmit={(event) => this.handleSubmit(event, id)}>
                        <Form.Field>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input placeholder='Enter Name' defaultValue={name} onChange={this.handleNameChange} />
                            <label>Price:<span style={{ color: 'red' }}>*</span></label>
                            <input placeholder='Enter Price' defaultValue={price} onChange={this.handlePriceChange} />
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
