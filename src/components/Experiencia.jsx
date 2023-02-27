import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


// Variable para inicializar el valor de la variable data3
const initialState = {
    puesto: '',
    empleador: '',
    localidad: '',
    fInicio: '',
    fFinal: '',
    descripcion: ''
}

const Experiencia = () => {

    //Obteniendo la id del almacenamiento local
    const id = JSON.parse(localStorage.getItem('id'))

    useEffect(() =>{
        //Checando si existe el elemento 'data' en el almacenamiento local, en caso de que no exista, le asigna el valor de initialState
        if(localStorage.getItem('experiencia')){
            setData3(JSON.parse(localStorage.getItem('experiencia')))
        }else{
            localStorage.setItem('experiencia', JSON.stringify(initialState))
        }

    }, [])

    //Creando la instancia del hook useNavigate
    const navigate = useNavigate()

    //Creando el hook donde se almacenarán los datos de los inputs
    const [experiencia, setData3] = useState(initialState)

    //Guardar el valor de los inputs en la variable data3
    function handleChange(e) {
        const {name, value} = e.target
        setData3({...experiencia, [name]: value})
    }

    //Guardar el valor de la variable data3 en el almacenamiento local
    function handleSubmit(){
        localStorage.setItem('experiencia', JSON.stringify(experiencia));
        toast.success(
            'Datos guardados',
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose:300,
            },
          )
    }

    //Reiniciar el valor de la variable data y el campo data en el almacenamiento local
    function handleCancelar() {
        setData3(initialState)
        localStorage.setItem('experiencia', JSON.stringify(initialState))
    }

    //Destructuración de la variable data3
    const {puesto, empleador, localidad, fInicio, fFinal, descripcion} = experiencia

  return (
    <Container className='my-5'>
        <Row>
          <Col>
            <ToastContainer /> 
          </Col>
        </Row>
        <Row>
            <Col className='d-grid align-items-center justify-content-start fs-5'><div className='regresar' onClick={() => navigate(`/profesores/curriculum/${id}/escolaridades`)}><FontAwesomeIcon icon={faAngleLeft} size='xl'/></div></Col>
            <Col xs={8}>
                <h1 className='text-center'>Experiencia</h1>
                <Form className='border rounded p-4 mt-4 text-start'>
                    <Form.Group controlId='puesto' className='mb-3'>
                        <Form.Label className='ms-1'>Puesto:</Form.Label>
                        <Form.Control type='text' placeholder='Que puesto tienes' name='puesto' value={puesto}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='empleador' className='mb-3'>
                        <Form.Label className='ms-1'>Empleador:</Form.Label>
                        <Form.Control type='text' placeholder='Encargado de remuneracion' name='empleador' value={empleador} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='localidad' className='mb-3'>
                        <Form.Label className='ms-1'>Localidad:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Durango' name='localidad' value={localidad} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='fInicio' className='mb-3'>
                        <Form.Label className='ms-1'>Fecha de inicio:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: 12 de enero de 2020' name='fInicio' value={fInicio} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='fFinal' className='mb-3'>
                        <Form.Label className='ms-1'>Fecha de fin:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: 12 de enero de 2021' name='fFinal' value={fFinal} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='descripcion'>
                        <Form.Label className='ms-1'>Descripción:</Form.Label>
                        <Form.Control as='textarea' name='descripcion' value={descripcion} onChange={handleChange}/>
                    </Form.Group>
                    <div className='d-flex justify-content-center gap-4 mt-4'>
                        <Button variant='primary' onClick={handleSubmit} >Aceptar</Button>
                        {/* Reiniciando el valor de la variable data3 */}
                        <Button variant='danger' onClick={handleCancelar} >Cancelar</Button> 
                    </div>
                </Form>
            </Col>

            <Col className='d-grid align-items-center justify-content-end fs-5'><div className='siguiente' onClick={() => navigate(`/profesores/curriculum/${id}/otros`)}><FontAwesomeIcon icon={faAngleRight} size='xl'/></div></Col>
        </Row>
    </Container>
  )
}

export default Experiencia