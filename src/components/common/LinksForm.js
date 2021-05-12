import React from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const LinksForm = ({ facebookUrl, linkedinUrl, gitHubUrl, handleGithubChange, handleLinkedinChange, handleFacebookChange, handleSaveOnClick, setFormState }) => {

	return ( 
		<Form className="form">
			<div className="delete-icon">
				<FontAwesomeIcon
					icon={faTimes}
					onClick={setFormState}
				/>
			</div>
			<Form.Group id="github" className="d-flex align-items-center" >
				<FontAwesomeIcon icon={faGithub} className="mr-2 icons" />
				<Form.Control 
					value={gitHubUrl}
					placeholder="example: www.github.com"
					onChange={handleGithubChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="linkedin" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faLinkedin} className="mr-2 icons" />
				<Form.Control 
					value={linkedinUrl}
					placeholder="example: www.linkedin.com"
					onChange={handleLinkedinChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="facebook" className="d-flex align-items-center">
				<FontAwesomeIcon icon={faFacebook} className="mr-2 icons" />
				<Form.Control 
					value={facebookUrl}
					placeholder="example: www.facebook.com"
					onChange={handleFacebookChange}
					type="text" 
				/>
			</Form.Group>
			{
				<div className="d-flex justify-content-end">
					<Button disabled={!gitHubUrl && !linkedinUrl && !facebookUrl} className="button" size="sm" onClick={handleSaveOnClick} type="button">
						<OverlayTrigger
							transition={false}
							placement="top"
							overlay={
								<Tooltip>
									Add links (without https://) to your accounts, will be added as icons in the footer of portfolio.
									BEWARE, if started project with links, rather change in the preview. To not risk overwrite content.
								</Tooltip>
							}
						>
							<span>Save</span>
						</OverlayTrigger>
					</Button>
				</div>
			}
			
		</Form>
	 );
}
 
export default LinksForm;