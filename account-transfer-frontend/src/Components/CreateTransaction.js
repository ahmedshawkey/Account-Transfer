import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function CreateTransaction() {
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTransaction = {
            sender_id: senderId,
            receiver_id: receiverId,
            amount: amount
        };

        axios.post('/api/transaction/', newTransaction)
            .then(response => {
                setSuccessMessage('Transaction created successfully!');
                setErrorMessage('');
                setSenderId('');
                setReceiverId('');
                setAmount('');
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessage('Error creating transaction: ' + error.message);
            });
    };

    return (
        <Container>
            <h2>Create New Transaction</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="senderId" className="mb-3">
                    <Form.Label>Sender ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter sender ID"
                        value={senderId}
                        onChange={(e) => setSenderId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="receiverId" className="mb-3">
                    <Form.Label>Receiver ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter receiver ID"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="amount" className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Transaction
                </Button>
            </Form>
        </Container>
    );
}

export default CreateTransaction;
