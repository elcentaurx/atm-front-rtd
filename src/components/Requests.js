import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import alertify from 'alertifyjs';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

let balance = 0

const CheckBalance = async () => {
    let id = document.getElementById("nick_name").value
    await axios
          .get("https://atmapi.fly.dev/api/founds/"+id)
          .then((response) => {
              if(response.data.balance){
                alertify.success('Transacción exitosa')
                balance = response.data.balance
                document.getElementById('result').innerHTML = 'Su saldo es de $'+balance+' MN'
              }else if(response.data.error){
                  alertify.error('El usuario no existe')
              }
              else{
                  alertify.error('Error')
              }
          }).catch( err => {
              console.error('ATM error ', err)
          });
}

function Requests() {
  return (
    <>
        <Row className="justify-content-md-center mb-3">
          <Col></Col>
          <Col xs lg="2">
            <Form.Label className="md-6" htmlFor="input_nick_name">Id de usuario</Form.Label>
            <Form.Control
              type="text"
              id="nick_name"
            />
          </Col>
          <Col></Col>
        </Row>

        <Row className="justify-content-md-center mb-3">
          <Col></Col>
          <Col>
          <Button variant="success" onClick={(e) => CheckBalance()}>Buscar</Button>{' '}
          </Col>
          <Col></Col>
        </Row>

        <Row className="justify-content-md-center mb-3">
          <Col></Col>
          <Col id="result">
            
          </Col>
          <Col></Col>
        </Row>

    </>
  );
}

export default Requests