import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const LinksForm = ({ handleGithubChange, handleLinkedinChange, handleFacebookChange }) => {

	return ( 
		<Form className="form">

			<Form.Group id="github" className="d-flex align-items-center" >
				<FontAwesomeIcon icon={faGithub} className="mr-2 icons" />
				<Form.Control 
					placeholder="Github"
					onChange={handleGithubChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="linkedin" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faLinkedin} className="mr-2 icons" />
				<Form.Control 
					placeholder="Linkedin"
					onChange={handleLinkedinChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="facebook" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faFacebook} className="mr-2 icons" />
				<Form.Control 
					placeholder="Facebook"
					onChange={handleFacebookChange}
					type="text" 
				/>
			</Form.Group>
		</Form>
	 );
}
 
export default LinksForm;