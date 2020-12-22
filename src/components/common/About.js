import React from 'react';
import { Container, Button } from 'react-bootstrap'

const About = ({ section }) => {
	return ( 
		<Container className="d-flex justify-content-between align-items-center">
			<div>
				{section.title && <h2 style={{ fontSize: "25px" }}>{section.title}</h2>}
				{section.text && <p >{section.text}</p>}
				{section.url && <a href={section.url}>{section.url}</a>}
			</div>
			<Button style={{ height: "min-content" }} className="button btn-secondary" size="sm" type="button">
				Change
			</Button>
		</Container>
	 );
}
 
export default About;