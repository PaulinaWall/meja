import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';


const UserLandingPage = () => {

	const { currentUser } = useAuth();
	return ( 
		<Row>
			<Col sm={12} md={4} lg={4}>
				<Link to={`/${currentUser.displayName}/about`}><h3>About</h3></Link>
			</Col>
			<Col sm={12} md={4} lg={4}>
				<Link to={`/${currentUser.displayName}/projects`}><h3>Projects</h3></Link>
			</Col>
			<Col sm={12} md={4} lg={4}>
				<Link to={`/${currentUser.displayName}/contact`}><h3>Contact</h3></Link>
			</Col>
		</Row>
	 );
}
 
export default UserLandingPage;