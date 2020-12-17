import React from 'react';
import { Form } from 'react-bootstrap';

const AboutForm = ({ handleTextChange, handleUrlChange, handleTitleChange }) => {

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

		</Form>
	 );
}
 
export default AboutForm;