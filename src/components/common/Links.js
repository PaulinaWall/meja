import React from 'react';
import { Container, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const Links = ({ link, handleOnClick }) => {
	return ( 
		<Container className="linked-icons-container">
			<div>
				{ link.github && 
					<a href={link.github}>
						<FontAwesomeIcon icon={faGithub} className="mr-2 linked-icons" />
					</a>
				}
				{ link.linkedin && 
					<a href={link.linkedin}>
						<FontAwesomeIcon icon={faLinkedin} className="mr-2 linked-icons" />
					</a>
				}
				{ link.facebook && 
					<a href={link.facebook}>
						<FontAwesomeIcon icon={faFacebook} className="mr-2 linked-icons" />
					</a>
				}
			</div>
			<div className="d-flex">
				<Button style={{ height: "min-content" }} className="button mr-3" size="sm" type="button" onClick={handleOnClick}>
					Change
				</Button>
				<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons" />
			</div>
		</Container>
	 );
}
 
export default Links;