import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AboutForm = ({ title, url, text, handleTextChange, handleUrlChange, handleTitleChange, handleSaveOnClick }) => {

	return ( 
		<Form className="form">
			<h3 style={{ color: "#495057" }}>Add About Section</h3>
			<Form.Group id="title">
				<Form.Control 
					value={title}
					placeholder="Title"
					onChange={handleTitleChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group id="text">
				<Form.Control 
					value={text}
					placeholder="Text"
					onChange={handleTextChange}
					as="textarea" 
					rows={3} 
				/>
			</Form.Group>

			<Form.Group id="url">
				<Form.Control 
					value={url}
					placeholder="URL"
					onChange={handleUrlChange}
					type="text" 
				/>
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Section</Button>
			</div>
		</Form>
	 );
}
 
export default AboutForm;