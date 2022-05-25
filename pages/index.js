import axios from "axios";

import { useEffect, useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Popup from "../src/components/Popup";
import PopupCreateChain from "../src/components/PopupCreateChain";

export default function Home() {
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [showAddAChain, setShowAddAChain] = useState(false);
  const [toTransactions, setToTransactions] = useState(false);
  const [data, setData] = useState();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState();

  console.log("name amount", name, amount);
  const getBlocks = async () => {
    setToTransactions(false);
    try {
      const resp = await axios.get("http://localhost:8080/getblocks");
      console.log("data resp", resp.data);
      if (resp) {
        setData(resp.data);
      }
    } catch (err) {
      console.log("data err", err);
    }
  };

  const getCurrentBlocks = async () => {
    setToTransactions(false);

    try {
      const resp = await axios.get("http://localhost:8080/viewCurrentBlock");
      console.log("data resp", resp.data);
      if (resp) {
        setData(resp.data);
      }
    } catch (err) {
      console.log("data err", err);
    }
  };

  const addNewBlocks = async () => {
    setToTransactions(false);
    try {
      const resp = await axios.post("http://localhost:8080/addblock?data=New");
      console.log("data resp", resp.data);
      if (resp) {
        getBlocks();
        setShowAddBlock(false);
      }
    } catch (err) {
      console.log("data err", err);
    }
  };

  const addAChain = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8081/createBlockChain?data=${name}&amount=${amount}`
      );
      console.log("data resp", resp.data);
      if (resp) {
        getBlocks();
        setShowAddAChain(false);
        setToTransactions(true);
      }
    } catch (err) {
      console.log("data err", err);
    }
  };

  useEffect(() => {
    getBlocks();
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GO-Blockchain</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={getBlocks}
              href="#home"
              style={{ marginRight: 20, marginLeft: 20 }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#add-block"
              style={{ marginRight: 20 }}
              onClick={() => {
                setShowAddBlock(true);
              }}
            >
              Add Block
            </Nav.Link>
            <Nav.Link
              onClick={getCurrentBlocks}
              href="#current-block"
              style={{ marginRight: 20 }}
            >
              Current/Last Block
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                setShowAddAChain(true);
              }}
              href="#current-block"
              style={{ marginLeft: 200 }}
            >
              Transactions
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {toTransactions ? (
        <>
        </>
      ) : (
        <Row style={{ margin: 10 }}>
          {data &&
            data.map((block, index) => (
              <Col md={3} key={index} xs={6}>
                <Card style={{ width: "100%" }}>
                  <Card.Body>
                    <Card.Subtitle className="mb-4 mt-2">
                      Hash:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {block.Hash}
                      </span>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-4">
                      Data:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {block.Data}
                      </span>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-4">
                      Prev. Hash:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {block.PrevHash}
                      </span>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2">
                      Nonce:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {block.Nonce}
                      </span>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
      <Popup
        show={showAddBlock}
        handleClose={() => setShowAddBlock(false)}
        handleSave={addNewBlocks}
      />
      <PopupCreateChain
        show={showAddAChain}
        handleClose={() => setShowAddAChain(false)}
        handleSave={addAChain}
        name={name}
        amount={amount}
        setName={setName}
        setAmount={setAmount}
      />
    </>
  );
}
