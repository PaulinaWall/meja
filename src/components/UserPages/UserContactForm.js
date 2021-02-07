import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const UserContactForm = () => {

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitted');
	}

	return ( 
		<Container className="user-site-container">
			<Form onSubmit={handleSubmit}>
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
	 );
}
 
export default UserContactForm;