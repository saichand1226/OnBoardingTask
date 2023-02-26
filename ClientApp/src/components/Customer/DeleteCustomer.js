import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'semantic-ui-react';
export class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
    }
    //deleteCustomer(id) {

    //    fetch('/api/Customers/' + id, { method: "delete" })
    //    //if (res.status === 409) {
    //    //    alert("We cannot delete this customer as this customer has an existing sales linked");
    //    //}
    //    //else {
    //    //    this.props.onClose();
    //    //}
    //    this.props.onClose();
    //}
    deleteCustomer(id) {
        fetch('/api/Customers/' + id, { method: "delete" })
            .then(res => {
                if (res.status === 500) {
                    alert("We cannot delete this customer as this customer has an existing sales linked");
                } else {
                    this.props.onClose();
                }
            })
            .catch(error => {
                console.log(error);
                alert("An error occurred while deleting the customer");
            });
    }

    render() {

        let { open, id, onClose } = this.props;
        return (
            <Modal open={open} onClose={onClose}>
                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => { this.deleteCustomer(id); }}>Yes</Button>
                    <Button color='black' onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
}















