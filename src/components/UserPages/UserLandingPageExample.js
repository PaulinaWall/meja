import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';
import { BackgroundContext } from '../../contexts/BackgroundContext';

const UserLandingPage = () => {
	const { getTheme } = useContext(ThemeContext);
	const { getBackground } = useContext(BackgroundContext);

	const backgroundUrl = getBackground();
	return ( 
		<Container className={"p-0 user-landing-page-example " + (getTheme())}>
					<Row>
						<Col sm={6} md={6} lg={6}>
							<Row className="landing-page-row">
								<Col className="box-styles-example" sm={8} md={8} lg={8}>
									<h3>About</h3>
								</Col>
								<Col className="box-styles-example" sm={8} md={8} lg={8}>
									<h3>Projects</h3>
								</Col>
								<Col className="box-styles-example" sm={8} md={8} lg={8}>
									<h3>Contact</h3>
								</Col>
							</Row>
						</Col>
						<Col className="background-image-landing-page" sm={6} md={6} lg={6} style={{
						backgroundImage: `url(${backgroundUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize: '100% 100%;',
						width:'250px'
						}}></Col>
					</Row>
		</Container>
		
	 );
}
 
export default UserLandingPage;