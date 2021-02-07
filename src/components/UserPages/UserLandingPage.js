import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';


const UserLandingPage = () => {

	const { currentUser } = useAuth();
	return ( 
		<div className="user-site-container">
			{
				currentUser && (
					<Row className="landingPage-row">
						<Col className="box-styles" sm={12} md={3} lg={3}>
							<Link to={`/${currentUser.displayName}/about`}><h3>About</h3></Link>
						</Col>
						<Col className="box-styles" sm={12} md={3} lg={3}>
							<Link to={`/${currentUser.displayName}/projects`}><h3>Projects</h3></Link>
						</Col>
						<Col className="box-styles" sm={12} md={3} lg={3}>
							<Link to={`/${currentUser.displayName}/contact`}><h3>Contact</h3></Link>
						</Col>
					</Row>
				)
			}
		</div>
		
	 );
}
 
export default UserLandingPage;