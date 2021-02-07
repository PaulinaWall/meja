import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Writer from "../assets/images/Writer.png"

const LandingPage = () => {
	return ( 
		<Container className="center landingPage">
			<div className="d-flex mt-4">
				<Image className="mr-4" width="300" src={Writer} roundedCircle />
				<h1 className="mt-5">MEJA</h1>
			</div>
			<p className="mt-5">Makes it easy to create a cool portfolio in a few steps. <a href="value">SAMPLE</a></p>
		</Container>
	 );
}
 
export default LandingPage;