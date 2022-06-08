import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from 'axios';
import { TRANSACTION_URL } from "../../common/constant";

const CheckBalance = ({ show, handleClose, handleSave, name, amount, setName, setAmount }) => {
  const [balance, setBalance] = useState("0");
  const [wallet, setWallet] = useState("");
  const handleSubmit = async () => {
    setBalance("0");
    await getBalance();
  }

  const getBalance = async () => {
    try {
      const resp = await axios.get(`${TRANSACTION_URL}/getBalance/${wallet}`);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check account balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Wallet Id
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="walletName"
                value={wallet}
                onChange={(e) => setWallet(e.target.value) }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Current Balance: {balance}
              </label>
            </div>
            {/* <div className="mb-3">
              <label htmlFor="exampleInputAmount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputAmount"
                value={amount}
                onChange={(e) => { setAmount(e.target.value) }}
              />
            </div> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckBalance;
