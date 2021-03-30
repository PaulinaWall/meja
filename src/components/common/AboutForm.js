import React from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AboutForm = ({ title, url, text, handleTextChange, handleUrlChange, handleTitleChange, handleSaveOnClick, setFormState }) => {

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
				<Button
					disabled={!title && !url && !text}
					className="button"
					size="sm"
					onClick={handleSaveOnClick}
					type="button"
				>
					<OverlayTrigger
						transition={false}
						placement="top"
						overlay={
							<Tooltip>
								Fill in atleast one field to add content.
							</Tooltip>
						}
					>
						<span>Save</span>
					</OverlayTrigger>
				</Button>
			</div>
		</Form>
	 );
}
 
export default AboutForm;