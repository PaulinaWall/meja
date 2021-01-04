import React from 'react';
import { Container } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../UserPages/Footer';


const UserAboutPage = () => {
	const { portfolio } = useGetPortfolio();
	const { currentUser } = useAuth();

	return ( 
		<div className="user-site-container">
			{
			(portfolio?.about.length > 0) && 
				<Container className="about-container mb-3 pb-2">
					<h1 className="pt-3" style={{ fontSize: "40px" }}>{currentUser.displayName}</h1>
					{
						(portfolio?.about) && portfolio.about.map((section, index) => {
							return <div className="mb-3" key={index}>
								{section.title && <h3>{section.title}</h3>}
								{section.text && <p className="m-0">{section.text}</p>}
								{section.aboutUrl && <a href={section.aboutUrl}>{section.aboutUrl}</a>}
							</div>
						})
					}
				</Container>
			}
			<Footer />
		</div>
	 );
}
 
export default UserAboutPage;