import React, { useContext } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';

import { ThemeContext } from '../../contexts/ThemeContext';
import { BackgroundContext } from '../../contexts/BackgroundContext';

const UserLandingPage = ({ background, theme }) => {
	const { getTheme } = useContext(ThemeContext);
	const { getBackground } = useContext(BackgroundContext);

	return ( 
		<Container className={"user-landing-page-example " + (getTheme())}>
			<Row>
				<Col sm={4} md={4} lg={4}>
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
				<Col className="background-image-example-container" sm={8} md={8} lg={8}>
					<Image className="background-image-example-landing-page" src={getBackground()} />
				</Col>
			</Row>
		</Container>
		
	 );
}
 
export default UserLandingPage;