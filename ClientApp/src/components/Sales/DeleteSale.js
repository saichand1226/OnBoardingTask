import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'semantic-ui-react';


export class DeleteSale extends Component {

    constructor(props) {
        super(props);

    }

    deleteSale(id) {
        console.log(id);
        fetch('/api/Sales/' + id, { method: "delete" })

        this.props.onClose();
    }



    render() {




        let { open, id, onClose } = this.props;

        return (
            <Modal open={open} onClose={onClose} >
                <Modal.Header>Delete Sale</Modal.Header>
                <Modal.Content>
                    <p>Are you sure?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button primary onClick={() => { this.deleteSale(id); this.props.onClose(); }}>Yes</Button>
                    <Button color='black' onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );

    }
} 