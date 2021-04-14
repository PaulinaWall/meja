import React, { useEffect, useContext } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext';
import { BackgroundContext } from '../contexts/BackgroundContext';

const SignOut = () => {
	const { signout } = useAuth()
	const { setTheme } = useContext(ThemeContext);
	const { setBackground } = useContext(BackgroundContext);
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			await signout();
			setTheme('');
			setBackground('');
			navigate('/signin');
		})()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign Out</Card.Title>

							<Card.Text>Please wait while you're being signed out...</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default SignOut
