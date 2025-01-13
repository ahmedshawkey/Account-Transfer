import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import GetAllAccounts from './Components/GetAllAccounts';
import CreateAccount from './Components/CreateAccount';
import GetAllTransactions from './Components/GetAllTransactions';
import CreateTransaction from './Components/CreateTransaction';
import GetAccountsFromFile from './Components/GetAccountsFromFile';

function App() {
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">Account Transfer App</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/get-all-accounts">Get All Accounts</Nav.Link>
                            <Nav.Link as={Link} to="/create-account">Create New Account</Nav.Link>
                            <Nav.Link as={Link} to="/get-all-transactions">Get All Transactions</Nav.Link>
                            <Nav.Link as={Link} to="/create-transaction">Create New Transaction</Nav.Link>
                            <Nav.Link as={Link} to="/get-accounts-from-file">Get Accounts From File</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container className="mt-4">
                    <Routes>
                        <Route path="/get-all-accounts" element={<GetAllAccounts />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/get-all-transactions" element={<GetAllTransactions />} />
                        <Route path="/create-transaction" element={<CreateTransaction />} />
                        <Route path="/get-accounts-from-file" element={<GetAccountsFromFile />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}

export default App;
