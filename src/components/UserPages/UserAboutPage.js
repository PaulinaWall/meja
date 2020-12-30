import React from 'react';
import { Container } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';
import { useAuth } from '../../contexts/AuthContext';


const UserAboutPage = () => {
	const { portfolio } = useGetPortfolio();
	const { currentUser } = useAuth();

	return ( 
		<>
			{
			(portfolio && portfolio.about.length > 0) && 
				<Container className="about-container mb-3 pb-2">
					<h1 className="pt-3" style={{ fontSize: "40px" }}>{currentUser.displayName}</h1>
					{
						(portfolio && portfolio.about) && portfolio.about.map((section, index) => {
							return <div key={index}>
								{section.title && <h3>{section.title}</h3>}
								{section.text && <p>{section.text}</p>}
								{section.url && <a href={section.url}>{section.url}</a>}
							</div>
						})
					}
				</Container>
			}
		</>
	 );
}
 
export default UserAboutPage;