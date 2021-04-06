import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';
import { BackgroundContext } from '../../contexts/BackgroundContext';


const UserLandingPage = () => {
	const { getTheme } = useContext(ThemeContext);
	const { getBackground } = useContext(BackgroundContext);

	const backgroundUrl = getBackground();
	return ( 
		<Container className={"user-landing-page-container " + (getTheme())}>
			<Row>
				<Col sm={6} md={6} lg={6}>
					<Row className="user-landingPage-row">
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/user/about`}><h3>About</h3></Link>
						</Col>
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/user/projects`}><h3>Projects</h3></Link>
						</Col>
						<Col className="box-styles zoom" sm={8} md={8} lg={8}>
							<Link to={`/user/contact`}><h3>Contact</h3></Link>
						</Col>
					</Row>
				</Col>
				<Col className="background-image-landing-page" sm={6} md={6} lg={6} style={{
						backgroundImage: `url(${backgroundUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize: 'auto',
						width:'250px'
						}}>
				</Col>
			</Row>
		</Container>
		
	 );
}
 
export default UserLandingPage;