import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const PopupCreateChain = ({ show, handleClose, handleSave , name,amount, setName,setAmount}) => {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Chain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
              <div id="emailHelp" class="form-text">
                Please enter a valid name
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Initial Amount
              </label>
              <input
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupCreateChain;
