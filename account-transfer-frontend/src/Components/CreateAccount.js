import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function CreateAccount() {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAccount = {
            account_number: accountNumber,
            account_name: accountName,
            balance: balance
        };

        axios.post('/api/accounts/', newAccount)
            .then(response => {
                setSuccessMessage('Account created successfully!');
                setErrorMessage('');
                setAccountNumber('');
                setAccountName('');
                setBalance('');
            })
            .catch(error => {
                setSuccessMessage('');
                setErrorMessage('Error creating account: ' + error.message);
            });
    };

    return (
        <Container>
            <h2>Create New Account</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="accountNumber" className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="accountName" className="mb-3">
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="balance" className="mb-3">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter balance"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </Container>
    );
}

export default CreateAccount;
