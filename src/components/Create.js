import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Row';
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const CreateUser = async () => {
    const headers = {
        "Content-Type": "application/json"
     }; 
    let nick_name = document.getElementById('nick_name').value
    let balance= document.getElementById('initial_balance').value
    let create = { user_atm: {nick_name: nick_name, balance: parseInt(balance) } }
    await axios
        .post("https://atmapi.fly.dev/api/create/", create, {headers: headers})
        .then((response) => {
            if(response.data.ok){
                alertify.success('Usuario creado con exito')
            }else if(response.data.error){
                alertify.error('El usuario ya existe')
            }
            else{
                alertify.error('Error')
            }
            document.getElementById('nick_name').value = ''
            document.getElementById('initial_balance').value = ''
        }).catch( err => {
            console.error('ATM error ', err)
        });
}


function Create() {
  
    return (
        <Container>
            <Row className="justify-content-md-center mb-3">
                <h3><b>Crear usuario</b></h3>
            </Row>
            <Row className="justify-content-md-center mb-3">
            <Col></Col>
            <Col xs lg="2">
                <Form.Label className="md-6 mb-3" htmlFor="input_nick_name">Id de usuario</Form.Label>
                <Form.Control
                type="text"
                id="nick_name"
                />
                <Form.Label className="md-6 mb-3" htmlFor="input_nick_name">Balance inicial</Form.Label>
                <Form.Control
                type="number"
                id="initial_balance"
                />
            </Col>
            <Col></Col>
            </Row>

            <Row className="justify-content-md-center mb-3">
                <Col></Col>
                <Col>
                <Button variant="success" onClick={(e) => CreateUser()}>Registrar</Button>{' '}
                </Col>
                <Col></Col>
            </Row>

        </Container>
    );
}

export default Create;