import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faEnvelope, faPhoneAlt, faSuitcase, faGraduationCap, faLanguage, faComments, faTasks } from '@fortawesome/free-solid-svg-icons';

const Curriculum = ({ curriculum }) => {
  return (
    <>
      <Container className="cv-container">
        <Row className='general'>
          <Col md={6}>
            <h1>{curriculum.infoGeneral.nombres} {curriculum.infoGeneral.apellidos}</h1>
            <p><b>Fecha de nacimiento:</b> {curriculum.infoGeneral.fNacimiento}</p>
            <p><b>Calle y Colonia:</b> {curriculum.infoGeneral.calle}, {curriculum.infoGeneral.colonia}</p>
            <p><b>Codigo postal:</b> {curriculum.infoGeneral.cp}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> {curriculum.infoGeneral.email}</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} /> {curriculum.infoGeneral.tCelular}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2><FontAwesomeIcon icon={faGraduationCap} /> Educación</h2>
            <ul>
              <li>
                <h4>{curriculum.escolaridades.centroEducativo}</h4>
                <p><b>Ubicacion del centro educativo: </b>{curriculum.escolaridades.ubicacionCentro}</p>
                <p><b>Titulo: </b>{curriculum.escolaridades.titulo}</p>
                <p><b>Campo de estudio: </b>{curriculum.escolaridades.campoEstudio}</p>
                <p><b>Año de Graduación: </b>{curriculum.escolaridades.graduacion}</p>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2><FontAwesomeIcon icon={faSuitcase} /> Experiencia profesional</h2>
            <ul>
              <li>
                <h4>Nombre de la empresa</h4>
                <p><b>Puesto:</b> {curriculum.experiencia.puesto}</p>
                <p><b>Empleador:</b> {curriculum.experiencia.empleador}</p>
                <p><b>Localidad:</b> {curriculum.experiencia.localidad}</p>
                <p><b>Fecha de inicio:</b> {curriculum.experiencia.fInicio}</p>
                <p><b>Fecha de fin:</b> {curriculum.experiencia.fFinal}</p>
                <p><b>Descripción:</b> {curriculum.experiencia.descripcion}</p>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2><FontAwesomeIcon icon={faTasks} /> Datos adicionales</h2>
            <ul>
              <li><p><b>Competencias: </b> {curriculum.otros.competencias}</p></li>
              <li><p><b>Hobbies: </b> {curriculum.otros.hobbies}</p></li>
              <li><p><b>Cursos: </b> {curriculum.otros.cursos}</p></li>
              <li><p><b>Actividades Extracurriculares: </b> {curriculum.otros.actExtra}</p></li>
              <li><p><b>Valores: </b> {curriculum.otros.valores}</p></li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2><FontAwesomeIcon icon={faLanguage} /> Idiomas</h2>
            <ul>
              <li>
                <p>{curriculum.otros.idiomas}</p>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h2><FontAwesomeIcon icon={faComments} /> Redes Sociales</h2>
            <ul>
              <li>
                <p>{curriculum.otros.redSociales}</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Curriculum
