import React from 'react';
import { Form, Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';

const ProjectForm = ({ 
	title,
	text,
	url,
	handleTitleChange,
	handleTextChange, 
	handleUrlChange, 
	handleSaveOnClick, 
	handleImageChange,
	uploadedImageUrl,
	uploadProgress
}) => {
	return ( 
		<Form className="form">
			<Form.Group id="title">
				<Form.Control 
					value={title}
					placeholder="Title"
					onChange={handleTitleChange}
					type="text" 
				/>
			</Form.Group>

			<Form.Group>
				<Form.File
					custom
					id="upload-image"
					label="Choose image to upload"
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
			{
				uploadProgress !== null && (
					<ProgressBar className="mb-3" variant="info" animated now={uploadProgress} />
 				)
			}
			<Form.Group id="url">
				<Form.Control 
					value={url}
					placeholder="URL"
					onChange={handleUrlChange}
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
				{text && text.length > 50 && (
					<Form.Text className="text-danger">Please shorten the text, maximum 50 characters.</Form.Text>
				)}
			</Form.Group>
			<div className="d-flex justify-content-end">
				<Button className="button" size="sm" type="button" onClick={handleSaveOnClick} >
					Save Project
				</Button>
			</div>
		</Form>
	 );
}
 
export default ProjectForm;