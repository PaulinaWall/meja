import React,{ useRef, useState, useEffect, useContext }  from 'react'
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { BackgroundContext } from '../contexts/BackgroundContext';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const { signin, currentUser } = useAuth();
	const { setTheme } = useContext(ThemeContext);
	const { setBackground } = useContext(BackgroundContext);
	const navigate = useNavigate();

	useEffect(() => {
		if(!currentUser){
			return
		}
		db.collection('portfolios')
			.where('owner', '==', currentUser.uid)
			.get()
			.then((querySnapshot) => {
				setLoading(false);
				querySnapshot.forEach((doc) => {
					setTheme(doc.data().theme);
					setBackground(doc.data().background);
					navigate(`/create/${doc.id}`)
				})
			})
			.catch((e) => {
				setError(e.message);
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser])

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setError(null);

		try {
			setLoading(true)
			await signin(emailRef.current.value, passwordRef.current.value)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}
	return (
		<Container>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign In</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Button className="button" disabled={loading} type="submit">Sign in</Button>

							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2" >
						No account? <Link to="/signup">Sign Up?</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default SignIn
