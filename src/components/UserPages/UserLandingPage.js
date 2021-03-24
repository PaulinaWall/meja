import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Form, Button, Container } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';


const UserLandingPage = () => {
	const { currentUser, setName } = useAuth();
	const [show, setShow] = useState(currentUser.displayName ? false : true);
	const [urlName, setUrlName] = useState('');
	const { userName } = useParams();
	const navigate = useNavigate();

	const handleSave = () => {
		setName(urlName);
		setShow(false);
		navigate(`/${urlName}/`);
	};

	return ( 
		<Container className="user-site-container">
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
						<Modal show={show} animation={false}>
							<Modal.Header closeButton>
							<Modal.Title>Hi {userName}, choose your URL-name for this portfolio! (No spaces)</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Control
										type="url-name"
										onChange={(e) => setUrlName(e.target.value.trim())}
										value={urlName}
										placeholder="URL"
										required
									/>
								</Form>
							</Modal.Body>
							<Modal.Footer>
							<Button className="button" variant="primary" onClick={handleSave}>
								Save
							</Button>
							</Modal.Footer>
						</Modal>
					</>
				)
			}
		</Container>
		
	 );
}
 
export default UserLandingPage;