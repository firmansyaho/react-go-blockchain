import { useEffect, useState } from "react";
import { Container, ListGroup, Nav, Navbar, Row } from "react-bootstrap";
import axios from "axios";

import { TRANSACTION_URL } from "../src/common/constant";
import PopupCreateChain from "../src/components/PopupCreateChain";
import SendTransaction from "../src/components/SendTransaction";
import MultipleRequest from "../src/components/MultipleRequests";
import CheckBalance from "../src/components/CheckBalance";

const Transaction = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [toName, setToName] = useState("");
  const [toAmount, setToAmount] = useState();
  const [balance, setBalance] = useState("");
  const [showAddAChain, setShowAddAChain] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [goCreateChain, setGoCreateChain] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);
  const [errorCounter, setErrorCounter] = useState(0);
  const [successCounter, setSuccessCounter] = useState(0);
  const [showCheckBalance, setShowCheckBalance] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      setShowAddAChain(true);
    } else {
      setName(localStorage.getItem("userName"));
    }
    getTransactions();
  }, []);

  useEffect(() => {
    if (name) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, name]);

  const getTransactions = async () => {
    try {
      const resp = await axios.get(`${TRANSACTION_URL}/printChain`);
      console.log("data resp get tran", resp.data.Message);
      if (resp) {
        if (resp.data.Message === "No existing blockchain found, create one!") {
          setGoCreateChain(true);
        } else {
          setTransactions(resp.data);
          setGoCreateChain(false);
        }
      }
    } catch (err) {
      console.log("data err get trab", err);
    }
  };

  const addAChain = async () => {
    try {
      const resp = await axios.post(
        `${TRANSACTION_URL}/createBlockChain?data=${name}&amount=${amount}`
      );
      if (resp) {
        localStorage.setItem("userName", name);
        // TODO: Get the amount for specific user
        setShowAddAChain(false);
        setGoCreateChain(false);
        getTransactions();
      }
    } catch (err) {
      console.log("data err add chain", err);
    }
  };

  const addTransaction = async () => {
    try {
      const resp = await axios.post(
        `${TRANSACTION_URL}/sendTransaction?from=${name}&to=${toName}&amount=${toAmount}`
      );
      if (resp) {
        console.log("data resp add tra", resp.data);
        getTransactions();
        setShowTransaction(false);
        getBalance();
      }
    } catch (err) {
      console.log("data err add transa", err);
    }
  };

  const getBalance = async () => {
    try {
      const resp = await axios.get(`${TRANSACTION_URL}/getBalance/${name}`);
      console.log("data resp balce", resp.data);
      if (resp) {
        setBalance(resp.data.Balance);
      }
    } catch (err) {
      console.log("data err balce", err);
    }
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Go-Blockchain</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" style={{ marginRight: 20, marginLeft: 20 }}>
              Home
            </Nav.Link>
            {/* <Nav.Link href="/transaction" style={{ marginLeft: 20 }}>
              Transactions
            </Nav.Link> */}
            <Nav.Link
              href="#"
              style={{ marginLeft: 20 }}
              onClick={() => {
                setShowTransaction(true);
              }}
            >
              Create a transaction
            </Nav.Link>
            <Nav.Link
              href="#"
              style={{ marginLeft: 20 }}
              onClick={() => {
                setGoCreateChain(true);
              }}
            >
              Create a Blockchain
            </Nav.Link>
            <Nav.Link
              href="#"
              style={{ marginLeft: 20 }}
              onClick={() => {
                setShowCheckBalance(true);
              }}
            >
              Balance Checker
            </Nav.Link>
            <Nav.Link
              href="#"
              style={{ marginLeft: 20 }}
              onClick={() => {
                setShowMultiple(true);
              }}
            >
              Multiple API Request (success {successCounter}) (err{" "}
              {errorCounter})
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <b>({name})</b> {balance ? `Balance is ${balance}` : ""}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {!goCreateChain ? (
        <Row style={{ margin: 20 }}>
          <h5>Transactions List</h5>
          <ListGroup>
            {transactions &&
              transactions.map((item, index) => (
                <ListGroup.Item key={index}>
                  {item.PrevHash
                    ? `"${item.Hash}" Has send $${item.Transactions[0].Outputs[0].Value} to ${item.Transactions[0].Outputs[0].PubKey}`
                    : `${item.Transactions[0].Outputs[0].PubKey} ${item.Transactions[0].Inputs[0].Sig} By $${item.Transactions[0].Outputs[0].Value}`}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Row>
      ) : (
        <></>
      )}
      <PopupCreateChain
        show={goCreateChain}
        handleClose={() => setGoCreateChain(false)}
        handleSave={addAChain}
        name={name}
        amount={amount}
        setName={setName}
        setAmount={setAmount}
      />
      <SendTransaction
        show={showTransaction}
        handleClose={() => setShowTransaction(false)}
        handleSave={addTransaction}
        name={toName}
        amount={toAmount}
        setName={setToName}
        setAmount={setToAmount}
      />
      <MultipleRequest
        show={showMultiple}
        handleClose={() => setShowMultiple(false)}
        handleSave={() => setShowMultiple(false)}
        setErrorCounter={setErrorCounter}
        errorCounter
        setSuccessCounter={setSuccessCounter}
        successCounter
      />
      <CheckBalance
        show={showCheckBalance}
        handleClose={() => setShowCheckBalance(false)}
        handleSave={() => setShowCheckBalance(false)}
      />
    </>
  );
};

export default Transaction;
