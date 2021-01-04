import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import useGetPortfolio from '../../hooks/useGetPortfolio';
//import { useAuth } from '../../contexts/AuthContext';

const Footer = () => {
//	const { currentUser } = useAuth();
	const { portfolio } = useGetPortfolio();

	return (
		<>
			{
				//currentUser && 
				<Navbar className="footer">	
					{
						portfolio && portfolio.links.map((link, index) => {
							return <Nav className="ml-auto" key={index}>
								{ link.github && 
									<a target="_blank" rel="noopener noreferrer" href={`http://${link.github}`}>
										<FontAwesomeIcon icon={faGithub} className="mr-2 linked-icons" />
									</a>
								}
								{ link.linkedin && 
									<a target="_blank" rel="noopener noreferrer" href={`http://${link.linkedin}`}>
										<FontAwesomeIcon icon={faLinkedin} className="mr-2 linked-icons" />
									</a>
								}
								{ link.facebook && 
									<a target="_blank" rel="noopener noreferrer" href={`http://${link.facebook}`}>
										<FontAwesomeIcon icon={faFacebook} className="mr-2 linked-icons" />
									</a>
								}
							</Nav>
						})
					}
				</Navbar>
			}
		</>
	
	)
}

export default Footer;