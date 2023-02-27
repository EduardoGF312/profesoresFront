import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Variable para inicializar el valor de la variable data
const initialState = {
    centroEducativo: '',
    ubicacionCentro: '',
    titulo: '',
    campoEstudio: '',
    graduacion: ''
}

const Escolaridades = () => {

    //Obteniendo la id del almacenamiento local
    const id = JSON.parse(localStorage.getItem('id'))

    useEffect(() =>{
         //Checando si existe el elemento 'escolaridades' en el almacenamiento local, en caso de que no exista, le asigna el valor de initialState
         if(localStorage.getItem('escolaridades')){
            setEscolaridades(JSON.parse(localStorage.getItem('escolaridades')))
        }else{
            localStorage.setItem('escolaridades', JSON.stringify(initialState))
        }

    }, [])
    
     //Creando el hook donde se almacenarán los datos de los inputs
    const [escolaridades, setEscolaridades] = useState(initialState)

    //Creando la instancia del hook useNavigate
    const navigate = useNavigate()

    //Guardar el valor de los inputs en la variable escolaridades
    function handleChange(e) {
        const {name, value} = e.target
        setEscolaridades({...escolaridades, [name]: value})
    }

    //Guardar el valor de la variable escolaridades en el almacenamiento local
    function handleSubmit(){
        localStorage.setItem('escolaridades', JSON.stringify(escolaridades));
        toast.success(
            'Escolaridades guardadas',
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose:300,
            },
          )
    }

    //Reiniciar el valor de la variable data y el campo data en el almacenamiento local
    function handleCancelar() {
        setEscolaridades(initialState)
        localStorage.setItem('escolaridades', JSON.stringify(initialState))
    }

    //Destructuración de la variable escolaridades
    const {centroEducativo, ubicacionCentro, titulo, campoEstudio, graduacion} = escolaridades

  return (

    <Container className='my-5'>
        <Row>
          <Col>
            <ToastContainer /> 
          </Col>
        </Row>
        <Row>
            <Col className='d-grid align-items-center justify-content-start fs-5'><div className='regresar' onClick={() => navigate(`/profesores/curriculum/${id}/general`)}><FontAwesomeIcon icon={faAngleLeft} size='xl'/></div></Col>
            <Col xs={8}>
                <h1 className='text-center'>Escolaridades</h1>
                <Form className='border rounded p-4 mt-4 text-start'>
                    <Form.Group controlId='centroEducativo' className='mb-3'>
                        <Form.Label className='ms-1'>Nombre del centro educativo:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Universidad Tecnológica de Durango' name='centroEducativo' value={centroEducativo}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='ubicacionCentro' className='mb-3'>
                        <Form.Label className='ms-1'>Ubicación del centro educativo:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Durango' name='ubicacionCentro' value={ubicacionCentro} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='titulo' className='mb-3'>
                        <Form.Label className='ms-1'>Título:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Ingeniero en Desarrollo de Software' name='titulo' value={titulo} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='campoEstudio' className='mb-3'>
                        <Form.Label className='ms-1'>Campo de estudio:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Tecnologías de la Información' name='campoEstudio' value={campoEstudio} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='graduacion'>
                        <Form.Label className='ms-1'>Año de Graduación:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: 2016' name='graduacion' value={graduacion} onChange={handleChange}/>
                    </Form.Group>
                    <div className='d-flex justify-content-center gap-4 mt-4'>
                        <Button variant='primary' onClick={handleSubmit} >Aceptar</Button>
                        <Button variant='danger' onClick={handleCancelar} >Cancelar</Button>
                    </div>

                </Form>
            </Col>
            <Col className='d-grid align-items-center justify-content-end fs-5'><div className='siguiente' onClick={() => navigate(`/profesores/curriculum/${id}/experiencia`)}><FontAwesomeIcon icon={faAngleRight} size='xl'/></div></Col>
        </Row>
    </Container>
  )
}

export default Escolaridades
