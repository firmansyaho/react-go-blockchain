import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const SendTransaction = ({ show, handleClose, handleSave, name, amount, setName, setAmount }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Receiver Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
            </div>
            <div className="mb-3">
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
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendTransaction;
