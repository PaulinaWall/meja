import React from 'react';
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const Links = ({ link, handleOnClick, handleDelete }) => {
	return (  
		<div className="linked-icons-container card">
			<div>
				{ link.github && 
					<a target="_blank" rel="noopener noreferrer" href={`http://${link.github}`}>
						<FontAwesomeIcon icon={faGithub} className="zoom mr-2 linked-icons" />
					</a>
				}
				{ link.linkedin && 
					<a target="_blank" rel="noopener noreferrer" href={`http://${link.linkedin}`}>
						<FontAwesomeIcon icon={faLinkedin} className="zoom mr-2 linked-icons" />
					</a>
				}
				{ link.facebook && 
					<a target="_blank" rel="noopener noreferrer" href={`http://${link.facebook}`}>
						<FontAwesomeIcon icon={faFacebook} className="zoom mr-2 linked-icons" />
					</a>
				}
			</div>
			<div className="d-flex">
				<Button style={{ height: "min-content" }} className="button mr-3" size="sm" type="button" onClick={handleOnClick}>
					Change
				</Button>
				<FontAwesomeIcon icon={faTrashAlt} className="mr-2 delete-icons" onClick={handleDelete} />
			</div>
		</div>
	 );
}
 
export default Links;