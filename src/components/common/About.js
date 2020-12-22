import React from 'react';
import { Container } from 'react-bootstrap'

const About = ({ section }) => {
	return ( 
		<Container>
			<h2 style={{ fontSize: "25px" }}>{section.title}</h2>
			<p >{section.text}</p>
			<a href={section.url}>{section.url}</a>
		</Container>
	 );
}
 
export default About;