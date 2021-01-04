import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import useGetPortfolio from '../../hooks/useGetPortfolio';

const LinksForm = ({ showLinksSaveButton, facebookUrl, linkedinUrl, gitHubUrl, handleGithubChange, handleLinkedinChange, handleFacebookChange, handleSaveOnClick }) => {

	const { portfolio } = useGetPortfolio();
	return ( 
		<Form className="form">
			<h3>Add Links</h3>
			<Form.Group id="github" className="d-flex align-items-center" >
				<FontAwesomeIcon icon={faGithub} className="mr-2 icons" />
				<Form.Control 
					value={gitHubUrl}
					placeholder="Github"
					onChange={handleGithubChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="linkedin" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faLinkedin} className="mr-2 icons" />
				<Form.Control 
					value={linkedinUrl}
					placeholder="Linkedin"
					onChange={handleLinkedinChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="facebook" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faFacebook} className="mr-2 icons" />
				<Form.Control 
					value={facebookUrl}
					placeholder="Facebook"
					onChange={handleFacebookChange}
					type="text" 
				/>
			</Form.Group>
			{
				(!portfolio?.links.length > 0 || showLinksSaveButton) &&
					<div className="d-flex justify-content-end">
						<Button className="button" size="sm" onClick={handleSaveOnClick} type="button">Save Links</Button>
					</div>
			}
			
		</Form>
	 );
}
 
export default LinksForm;