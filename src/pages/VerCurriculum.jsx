import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Curriculum from '../components/Curriculum'
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'


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

const VerCurriculum = () => {

  //Obteniendo los datos del currículum de la base de datos
  useEffect(() => {
    traerCurriculum()
  }, [])

  const { id } = useParams()

  const navigate = useNavigate()

  const [curriculum, setCurriculum] = useState(initialState)

  const traerCurriculum = async () => {
    await axios
      .get(`http://localhost:5000/curriculum/ver/${id}`)
      .then((response) => {
        const datos = response.data.result[0]
        const {
          nombres,
          apellidos,
          fNacimiento,
          email,
          sexo,
          tCasa,
          tCelular,
          calle,
          colonia,
          cp,
          centroEducativo,
          ubicacionCentro,
          titulo,
          campoEstudio,
          graduacion,
          puesto,
          empleador,
          localidad,
          fInicio,
          fFinal,
          descripcion,
          competencias,
          hobbies,
          idiomas,
          cursos,
          actExtra,
          redSociales,
          valores
        } = datos

        setCurriculum({
          infoGeneral: {
            nombres,
            apellidos,
            fNacimiento,
            email,
            sexo,
            tCasa,
            tCelular,
            calle,
            colonia,
            cp
          },
          escolaridades: {
            centroEducativo,
            ubicacionCentro,
            titulo,
            campoEstudio,
            graduacion,
          },
          experiencia: {
            puesto,
            empleador,
            localidad,
            fInicio,
            fFinal,
            descripcion,
          },
          otros: {
            competencias,
            hobbies,
            idiomas,
            cursos,
            actExtra,
            redSociales,
            valores
          }
        })

      })
      .catch((error) => console.log(error));
  };

  console.log(curriculum)

  return (
    <>
      <h1 className='text-center'>Currículum</h1>
      <Curriculum curriculum={curriculum} />
      <Col className='text-center mt-3 mb-3'>
        <Button size='lg' style={{ width: "fit-content" }} onClick={() => navigate('/profesores')}>Volver</Button>
      </Col>
    </>
  )
}

export default VerCurriculum
