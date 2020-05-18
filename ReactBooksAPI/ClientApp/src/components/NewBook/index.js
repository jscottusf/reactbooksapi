import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from '../Form';


function AddBook(props) {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Add new book
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input placeholder="Book Title" value={props.name} name="Name" onChange={props.handleInput} type="text" />
                        <Input placeholder="Author" value={props.author} name="Author" onChange={props.handleInput} type="text" />
                        <Input placeholder="19.99" value={props.price} name="Price" onChange={props.handleInput} type="number" min="0" step=".01" />
                        <Input placeholder="Science Fiction" value={props.category} name="Category" onChange={props.handleInput} type="text" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={(event) => props.handleSubmit(event, handleClose)}>
                            Save Book
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
}

export default AddBook;