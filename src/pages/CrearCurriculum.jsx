import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Curriculum from '../components/Curriculum';



const initialState = {
  infoGeneral: {
    nombres: '',
    apellidos: '',
    fNacimiento: '',
    email: '',
    sexo: '',
    tCasa: '',
    tCelular: '',
    calle: '',
    colonia: '',
    cp: ''
  },
  escolaridades: {
    centroEducativo: '',
    ubicacionCentro: '',
    titulo: '',
    campoEstudio: '',
    graduacion: ''
  },
  experiencia: {
    puesto: '',
    empleador: '',
    localidad: '',
    fInicio: '',
    fFinal: '',
    descripcion: ''
  },
  otros: {
    competencias: '',
    hobbies: '',
    idiomas: '',
    cursos: '',
    actExtra: '',
    redSociales: '',
    valores: ''
  },
}

const CrearCurriculum = () => {

  //Obteniendo la id del almacenamiento local
  const id = JSON.parse(localStorage.getItem('id'))

  const [curriculum, setCurriculum] = useState(initialState)

  //Obteniendo los datos del almacenamiento local
  useEffect(() => {
    const infoGeneral = JSON.parse(localStorage.getItem('infoGeneral'))
    const escolaridades = JSON.parse(localStorage.getItem('escolaridades'))
    const experiencia = JSON.parse(localStorage.getItem('experiencia'))
    const otros = JSON.parse(localStorage.getItem('otros'))

    setCurriculum({ infoGeneral: { ...infoGeneral }, escolaridades: { ...escolaridades }, experiencia: { ...experiencia }, otros: { ...otros } })
  }, [])

  async function handleSubmit() {
    const { nombres, apellidos, fNacimiento, email, sexo, tCasa, tCelular, calle, colonia, cp } = curriculum.infoGeneral
    const { centroEducativo, ubicacionCentro, titulo, graduacion, campoEstudio } = curriculum.escolaridades
    const { puesto, empleador, localidad, fInicio, fFinal, descripcion } = curriculum.experiencia
    const { competencias, hobbies, idiomas, cursos, actExtra, redSociales, valores } = curriculum.otros

    const formData = new FormData()

    formData.append("clave", id)
    formData.append("centroEducativo", centroEducativo)
    formData.append("ubicacionCentro", ubicacionCentro)
    formData.append("titulo", titulo)
    formData.append("graduacion", graduacion)
    formData.append("campoEstudio", campoEstudio)
    formData.append("puesto", puesto)
    formData.append("empleador", empleador)
    formData.append("localidad", localidad)
    formData.append("fInicio", fInicio)
    formData.append("fFinal", fFinal)
    formData.append("descripcion", descripcion)
    formData.append("nombres", nombres)
    formData.append("apellidos", apellidos)
    formData.append("fNacimiento", fNacimiento)
    formData.append("email", email)
    formData.append("sexo", sexo)
    formData.append("tCasa", tCasa)
    formData.append("tCelular", tCelular)
    formData.append("calle", calle)
    formData.append("colonia", colonia)
    formData.append("cp", cp)
    formData.append("competencias", competencias)
    formData.append("hobbies", hobbies)
    formData.append("idiomas", idiomas)
    formData.append("cursos", cursos)
    formData.append("actExtra", actExtra)
    formData.append("redSociales", redSociales)
    formData.append("valores", valores)

    await axios.post("http://localhost:5000/curriculum/agregar", formData).then(response => {

    }).catch(err => {
      console.log(err)
    })

    await axios.patch("http://127.0.0.1:5000/curriculum/profesor", { clave: id, bool: 1 }).then(response => {
      notify(response.status)

    }).catch(err => {
      console.log(err)
    })

    function notify(num) {
      if (num === 200) {
        toast.success(
          'Curriculum creado',
          {
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              navigate('/profesores')
            },
            autoClose: 500,
          },

        )
      }
    }

  }


  //Creando la instancia del hook useNavigate
  const navigate = useNavigate()

  return (
    <>
      <Container className='mt-5 text-center'>
        <Row>
          <Col>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
      <Col className='fs-5 flecha'><div className='regresar' onClick={() => navigate(`/profesores/curriculum/${id}/otros`)}><FontAwesomeIcon icon={faAngleLeft} size='xl' /></div></Col>
      <h1 className='text-center'>¿Crear currículum?</h1>
      <Curriculum curriculum={curriculum} />
      <Col className='text-center mt-5 mb-5'>
        <Button variant='success' onClick={handleSubmit} size='lg' className='me-4'>Crear</Button>
        <Button variant='danger' size='lg' onClick={() => navigate('/profesores')}>Deshacer</Button>
      </Col>
    </>
  )
}

export default CrearCurriculum
