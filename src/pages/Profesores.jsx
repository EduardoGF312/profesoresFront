import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profesores = () => {


  const initialState = {
    show: false,
    clave: '',
    nombres: '',
    apellidos: ''
 }

  const [datos, setDatos] = useState([]);
  const [show, setShow] = useState(false)

  useEffect(() => {
    traerDatos();
    localStorage.clear()
  }, []);

  const navigate = useNavigate();

  const traerDatos = async () => {
    await axios
      .get("http://localhost:5000/profesores")
      .then((response) => setDatos(response.data.result))
      .catch((error) => console.log(error));
  };
  const handleClose = () =>{
    setShow(initialState)
  }
  const handleEliminar = (clave, nombre, apellidos, eliminar) =>{
    const showState = {
      show: true,
      clave,
      nombre,
      apellidos,
      eliminar
    }
    setShow(showState)
  }

  const handleEliminarProfesor = async(clave) => {
    await axios.get(`http://localhost:5000/profesor/eliminar/${ clave }`)
    .then(function(response){
      if(response.data.result.affectedRows>0){
        notify(response.status, 'profesor')
        traerDatos();
        setShow(initialState)
      }else{
        notify(404)
        setShow(initialState)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
    await axios.delete(`http://localhost:5000/curriculum/eliminar/${ clave }`).catch(err => console.log(err))
  }

  const handleEliminarCurriculum = async(clave) => {
    
    await axios.delete(`http://localhost:5000/curriculum/eliminar/${ clave }`).then(response => {
      // if(response.data.result.affectedRows>0){
      //   notify(response.status)
      //   traerDatos();
      //   setShow(initialState)
      // }else{
      //   notify(404)
      //   setShow(initialState)
      // }
    })
    .catch(function(error) {
      console.log(error)
    })
    await axios.patch("http://127.0.0.1:5000/curriculum/profesor", {clave: clave, bool: 0}).then(response =>{
      notify(response.status, 'curriculum')
      traerDatos();
      setShow(initialState)
    }).catch(err =>{
      console.log(err)
    })
  }

  function notify(num, tipo) {
    if(num===200){

      const mensaje = tipo === 'profesor' ? 'Profesor eliminado' : 'Currículum eliminado'

      toast.error(
          mensaje,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose:800,
          theme: 'colored'
        },

      )
    }else if(num===404){
      toast.warning(
        'No se ha encontrado el registro',
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose:800,
        },

      )
    }
  }

  return (
    <>
      <Container className="mt-5 text-center">
      <Row>
          <Col>
            <ToastContainer /> 
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Clave</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Curp</th>
                  <th>Tel. Movil</th>
                  <th>Estatus</th>
                  <th>Curriculum</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((prof) => (
                  <tr key={prof.clave}>
                    <td>{prof.clave}</td>
                    <td>{prof.nombres + " " + prof.apellidos}</td>
                    <td>{prof.email}</td>
                    <td>{prof.curp}</td>
                    <td>{prof.tcelular}</td>
                    <td>{prof.estatus}</td>
                    <td>
                      <div className="d-grid gap-2 place-content-center h-100">
                        {prof.curriculum === 0
                        ? <Button variant="success" size="sm" onClick={() => navigate(`curriculum/${prof.clave}/general`)}>Crear</Button>
                        : <>
                            <Button variant="info" onClick={() => navigate(`curriculum/${prof.clave}/ver`)} size="sm">Ver</Button>
                            <Button variant="warning" onClick={() => navigate(`curriculum/${prof.clave}/modificar`)} size="sm">Modificar</Button>
                            <Button variant="danger" onClick={() => handleEliminar(prof.clave, prof.nombres, prof.apellidos, 'curriculum')} size="sm">Eliminar</Button>
                          </>
                        }
                      </div>
                    </td>
                    <td>
                      <div className="d-grid gap-2 place-content-center h-100">
                        <Button
                          onClick={() =>
                            navigate(`modificar/${prof.clave}`)
                          }
                          variant="primary"
                          size="sm"
                        >
                          Modificar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleEliminar(prof.clave, prof.nombres, prof.apellidos, 'profesor')
                          }>
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal show={show.show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{`${show.clave}-${show.nombre} ${show.apellidos}`}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {show.eliminar === 'profesor' ? '¿Estás seguro de que deseas eliminar este registro?' : `¿Estás seeguro de que deseas eliminar el currículum del profesor ${show.nombre}?`}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                  {show.eliminar === 'profesor' 
                  ? <Button variant="danger" onClick={() => handleEliminarProfesor(show.clave)}>Eliminar</Button> 
                  : <Button variant="danger" onClick={() => handleEliminarCurriculum(show.clave)}>Eliminar</Button>
                  }
                
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profesores;
