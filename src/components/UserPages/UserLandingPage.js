import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Image } from 'react-bootstrap';

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';


const UserLandingPage = () => {
	const { portfolioID, userName } = useParams();
	const { portfolio } = useGetSinglePortfolio(portfolioID);

	const backgroundUrl = portfolio?.background;
	return ( 
		<Container className={"user-landing-page-container " + (portfolio?.theme)}>
			<Row className="align-items-center">
				<Col sm={6} md={6} lg={6}>
					<Row className="user-landingPage-row">
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/${userName}/${portfolioID}/about`}><h3>About</h3></Link>
						</Col>
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/${userName}/${portfolioID}/projects`}><h3>Projects</h3></Link>
						</Col>
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/${userName}/${portfolioID}/contact`}><h3>Contact</h3></Link>
						</Col>
					</Row>
				</Col>
				<Col sm={6} md={6} lg={6}>
					<Image className="background-image-landing-page" src={backgroundUrl} />
				</Col>
			</Row>
		</Container>
		
	 );
}
 
export default UserLandingPage;