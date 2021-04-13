import React, { useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

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
				<Col className="background-image-landing-page" sm={8} md={8} lg={8} style={{
				backgroundImage: `url(${getBackground()})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'auto',
				width:'250px'
				}}></Col>
			</Row>
		</Container>
		
	 );
}
 
export default UserLandingPage;