import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button, Modal } from 'semantic-ui-react';


export class DeleteProduct extends Component {

    constructor(props) {
        super(props);

    }

    deleteProduct(id) {

        fetch('/api/Products/' + id, { method: "delete" })
        
            .then(res => {
                if (res.status === 500) {
                    alert("We cannot delete this Product as this Product has an existing sales linked");
                } else {
                    this.props.onClose();
                }
            })
            .catch(error => {
                console.log(error);
                alert("An error occurred while deleting the Product");
            });
    }

    render() {




        let { open, id, onClose } = this.props;

        return (
            <Modal open={open} onClose={onClose}>
                <Modal.Header>Delete Product</Modal.Header>
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => { this.deleteProduct(id); }}>Yes</Button>
                    <Button color='black' onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
} 