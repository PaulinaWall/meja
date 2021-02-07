import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import useGetPortfolio from '../../hooks/useGetPortfolio';
import { useAuth } from '../../contexts/AuthContext';

const Footer = () => {
	const { currentUser } = useAuth();
	const { portfolio } = useGetPortfolio();
	
	return (
		<>
			{
				<Navbar className="footer" bg="light" variant="light" >	
					<Container>
					{
						currentUser
						? portfolio?.links.map((link, index) => {
							return <Nav className="ml-auto" key={index}>
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
							</Nav>
						})
						: <Nav className="ml-auto">
							<a target="_blank" rel="noopener noreferrer" href="http://www.github.com">
								<FontAwesomeIcon icon={faGithub} className="zoom mr-2 linked-icons" />
							</a>
							<a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com">
								<FontAwesomeIcon icon={faLinkedin} className="zoom mr-2 linked-icons" />
							</a>
							<a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com">
								<FontAwesomeIcon icon={faFacebook} className="zoom mr-2 linked-icons" />
							</a>
						</Nav>
					}
					</Container>
				</Navbar>
			}
		</>
	)
}

export default Footer;