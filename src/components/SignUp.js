import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signup, signin, currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(!currentUser){
			return
		}
		const newPortfolio = {
			owner: currentUser.uid,
			about: [],
			projects: [],
			links: [],
			email: '',
			theme: '',
			background: '',
		}

		db.collection("portfolios").add( newPortfolio )
		.then(docRef => {
			setLoading(false);
			navigate(`/create/${docRef.id}`)
		})
		.catch((e) => {
			setError(e.message);
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('The passwords does not match');
		};

		setError(null);

		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value)
				.then(async () => {
					await signin(emailRef.current.value, passwordRef.current.value, nameRef.current.value.replace(' ', ''))
				});
		} catch (e) {
			setError(e.message);
			setLoading(false);
		};
	};

	return ( 
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign Up</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>
								<Form.Group id="email">
									<Form.Label>User name</Form.Label>
									<Form.Control type="text" ref={nameRef} required />
								</Form.Group>

								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Form.Group id="password-confirm">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button className="button" disabled={loading} type="submit">Create Account</Button>
							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						Already have an account? <Link to="/signin">Sign In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	 );
}
 
export default SignUp;