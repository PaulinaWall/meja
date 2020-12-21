import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProjectForm = ({ 
	handleTextChange, 
	handleUrlChange, 
	handleSaveOnClick, 
	handleImageChange,
	uploadedImageUrl
}) => {

	return ( 
		<Form className="form">

				<Form.Group>
					<Form.File
						id="upload-image"
						label="Choose image to upload"
						custom
						onChange={handleImageChange}
					/>
				</Form.Group>
				{
					uploadedImageUrl && (
						<div className="project-image-container">
							<img src={uploadedImageUrl} className="img-fluid my-3" alt="uploaded file" />
						</div>
					)
				}
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
				<Button className="button btn-secondary" size="sm" onClick={handleSaveOnClick} type="button">Save Project</Button>
			</div>
		</Form>
	 );
}
 
export default ProjectForm;