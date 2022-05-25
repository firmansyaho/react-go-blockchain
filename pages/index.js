import { useState } from 'react';
import { Card, Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import Popup from '../src/components/Popup'
import blockMocks from '../src/mocks/blocks.json';

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">GO-Blockchain</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{ marginRight: 20, marginLeft: 20 }}>Home</Nav.Link>
            <Nav.Link href="#add-block" style={{ marginRight: 20 }} onClick={() => setShow(true)}>Add Block</Nav.Link>
            <Nav.Link href="#current-block" style={{ marginRight: 20 }}>Current/Last Block</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Row style={{ margin: 10 }}>
        {blockMocks && blockMocks.map((block, index) => (
          <Col md={3} key={index} xs={6}>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Subtitle className="mb-4 mt-2">
                  Hash:
                  <span style={{ fontWeight: 'normal' }}> {block.Hash}</span>
                </Card.Subtitle>
                <Card.Subtitle className="mb-4">Data:
                  <span style={{ fontWeight: 'normal' }}> {block.Data}</span>
                </Card.Subtitle>
                <Card.Subtitle className="mb-4">Prev. Hash:
                  <span style={{ fontWeight: 'normal' }}> {block.PrevHash}</span>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">Nonce:
                  <span style={{ fontWeight: 'normal' }}> {block.Nonce}</span>
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Popup show={show} handleClose={() => setShow(false)} />
    </>
  )
}
