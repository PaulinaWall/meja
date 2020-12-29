import React from 'react';
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const Links = ({ link }) => {
	console.log(link)
	return ( 
		<Container className="linked-icons-container">
			<a href={link.github}><FontAwesomeIcon icon={faGithub} className="mr-2 linked-icons" /></a>
			<a href={link.linkedin}><FontAwesomeIcon icon={faLinkedin} className="mr-2 linked-icons" /></a>
			<a href={link.facebook}><FontAwesomeIcon icon={faFacebook} className="mr-2 linked-icons" /></a>
			<Button style={{ height: "min-content" }} className="button btn-secondary" size="sm" type="button">
				Change
			</Button>
		</Container>
	 );
}
 
export default Links;