import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';

import useGetPortfolio from '../../hooks/useGetPortfolio';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const UserAboutPage = () => {
	const { portfolio } = useGetPortfolio();
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);

	return ( 
		<div className={"user-site-container " + (getTheme())}>
			{
			(portfolio?.about.length > 0) && 
				<Container className="card about-container">
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
		</div>
	 );
}
 
export default UserAboutPage;