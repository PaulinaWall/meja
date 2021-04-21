import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

import useGetSinglePortfolio from '../../hooks/useGetSinglePortfolio';
import BreadCrumbs from '../common/BreadCrumbs';

const UserContactForm = () => {
	const { userName, portfolioID } = useParams();
	const { portfolio } = useGetSinglePortfolio(portfolioID);

	return ( 
		<>
			<BreadCrumbs
				routes={[{path: `/${userName}/${portfolioID}`, name: 'Home'}, {path: `/${userName}/${portfolioID}/contact`, name: 'Contact'}]}
				portfolio={portfolio}
			/>
			<Container className={"user-contact-page " + (portfolio?.theme)}>
				<Container>
					<Form action="mailto:paulina_wall@outlook.com" method="POST">
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="name@example.com" />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" placeholder="Anna" />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlInput1">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" placeholder="Andersson" />
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlTextarea1">
							<Form.Label>Example textarea</Form.Label>
							<Form.Control as="textarea" rows={6} />
						</Form.Group>
						<Button className="button" type="submit">
							Submit
						</Button>
					</Form>
				</Container>
			</Container>
		</>
	 );
}
 
export default UserContactForm;