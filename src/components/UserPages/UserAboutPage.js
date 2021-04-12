import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';

const UserAboutPage = () => {
	const { portfolioID } = useParams();
	const { portfolio } = useGetSinglePortfolio(portfolioID);

	return ( 
		<div className={"user-site-container " + (portfolio?.theme)}>
			{
			(portfolio?.about.length > 0) && 
				<Container className="card about-container">
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
		</div>
	 );
}
 
export default UserAboutPage;