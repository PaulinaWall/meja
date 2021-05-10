import React from 'react';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const About = ({ section, handleOnClick, handleDelete }) => {
	return ( 
		<Container className="d-flex justify-content-between align-items-center">
			<div className="mb-3">
				{section.title && <h2 style={{ fontSize: "25px" }}>{section.title}</h2>}
				{section.text && <p>{section.text}</p>}
				{section.url && <a href={`https://${section.url}`} target="_blank" rel="noopener noreferrer">{section.url}</a>}
			</div>
			<div className="d-flex">
				<FontAwesomeIcon icon={faEdit} className="edit-icons"  onClick={handleOnClick} />
				<FontAwesomeIcon icon={faTrashAlt} className="delete-icons"  onClick={handleDelete} />
			</div>
		</Container>
	 );
}
 
export default About;