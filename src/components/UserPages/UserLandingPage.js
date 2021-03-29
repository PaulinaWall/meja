import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';


const UserLandingPage = () => {
	const { currentUser } = useAuth();
	const { getTheme } = useContext(ThemeContext);

	return ( 
		<Container className={"user-landing-page-container " + (getTheme())}>
			{
				currentUser && (
					<>
						<Row className="landingPage-row">
							<Col className="box-styles zoom" sm={12} md={3} lg={3}>
								<Link to={`/${currentUser.displayName}/about`}><h3>About</h3></Link>
							</Col>
							<Col className="box-styles zoom" sm={12} md={3} lg={3}>
								<Link to={`/${currentUser.displayName}/projects`}><h3>Projects</h3></Link>
							</Col>
							<Col className="box-styles zoom" sm={12} md={3} lg={3}>
								<Link to={`/${currentUser.displayName}/contact`}><h3>Contact</h3></Link>
							</Col>
						</Row>
					</>
				)
			}
		</Container>
		
	 );
}
 
export default UserLandingPage;