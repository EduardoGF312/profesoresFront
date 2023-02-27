import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Form, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";


// Variable para inicializar el valor de la variable data4
const initialState = {
    competencias: '',
    hobbies: '',
    idiomas: '',
    cursos: '',
    actExtra: '',
    redSociales: '',
    valores: ''
}

const Otros = () => {

    //Obteniendo la id del almacenamiento local
    const id = JSON.parse(localStorage.getItem('id'))

    useEffect(() =>{
        //Checando si existe el elemento 'data' en el almacenamiento local, en caso de que no exista, le asigna el valor de initialState
        if(localStorage.getItem('otros')){
            setOtros(JSON.parse(localStorage.getItem('otros')))
        }else{
            localStorage.setItem('otros', JSON.stringify(initialState))
        }

    }, [])

    //Creando la instancia del hook useNavigate
    const navigate = useNavigate()

    //Creando el hook donde se almacenarán los datos de los inputs
    const [otros, setOtros] = useState(initialState)

    //Guardar el valor de los inputs en la variable data4
    function handleChange(e) {
        const {name, value} = e.target
        setOtros({...otros, [name]: value})
    }

    //Guardar el valor de la variable data4 en el almacenamiento local
    function handleSubmit(){
        localStorage.setItem('otros', JSON.stringify(otros));
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
        setOtros(initialState)
        localStorage.setItem('otros', JSON.stringify(initialState))
    }
    //Destructuración de la variable data4
    const {competencias, hobbies, idiomas, cursos, actExtra, redSociales, valores} = otros

  return (
    <Container className='my-5'>
        <Row>
          <Col>
            <ToastContainer /> 
          </Col>
        </Row>
        <Row>
            <Col className='d-grid align-items-center justify-content-start fs-5'><div className='regresar' onClick={() => navigate(`/profesores/curriculum/${id}/experiencia`)}><FontAwesomeIcon icon={faAngleLeft} size='xl'/></div></Col>
            <Col xs={8}>
                <h1 className='text-center'>Otros datos</h1>
                <Form className='border rounded p-4 mt-4 text-start'>
                    <Form.Group controlId='competencias' className='mb-3'>
                        <Form.Label className='ms-1'>Competencias:</Form.Label>
                        <Form.Control type='text' placeholder='Ingresa tus competencias' name='competencias' value={competencias}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='hobbies' className='mb-3'>
                        <Form.Label className='ms-1'>Hobbies:</Form.Label>
                        <Form.Control type='text' placeholder='Tienes algun hobbie?' name='hobbies' value={hobbies} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='idiomas' className='mb-3'>
                        <Form.Label className='ms-1'>Idiomas</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Ingles, Español, etc..' name='idiomas' value={idiomas} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='cursos' className='mb-3'>
                        <Form.Label className='ms-1'>Cursos:</Form.Label>
                        <Form.Control type='text' placeholder='Haz realizado algun curso?' name='cursos' value={cursos} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='actExtra' className='mb-3'>
                        <Form.Label className='ms-1'>Actividades extracurriculares:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Basketball, Futbol, etc' name='actExtra' value={actExtra} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='redSociales' className='mb-3'>
                        <Form.Label className='ms-1'>Redes Sociales:</Form.Label>
                        <Form.Control type='text' placeholder='Cuales son tus redes sociales' name='redSociales' value={redSociales} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId='valores'>
                        <Form.Label className='ms-1'>Valores:</Form.Label>
                        <Form.Control type='text' placeholder='Cuales son tus valores?' name='valores' value={valores} onChange={handleChange}/>
                    </Form.Group>
                    <div className='d-flex justify-content-center gap-4 mt-4'>
                        <Button variant='primary' onClick={handleSubmit} >Aceptar</Button>
                        {/* Reiniciando el valor de la variable data4 */}
                        <Button variant='danger' onClick={handleCancelar} >Cancelar</Button> 
                    </div>
                </Form>
            </Col>

            <Col className='d-grid align-items-center justify-content-end fs-5'><div className='siguiente' onClick={() => navigate(`/profesores/curriculum/${id}/crear`)}><FontAwesomeIcon icon={faAngleRight} size='xl'/></div></Col>
        </Row>
    </Container>
  )
}

export default Otros