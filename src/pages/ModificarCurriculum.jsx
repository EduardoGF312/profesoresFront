import React, { useState, useEffect } from "react";
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


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

const ModificarCurriculum = () => {

    useEffect(() => {
      traerCurriculum()
    }, [])

    const {id} = useParams()

    const navigate = useNavigate()

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

            setDatos({
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
                escolaridades:{
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
    

    const [datos, setDatos] = useState(initialState)

    function handleChange(e, seccion) {
        const {name, value} = e.target

        switch (seccion) {
            case 'escolaridades':
                setDatos({...datos, escolaridades: { ...datos.escolaridades, [name]: value }})
                break;
            case 'infoGeneral':
                setDatos({...datos, infoGeneral: { ...datos.infoGeneral, [name]: value }})
                break;
            case 'experiencia':
                setDatos({...datos, experiencia: { ...datos.experiencia, [name]: value }})
                break;
            case 'otros':
                setDatos({...datos, otros: { ...datos.experiencia, [name]: value }})
                break;
        
            default:
                break;
        }
        
    }

    async function handleSubmit(){

        const formData = new FormData()

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

        await axios.put(`http://localhost:5000/curriculum/modificar/${id}`, formData).then(response => {
            notify(200)
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



    // console.log(datos)


    const { nombres, apellidos, fNacimiento, email, sexo, tCasa, tCelular, calle, colonia, cp} = datos.infoGeneral
    const {centroEducativo, ubicacionCentro, titulo, campoEstudio, graduacion} = datos.escolaridades
    const {puesto, empleador, localidad, fInicio, fFinal, descripcion} = datos.experiencia
    const {idiomas, competencias, hobbies, redSociales, valores, cursos, actExtra} = datos.otros




  return (
    <Container className="my-5">
      <Row>
        <Col>
          <ToastContainer />
        </Col>
      </Row>
      <Row>
        {/* --------Parte General-------- */}
        <h1 className='text-center'>Datos generales</h1>
        <Form className='border rounded p-4 my-4 text-start'>
            <Form.Group controlId='nombres' className='mb-3'>
                <Form.Label className='ms-1'>Nombres:</Form.Label>
                <Form.Control type='text' placeholder='Ingresa tus nombres' name='nombres' value={nombres} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='apellidos' className='mb-3'>
                <Form.Label className='ms-1'>Apellidos:</Form.Label>
                <Form.Control type='text' placeholder='Ingresa tus apellidos' name='apellidos' value={apellidos} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='fNacimiento' className='mb-3'>
                <Form.Label className='ms-1'>Fecha de nacimiento:</Form.Label>
                <Form.Control type='date' placeholder='Ingresa tu fecha de nacimiento' required name='fNacimiento' value={fNacimiento} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='email' className='mb-3'>
                <Form.Label className='ms-1'>E-mail:</Form.Label>
                <Form.Control type='text' placeholder='Ingres tu correo electronico' name='email' value={email} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="sexo">
                <Form.Label>Sexo:</Form.Label>
                <Form.Select aria-label="Default select example" name='sexo' required value={sexo} onChange={(event) => handleChange(event, 'infoGeneral')}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId='tCasa' className='mb-3'>
                <Form.Label className='ms-1'>Telefono de casa:</Form.Label>
                <Form.Control type='tel' placeholder='Ingres tu telefono de casa' name='tCasa' value={tCasa} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='tCelular' className='mb-3'>
                <Form.Label className='ms-1'>Telefono celular:</Form.Label>
                <Form.Control type='tel' placeholder='Ingres tu telefono celular' name='tCelular' value={tCelular} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='calle' className='mb-3'>
                <Form.Label className='ms-1'>Calle:</Form.Label>
                <Form.Control type='text' placeholder='Ingres la calle donde vives' name='calle' value={calle} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='colonia' className='mb-3'>
                <Form.Label className='ms-1'>Colonia:</Form.Label>
                <Form.Control type='text' placeholder='Ingres la colonia donde vives' name='colonia' value={colonia} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
            <Form.Group controlId='cp'>
                <Form.Label className='ms-1'>Codigo postal:</Form.Label>
                <Form.Control type='num' placeholder='Ingres la colonia donde vives' name='cp' value={cp} onChange={(event) => handleChange(event, 'infoGeneral')} />
            </Form.Group>
        </Form>


        {/* --------Parte de escolaridades-------- */}
        <h1 className="text-center">Escolaridades</h1>
        <Form className="border rounded p-4 my-4 text-start">
          <Form.Group controlId="centroEducativo" className="mb-3">
            <Form.Label className="ms-1">
              Nombre del centro educativo:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Universidad Tecnológica de Durango"
              name="centroEducativo"
              value={centroEducativo}
              onChange={(event) => handleChange(event, 'escolaridades')}
            />
          </Form.Group>
          <Form.Group controlId="ubicacionCentro" className="mb-3">
            <Form.Label className="ms-1">
              Ubicación del centro educativo:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Durango"
              name="ubicacionCentro"
              value={ubicacionCentro}
              onChange={(event) => handleChange(event, 'escolaridades')}
            />
          </Form.Group>
          <Form.Group controlId="titulo" className="mb-3">
            <Form.Label className="ms-1">Título:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Ingeniero en Desarrollo de Software"
              name="titulo"
              value={titulo}
              onChange={(event) => handleChange(event, 'escolaridades')}
            />
          </Form.Group>
          <Form.Group controlId="campoEstudio" className="mb-3">
            <Form.Label className="ms-1">Campo de estudio:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Tecnologías de la Información"
              name="campoEstudio"
              value={campoEstudio}
              onChange={(event) => handleChange(event, 'escolaridades')}
            />
          </Form.Group>
          <Form.Group controlId="graduacion">
            <Form.Label className="ms-1">Año de Graduación:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 2016"
              name="graduacion"
              value={graduacion}
              onChange={(event) => handleChange(event, 'escolaridades')}
            />
          </Form.Group>
        </Form>

        {/* Parte de experiencia */}

        <h1 className='text-center'>Experiencia</h1>
                <Form className='border rounded p-4 my-4 text-start'>
                    <Form.Group controlId='puesto' className='mb-3'>
                        <Form.Label className='ms-1'>Puesto:</Form.Label>
                        <Form.Control type='text' placeholder='Que puesto tienes' name='puesto' value={puesto}  onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                    <Form.Group controlId='empleador' className='mb-3'>
                        <Form.Label className='ms-1'>Empleador:</Form.Label>
                        <Form.Control type='text' placeholder='Encargado de remuneracion' name='empleador' value={empleador} onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                    <Form.Group controlId='localidad' className='mb-3'>
                        <Form.Label className='ms-1'>Localidad:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Durango' name='localidad' value={localidad} onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                    <Form.Group controlId='fInicio' className='mb-3'>
                        <Form.Label className='ms-1'>Fecha de inicio:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: 12 de enero de 2020' name='fInicio' value={fInicio} onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                    <Form.Group controlId='fFinal' className='mb-3'>
                        <Form.Label className='ms-1'>Fecha de fin:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: 12 de enero de 2021' name='fFinal' value={fFinal} onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                    <Form.Group controlId='descripcion'>
                        <Form.Label className='ms-1'>Descripción:</Form.Label>
                        <Form.Control as='textarea' name='descripcion' value={descripcion} onChange={(event) => handleChange(event, 'experiencia')}/>
                    </Form.Group>
                </Form>

                {/* Parte de otros */}

                <h1 className='text-center'>Otros datos</h1>
                <Form className='border rounded p-4 my-4 text-start'>
                    <Form.Group controlId='competencias' className='mb-3'>
                        <Form.Label className='ms-1'>Competencias:</Form.Label>
                        <Form.Control type='text' placeholder='Ingresa tus competencias' name='competencias' value={competencias}  onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='hobbies' className='mb-3'>
                        <Form.Label className='ms-1'>Hobbies:</Form.Label>
                        <Form.Control type='text' placeholder='Tienes algun hobbie?' name='hobbies' value={hobbies} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='idiomas' className='mb-3'>
                        <Form.Label className='ms-1'>Idiomas</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Ingles, Español, etc..' name='idiomas' value={idiomas} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='cursos' className='mb-3'>
                        <Form.Label className='ms-1'>Cursos:</Form.Label>
                        <Form.Control type='text' placeholder='Haz realizado algun curso?' name='cursos' value={cursos} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='actExtra' className='mb-3'>
                        <Form.Label className='ms-1'>Actividades extracurriculares:</Form.Label>
                        <Form.Control type='text' placeholder='Ej: Basketball, Futbol, etc' name='actExtra' value={actExtra} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='redSociales' className='mb-3'>
                        <Form.Label className='ms-1'>Redes Sociales:</Form.Label>
                        <Form.Control type='text' placeholder='Cuales son tus redes sociales' name='redSociales' value={redSociales} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                    <Form.Group controlId='valores'>
                        <Form.Label className='ms-1'>Valores:</Form.Label>
                        <Form.Control type='text' placeholder='Cuales son tus valores?' name='valores' value={valores} onChange={(event) =>handleChange(event, 'otros')}/>
                    </Form.Group>
                </Form>
      </Row>
      <Row className="justify-content-center gap-4">
        <Button variant="secondary" size="lg" style={{width: 'fit-content'}} onClick={() => navigate('/profesores')}>Volver</Button>
        <Button variant="danger" size="lg" style={{width: 'fit-content'}} onClick={traerCurriculum}>Cancelar</Button>
        <Button variant="info" size="lg" style={{width: 'fit-content'}} onClick={handleSubmit}>Modificar</Button>
      </Row>
    </Container>
  );
};

export default ModificarCurriculum;
