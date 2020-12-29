import React from 'react';
import { Container, Button } from 'react-bootstrap'

const About = ({ section, handleOnClick }) => {
	return ( 
		<Container className="d-flex justify-content-between align-items-center">
			<div>
				{section.title && <h2 style={{ fontSize: "25px" }}>{section.title}</h2>}
				{section.text && <p >{section.text}</p>}
				{section.aboutUrl && <a href={section.aboutUrl}>{section.aboutUrl}</a>}
			</div>
			<Button className="button btn-secondary" size="sm" type="button" onClick={handleOnClick}>
				Change
			</Button>
		</Container>
	 );
}
 
export default About;