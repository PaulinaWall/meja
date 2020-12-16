import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';

const LandingPage = () => {

	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate('/signup')
	};

	return ( 
		<Container>
			<h1>MEJA</h1>
			<p>Makes it easy to create a cool portfolio in a few steps. <a href="value">DEMO</a></p>
			<Button onClick={handleOnClick}>
				Create account
			</Button>
		</Container>
	 );
}
 
export default LandingPage;