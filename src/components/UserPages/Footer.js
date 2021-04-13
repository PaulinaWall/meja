import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';

const Footer = () => {
	const location = useLocation();
	const [, userName, portfolioID] = location.pathname.split('/');
	const { portfolio } = useGetSinglePortfolio(portfolioID);

	const userPage = userName !== 'create';

	return (
		<div className={userPage ? " " + (portfolio?.theme) : ""}>
			{
				<Navbar className="footer">	
					{
						((userPage && portfolio?.links.length > 0) || userPage)
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
								<FontAwesomeIcon icon={faGithub} className="zoom mr-2 nav-icons" />
							</a>
							<a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com">
								<FontAwesomeIcon icon={faLinkedin} className="zoom mr-2 nav-icons" />
							</a>
							<a target="_blank" rel="noopener noreferrer" href="http://www.facebook.com">
								<FontAwesomeIcon icon={faFacebook} className="zoom mr-2 nav-icons" />
							</a>
						</Nav>
					}
				</Navbar>
			}
		</div>
	)
}

export default Footer;