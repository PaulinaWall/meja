import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';

const LandingPage = () => {

	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate('/signup')
	};

	return ( 
		<Container className="d-flex flex-column align-items-center">
			<h1 className="mt-5">MEJA</h1>
			<p className="mt-5">Makes it easy to create a cool portfolio in a few steps. <a href="value">SAMPLE</a></p>
			<Button className="button mt-5" onClick={handleOnClick}>
				Create account
			</Button>
		</Container>
	 );
}
 
export default LandingPage;