import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";


// Variable para inicializar el valor de la variable data
const initialState = {
    nombres: '',
    apellidos: '',
    fNacimiento: '',
    email: '',
    sexo: 'Masculino',
    tCasa: '',
    tCelular: '',
    calle: '',
    colonia: '',
    cp: ''
}

const General = () => {

    //Obteniendo la id de la URL
    const { id } = useParams()

    //Guardando el valor de la id en el almacenamiento local al iniciar la página
    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(id))
        //Checando si existe el elemento 'data' en el almacenamiento local, en caso de que no exista, le asigna el valor de initialState
        if (localStorage.getItem('infoGeneral')) {
            setGeneral(JSON.parse(localStorage.getItem('infoGeneral')))
        } else {
            localStorage.setItem('infoGeneral', JSON.stringify(initialState))
        }

    }, [id])


    //Creando la instancia del hook useNavigate
    const navigate = useNavigate()

    //Creando el hook donde se almacenarán los datos de los inputs
    const [infoGeneral, setGeneral] = useState(initialState)

    //Guardar el valor de los inputs en la variable data
    function handleChange(e) {
        const { name, value } = e.target
        setGeneral({ ...infoGeneral, [name]: value })
    }

    //Guardar el valor de la variable data en el almacenamiento local
    function handleSubmit() {
        localStorage.setItem('infoGeneral', JSON.stringify(infoGeneral));
        toast.success(
            'Datos guardados',
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 300,
            },
        )
    }

    //Reiniciar el valor de la variable data y el campo data en el almacenamiento local
    function handleCancelar() {
        setGeneral(initialState)
        localStorage.setItem('infoGeneral', JSON.stringify(initialState))
    }

    //Destructuración de la variable data
    const { nombres, apellidos, fNacimiento, email, sexo, tCasa, tCelular, calle, colonia, cp } = infoGeneral

    return (
        <Container className='my-5'>
            <Row>
                <Col>
                    <ToastContainer />
                </Col>
            </Row>
            <Row>
                <Col className='d-grid align-items-center justify-content-start fs-5'><div className='regresar' onClick={() => navigate(`/profesores`)}><FontAwesomeIcon icon={faAngleLeft} size='xl' /></div></Col>
                <Col xs={8}>
                    <h1 className='text-center'>Datos generales</h1>
                    <Form className='border rounded p-4 mt-4 text-start'>
                        <Form.Group controlId='nombres' className='mb-3'>
                            <Form.Label className='ms-1'>Nombres:</Form.Label>
                            <Form.Control type='text' placeholder='Ingresa tus nombres' name='nombres' value={nombres} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='apellidos' className='mb-3'>
                            <Form.Label className='ms-1'>Apellidos:</Form.Label>
                            <Form.Control type='text' placeholder='Ingresa tus apellidos' name='apellidos' value={apellidos} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='fNacimiento' className='mb-3'>
                            <Form.Label className='ms-1'>Fecha de nacimiento:</Form.Label>
                            <Form.Control type='date' placeholder='Ingresa tu fecha de nacimiento' name='fNacimiento' required value={fNacimiento} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='email' className='mb-3'>
                            <Form.Label className='ms-1'>E-mail:</Form.Label>
                            <Form.Control type='text' placeholder='Ingres tu correo electronico' name='email' value={email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="sexo">
                            <Form.Label>Sexo:</Form.Label>
                            <Form.Select aria-label="Default select example" name='sexo' required value={sexo} onChange={handleChange}>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId='tCasa' className='mb-3'>
                            <Form.Label className='ms-1'>Telefono de casa:</Form.Label>
                            <Form.Control type='tel' placeholder='Ingres tu telefono de casa' name='tCasa' value={tCasa} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='tCelular' className='mb-3'>
                            <Form.Label className='ms-1'>Telefono celular:</Form.Label>
                            <Form.Control type='tel' placeholder='Ingres tu telefono celular' name='tCelular' value={tCelular} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='calle' className='mb-3'>
                            <Form.Label className='ms-1'>Calle:</Form.Label>
                            <Form.Control type='text' placeholder='Ingres la calle donde vives' name='calle' value={calle} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='colonia' className='mb-3'>
                            <Form.Label className='ms-1'>Colonia:</Form.Label>
                            <Form.Control type='text' placeholder='Ingres la colonia donde vives' name='colonia' value={colonia} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='cp'>
                            <Form.Label className='ms-1'>Codigo postal:</Form.Label>
                            <Form.Control type='num' placeholder='Ingres la colonia donde vives' name='cp' value={cp} onChange={handleChange} />
                        </Form.Group>
                        <div className='d-flex justify-content-center gap-4 mt-4'>
                            <Button variant='primary' onClick={handleSubmit} >Aceptar</Button>
                            {/* Reiniciando el valor de la variable data */}
                            <Button variant='danger' onClick={handleCancelar} >Cancelar</Button>
                        </div>
                    </Form>
                </Col>

                <Col className='d-grid align-items-center justify-content-end fs-5'><div className='siguiente' onClick={() => navigate(`/profesores/curriculum/${id}/escolaridades`)}><FontAwesomeIcon icon={faAngleRight} size='xl' /></div></Col>
            </Row>
        </Container>
    )
}

export default General