import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ContactForm = ({ email, handleEmailChange, handleSaveOnClick }) => {

	return ( 
		<Form className="form">
			<h3 style={{ color: "#495057" }}>Add Email for contact form</h3>
			<Form.Group id="title">
				<Form.Control 
					value={email}
					placeholder="Email"
					onChange={handleEmailChange}
					type="text" 
				/>
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Email</Button>
			</div>
		</Form>
	 );
}
 
export default ContactForm;