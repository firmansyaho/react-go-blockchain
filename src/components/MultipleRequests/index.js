import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from 'axios';
import { TRANSACTION_URL } from "../../common/constant";

const MultipleRequest = ({ show, handleClose, handleSave, name, amount, setName, setAmount }) => {
  const [requestCount, setRequestCount] = useState('');
  const handleSubmit = async () => {
    let request = [];
    if (requestCount) {
      for (let i = 0; i < Number(requestCount); i++) {
        request.push(getTransactions)
      }
    }

    await Promise.all(request.map(async (funct) => {
      funct()
    }))
    handleSave();
  }

  const getTransactions = async () => {
    try {
      const resp = await axios.get(`${TRANSACTION_URL}/printChain`);
      console.log("data resp get tran", resp.data.Message);
      if (resp) {
        if (resp.data.Message === "No existing blockchain found, create one!") {
          // setGoCreateChain(true);
        } else {
          // setTransactions(resp.data);
          handleClose();
        }
      }
    } catch (err) {
      console.log("data err get trab", err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Multiple Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Total Requests
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="requestCount"
                value={requestCount}
                onChange={(e) => setRequestCount(e.target.value) }
              />
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

export default MultipleRequest;
