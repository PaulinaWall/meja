import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const ProjectForm = ({ handleTextChange, handleUrlChange, onClick }) => {

	return ( 
		<Form className="form">

			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<Button 
						className="bg-white image-button"
						onClick={onClick}
						variant="outline-secondary">
						Add Image
					</Button>
				</InputGroup.Prepend>
				<FormControl aria-describedby="basic-addon1" />
			</InputGroup>

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
 
export default ProjectForm;