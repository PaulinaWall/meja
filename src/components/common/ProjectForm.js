import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const ProjectForm = ({ handleTextChange, handleUrlChange, onClick, text, url }) => {

	return ( 
		<Form>

			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<Button 
						onClick={onClick}
						variant="outline-secondary">
						Add Image
					</Button>
				</InputGroup.Prepend>
				<FormControl aria-describedby="basic-addon1" />
			</InputGroup>

			<Form.Group id="url">
				<Form.Label>URL</Form.Label>
				<Form.Control 
					onChange={handleUrlChange}
					type="text" 
					ref={url}
				/>
			</Form.Group>

			<Form.Group id="text">
				<Form.Label>Text</Form.Label>
				<Form.Control 
					onChange={handleTextChange}
					as="textarea" 
					rows={3} 
					ref={text} 
				/>
			</Form.Group>

		</Form>
	 );
}
 
export default ProjectForm;