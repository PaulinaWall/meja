import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AboutForm = ({ handleTextChange, handleUrlChange, handleTitleChange, handleSaveOnClick }) => {

	return ( 
		<Form className="form">

			<Form.Group id="title">
				<Form.Control 
					placeholder="Title"
					onChange={handleTitleChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="url">
				<Form.Control 
					placeholder="URL"
					onChange={handleUrlChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="text">
				<Form.Control 
					placeholder="Text"
					onChange={handleTextChange}
					as="textarea" 
					rows={3} 
				/>
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Section</Button>
			</div>
		</Form>
	 );
}
 
export default AboutForm;