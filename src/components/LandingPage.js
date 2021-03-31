import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import projectView from '../assets/images/projectView.png';
import formViewSample from '../assets/images/formViewSample.png';

const LandingPage = () => {
	return ( 
		<div className="landing-page">
			<Row className="m-0 landing-page-bottom">
				<Col className="landing-page-quote" sm={12} md={12} lg={12}>
				<span className="quote-text">
					<FontAwesomeIcon className="left-quote" icon={faQuoteLeft}/>
					Always see a preview of your ongoing work!
					<FontAwesomeIcon className="right-quote" icon={faQuoteRight}/>
				</span>
				</Col>
			</Row>
			<Row className="m-0 landing-page-bottom">
				<Col className="p-0" sm={12} md={6} lg={6}>
					<img className="landing-page-image" src={projectView} alt="project example" />
				</Col>
				<Col className="landing-page-list-top" sm={12} md={6} lg={6}>
					<ul>
						<li>Add you projects with links and images</li>
						<li>Create about section, add text and links</li>
						<li>Choose among different colors for your personal taste</li>
						<li>Add your email for all the contacts you will get.</li>
						<li>Link to social media with cool icons</li>
					</ul>
				</Col>
			</Row>
			<Row className="m-0 landing-page-bottom">
				<Col className="landing-page-quote" sm={12} md={12} lg={12}>
				<span className="quote-text">
					<FontAwesomeIcon className="left-quote" icon={faQuoteLeft}/>
					Any questions don´t hesitate to contact. Infomation below.
					<FontAwesomeIcon className="right-quote" icon={faQuoteRight}/>
				</span>
				</Col>
			</Row>
			<Row className="m-0 landing-page-bottom"><Col className="landing-page-list-bottom" sm={12} md={6} lg={6}>
					<ul>
						<li>Navigate easily around you project.</li>
						<li>You get a priview straight away.</li>
						<li>Save and collect your personal url.</li>
						<li>Sign in and change content anytime.</li>
					</ul>
				</Col>
				<Col className="p-0 landing-page-images-container" sm={12} md={6} lg={6}>
					<img className="landing-page-image" src={formViewSample} alt="form example" />
				</Col>
				
			</Row>
		</div>
	 );
}
 
export default LandingPage;