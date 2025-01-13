import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

function GetAllAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/accounts/')
            .then(response => {
                setAccounts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">Error fetching accounts: {error.message}</Alert>;

    return (
        <div>
            <h2>All Accounts</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Account Number</th>
                        <th>Account Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id}>
                            <td>{account.account_number}</td>
                            <td>{account.account_name}</td>
                            <td>{account.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default GetAllAccounts;
