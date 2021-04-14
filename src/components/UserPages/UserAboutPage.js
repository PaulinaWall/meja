import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';
import BreadCrumbs from '../common/BreadCrumbs';

const UserAboutPage = () => {
	const { userName, portfolioID } = useParams();
	const { portfolio } = useGetSinglePortfolio(portfolioID);

	return ( 
		<>
			<BreadCrumbs
				routes={[{path: `/${userName}/${portfolioID}`, name: 'Home'}, {path: `/${userName}/${portfolioID}/about`, name: 'About'}]}
				portfolio={portfolio}
			/>
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
		</>
	 );
}
 
export default UserAboutPage;