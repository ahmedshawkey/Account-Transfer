import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function GetAccountsFromFile() {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/api/accounts/upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setSuccessMessage('Accounts created successfully!');
            setErrorMessage('');
        })
        .catch(error => {
            setSuccessMessage('');
            setErrorMessage('Error uploading file: ' + error.message);
        });
    };

    return (
        <Container>
            <h2>Upload Accounts from File</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload CSV File</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload File
                </Button>
            </Form>
        </Container>
    );
}

export default GetAccountsFromFile;
