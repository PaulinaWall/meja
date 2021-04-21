import React from 'react';
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const About = ({ section, handleOnClick, handleDelete }) => {
	return ( 
		<Container className="d-flex justify-content-between align-items-center">
			<div className="mb-3">
				{section.title && <h2 style={{ fontSize: "25px" }}>{section.title}</h2>}
				{section.text && <p>{section.text}</p>}
				{section.url && <a href={`https://${section.url}`} target="_blank" rel="noopener noreferrer">{section.url}</a>}
			</div>
			<div className="d-flex">
				<Button className="button mr-3" size="sm" type="button" onClick={handleOnClick}>
					Change
				</Button>
				<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons"  onClick={handleDelete} />
			</div>
		</Container>
	 );
}
 
export default About;