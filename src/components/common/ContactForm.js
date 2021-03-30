import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ContactForm = ({ email, handleEmailChange, handleSaveOnClick, setFormState }) => {

	return ( 
		<Form className="form">
			<div className="delete-icon">
				<FontAwesomeIcon
					icon={faTimes}
					onClick={setFormState}
				/>
			</div>
			<Form.Group id="title">
				<Form.Control 
					value={email}
					placeholder="Email"
					onChange={handleEmailChange}
					type="text" 
				/>
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button disabled={!email} className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Email</Button>
			</div>
		</Form>
	 );
}
 
export default ContactForm;