import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import alertify from 'alertifyjs';
import Button from 'react-bootstrap/Button';

let balance = 0
const CheckBalance = async () => {
    let id = document.getElementById("id").value
    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(id); // true
    if(onlyNumbers){
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
    }else{
      // Bad id, only numbers
      alertify.error('El usuario no existe')
    }
}

function Requests() {
  return (
    <>
        <Row className="justify-content-md-center mb-3">
          <Col></Col>
          <Col xs lg="2">
            <Form.Label className="md-6" htmlFor="input_id">Id de usuario</Form.Label>
            <Form.Control
              type="text"
              id="id"
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